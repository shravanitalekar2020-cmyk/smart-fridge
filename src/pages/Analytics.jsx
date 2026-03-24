import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingDown, DollarSign, Leaf, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { mockWasteData, mockFreshnessTrend } from '../data/mockData';

const Analytics = () => {
  const { analytics } = useAppContext();

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const insightCards = [
    {
      title: 'Most Wasted Vegetable',
      value: analytics.mostWastedVegetable,
      icon: Leaf,
      color: 'bg-fresh-500',
      description: 'Consider buying less frequently',
    },
    {
      title: 'Most Wasted Fruit',
      value: analytics.mostWastedFruit,
      icon: TrendingDown,
      color: 'bg-orange-500',
      description: 'Store in cooler area',
    },
    {
      title: 'Money Wasted This Month',
      value: `$${analytics.estimatedMoneyWasted}`,
      icon: DollarSign,
      color: 'bg-red-500',
      description: '15% better than last month',
    },
    {
      title: 'Items Saved',
      value: analytics.totalItemsSaved,
      icon: TrendingUp,
      color: 'bg-blue-500',
      description: 'Thanks to timely alerts',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Track your fridge efficiency and waste patterns</p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {insightCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <card.icon size={22} className="text-white" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              <p className="text-xs text-gray-400 mt-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Items Wasted Per Week - Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Items Wasted Per Week</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockWasteData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="week" 
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="items" 
                  fill="#22c55e" 
                  radius={[8, 8, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Freshness Trend Over Time - Line Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Freshness Trend Over Time</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={mockFreshnessTrend}>
                <defs>
                  <linearGradient id="colorFreshness" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 1]}
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{label}</p>
                          <p className="text-sm text-fresh-600">
                            Avg Freshness: {(payload[0].value * 100).toFixed(0)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="avgFreshness" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorFreshness)"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Cost Analysis</h3>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockWasteData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="week" 
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{label}</p>
                        <p className="text-sm text-red-600">
                          Cost: ${payload[0].value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }} 
              />
              <Bar 
                dataKey="cost" 
                fill="#ef4444" 
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights Section */}
      <div className="bg-gradient-to-br from-fresh-500 to-fresh-600 rounded-2xl p-6 text-white shadow-lg shadow-fresh-500/30">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-fresh-100 text-sm">Average Freshness Score</p>
            <p className="text-3xl font-bold mt-1">{(analytics.avgFreshnessScore * 100).toFixed(0)}%</p>
            <p className="text-fresh-100 text-xs mt-2">Based on all items in inventory</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-fresh-100 text-sm">Monthly Waste Cost</p>
            <p className="text-3xl font-bold mt-1">${analytics.estimatedMoneyWasted}</p>
            <p className="text-fresh-100 text-xs mt-2">15% improvement from last month</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-fresh-100 text-sm">Items at Risk</p>
            <p className="text-3xl font-bold mt-1">
              {mockWasteData.reduce((sum, w) => sum + w.items, 0)}
            </p>
            <p className="text-fresh-100 text-xs mt-2">Total items wasted this month</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-fresh-100 text-sm">Potential Savings</p>
            <p className="text-3xl font-bold mt-1">$85</p>
            <p className="text-fresh-100 text-xs mt-2">With optimal monitoring</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
