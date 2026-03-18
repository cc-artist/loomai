import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');
    const orderId = searchParams.get('orderId');
    const paymentMethod = searchParams.get('paymentMethod') || 'stripe';
    
    // 验证请求参数
    if (!paymentId && !orderId) {
      return NextResponse.json(
        { success: false, message: '缺少必要的查询参数' },
        { status: 400 }
      );
    }
    
    let paymentStatus;
    const isProduction = process.env.NODE_ENV === 'production';
    
    // 根据支付方式调用不同的支付网关查询状态
    if (paymentMethod === 'stripe' && process.env.STRIPE_API_KEY && paymentId) {
      try {
        // 调用Stripe API查询支付状态
        const stripeResponse = await fetch(`https://api.stripe.com/v1/checkout/sessions/${paymentId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.STRIPE_API_KEY}`
          }
        });
        
        const stripeData = await stripeResponse.json();
        
        if (stripeData.id) {
          paymentStatus = {
            paymentId: stripeData.id,
            orderId: stripeData.metadata?.orderId || orderId,
            status: stripeData.payment_status === 'paid' ? 'paid' : 'pending',
            amount: stripeData.amount_total ? stripeData.amount_total / 100 : 0,
            description: stripeData.description,
            paidAt: stripeData.payment_status === 'paid' ? new Date().toISOString() : null,
            paymentMethod: 'stripe'
          };
        } else {
          throw new Error('Stripe API返回格式错误');
        }
      } catch (stripeError) {
        console.error('Stripe API调用错误:', stripeError);
        throw new Error('Stripe支付状态查询失败');
      }
    } else if (paymentMethod === 'paypal' && process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET && paymentId) {
      try {
        // 获取PayPal访问令牌
        const tokenResponse = await fetch(`${process.env.PAYPAL_ENVIRONMENT === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com'}/v1/oauth2/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials'
          })
        });
        
        const tokenData = await tokenResponse.json();
        
        if (!tokenData.access_token) {
          throw new Error('PayPal令牌获取失败');
        }
        
        // 查询PayPal订单状态
        const paypalResponse = await fetch(`${process.env.PAYPAL_ENVIRONMENT === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com'}/v2/checkout/orders/${paymentId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        });
        
        const paypalData = await paypalResponse.json();
        
        if (paypalData.id) {
          paymentStatus = {
            paymentId: paypalData.id,
            orderId: paypalData.metadata?.orderId || orderId,
            status: paypalData.status === 'COMPLETED' ? 'paid' : 'pending',
            amount: parseFloat(paypalData.purchase_units[0]?.amount?.value || '0'),
            description: paypalData.purchase_units[0]?.description,
            paidAt: paypalData.status === 'COMPLETED' ? new Date().toISOString() : null,
            paymentMethod: 'paypal'
          };
        } else {
          throw new Error('PayPal API返回格式错误');
        }
      } catch (paypalError) {
        console.error('PayPal API调用错误:', paypalError);
        throw new Error('PayPal支付状态查询失败');
      }
    } else {
      if (isProduction) {
        // 生产环境：没有配置支付网关或缺少支付ID，返回错误
        throw new Error('缺少必要的支付查询参数或未配置支付网关');
      } else {
        // 非生产环境：使用模拟数据
        paymentStatus = {
          paymentId: paymentId || `mock-payment-${Date.now()}`,
          orderId: orderId || `mock-order-${Date.now()}`,
          status: 'paid',
          amount: 99.99,
          description: '塔罗占卜服务',
          paidAt: new Date().toISOString(),
          paymentMethod: 'mock'
        };
      }
    }
    
    return NextResponse.json({
      success: true,
      payment: paymentStatus
    });
  } catch (error) {
    console.error('查询支付状态错误:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : '服务器内部错误' },
      { status: 500 }
    );
  }
}
