
import React, { useState } from 'react';
import { TranslationObject } from '../../constants/calculator';
import { FixedCost } from '../../types/calculator';
import FixedCostCategory from './FixedCostCategory';
import TotalFixedCosts from './TotalFixedCosts';

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
  
  // Calculate latest value for a cost
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
        <FixedCostCategory
          key={category}
          category={category}
          costs={costs}
          totalCost={totalCostsByCategory[category]}
          t={t}
          currency={currency}
          language={language}
          updateFixedCostValue={updateFixedCostValue}
        />
      ))}
      
      <TotalFixedCosts
        totalFixedCosts={totalFixedCosts}
        t={t}
        currency={currency}
        language={language}
      />
    </div>
  );
};

export default FixedCostsTab;
