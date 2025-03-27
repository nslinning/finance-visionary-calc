
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CustomerSegment } from '../types/calculator';
import { defaultNewSegment } from '../constants/calculator/initialData';
import { validateCustomerSegmentForm, ValidationResult } from '../validation/customerSegmentSchema';
import { toast } from '@/components/ui/use-toast';

export const useCustomerSegmentForm = (
  segment: CustomerSegment | null,
  onSave: (segment: CustomerSegment) => void
) => {
  // Get form values to use for dynamic validation
  const formValues = segment || defaultNewSegment as CustomerSegment;
  
  // Create custom resolver using our validation function
  const customResolver = async (data: any) => {
    const result = validateCustomerSegmentForm(data);
    
    if (result.success) {
      return {
        values: result.data,
        errors: {}
      };
    } else {
      const formErrors: Record<string, any> = {};
      
      // Handle error properly based on the return type
      // We've already checked that result.success is false, so we can safely access result.error
      if ('error' in result) {
        for (const issue of result.error.errors) {
          const path = issue.path.join('.');
          formErrors[path] = {
            type: issue.code,
            message: issue.message
          };
        }
      }
      
      return {
        values: {},
        errors: formErrors
      };
    }
  };
  
  // Initialize form with custom resolver
  const methods = useForm({
    resolver: customResolver as any,
    defaultValues: formValues,
    mode: 'onChange',
  });
  
  const { formState, watch, setValue, trigger } = methods;
  const { errors, isValid } = formState;
  
  // Watch for changes in key fields that affect validation
  const includesHardware = watch('includesHardware');
  const hardwareAcquisitionType = watch('hardwareAcquisitionType');
  const subscriptionType = watch('subscriptionType');
  const isIndividualCustomer = watch('isIndividualCustomer');
  
  // Update validation when dependent fields change
  useEffect(() => {
    // This forces revalidation with the current form state
    trigger();
  }, [includesHardware, hardwareAcquisitionType, isIndividualCustomer, trigger]);
  
  // When hardware acquisition type changes, set minimum contract length
  useEffect(() => {
    if (includesHardware) {
      if (hardwareAcquisitionType === 'lease' && watch('contractLengthYears') < 3) {
        setValue('contractLengthYears', 3);
      } else if (hardwareAcquisitionType === 'rent' && watch('contractLengthYears') < 1) {
        setValue('contractLengthYears', 1);
      }
      
      // Set subscription type to annual commitment if leasing or renting
      if (hardwareAcquisitionType === 'lease' || hardwareAcquisitionType === 'rent') {
        setValue('subscriptionType', 'arr-commitment');
      }
      
      // Trigger validation after changes
      trigger();
    }
  }, [includesHardware, hardwareAcquisitionType, setValue, trigger, watch]);

  // When subscription type changes to MRR, ensure hardware is not leased/rented
  useEffect(() => {
    if (subscriptionType === 'mrr-no-commitment' && 
        includesHardware && 
        (hardwareAcquisitionType === 'lease' || hardwareAcquisitionType === 'rent')) {
      setValue('hardwareAcquisitionType', 'purchase');
      toast({
        title: "Subscription type changed",
        description: "Monthly subscription (no commitment) can only be used with purchased hardware.",
        variant: "default",
      });
      trigger();
    }
  }, [subscriptionType, includesHardware, hardwareAcquisitionType, setValue, trigger]);

  // Select a subscription tier price
  const handleSelectPriceTier = (tierId: string) => {
    const tier = subscriptionTiers.find(t => t.id === tierId);
    if (tier) {
      setValue('licenseFeePerUser', tier.monthlyPricePerUser);
    }
  };
  
  // Product toggle handler
  const handleProductToggle = (productId: number) => {
    const currentProducts = [...watch('products')];
    const index = currentProducts.indexOf(productId);
    
    if (index > -1) {
      currentProducts.splice(index, 1);
    } else {
      currentProducts.push(productId);
    }
    
    setValue('products', currentProducts);
  };

  return {
    methods,
    formState,
    watch,
    errors,
    isValid,
    handleSelectPriceTier,
    handleProductToggle
  };
};

// Import from original file
import { subscriptionTiers } from '../constants/calculator/initialData';
