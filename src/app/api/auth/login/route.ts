import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // 这里应该添加实际的认证逻辑，比如检查数据库
    // 为了演示，使用简单的硬编码验证
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({
        success: true,
        message: '登录成功',
        token: 'mock-jwt-token' // 实际应用中应该生成真实的JWT令牌
      });
    } else {
      return NextResponse.json(
        { success: false, message: '用户名或密码错误' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('登录错误:', error);
    return NextResponse.json(
      { success: false, message: '服务器内部错误' },
      { status: 500 }
    );
  }
}
