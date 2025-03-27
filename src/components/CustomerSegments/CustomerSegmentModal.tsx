
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TranslationObject } from '../../constants/calculator/types';
import { CustomerSegment } from '../../types/calculator';
import { defaultNewSegment, subscriptionTiers } from '../../constants/calculator/initialData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { customerSegmentSchema, validateCustomerSegmentForm } from '../../validation/customerSegmentSchema';

// Import our tab components
import BasicInfoTab from './tabs/BasicInfoTab';
import PricingTab from './tabs/PricingTab';
import HardwareTab from './tabs/HardwareTab';
import CostsTab from './tabs/CostsTab';
import SegmentModalContainer from './SegmentModalContainer';
import { toast } from '@/components/ui/use-toast';

interface CustomerSegmentModalProps {
  t: TranslationObject;
  segment: CustomerSegment | null;
  products: any[];
  isEdit: boolean;
  onSave: (segment: CustomerSegment) => void;
  onCancel: () => void;
}

const CustomerSegmentModal: React.FC<CustomerSegmentModalProps> = ({
  t,
  segment,
  products,
  isEdit,
  onSave,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  
  // Get form values to use for dynamic validation
  const formValues = segment || defaultNewSegment as CustomerSegment;
  
  // Initialize form with dynamic validation
  const methods = useForm({
    resolver: zodResolver(validateCustomerSegmentForm(formValues)),
    defaultValues: formValues,
    mode: 'onChange',
  });
  
  const { formState, watch, setValue, handleSubmit, trigger } = methods;
  const { errors, isValid } = formState;
  
  // Watch for changes in key fields that affect validation
  const includesHardware = watch('includesHardware');
  const hardwareAcquisitionType = watch('hardwareAcquisitionType');
  const subscriptionType = watch('subscriptionType');
  const isIndividualCustomer = watch('isIndividualCustomer');
  
  // Update validation schema when dependent fields change
  useEffect(() => {
    // Apply dynamic validation based on current form values
    methods.clearErrors();
    
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

  // Get hardware products
  const hardwareProducts = products.filter(p => 
    p.name.includes('SYDERA') || p.name.includes('VENDING')
  );
  
  // Handle form submission
  const onSubmitForm = (data: CustomerSegment) => {
    // Add ID if it's an existing segment
    if (isEdit && segment) {
      data.id = segment.id;
    }
    onSave(data);
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <SegmentModalContainer
          t={t}
          isEdit={isEdit}
          formData={methods.getValues()}
          errors={errors}
          isValid={isValid}
          onSave={handleSubmit(onSubmitForm)}
          onCancel={onCancel}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="basic" className={errors.name || errors.type || errors.employeeCount || errors.customerName || errors.customerEmail ? "text-destructive" : ""}>
                {t.basicInfo}
              </TabsTrigger>
              <TabsTrigger value="pricing" className={errors.licenseFeePerUser || errors.subscriptionType || errors.contractLengthYears ? "text-destructive" : ""}>
                {t.pricingOptions}
              </TabsTrigger>
              <TabsTrigger value="hardware" className={errors.hardwareAcquisitionType || errors.hardwareId || errors.leaseInterestRate ? "text-destructive" : ""}>
                {t.hardwareOptions}
              </TabsTrigger>
              <TabsTrigger value="additionalCosts" className={errors.logisticsCostPercentage || errors.indirectCostPercentage || errors.additionalCosts ? "text-destructive" : ""}>
                {t.additionalCostsTab}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <BasicInfoTab 
                t={t}
              />
            </TabsContent>
            
            <TabsContent value="pricing">
              <PricingTab 
                t={t}
                handleSelectPriceTier={handleSelectPriceTier}
              />
            </TabsContent>
            
            <TabsContent value="hardware">
              <HardwareTab 
                t={t}
                handleProductToggle={handleProductToggle}
                products={products}
                hardwareProducts={hardwareProducts}
              />
            </TabsContent>
            
            <TabsContent value="additionalCosts">
              <CostsTab 
                t={t}
              />
            </TabsContent>
          </Tabs>
        </SegmentModalContainer>
      </form>
    </FormProvider>
  );
};

export default CustomerSegmentModal;
