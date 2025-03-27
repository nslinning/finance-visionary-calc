
import React, { useState, useEffect } from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { CustomerSegment } from '../../types/calculator';
import { defaultNewSegment, subscriptionTiers } from '../../constants/calculator/initialData';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            {isEdit ? t.editSegment : formData.isIndividualCustomer ? t.addIndividualCustomer : t.addNewSegment}
          </h3>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="basic">{t.basicInfo}</TabsTrigger>
              <TabsTrigger value="pricing">{t.pricingOptions}</TabsTrigger>
              <TabsTrigger value="hardware">{t.hardwareOptions}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              <div>
                <Label htmlFor="segmentName">{t.segmentName}</Label>
                <Input
                  id="segmentName"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="segmentType">{t.segmentType}</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleChange('type', value)}
                >
                  <SelectTrigger id="segmentType" className="mt-1">
                    <SelectValue placeholder={t.segmentType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="b2b">{t.b2b}</SelectItem>
                    <SelectItem value="b2c">{t.b2c}</SelectItem>
                    <SelectItem value="b2b2c">{t.b2b2c}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="employeeCount">{t.employeeCount}</Label>
                <Input
                  id="employeeCount"
                  type="number"
                  value={formData.employeeCount}
                  onChange={(e) => handleChange('employeeCount', parseInt(e.target.value) || 1)}
                  min={1}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="calculationPurpose">{t.calculationPurpose}</Label>
                <Select
                  value={formData.calculationPurpose}
                  onValueChange={(value) => handleChange('calculationPurpose', value)}
                >
                  <SelectTrigger id="calculationPurpose" className="mt-1">
                    <SelectValue placeholder={t.selectPurpose} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="offer">{t.createOffer}</SelectItem>
                    <SelectItem value="valuation">{t.calculateValue}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.isIndividualCustomer && (
                <>
                  <Separator />
                  <h4 className="text-lg font-medium">{t.customerDetails}</h4>
                  
                  <div>
                    <Label htmlFor="customerName">{t.customerName}</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName || ''}
                      onChange={(e) => handleChange('customerName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="customerEmail">{t.customerEmail}</Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customerEmail || ''}
                      onChange={(e) => handleChange('customerEmail', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="pricing" className="space-y-6">
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
            </TabsContent>
            
            <TabsContent value="hardware" className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includesHardware"
                  checked={formData.includesHardware}
                  onCheckedChange={(checked) => 
                    handleChange('includesHardware', checked === true)
                  }
                />
                <Label htmlFor="includesHardware">{t.includeHardware}</Label>
              </div>
              
              {formData.includesHardware && (
                <>
                  <div>
                    <Label htmlFor="hardwareAcquisitionType">{t.hardwareAcquisitionType}</Label>
                    <Select
                      value={formData.hardwareAcquisitionType}
                      onValueChange={(value) => handleChange('hardwareAcquisitionType', value)}
                    >
                      <SelectTrigger id="hardwareAcquisitionType" className="mt-1">
                        <SelectValue placeholder={t.selectHardwareAcquisitionType} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purchase">{t.purchase}</SelectItem>
                        <SelectItem value="rent">{t.rent}</SelectItem>
                        <SelectItem value="lease">{t.lease}</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {formData.hardwareAcquisitionType === 'lease' && (
                      <p className="text-sm text-amber-600 mt-1">
                        {t.leaseRequiresCommitment}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="hardwareId">{t.hardwareProduct}</Label>
                    <Select
                      value={formData.hardwareId?.toString() || ''}
                      onValueChange={(value) => handleChange('hardwareId', parseInt(value))}
                    >
                      <SelectTrigger id="hardwareId" className="mt-1">
                        <SelectValue placeholder={t.selectHardware} />
                      </SelectTrigger>
                      <SelectContent>
                        {hardwareProducts.map(product => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.hardwareAcquisitionType === 'lease' && (
                    <div>
                      <Label htmlFor="leaseInterestRate">{t.leaseInterestRate}</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="leaseInterestRate"
                          type="number"
                          value={formData.leaseInterestRate}
                          onChange={(e) => handleChange('leaseInterestRate', parseFloat(e.target.value) || 5.0)}
                          min={0}
                          max={25}
                          step={0.1}
                          className="mr-2"
                        />
                        <span>%</span>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              <div>
                <h4 className="font-medium mb-3">{t.segmentProducts}</h4>
                
                <div className="grid gap-2 max-h-60 overflow-y-auto p-2 border rounded">
                  {products
                    .filter(p => !p.name.includes('SYDERA') && !p.name.includes('VENDING'))
                    .map(product => (
                    <div key={product.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`product-${product.id}`}
                        checked={formData.products.includes(product.id)}
                        onCheckedChange={() => handleProductToggle(product.id)}
                      />
                      <Label htmlFor={`product-${product.id}`}>{product.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6 space-x-2">
            <Button variant="outline" onClick={onCancel}>
              {t.cancel}
            </Button>
            <Button onClick={() => onSave(formData)}>
              {isEdit ? t.update : t.add}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSegmentModal;
