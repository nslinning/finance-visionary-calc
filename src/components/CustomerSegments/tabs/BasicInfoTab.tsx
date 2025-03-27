
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { useFormContext } from 'react-hook-form';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface BasicInfoTabProps {
  t: TranslationObject;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ t }) => {
  const { control, watch } = useFormContext();
  const isIndividualCustomer = watch('isIndividualCustomer');

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.segmentName}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.segmentType}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t.segmentType} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="b2b">{t.b2b}</SelectItem>
                <SelectItem value="b2c">{t.b2c}</SelectItem>
                <SelectItem value="b2b2c">{t.b2b2c}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="employeeCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.employeeCount}</FormLabel>
            <FormControl>
              <Input 
                type="number"
                min={1}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="calculationPurpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.calculationPurpose}</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectPurpose} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="offer">{t.createOffer}</SelectItem>
                <SelectItem value="valuation">{t.calculateValue}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {isIndividualCustomer && (
        <>
          <Separator />
          <h4 className="text-lg font-medium">{t.customerDetails}</h4>
          
          <FormField
            control={control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.customerName}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.customerEmail}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};

export default BasicInfoTab;
