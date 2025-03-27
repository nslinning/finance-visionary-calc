
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { CustomerSegment, Product } from '../../../types/calculator';
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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HardwareTabProps {
  t: TranslationObject;
  handleProductToggle: (productId: number) => void;
  products: Product[];
  hardwareProducts: Product[];
}

const HardwareTab: React.FC<HardwareTabProps> = ({ 
  t, 
  handleProductToggle,
  products,
  hardwareProducts 
}) => {
  const { control, watch } = useFormContext();
  const includesHardware = watch('includesHardware');
  const hardwareAcquisitionType = watch('hardwareAcquisitionType');

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="includesHardware"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{t.includeHardware}</FormLabel>
            </div>
          </FormItem>
        )}
      />
      
      {includesHardware && (
        <>
          <FormField
            control={control}
            name="hardwareAcquisitionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.hardwareAcquisitionType}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectHardwareAcquisitionType} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="purchase">{t.purchase}</SelectItem>
                    <SelectItem value="rent">{t.rent}</SelectItem>
                    <SelectItem value="lease">{t.lease}</SelectItem>
                  </SelectContent>
                </Select>
                {field.value === 'lease' && (
                  <FormDescription className="text-amber-600">
                    {t.leaseRequiresCommitment}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="hardwareId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.hardwareProduct}</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value?.toString() || ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectHardware} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hardwareProducts.map(product => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {hardwareAcquisitionType === 'lease' && (
            <FormField
              control={control}
              name="leaseInterestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.leaseInterestRate}</FormLabel>
                  <div className="flex items-center">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 5.0)}
                        min={0}
                        max={25}
                        step={0.1}
                        className="mr-2"
                      />
                    </FormControl>
                    <span>%</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </>
      )}
      
      <div>
        <h4 className="font-medium mb-3">{t.segmentProducts}</h4>
        
        <div className="grid gap-2 max-h-60 overflow-y-auto p-2 border rounded">
          {products
            .filter(p => !p.name.includes('SYDERA') && !p.name.includes('VENDING'))
            .map(product => (
              <FormField
                key={product.id}
                control={control}
                name="products"
                render={({ field }) => (
                  <FormItem key={product.id} className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value.includes(product.id)}
                        onCheckedChange={() => handleProductToggle(product.id)}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{product.name}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HardwareTab;
