
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { formatCurrency } from '../../../utils/calculator';

interface AdditionalCostsDisplayProps {
  t: TranslationObject;
  logistics: number;
  logisticsCostPercentage: number;
  indirect: number;
  indirectCostPercentage: number;
  fixed: number;
  total: number;
  currency: string;
  language: string;
}

const AdditionalCostsDisplay: React.FC<AdditionalCostsDisplayProps> = ({
  t,
  logistics,
  logisticsCostPercentage,
  indirect,
  indirectCostPercentage,
  fixed,
  total,
  currency,
  language
}) => {
  return (
    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
      <h4 className="font-medium mb-2">{t.additionalCostsTab}</h4>
      <div className="space-y-2">
        {logisticsCostPercentage > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t.logisticsCosts} ({logisticsCostPercentage}%):</span>
            <span className="font-medium">
              {formatCurrency(logistics, currency, language)}
            </span>
          </div>
        )}
        
        {indirectCostPercentage > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t.indirectCosts} ({indirectCostPercentage}%):</span>
            <span className="font-medium">
              {formatCurrency(indirect, currency, language)}
            </span>
          </div>
        )}
        
        {fixed > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t.additionalFixedCosts}:</span>
            <span className="font-medium">
              {formatCurrency(fixed, currency, language)}
            </span>
          </div>
        )}
        
        <div className="flex justify-between pt-1 border-t border-gray-100 dark:border-gray-700">
          <span className="text-gray-600 dark:text-gray-400 font-medium">{t.total}:</span>
          <span className="font-medium">
            {formatCurrency(total, currency, language)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdditionalCostsDisplay;
