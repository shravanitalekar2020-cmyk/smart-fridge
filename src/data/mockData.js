// Mock data for FreshGuard AI application

export const mockInventory = [
  { id: 1, name: 'Spinach', quantity: '1 bunch', freshness: 0.45, category: 'vegetable', addedDate: '2026-03-20' },
  { id: 2, name: 'Tomatoes', quantity: '6 pieces', freshness: 0.82, category: 'vegetable', addedDate: '2026-03-22' },
  { id: 3, name: 'Grapes', quantity: '500g', freshness: 0.20, category: 'fruit', addedDate: '2026-03-18' },
  { id: 4, name: 'Carrots', quantity: '8 pieces', freshness: 0.91, category: 'vegetable', addedDate: '2026-03-23' },
  { id: 5, name: 'Bell Peppers', quantity: '4 pieces', freshness: 0.75, category: 'vegetable', addedDate: '2026-03-21' },
  { id: 6, name: 'Apples', quantity: '10 pieces', freshness: 0.88, category: 'fruit', addedDate: '2026-03-22' },
  { id: 7, name: 'Lettuce', quantity: '1 head', freshness: 0.35, category: 'vegetable', addedDate: '2026-03-19' },
  { id: 8, name: 'Strawberries', quantity: '250g', freshness: 0.65, category: 'fruit', addedDate: '2026-03-21' },
  { id: 9, name: 'Broccoli', quantity: '2 heads', freshness: 0.78, category: 'vegetable', addedDate: '2026-03-22' },
  { id: 10, name: 'Oranges', quantity: '8 pieces', freshness: 0.92, category: 'fruit', addedDate: '2026-03-23' },
  { id: 11, name: 'Cucumbers', quantity: '4 pieces', freshness: 0.85, category: 'vegetable', addedDate: '2026-03-23' },
  { id: 12, name: 'Bananas', quantity: '6 pieces', freshness: 0.55, category: 'fruit', addedDate: '2026-03-20' },
];

export const mockAIAnalysis = [
  { id: 1, name: 'Spinach', freshnessScore: 0.45, status: 'use-soon', confidence: 0.94, detectedIssues: ['Yellowing leaves', 'Slight wilting'] },
  { id: 2, name: 'Tomatoes', freshnessScore: 0.82, status: 'fresh', confidence: 0.97, detectedIssues: [] },
  { id: 3, name: 'Grapes', freshnessScore: 0.20, status: 'spoiling', confidence: 0.91, detectedIssues: ['Mold detected', 'Soft texture'] },
  { id: 4, name: 'Carrots', freshnessScore: 0.91, status: 'fresh', confidence: 0.98, detectedIssues: [] },
  { id: 5, name: 'Bell Peppers', freshnessScore: 0.75, status: 'fresh', confidence: 0.95, detectedIssues: ['Minor soft spots'] },
  { id: 6, name: 'Lettuce', freshnessScore: 0.35, status: 'use-soon', confidence: 0.93, detectedIssues: ['Brown edges', 'Wilting'] },
  { id: 7, name: 'Strawberries', freshnessScore: 0.65, status: 'fresh', confidence: 0.89, detectedIssues: ['Some soft berries'] },
  { id: 8, name: 'Bananas', freshnessScore: 0.55, status: 'use-soon', confidence: 0.96, detectedIssues: ['Brown spots increasing'] },
];

export const mockAlerts = [
  { id: 1, type: 'critical', message: 'Grapes are spoiling - discard immediately', itemId: 3, timestamp: '2026-03-24T08:30:00' },
  { id: 2, type: 'warning', message: 'Use spinach today - freshness at 45%', itemId: 1, timestamp: '2026-03-24T07:15:00' },
  { id: 3, type: 'warning', message: 'Lettuce needs to be consumed soon', itemId: 7, timestamp: '2026-03-24T06:45:00' },
  { id: 4, type: 'info', message: 'Bananas ripening - consider using in smoothies', itemId: 12, timestamp: '2026-03-23T20:00:00' },
];

export const mockWasteData = [
  { week: 'Week 1', items: 3, cost: 12 },
  { week: 'Week 2', items: 5, cost: 18 },
  { week: 'Week 3', items: 2, cost: 8 },
  { week: 'Week 4', items: 4, cost: 15 },
];

export const mockFreshnessTrend = [
  { date: 'Mar 18', avgFreshness: 0.78 },
  { date: 'Mar 19', avgFreshness: 0.75 },
  { date: 'Mar 20', avgFreshness: 0.72 },
  { date: 'Mar 21', avgFreshness: 0.70 },
  { date: 'Mar 22', avgFreshness: 0.68 },
  { date: 'Mar 23', avgFreshness: 0.71 },
  { date: 'Mar 24', avgFreshness: 0.69 },
];

export const mockAnalytics = {
  mostWastedVegetable: 'Spinach',
  mostWastedFruit: 'Bananas',
  estimatedMoneyWasted: 53,
  totalItemsSaved: 24,
  avgFreshnessScore: 0.69,
};

export const defaultSettings = {
  notificationsEnabled: true,
  scanFrequency: '6',
  temperatureThreshold: 4,
  humidityThreshold: 65,
};

// Helper function to get freshness status
export const getFreshnessStatus = (score) => {
  if (score >= 0.7) return 'fresh';
  if (score >= 0.4) return 'use-soon';
  return 'spoiling';
};

// Helper function to get freshness badge color
export const getFreshnessColor = (score) => {
  if (score >= 0.7) return 'bg-fresh-500';
  if (score >= 0.4) return 'bg-yellow-500';
  return 'bg-red-500';
};
