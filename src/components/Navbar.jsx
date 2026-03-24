import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { alerts, dismissAlert } = useAppContext();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const criticalAlerts = alerts.filter(a => a.type === 'critical');
  const warningAlerts = alerts.filter(a => a.type === 'warning');
  const infoAlerts = alerts.filter(a => a.type === 'info');

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle size={18} className="text-red-500" />;
      case 'warning':
        return <AlertCircle size={18} className="text-yellow-500" />;
      case 'info':
        return <Info size={18} className="text-blue-500" />;
      default:
        return <AlertCircle size={18} />;
    }
  };

  const getAlertBgColor = (type) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'info':
        return 'bg-blue-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - empty for spacing (hamburger is in Sidebar) */}
        <div className="lg:hidden w-10" />

        {/* Center - Page title could go here */}
        <div className="hidden lg:block">
          <h2 className="text-lg font-semibold text-gray-800">
            Smart Fridge Monitoring Dashboard
          </h2>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell size={22} />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {alerts.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <X size={16} className="text-gray-500" />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {alerts.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <Bell size={32} className="mx-auto mb-2 opacity-50" />
                      <p>No new notifications</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-4 ${getAlertBgColor(alert.type)} hover:bg-opacity-75 transition-colors`}
                        >
                          <div className="flex items-start gap-3">
                            {getAlertIcon(alert.type)}
                            <div className="flex-1">
                              <p className="text-sm text-gray-800">{alert.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(alert.timestamp).toLocaleString()}
                              </p>
                            </div>
                            <button
                              onClick={() => dismissAlert(alert.id)}
                              className="p-1 hover:bg-black/10 rounded transition-colors"
                            >
                              <X size={14} className="text-gray-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {alerts.length > 0 && (
                  <div className="p-3 border-t border-gray-100 bg-gray-50">
                    <button className="w-full text-center text-sm text-fresh-600 hover:text-fresh-700 font-medium">
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Premium User</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg shadow-fresh-500/30">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
