import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 在真实应用中，这里应该从数据库或其他数据源获取真实数据
    // 现在返回空数据，因为我们还没有实现数据库连接
    const stats = {
      todayReadings: 0,
      monthlyReadings: 0,
      registeredUsers: 0,
      totalRevenue: 0,
      recentActivities: []
    };
    
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('获取统计数据错误:', error);
    return NextResponse.json(
      { success: false, message: '服务器内部错误' },
      { status: 500 }
    );
  }
}
