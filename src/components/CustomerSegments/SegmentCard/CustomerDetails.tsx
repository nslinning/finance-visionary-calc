
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';

interface CustomerDetailsProps {
  t: TranslationObject;
  customerName?: string;
  customerEmail?: string;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  t,
  customerName,
  customerEmail
}) => {
  if (!customerName) return null;
  
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <h4 className="font-medium mb-2">{t.customerDetails}</h4>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">{t.name}:</span>
          <span>{customerName}</span>
        </div>
        {customerEmail && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t.email}:</span>
            <span>{customerEmail}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
