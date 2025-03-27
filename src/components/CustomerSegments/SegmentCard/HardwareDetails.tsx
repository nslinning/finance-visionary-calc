
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { Product } from '../../../types/calculator';

interface HardwareDetailsProps {
  t: TranslationObject;
  hardwareProduct: Product | undefined;
  hardwareAcquisitionType: string;
  leaseInterestRate?: number;
}

const HardwareDetails: React.FC<HardwareDetailsProps> = ({
  t,
  hardwareProduct,
  hardwareAcquisitionType,
  leaseInterestRate
}) => {
  if (!hardwareProduct) return null;
  
  return (
    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
      <h4 className="font-medium mb-2">{t.hardwareDetails}</h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">{t.hardware}:</span>
          <span className="font-medium">{hardwareProduct.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">{t.acquisitionType}:</span>
          <span className="font-medium">
            {t[hardwareAcquisitionType as keyof TranslationObject] as string}
          </span>
        </div>
        {hardwareAcquisitionType === 'lease' && leaseInterestRate && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">{t.interestRate}:</span>
            <span className="font-medium">{leaseInterestRate}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HardwareDetails;
