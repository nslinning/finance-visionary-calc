
import React, { useState } from 'react';
import { FixedCost } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculator';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface FixedCostItemProps {
  cost: FixedCost;
  t: any;
  currency: string;
  language: string;
  updateFixedCostValue: (costId: number, periodId: number, amount: number) => void;
}

const FixedCostItem: React.FC<FixedCostItemProps> = ({
  cost,
  t,
  currency,
  language,
  updateFixedCostValue
}) => {
  const [editIndex, setEditIndex] = useState<string | null>(null);
  
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
  
  const growthRate = getGrowthRate(cost);
  const latestValue = getLatestValue(cost);
  
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">{cost.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.fixedCostTypes[cost.category as keyof typeof t.fixedCostTypes]}
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
};

export default FixedCostItem;
