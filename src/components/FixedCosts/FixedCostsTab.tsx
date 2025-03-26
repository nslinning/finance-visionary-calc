
import React, { useState } from 'react';
import { TranslationObject } from '../../constants/calculator';
import { FixedCost } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import { Calculator, TrendingDown, TrendingUp } from 'lucide-react';

interface FixedCostsTabProps {
  t: TranslationObject;
  fixedCosts: FixedCost[];
  setFixedCosts: React.Dispatch<React.SetStateAction<FixedCost[]>>;
  currency: string;
  language: string;
}

const FixedCostsTab: React.FC<FixedCostsTabProps> = ({ 
  t, 
  fixedCosts, 
  setFixedCosts,
  currency,
  language
}) => {
  const [editIndex, setEditIndex] = useState<string | null>(null);

  const updateFixedCostValue = (costId: number, periodId: number, amount: number) => {
    setFixedCosts(prevCosts => {
      return prevCosts.map(cost => {
        if (cost.id === costId) {
          const updatedValues = cost.values.map(val => {
            if (val.periodId === periodId) {
              return { ...val, amount };
            }
            return val;
          });
          
          return {
            ...cost,
            values: updatedValues
          };
        }
        return cost;
      });
    });
  };
  
  // Group fixed costs by category for better visualization
  const costsByCategory: Record<string, FixedCost[]> = {};
  fixedCosts.forEach(cost => {
    if (!costsByCategory[cost.category]) {
      costsByCategory[cost.category] = [];
    }
    costsByCategory[cost.category].push(cost);
  });
  
  // Calculate growth rates for visual indicators
  const getGrowthRate = (cost: FixedCost): number => {
    if (cost.values.length < 2) return 0;
    
    // Get the last two periods
    const sortedValues = [...cost.values].sort((a, b) => a.periodId - b.periodId);
    const lastPeriod = sortedValues[sortedValues.length - 1];
    const prevPeriod = sortedValues[sortedValues.length - 2];
    
    if (prevPeriod.amount === 0) return 0;
    return (lastPeriod.amount - prevPeriod.amount) / prevPeriod.amount;
  };
  
  const getLatestValue = (cost: FixedCost): number => {
    if (cost.values.length === 0) return 0;
    
    // Get the latest period
    const sortedValues = [...cost.values].sort((a, b) => b.periodId - a.periodId);
    return sortedValues[0].amount;
  };
  
  // Calculate total fixed costs per category
  const totalCostsByCategory: Record<string, number> = {};
  Object.entries(costsByCategory).forEach(([category, costs]) => {
    totalCostsByCategory[category] = costs.reduce((sum, cost) => {
      return sum + getLatestValue(cost);
    }, 0);
  });
  
  // Calculate total fixed costs across all categories
  const totalFixedCosts = Object.values(totalCostsByCategory).reduce((sum, value) => sum + value, 0);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">{t.fixedCosts}</h2>
      
      {Object.entries(costsByCategory).map(([category, costs]) => (
        <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3 border-b pb-2 dark:border-gray-700 flex justify-between">
            <span>{t.fixedCostCategories[category]}</span>
            <span className="text-gray-500 dark:text-gray-400">
              {formatCurrency(totalCostsByCategory[category], currency, language)}
            </span>
          </h3>
          
          <div className="space-y-4">
            {costs.map(cost => {
              const growthRate = getGrowthRate(cost);
              const latestValue = getLatestValue(cost);
              
              return (
                <div key={cost.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{cost.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t.fixedCostTypes[cost.category]}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="font-semibold">
                        {formatCurrency(latestValue, currency, language)}
                      </div>
                      
                      <div className={`flex items-center text-sm ${
                        growthRate > 0 ? 'text-red-500' : growthRate < 0 ? 'text-green-500' : 'text-gray-500'
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
                          <th className="text-left py-2">{t.period}</th>
                          <th className="text-right py-2">{t.amount}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cost.values.sort((a, b) => b.periodId - a.periodId).map(value => (
                          <tr key={value.periodId} className="border-b dark:border-gray-700 last:border-b-0">
                            <td className="py-2">P{value.periodId}</td>
                            <td className="text-right py-2">
                              {editIndex === `${cost.id}-${value.periodId}` ? (
                                <input 
                                  type="number"
                                  className="w-20 p-1 border rounded dark:bg-gray-800"
                                  value={value.amount}
                                  onChange={(e) => updateFixedCostValue(
                                    cost.id, 
                                    value.periodId, 
                                    Number(e.target.value)
                                  )}
                                  onBlur={() => setEditIndex(null)}
                                  autoFocus
                                />
                              ) : (
                                <span 
                                  className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 rounded"
                                  onClick={() => setEditIndex(`${cost.id}-${value.periodId}`)}
                                >
                                  {formatCurrency(value.amount, currency, language)}
                                </span>
                              )}
                            </td>
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
      
      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calculator className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-blue-800 dark:text-blue-300">{t.totalFixedCosts}</h3>
          </div>
          <span className="font-bold text-xl text-blue-800 dark:text-blue-300">
            {formatCurrency(totalFixedCosts, currency, language)}
          </span>
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
          {t.totalFixedCostsSummary}
        </p>
      </div>
    </div>
  );
};

export default FixedCostsTab;
