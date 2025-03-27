
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { CustomerSegment } from '../../../types/calculator';
import { Input } from '@/components/ui/input';

interface CostsTabProps {
  t: TranslationObject;
  formData: CustomerSegment;
  handleChange: (field: string, value: any) => void;
}

const CostsTab: React.FC<CostsTabProps> = ({ t, formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">{t.logisticsCosts}</h4>
        <div className="flex items-center mt-1">
          <Input
            id="logisticsCostPercentage"
            type="number"
            value={formData.logisticsCostPercentage || 0}
            onChange={(e) => handleChange('logisticsCostPercentage', parseFloat(e.target.value) || 0)}
            min={0}
            max={100}
            step={0.5}
            className="mr-2"
          />
          <span>%</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{t.logisticsCostDescription}</p>
      </div>
      
      <div>
        <h4 className="font-medium mb-3">{t.indirectCosts}</h4>
        <div className="flex items-center mt-1">
          <Input
            id="indirectCostPercentage"
            type="number"
            value={formData.indirectCostPercentage || 0}
            onChange={(e) => handleChange('indirectCostPercentage', parseFloat(e.target.value) || 0)}
            min={0}
            max={100}
            step={0.5}
            className="mr-2"
          />
          <span>%</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{t.indirectCostDescription}</p>
      </div>
      
      <div>
        <h4 className="font-medium mb-3">{t.additionalFixedCosts}</h4>
        <div className="flex items-center mt-1">
          <Input
            id="additionalCosts"
            type="number"
            value={formData.additionalCosts || 0}
            onChange={(e) => handleChange('additionalCosts', parseFloat(e.target.value) || 0)}
            min={0}
            step={100}
            className="mr-2"
          />
          <span>NOK</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{t.additionalCostDescription}</p>
      </div>
    </div>
  );
};

export default CostsTab;
