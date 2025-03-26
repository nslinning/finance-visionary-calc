
import React, { useState } from 'react';
import { TranslationObject } from '../../constants/calculator';
import { IncomeStream, SubscriptionValue, SalesValue } from '../../types/calculator';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/calculatorUtils';

interface IncomeStreamsTabProps {
  t: TranslationObject;
  incomeStreams: IncomeStream[];
  setIncomeStreams: React.Dispatch<React.SetStateAction<IncomeStream[]>>;
  currency: string;
  language: string;
}

const IncomeStreamsTab: React.FC<IncomeStreamsTabProps> = ({ 
  t, 
  incomeStreams, 
  setIncomeStreams,
  currency,
  language
}) => {
  const [editIndex, setEditIndex] = useState<string | null>(null);
  
  const updateIncomeStreamValue = (streamId: number, periodId: number, field: string, value: number) => {
    setIncomeStreams(prevStreams => {
      return prevStreams.map(stream => {
        if (stream.id === streamId) {
          const updatedValues = stream.values.map(val => {
            if (val.periodId === periodId) {
              if (stream.type === 'subscription' && 'subscribers' in val) {
                return { 
                  ...val, 
                  [field]: value 
                } as SubscriptionValue;
              } else if (stream.type === 'sales' && 'revenue' in val) {
                return { 
                  ...val, 
                  [field]: value 
                } as SalesValue;
              }
            }
            return val;
          });
          
          return {
            ...stream,
            values: updatedValues
          };
        }
        return stream;
      });
    });
  };
  
  // Group income streams by category for better visualization
  const streamsByCategory: Record<string, IncomeStream[]> = {};
  incomeStreams.forEach(stream => {
    if (!streamsByCategory[stream.category]) {
      streamsByCategory[stream.category] = [];
    }
    streamsByCategory[stream.category].push(stream);
  });
  
  // Calculate growth rates for visual indicators
  const getGrowthRate = (stream: IncomeStream): number => {
    if (stream.values.length < 2) return 0;
    
    // Get the last two periods
    const sortedValues = [...stream.values].sort((a, b) => a.periodId - b.periodId);
    const lastPeriod = sortedValues[sortedValues.length - 1];
    const prevPeriod = sortedValues[sortedValues.length - 2];
    
    if (stream.type === 'subscription') {
      // For subscription streams
      const lastValue = lastPeriod as SubscriptionValue;
      const prevValue = prevPeriod as SubscriptionValue;
      
      const lastRevenue = lastValue.subscribers * lastValue.averageRevenue;
      const prevRevenue = prevValue.subscribers * prevValue.averageRevenue;
      
      if (prevRevenue === 0) return 0;
      return (lastRevenue - prevRevenue) / prevRevenue;
    } else {
      // For sales streams
      const lastValue = lastPeriod as SalesValue;
      const prevValue = prevPeriod as SalesValue;
      
      if (prevValue.revenue === 0) return 0;
      return (lastValue.revenue - prevValue.revenue) / prevValue.revenue;
    }
  };
  
  const getLatestValue = (stream: IncomeStream): number => {
    if (stream.values.length === 0) return 0;
    
    // Get the latest period
    const sortedValues = [...stream.values].sort((a, b) => b.periodId - a.periodId);
    const lastPeriod = sortedValues[0];
    
    if (stream.type === 'subscription') {
      // For subscription streams
      const value = lastPeriod as SubscriptionValue;
      return value.subscribers * value.averageRevenue;
    } else {
      // For sales streams
      const value = lastPeriod as SalesValue;
      return value.revenue;
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">{t.incomeStreams}</h2>
      
      {Object.entries(streamsByCategory).map(([category, streams]) => (
        <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3 border-b pb-2 dark:border-gray-700">
            {t.productCategories[category as keyof typeof t.productCategories]}
          </h3>
          
          <div className="space-y-4">
            {streams.map(stream => {
              const growthRate = getGrowthRate(stream);
              const latestValue = getLatestValue(stream);
              
              return (
                <div key={stream.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{stream.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {stream.type === 'subscription' ? t.revenueTypes.subscription : t.revenueTypes.product}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="font-semibold">
                        {formatCurrency(latestValue, currency, language)}
                      </div>
                      
                      <div className={`flex items-center text-sm ${
                        growthRate > 0 ? 'text-green-500' : growthRate < 0 ? 'text-red-500' : 'text-gray-500'
                      }`}>
                        {growthRate > 0 ? (
                          <>
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +{(growthRate * 100).toFixed(1)}%
                          </>
                        ) : growthRate < 0 ? (
                          <>
                            <TrendingDown className="w-4 h-4 mr-1" />
                            {(growthRate * 100).toFixed(1)}%
                          </>
                        ) : (
                          <span>0%</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b dark:border-gray-700">
                          <th className="text-left py-2">Period</th>
                          {stream.type === 'subscription' ? (
                            <>
                              <th className="text-right py-2">{t.subscribers}</th>
                              <th className="text-right py-2">{t.arpu}</th>
                              <th className="text-right py-2">{t.churn}</th>
                            </>
                          ) : (
                            <th className="text-right py-2">{t.revenue}</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {stream.values.sort((a, b) => b.periodId - a.periodId).map(value => (
                          <tr key={value.periodId} className="border-b dark:border-gray-700 last:border-b-0">
                            <td className="py-2">P{value.periodId}</td>
                            
                            {stream.type === 'subscription' && 'subscribers' in value ? (
                              <>
                                <td className="text-right py-2">
                                  {editIndex === `${stream.id}-${value.periodId}-subscribers` ? (
                                    <input 
                                      type="number"
                                      className="w-20 p-1 border rounded dark:bg-gray-800"
                                      value={(value as SubscriptionValue).subscribers}
                                      onChange={(e) => updateIncomeStreamValue(
                                        stream.id, 
                                        value.periodId, 
                                        'subscribers', 
                                        Number(e.target.value)
                                      )}
                                      onBlur={() => setEditIndex(null)}
                                      autoFocus
                                    />
                                  ) : (
                                    <span
                                      className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 rounded"
                                      onClick={() => setEditIndex(`${stream.id}-${value.periodId}-subscribers`)}
                                    >
                                      {(value as SubscriptionValue).subscribers}
                                    </span>
                                  )}
                                </td>
                                <td className="text-right py-2">
                                  {editIndex === `${stream.id}-${value.periodId}-arpu` ? (
                                    <input 
                                      type="number"
                                      className="w-20 p-1 border rounded dark:bg-gray-800"
                                      value={(value as SubscriptionValue).averageRevenue}
                                      onChange={(e) => updateIncomeStreamValue(
                                        stream.id, 
                                        value.periodId, 
                                        'averageRevenue', 
                                        Number(e.target.value)
                                      )}
                                      onBlur={() => setEditIndex(null)}
                                      autoFocus
                                    />
                                  ) : (
                                    <span
                                      className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 rounded"
                                      onClick={() => setEditIndex(`${stream.id}-${value.periodId}-arpu`)}
                                    >
                                      {formatCurrency((value as SubscriptionValue).averageRevenue, currency, language)}
                                    </span>
                                  )}
                                </td>
                                <td className="text-right py-2">
                                  {editIndex === `${stream.id}-${value.periodId}-churn` ? (
                                    <input 
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      max="1"
                                      className="w-20 p-1 border rounded dark:bg-gray-800"
                                      value={(value as SubscriptionValue).churnRate}
                                      onChange={(e) => updateIncomeStreamValue(
                                        stream.id, 
                                        value.periodId, 
                                        'churnRate', 
                                        Number(e.target.value)
                                      )}
                                      onBlur={() => setEditIndex(null)}
                                      autoFocus
                                    />
                                  ) : (
                                    <span
                                      className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 rounded"
                                      onClick={() => setEditIndex(`${stream.id}-${value.periodId}-churn`)}
                                    >
                                      {((value as SubscriptionValue).churnRate * 100).toFixed(1)}%
                                    </span>
                                  )}
                                </td>
                              </>
                            ) : 'revenue' in value ? (
                              <td className="text-right py-2">
                                {editIndex === `${stream.id}-${value.periodId}-revenue` ? (
                                  <input 
                                    type="number"
                                    className="w-20 p-1 border rounded dark:bg-gray-800"
                                    value={(value as SalesValue).revenue}
                                    onChange={(e) => updateIncomeStreamValue(
                                      stream.id, 
                                      value.periodId, 
                                      'revenue', 
                                      Number(e.target.value)
                                    )}
                                    onBlur={() => setEditIndex(null)}
                                    autoFocus
                                  />
                                ) : (
                                  <span
                                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 rounded"
                                    onClick={() => setEditIndex(`${stream.id}-${value.periodId}-revenue`)}
                                  >
                                    {formatCurrency((value as SalesValue).revenue, currency, language)}
                                  </span>
                                )}
                              </td>
                            ) : null}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncomeStreamsTab;
