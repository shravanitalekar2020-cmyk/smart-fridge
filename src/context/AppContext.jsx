import React, { createContext, useContext, useState } from 'react';
import { 
  mockInventory, 
  mockAlerts, 
  defaultSettings,
  mockAnalytics,
  mockAIAnalysis 
} from '../data/mockData';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [inventory, setInventory] = useState(mockInventory);
  const [alerts, setAlerts] = useState(mockAlerts);
  const [settings, setSettings] = useState(defaultSettings);
  const [aiAnalysis, setAiAnalysis] = useState(mockAIAnalysis);

  // Add a new item to inventory
  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      addedDate: new Date().toISOString().split('T')[0],
    };
    setInventory(prev => [...prev, newItem]);
  };

  // Remove an item from inventory
  const removeItem = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  // Dismiss an alert
  const dismissAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  // Update settings
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Get items by freshness status
  const getItemsByStatus = (status) => {
    return inventory.filter(item => {
      if (status === 'fresh') return item.freshness >= 0.7;
      if (status === 'use-soon') return item.freshness >= 0.4 && item.freshness < 0.7;
      if (status === 'spoiling') return item.freshness < 0.4;
      return true;
    });
  };

  // Get critical alerts count
  const criticalAlertsCount = alerts.filter(a => a.type === 'critical').length;

  // Get items about to spoil
  const itemsAboutToSpoil = inventory.filter(item => item.freshness < 0.4).length;

  const value = {
    inventory,
    alerts,
    settings,
    aiAnalysis,
    addItem,
    removeItem,
    dismissAlert,
    updateSettings,
    getItemsByStatus,
    criticalAlertsCount,
    itemsAboutToSpoil,
    analytics: mockAnalytics,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
