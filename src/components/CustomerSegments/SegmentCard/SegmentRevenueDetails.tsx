
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { formatCurrency } from '../../../utils/calculator';

interface SegmentRevenueDetailsProps {
  t: TranslationObject;
  employeeCount: number;
  monthlyPerUser: number;
  monthly: number;
  monthlyWithCosts: number;
  annual: number;
  total: number;
  contractLengthYears: number;
  subscriptionType: string;
  showCostBreakdown: boolean;
  currency: string;
  language: string;
}

const SegmentRevenueDetails: React.FC<SegmentRevenueDetailsProps> = ({
  t,
  employeeCount,
  monthlyPerUser,
  monthly,
  monthlyWithCosts,
  annual,
  total,
  contractLengthYears,
  subscriptionType,
  showCostBreakdown,
  currency,
  language
}) => {
  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-400">{t.employeeCount}:</span>
        <span className="font-medium">{employeeCount}</span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-400">{t.monthlyPerUserFee}:</span>
        <span className="font-medium">
          {formatCurrency(monthlyPerUser, currency, language)}
        </span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-400">{t.monthlyFee}:</span>
        <span className="font-medium">
          {formatCurrency(monthly, currency, language)}
        </span>
      </div>
      
      {showCostBreakdown && (
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">{t.monthlyFee} ({t.costBreakdown}):</span>
          <span className="font-medium">
            {formatCurrency(monthlyWithCosts, currency, language)}
          </span>
        </div>
      )}
      
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-400">{t.annualRecurringRevenue}:</span>
        <span className="font-medium">
          {formatCurrency(annual, currency, language)}
        </span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-400">{t.totalContractValue}:</span>
        <span className="font-medium">
          {formatCurrency(total, currency, language)}
        </span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-400">{t.contractLength}:</span>
        <span className="font-medium">{contractLengthYears} {t.years}</span>
      </div>
      
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-gray-400">{t.subscriptionType}:</span>
        <span className="font-medium">
          {subscriptionType === 'mrr-no-commitment' ? t.mrrNoCommitment : t.arrWithCommitment}
        </span>
      </div>
    </div>
  );
};

export default SegmentRevenueDetails;
