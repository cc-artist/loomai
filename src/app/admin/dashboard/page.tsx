'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 统计数据类型定义
interface StatItem {
  label: string;
  value: string;
  icon: string;
  color: string;
}

interface ActivityItem {
  id: number;
  type: string;
  user: string;
  time: string;
  status: string;
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [recentActivities, setRecentActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 检查用户是否已登录
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // 获取统计数据
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // 获取环境变量（生产环境为 production）
        const isProduction = process.env.NODE_ENV === 'production';
        
        if (isProduction) {
          // 生产环境：从API获取真实数据
          const response = await fetch('/api/admin/stats');
          const data = await response.json();
          
          if (data.success) {
            // 处理真实数据，转换为仪表盘所需格式
            const realStats: StatItem[] = [
              { label: '今日占卜次数', value: data.data.todayReadings.toString(), icon: '🔮', color: 'from-purple-500 to-purple-700' },
              { label: '本月占卜次数', value: data.data.monthlyReadings.toString(), icon: '📊', color: 'from-blue-500 to-blue-700' },
              { label: '注册用户数', value: data.data.registeredUsers.toString(), icon: '👥', color: 'from-green-500 to-green-700' },
              { label: '总收入', value: `¥ ${data.data.totalRevenue.toFixed(2)}`, icon: '💰', color: 'from-yellow-500 to-yellow-700' }
            ];
            
            setStats(realStats);
            setRecentActivities(data.data.recentActivities || []);
          } else {
            // API调用失败，生产环境不使用模拟数据，显示空状态
            setStats([]);
            setRecentActivities([]);
          }
        } else {
          // 非生产环境：使用模拟数据
          const mockStats: StatItem[] = [
            { label: '今日占卜次数', value: '128', icon: '🔮', color: 'from-purple-500 to-purple-700' },
            { label: '本月占卜次数', value: '3,456', icon: '📊', color: 'from-blue-500 to-blue-700' },
            { label: '注册用户数', value: '2,890', icon: '👥', color: 'from-green-500 to-green-700' },
            { label: '总收入', value: '¥ 12,500', icon: '💰', color: 'from-yellow-500 to-yellow-700' }
          ];
          
          const mockActivities: ActivityItem[] = [
            { id: 1, type: '占卜', user: '匿名用户', time: '2分钟前', status: '完成' },
            { id: 2, type: '支付', user: '用户12345', time: '15分钟前', status: '成功' },
            { id: 3, type: '占卜', user: '匿名用户', time: '30分钟前', status: '完成' },
            { id: 4, type: '注册', user: '新用户67890', time: '1小时前', status: '成功' },
            { id: 5, type: '占卜', user: '用户54321', time: '2小时前', status: '完成' }
          ];
          
          setStats(mockStats);
          setRecentActivities(mockActivities);
        }
      } catch (error) {
        console.error('获取统计数据错误:', error);
        // 错误处理：生产环境显示空状态，非生产环境使用模拟数据
        const isProduction = process.env.NODE_ENV === 'production';
        
        if (!isProduction) {
          // 非生产环境：使用模拟数据
          const mockStats: StatItem[] = [
            { label: '今日占卜次数', value: '128', icon: '🔮', color: 'from-purple-500 to-purple-700' },
            { label: '本月占卜次数', value: '3,456', icon: '📊', color: 'from-blue-500 to-blue-700' },
            { label: '注册用户数', value: '2,890', icon: '👥', color: 'from-green-500 to-green-700' },
            { label: '总收入', value: '¥ 12,500', icon: '💰', color: 'from-yellow-500 to-yellow-700' }
          ];
          
          const mockActivities: ActivityItem[] = [
            { id: 1, type: '占卜', user: '匿名用户', time: '2分钟前', status: '完成' },
            { id: 2, type: '支付', user: '用户12345', time: '15分钟前', status: '成功' },
            { id: 3, type: '占卜', user: '匿名用户', time: '30分钟前', status: '完成' },
            { id: 4, type: '注册', user: '新用户67890', time: '1小时前', status: '成功' },
            { id: 5, type: '占卜', user: '用户54321', time: '2小时前', status: '完成' }
          ];
          
          setStats(mockStats);
          setRecentActivities(mockActivities);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-400">正在验证登录状态...</div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  return (
    <div className="space-y-8">
      {/* 页面标题和导航 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            管理仪表板
          </h1>
          <p className="text-gray-400 mt-2">欢迎回来，管理员</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          退出登录
        </button>
      </div>

      {/* 加载状态 */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-400">正在加载数据...</div>
        </div>
      ) : (
        <>
          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.length > 0 ? (
              stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // 生产环境：显示空状态
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{['今日占卜次数', '本月占卜次数', '注册用户数', '总收入'][index]}</p>
                      <h3 className="text-3xl font-bold mt-1">0</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${['from-purple-500 to-purple-700', 'from-blue-500 to-blue-700', 'from-green-500 to-green-700', 'from-yellow-500 to-yellow-700'][index]} flex items-center justify-center text-2xl`}>
                      {['🔮', '📊', '👥', '💰'][index]}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 内容区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：系统信息 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold mb-4">系统信息</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">系统版本</p>
                    <p className="text-xl font-medium mt-1">1.0.0</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">框架</p>
                    <p className="text-xl font-medium mt-1">Next.js 16</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">AI模型</p>
                    <p className="text-xl font-medium mt-1">OpenAI GPT-4</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">支付方式</p>
                    <p className="text-xl font-medium mt-1">Stripe, PayPal</p>
                  </div>
                </div>
              </div>

              {/* 最近活动 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold mb-4">最近活动</h2>
                {recentActivities.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg">
                            {activity.type === '占卜' ? '🔮' : activity.type === '支付' ? '💳' : '👤'}
                          </div>
                          <div>
                            <p className="font-medium">{activity.type}</p>
                            <p className="text-gray-400 text-sm">{activity.user} · {activity.time}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${activity.status === '成功' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                          {activity.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  // 生产环境：显示空状态
                  <div className="text-center py-8 text-gray-400">
                    暂无活动记录
                  </div>
                )}
              </div>
            </div>

            {/* 右侧：快速操作 */}
            <div className="space-y-6">
              {/* 快速操作 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold mb-4">快速操作</h2>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <span>📊</span>
                    <span>查看详细统计</span>
                  </button>
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <span>🔧</span>
                    <span>系统设置</span>
                  </button>
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <span>⚙️</span>
                    <span>API配置</span>
                  </button>
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <span>💳</span>
                    <span>支付管理</span>
                  </button>
                </div>
              </div>

              {/* 系统状态 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold mb-4">系统状态</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">服务器状态</span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                      <span>正常运行</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">AI API连接</span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                      <span>已连接</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">支付系统</span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                      <span>已连接</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">数据库</span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                      <span>正常</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
