import React from 'react';
import { ScanLine, CheckCircle, AlertTriangle, XCircle, Brain } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Analysis = () => {
  const { aiAnalysis } = useAppContext();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'fresh':
        return <CheckCircle size={20} className="text-fresh-500" />;
      case 'use-soon':
        return <AlertTriangle size={20} className="text-yellow-500" />;
      case 'spoiling':
        return <XCircle size={20} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'fresh':
        return 'bg-fresh-50 border-fresh-200';
      case 'use-soon':
        return 'bg-yellow-50 border-yellow-200';
      case 'spoiling':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Analysis</h1>
        <p className="text-gray-500 mt-1">Latest AI-powered freshness scan results</p>
      </div>

      {/* Scan Preview with Bounding Boxes */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-fresh-400 to-fresh-600 rounded-xl flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Latest Scan</h3>
                <p className="text-sm text-gray-500">Detected {aiAnalysis.length} items</p>
              </div>
            </div>
            <span className="flex items-center gap-2 text-xs text-fresh-600 bg-fresh-50 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-fresh-500 rounded-full animate-pulse" />
              AI Processing Complete
            </span>
          </div>
        </div>
        
        {/* Simulated Image with Bounding Boxes */}
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          {/* Placeholder image background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <ScanLine size={48} className="mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500 font-medium">Fridge Interior Scan</p>
              <p className="text-gray-400 text-sm mt-1">AI Detection Visualization</p>
            </div>
          </div>

          {/* Simulated Bounding Boxes */}
          <div className="absolute inset-0 p-8">
            <div className="grid grid-cols-4 gap-4 h-full">
              {aiAnalysis.slice(0, 8).map((item, index) => (
                <div
                  key={item.id}
                  className={`relative border-2 rounded-lg ${
                    item.status === 'fresh'
                      ? 'border-fresh-500'
                      : item.status === 'use-soon'
                      ? 'border-yellow-500'
                      : 'border-red-500'
                  }`}
                  style={{
                    gridRow: index < 4 ? '1 / 2' : '2 / 3',
                  }}
                >
                  {/* Label */}
                  <div className={`absolute -top-6 left-0 px-2 py-0.5 text-xs font-medium rounded ${
                    item.status === 'fresh'
                      ? 'bg-fresh-500 text-white'
                      : item.status === 'use-soon'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {item.name} {(item.freshnessScore * 100).toFixed(0)}%
                  </div>
                  
                  {/* Corner markers */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-current opacity-75" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-current opacity-75" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-current opacity-75" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-current opacity-75" />
                </div>
              ))}
            </div>
          </div>

          {/* Scan overlay info */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="flex gap-2">
              <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                Confidence: {(aiAnalysis.reduce((sum, i) => sum + i.confidence, 0) / aiAnalysis.length * 100).toFixed(0)}%
              </span>
              <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                Model: FreshNet v2.1
              </span>
            </div>
            <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
              {aiAnalysis.length} items detected
            </span>
          </div>
        </div>
      </div>

      {/* AI Analysis Results */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Detailed Analysis Results</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {aiAnalysis.map((item) => (
            <div
              key={item.id}
              className={`p-6 ${getStatusBg(item.status)} transition-colors hover:bg-opacity-75`}
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {/* Status Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    item.status === 'fresh'
                      ? 'bg-fresh-100'
                      : item.status === 'use-soon'
                      ? 'bg-yellow-100'
                      : 'bg-red-100'
                  }`}>
                    {getStatusIcon(item.status)}
                  </div>

                  {/* Item Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">
                        Freshness Score: {(item.freshnessScore * 100).toFixed(0)}%
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-sm text-gray-500">
                        Confidence: {(item.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Freshness Bar */}
                <div className="flex items-center gap-4">
                  <div className="w-32 sm:w-48">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Freshness</span>
                      <span>{(item.freshnessScore * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.freshnessScore >= 0.7
                            ? 'bg-fresh-500'
                            : item.freshnessScore >= 0.4
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${item.freshnessScore * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${
                    item.status === 'fresh'
                      ? 'bg-fresh-500 text-white'
                      : item.status === 'use-soon'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {item.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Detected Issues */}
              {item.detectedIssues.length > 0 && (
                <div className="mt-4 ml-16">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Detected Issues
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.detectedIssues.map((issue, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/50 text-gray-700 text-xs rounded-md border border-gray-200"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scan Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-fresh-500 to-fresh-600 rounded-2xl p-6 text-white shadow-lg shadow-fresh-500/30">
          <div className="flex items-center gap-3">
            <CheckCircle size={24} />
            <span className="font-medium">Fresh Items</span>
          </div>
          <p className="text-3xl font-bold mt-2">
            {aiAnalysis.filter(i => i.status === 'fresh').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg shadow-yellow-500/30">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} />
            <span className="font-medium">Use Soon</span>
          </div>
          <p className="text-3xl font-bold mt-2">
            {aiAnalysis.filter(i => i.status === 'use-soon').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg shadow-red-500/30">
          <div className="flex items-center gap-3">
            <XCircle size={24} />
            <span className="font-medium">Spoiling</span>
          </div>
          <p className="text-3xl font-bold mt-2">
            {aiAnalysis.filter(i => i.status === 'spoiling').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
