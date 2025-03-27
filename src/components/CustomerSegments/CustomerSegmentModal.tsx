
import React, { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { TranslationObject } from '../../constants/calculator/types';
import { CustomerSegment } from '../../types/calculator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import our tab components and container
import BasicInfoTab from './tabs/BasicInfoTab';
import PricingTab from './tabs/PricingTab';
import HardwareTab from './tabs/HardwareTab';
import CostsTab from './tabs/CostsTab';
import SegmentModalContainer from './SegmentModalContainer';

// Import custom hook
import { useCustomerSegmentForm } from '../../hooks/useCustomerSegmentForm';

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
  
  // Use our custom hook for form handling
  const {
    methods,
    errors,
    isValid,
    handleSelectPriceTier,
    handleProductToggle
  } = useCustomerSegmentForm(segment, onSave);
  
  // Handle form submission
  const onSubmitForm = (data: CustomerSegment) => {
    // Add ID if it's an existing segment
    if (isEdit && segment) {
      data.id = segment.id;
    }
    onSave(data);
  };

  // Get hardware products
  const hardwareProducts = products.filter(p => 
    p.name.includes('SYDERA') || p.name.includes('VENDING')
  );
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitForm)}>
        <SegmentModalContainer
          t={t}
          isEdit={isEdit}
          formData={methods.getValues()}
          errors={errors}
          isValid={isValid}
          onSave={methods.handleSubmit(onSubmitForm)}
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
              <BasicInfoTab t={t} />
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
              <CostsTab t={t} />
            </TabsContent>
          </Tabs>
        </SegmentModalContainer>
      </form>
    </FormProvider>
  );
};

export default CustomerSegmentModal;
