
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { subscriptionTiers } from '../../../constants/calculator/initialData';
import { useFormContext } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
  handleSelectPriceTier: (tierId: string) => void;
}

const PricingTab: React.FC<PricingTabProps> = ({ 
  t, 
  handleSelectPriceTier 
}) => {
  const { control, watch } = useFormContext();
  const includesHardware = watch('includesHardware');
  const hardwareAcquisitionType = watch('hardwareAcquisitionType');
  const contractLengthYears = watch('contractLengthYears');
  const licenseFeePerUser = watch('licenseFeePerUser');

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">{t.subscriptionTiers}</h4>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {subscriptionTiers.map(tier => (
            <div 
              key={tier.id}
              className={`p-3 border rounded-md cursor-pointer transition-colors ${
                licenseFeePerUser === tier.monthlyPricePerUser 
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
      
      <FormField
        control={control}
        name="licenseFeePerUser"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.licenseFee}</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} 
              />
            </FormControl>
            <FormDescription>{t.licenseFeePricePerUser}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="subscriptionType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.subscriptionType}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectSubscriptionType} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="mrr-no-commitment">{t.mrrNoCommitment}</SelectItem>
                <SelectItem value="arr-commitment">{t.arrWithCommitment}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="contractLengthYears"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.contractLength}</FormLabel>
            <Select
              onValueChange={(value) => field.onChange(parseInt(value))}
              defaultValue={field.value.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t.contractLength} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">1 {t.years}</SelectItem>
                <SelectItem value="2">2 {t.years}</SelectItem>
                <SelectItem value="3">3 {t.years}</SelectItem>
                <SelectItem value="4">4 {t.years}</SelectItem>
                <SelectItem value="5">5 {t.years}</SelectItem>
              </SelectContent>
            </Select>
            {hardwareAcquisitionType === 'lease' && contractLengthYears < 3 && (
              <FormMessage className="text-amber-600">{t.leaseMinimumContractLength}</FormMessage>
            )}
          </FormItem>
        )}
      />
      
      <div>
        <h4 className="font-medium mb-3">{t.discountParameters}</h4>
        
        <div className="space-y-4">
          <FormField
            control={control}
            name="volumeDiscountRate"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between mb-2">
                  <FormLabel>{t.volumeDiscount}</FormLabel>
                  <span>{field.value}%</span>
                </div>
                <FormControl>
                  <Slider
                    value={[field.value]}
                    min={0}
                    max={50}
                    step={1}
                    onValueChange={(values) => field.onChange(values[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="contractLengthDiscountRate"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between mb-2">
                  <FormLabel>{t.contractLengthDiscount}</FormLabel>
                  <span>{field.value}%</span>
                </div>
                <FormControl>
                  <Slider
                    value={[field.value]}
                    min={0}
                    max={50}
                    step={1}
                    onValueChange={(values) => field.onChange(values[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="customDiscountRate"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between mb-2">
                  <FormLabel>{t.customDiscount}</FormLabel>
                  <span>{field.value}%</span>
                </div>
                <FormControl>
                  <Slider
                    value={[field.value]}
                    min={0}
                    max={50}
                    step={1}
                    onValueChange={(values) => field.onChange(values[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PricingTab;
