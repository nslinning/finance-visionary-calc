
import React, { useState, useEffect } from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { CustomerSegment } from '../../types/calculator';
import { defaultNewSegment, subscriptionTiers } from '../../constants/calculator/initialData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import our tab components
import BasicInfoTab from './tabs/BasicInfoTab';
import PricingTab from './tabs/PricingTab';
import HardwareTab from './tabs/HardwareTab';
import CostsTab from './tabs/CostsTab';
import SegmentModalContainer from './SegmentModalContainer';

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
  const [formData, setFormData] = useState<CustomerSegment>(
    segment || defaultNewSegment as CustomerSegment
  );
  
  const [activeTab, setActiveTab] = useState('basic');
  
  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleProductToggle = (productId: number) => {
    const currentProducts = [...formData.products];
    const index = currentProducts.indexOf(productId);
    
    if (index > -1) {
      currentProducts.splice(index, 1);
    } else {
      currentProducts.push(productId);
    }
    
    setFormData({
      ...formData,
      products: currentProducts
    });
  };

  // Get hardware products (in this case, SYDERA SMART VENDING)
  const hardwareProducts = products.filter(p => 
    p.name.includes('SYDERA') || p.name.includes('VENDING')
  );

  // When hardware acquisition type changes, set minimum contract length
  useEffect(() => {
    if (formData.includesHardware) {
      if (formData.hardwareAcquisitionType === 'lease' && formData.contractLengthYears < 3) {
        handleChange('contractLengthYears', 3);
      } else if (formData.hardwareAcquisitionType === 'rent' && formData.contractLengthYears < 1) {
        handleChange('contractLengthYears', 1);
      }
      
      // Set subscription type to annual commitment if leasing or renting
      if (formData.hardwareAcquisitionType === 'lease' || formData.hardwareAcquisitionType === 'rent') {
        handleChange('subscriptionType', 'arr-commitment');
      }
    }
  }, [formData.includesHardware, formData.hardwareAcquisitionType]);

  // When subscription type changes to MRR, ensure hardware is not leased/rented
  useEffect(() => {
    if (formData.subscriptionType === 'mrr-no-commitment' && 
        formData.includesHardware && 
        (formData.hardwareAcquisitionType === 'lease' || formData.hardwareAcquisitionType === 'rent')) {
      handleChange('hardwareAcquisitionType', 'purchase');
    }
  }, [formData.subscriptionType]);
  
  // Select a subscription tier price
  const handleSelectPriceTier = (tierId: string) => {
    const tier = subscriptionTiers.find(t => t.id === tierId);
    if (tier) {
      handleChange('licenseFeePerUser', tier.monthlyPricePerUser);
    }
  };
  
  return (
    <SegmentModalContainer
      t={t}
      isEdit={isEdit}
      formData={formData}
      onSave={onSave}
      onCancel={onCancel}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="basic">{t.basicInfo}</TabsTrigger>
          <TabsTrigger value="pricing">{t.pricingOptions}</TabsTrigger>
          <TabsTrigger value="hardware">{t.hardwareOptions}</TabsTrigger>
          <TabsTrigger value="additionalCosts">{t.additionalCostsTab}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <BasicInfoTab 
            t={t} 
            formData={formData} 
            handleChange={handleChange} 
          />
        </TabsContent>
        
        <TabsContent value="pricing">
          <PricingTab 
            t={t} 
            formData={formData} 
            handleChange={handleChange} 
            handleSelectPriceTier={handleSelectPriceTier}
          />
        </TabsContent>
        
        <TabsContent value="hardware">
          <HardwareTab 
            t={t} 
            formData={formData} 
            handleChange={handleChange} 
            handleProductToggle={handleProductToggle}
            products={products}
            hardwareProducts={hardwareProducts}
          />
        </TabsContent>
        
        <TabsContent value="additionalCosts">
          <CostsTab 
            t={t} 
            formData={formData} 
            handleChange={handleChange}
          />
        </TabsContent>
      </Tabs>
    </SegmentModalContainer>
  );
};

export default CustomerSegmentModal;
