import React, { useState } from 'react';
import { Bell, Clock, Thermometer, Droplets, Save, RotateCcw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Settings = () => {
  const { settings, updateSettings } = useAppContext();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setLocalSettings({
      notificationsEnabled: true,
      scanFrequency: '6',
      temperatureThreshold: 4,
      humidityThreshold: 65,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Configure your FreshGuard AI preferences</p>
      </div>

      {/* Notifications Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-fresh-100 rounded-xl flex items-center justify-center">
              <Bell size={20} className="text-fresh-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-500">Manage alert preferences</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-500 mt-1">Receive real-time alerts about your items</p>
            </div>
            <button
              onClick={() => setLocalSettings(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }))}
              className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
                localSettings.notificationsEnabled ? 'bg-fresh-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
                  localSettings.notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Alerts</p>
              <p className="text-sm text-gray-500 mt-1">Get daily summaries via email</p>
            </div>
            <button
              className={`relative w-14 h-8 rounded-full transition-colors duration-200 bg-fresh-500`}
            >
              <span className="absolute top-1 translate-x-7 w-6 h-6 bg-white rounded-full shadow-md" />
            </button>
          </div>
        </div>
      </div>

      {/* Scan Frequency Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Scan Frequency</h3>
              <p className="text-sm text-gray-500">How often AI scans your fridge</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Scan Interval
          </label>
          <select
            value={localSettings.scanFrequency}
            onChange={(e) => setLocalSettings(prev => ({ ...prev, scanFrequency: e.target.value }))}
            className="w-full sm:w-64 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-fresh-500"
          >
            <option value="1">Every 1 hour</option>
            <option value="3">Every 3 hours</option>
            <option value="6">Every 6 hours</option>
            <option value="12">Every 12 hours</option>
            <option value="24">Once daily</option>
          </select>
          <p className="text-sm text-gray-500 mt-2">
            More frequent scans provide better monitoring but use more battery.
          </p>
        </div>
      </div>

      {/* Temperature Threshold Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Thermometer size={20} className="text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Temperature Settings</h3>
              <p className="text-sm text-gray-500">Optimal fridge temperature threshold</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Current: {localSettings.temperatureThreshold}°C</span>
            <span className="text-xs text-fresh-600 bg-fresh-50 px-2 py-1 rounded-full">Recommended: 3-5°C</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={localSettings.temperatureThreshold}
            onChange={(e) => setLocalSettings(prev => ({ ...prev, temperatureThreshold: parseFloat(e.target.value) }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fresh-500"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>0°C</span>
            <span>5°C</span>
            <span>10°C</span>
          </div>
        </div>
      </div>

      {/* Humidity Threshold Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
              <Droplets size={20} className="text-cyan-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Humidity Settings</h3>
              <p className="text-sm text-gray-500">Optimal humidity threshold</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Current: {localSettings.humidityThreshold}%</span>
            <span className="text-xs text-fresh-600 bg-fresh-50 px-2 py-1 rounded-full">Recommended: 60-70%</span>
          </div>
          <input
            type="range"
            min="30"
            max="90"
            step="5"
            value={localSettings.humidityThreshold}
            onChange={(e) => setLocalSettings(prev => ({ ...prev, humidityThreshold: parseInt(e.target.value) }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fresh-500"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>30%</span>
            <span>60%</span>
            <span>90%</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-fresh-500 text-white rounded-xl hover:bg-fresh-600 transition-colors shadow-lg shadow-fresh-500/30 font-medium"
        >
          <Save size={20} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
        >
          <RotateCcw size={20} />
          Reset to Defaults
        </button>
      </div>

      {/* Account Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Account</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <span className="text-gray-600">Plan</span>
            <span className="font-medium text-fresh-600 bg-fresh-50 px-3 py-1 rounded-full text-sm">
              Premium Pro
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50">
            <span className="text-gray-600">Email</span>
            <span className="font-medium text-gray-900">john.doe@example.com</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-600">Member Since</span>
            <span className="font-medium text-gray-900">January 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
