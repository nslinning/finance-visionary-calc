
import React from 'react';
import { FixedCost } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import FixedCostItem from './FixedCostItem';

interface FixedCostCategoryProps {
  category: string;
  costs: FixedCost[];
  totalCost: number;
  t: any;
  currency: string;
  language: string;
  updateFixedCostValue: (costId: number, periodId: number, amount: number) => void;
}

const FixedCostCategory: React.FC<FixedCostCategoryProps> = ({
  category,
  costs,
  totalCost,
  t,
  currency,
  language,
  updateFixedCostValue
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3 border-b pb-2 dark:border-gray-700 flex justify-between">
        <span>{t.fixedCostCategories[category as keyof typeof t.fixedCostCategories]}</span>
        <span className="text-gray-500 dark:text-gray-400">
          {formatCurrency(totalCost, currency, language)}
        </span>
      </h3>
      
      <div className="space-y-4">
        {costs.map(cost => (
          <FixedCostItem
            key={cost.id}
            cost={cost}
            t={t}
            currency={currency}
            language={language}
            updateFixedCostValue={updateFixedCostValue}
          />
        ))}
      </div>
    </div>
  );
};

export default FixedCostCategory;
