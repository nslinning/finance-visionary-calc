
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { CustomerSegment } from '../../../types/calculator';
import { subscriptionTiers } from '../../../constants/calculator/initialData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PricingTabProps {
  t: TranslationObject;
  formData: CustomerSegment;
  handleChange: (field: string, value: any) => void;
  handleSelectPriceTier: (tierId: string) => void;
}

const PricingTab: React.FC<PricingTabProps> = ({ 
  t, 
  formData, 
  handleChange, 
  handleSelectPriceTier 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">{t.subscriptionTiers}</h4>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {subscriptionTiers.map(tier => (
            <div 
              key={tier.id}
              className={`p-3 border rounded-md cursor-pointer transition-colors ${
                formData.licenseFeePerUser === tier.monthlyPricePerUser 
                  ? 'border-primary bg-primary/10' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleSelectPriceTier(tier.id)}
            >
              <div className="font-semibold mb-1">{tier.name}</div>
              <div className="text-lg font-bold mb-2">
                {tier.monthlyPricePerUser} NOK
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  /{t.userMonth}
                </span>
              </div>
              <ul className="text-sm space-y-1">
                {tier.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-1">✓</span> {feature}
                  </li>
                ))}
                {tier.features.length > 3 && (
                  <li className="text-gray-500">+{tier.features.length - 3} {t.moreFeatures}</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label htmlFor="licenseFee">{t.licenseFee}</Label>
        <Input
          id="licenseFee"
          type="number"
          value={formData.licenseFeePerUser}
          onChange={(e) => handleChange('licenseFeePerUser', parseFloat(e.target.value) || 0)}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">{t.licenseFeePricePerUser}</p>
      </div>
      
      <div>
        <Label htmlFor="subscriptionType">{t.subscriptionType}</Label>
        <Select
          value={formData.subscriptionType}
          onValueChange={(value) => handleChange('subscriptionType', value)}
        >
          <SelectTrigger id="subscriptionType" className="mt-1">
            <SelectValue placeholder={t.selectSubscriptionType} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mrr-no-commitment">{t.mrrNoCommitment}</SelectItem>
            <SelectItem value="arr-commitment">{t.arrWithCommitment}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="contractLength">{t.contractLength}</Label>
        <Select
          value={formData.contractLengthYears.toString()}
          onValueChange={(value) => handleChange('contractLengthYears', parseInt(value))}
        >
          <SelectTrigger id="contractLength" className="mt-1">
            <SelectValue placeholder={t.contractLength} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 {t.years}</SelectItem>
            <SelectItem value="2">2 {t.years}</SelectItem>
            <SelectItem value="3">3 {t.years}</SelectItem>
            <SelectItem value="4">4 {t.years}</SelectItem>
            <SelectItem value="5">5 {t.years}</SelectItem>
          </SelectContent>
        </Select>
        {formData.hardwareAcquisitionType === 'lease' && formData.contractLengthYears < 3 && (
          <p className="text-sm text-amber-600 mt-1">{t.leaseMinimumContractLength}</p>
        )}
      </div>
      
      <div>
        <h4 className="font-medium mb-3">{t.discountParameters}</h4>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="volumeDiscount">{t.volumeDiscount}</Label>
              <span>{formData.volumeDiscountRate}%</span>
            </div>
            <Slider
              id="volumeDiscount"
              value={[formData.volumeDiscountRate]}
              min={0}
              max={50}
              step={1}
              onValueChange={(values) => handleChange('volumeDiscountRate', values[0])}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="contractDiscount">{t.contractLengthDiscount}</Label>
              <span>{formData.contractLengthDiscountRate}%</span>
            </div>
            <Slider
              id="contractDiscount"
              value={[formData.contractLengthDiscountRate]}
              min={0}
              max={50}
              step={1}
              onValueChange={(values) => handleChange('contractLengthDiscountRate', values[0])}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="customDiscount">{t.customDiscount}</Label>
              <span>{formData.customDiscountRate}%</span>
            </div>
            <Slider
              id="customDiscount"
              value={[formData.customDiscountRate]}
              min={0}
              max={50}
              step={1}
              onValueChange={(values) => handleChange('customDiscountRate', values[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTab;
