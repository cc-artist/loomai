import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, description, orderId, paymentMethod = 'stripe' } = await request.json();
    
    // 验证请求参数
    if (!amount || !description || !orderId) {
      return NextResponse.json(
        { success: false, message: '缺少必要的支付参数' },
        { status: 400 }
      );
    }
    
    let payment;
    const isProduction = process.env.NODE_ENV === 'production';
    
    // 根据支付方式调用不同的支付网关
    if (paymentMethod === 'stripe' && process.env.STRIPE_API_KEY) {
      try {
        // 调用Stripe API创建支付
        const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${process.env.STRIPE_API_KEY}`
          },
          body: new URLSearchParams({
            mode: 'payment',
            amount: (amount * 100).toString(), // Stripe使用分作为单位
            currency: 'cny',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
            description,
            metadata: JSON.stringify({ orderId })
          })
        });
        
        const stripeData = await stripeResponse.json();
        
        if (stripeData.id) {
          payment = {
            paymentId: stripeData.id,
            orderId,
            amount,
            description,
            status: 'created',
            createdAt: new Date().toISOString(),
            paymentUrl: stripeData.url,
            paymentMethod: 'stripe'
          };
        } else {
          throw new Error('Stripe API返回格式错误');
        }
      } catch (stripeError) {
        console.error('Stripe API调用错误:', stripeError);
        throw new Error('Stripe支付创建失败');
      }
    } else if (paymentMethod === 'paypal' && process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET) {
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
        
        // 创建PayPal订单
        const paypalResponse = await fetch(`${process.env.PAYPAL_ENVIRONMENT === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com'}/v2/checkout/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenData.access_token}`
          },
          body: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'CNY',
                  value: amount.toString()
                },
                description
              }
            ],
            application_context: {
              return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?order_id={order_id}`,
              cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`
            },
            metadata: { orderId }
          })
        });
        
        const paypalData = await paypalResponse.json();
        
        if (paypalData.id) {
          // 获取支付链接
          const approvalLink = paypalData.links.find((link: any) => link.rel === 'approve');
          
          payment = {
            paymentId: paypalData.id,
            orderId,
            amount,
            description,
            status: 'created',
            createdAt: new Date().toISOString(),
            paymentUrl: approvalLink?.href,
            paymentMethod: 'paypal'
          };
        } else {
          throw new Error('PayPal API返回格式错误');
        }
      } catch (paypalError) {
        console.error('PayPal API调用错误:', paypalError);
        throw new Error('PayPal支付创建失败');
      }
    } else {
      if (isProduction) {
        // 生产环境：没有配置支付网关，返回错误
        throw new Error('未配置支付网关API密钥');
      } else {
        // 非生产环境：使用模拟数据
        payment = {
          paymentId: `mock-payment-${Date.now()}`,
          orderId,
          amount,
          description,
          status: 'created',
          createdAt: new Date().toISOString(),
          paymentUrl: 'https://mock-payment-gateway.com/pay/mock-id',
          paymentMethod: 'mock'
        };
      }
    }
    
    return NextResponse.json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('创建支付错误:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : '服务器内部错误' },
      { status: 500 }
    );
  }
}
