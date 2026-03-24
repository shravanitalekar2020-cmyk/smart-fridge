import React from 'react';
import { Thermometer, Droplets, Package, AlertTriangle, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getFreshnessColor, getFreshnessStatus } from '../data/mockData';

const Dashboard = () => {
  const { inventory, alerts, itemsAboutToSpoil, settings } = useAppContext();

  // Calculate metrics
  const totalItems = inventory.length;
  const avgFreshness = (inventory.reduce((sum, item) => sum + item.freshness, 0) / totalItems * 100).toFixed(0);

  const metricCards = [
    {
      title: 'Temperature',
      value: `${settings.temperatureThreshold}°C`,
      icon: Thermometer,
      color: 'bg-blue-500',
      trend: 'Optimal',
    },
    {
      title: 'Humidity',
      value: `${settings.humidityThreshold}%`,
      icon: Droplets,
      color: 'bg-cyan-500',
      trend: 'Good',
    },
    {
      title: 'Total Items',
      value: totalItems,
      icon: Package,
      color: 'bg-fresh-500',
      trend: `${avgFreshness}% avg freshness`,
    },
    {
      title: 'About to Spoil',
      value: itemsAboutToSpoil,
      icon: AlertTriangle,
      color: 'bg-red-500',
      trend: itemsAboutToSpoil > 0 ? 'Action needed' : 'All good',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Monitor your fridge's freshness in real-time</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, index) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <card.icon size={24} className="text-white" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                card.trend === 'Optimal' || card.trend === 'Good' || card.trend === 'All good'
                  ? 'bg-fresh-100 text-fresh-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {card.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Camera Feed</h3>
              <span className="flex items-center gap-2 text-xs text-fresh-600">
                <span className="w-2 h-2 bg-fresh-500 rounded-full animate-pulse" />
                Live
              </span>
            </div>
          </div>
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
            {/* Placeholder for camera feed */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Package size={40} className="text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">Fridge Interior Camera</p>
                <p className="text-gray-400 text-sm mt-1">Last scan: 2 minutes ago</p>
              </div>
            </div>
            {/* Simulated scan overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">AI Detection Active</span>
              <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">1080p</span>
            </div>
          </div>
        </div>

        {/* Quick Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Quick Alerts</h3>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle size={32} className="mx-auto mb-2 opacity-50" />
                <p>No active alerts</p>
              </div>
            ) : (
              alerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl ${
                    alert.type === 'critical'
                      ? 'bg-red-50 border border-red-100'
                      : alert.type === 'warning'
                      ? 'bg-yellow-50 border border-yellow-100'
                      : 'bg-blue-50 border border-blue-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      size={18}
                      className={`mt-0.5 ${
                        alert.type === 'critical'
                          ? 'text-red-500'
                          : alert.type === 'warning'
                          ? 'text-yellow-500'
                          : 'text-blue-500'
                      }`}
                    />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        alert.type === 'critical'
                          ? 'text-red-800'
                          : alert.type === 'warning'
                          ? 'text-yellow-800'
                          : 'text-blue-800'
                      }`}>
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {alerts.length > 5 && (
            <div className="p-4 border-t border-gray-100">
              <button className="w-full text-center text-sm text-fresh-600 hover:text-fresh-700 font-medium flex items-center justify-center gap-1">
                View all alerts <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fresh Items Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Freshness Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-fresh-50 rounded-xl">
              <p className="text-2xl font-bold text-fresh-600">
                {inventory.filter(i => i.freshness >= 0.7).length}
              </p>
              <p className="text-sm text-fresh-700 mt-1">Fresh</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <p className="text-2xl font-bold text-yellow-600">
                {inventory.filter(i => i.freshness >= 0.4 && i.freshness < 0.7).length}
              </p>
              <p className="text-sm text-yellow-700 mt-1">Use Soon</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <p className="text-2xl font-bold text-red-600">
                {inventory.filter(i => i.freshness < 0.4).length}
              </p>
              <p className="text-sm text-red-700 mt-1">Spoiling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
