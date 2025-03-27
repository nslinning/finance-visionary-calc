
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
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

interface CostsTabProps {
  t: TranslationObject;
}

const CostsTab: React.FC<CostsTabProps> = ({ t }) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="logisticsCostPercentage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.logisticsCosts}</FormLabel>
            <div className="flex items-center">
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  min={0}
                  max={100}
                  step={0.5}
                  className="mr-2"
                />
              </FormControl>
              <span>%</span>
            </div>
            <FormDescription>{t.logisticsCostDescription}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="indirectCostPercentage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.indirectCosts}</FormLabel>
            <div className="flex items-center">
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  min={0}
                  max={100}
                  step={0.5}
                  className="mr-2"
                />
              </FormControl>
              <span>%</span>
            </div>
            <FormDescription>{t.indirectCostDescription}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="additionalCosts"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.additionalFixedCosts}</FormLabel>
            <div className="flex items-center">
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  min={0}
                  step={100}
                  className="mr-2"
                />
              </FormControl>
              <span>NOK</span>
            </div>
            <FormDescription>{t.additionalCostDescription}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CostsTab;
