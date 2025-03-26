
import React from 'react';
import { Calculator } from 'lucide-react';
import { formatCurrency } from '../../utils/calculatorUtils';

interface TotalFixedCostsProps {
  totalFixedCosts: number;
  t: any;
  currency: string;
  language: string;
}

const TotalFixedCosts: React.FC<TotalFixedCostsProps> = ({
  totalFixedCosts,
  t,
  currency,
  language
}) => {
  return (
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
  );
};

export default TotalFixedCosts;
