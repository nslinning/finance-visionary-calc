
import React, { useState, useEffect } from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { CustomerSegment } from '../../types/calculator';
import { defaultNewSegment } from '../../constants/calculator/initialData';
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
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            {isEdit ? t.editSegment : t.addNewSegment}
          </h3>
          
          <div className="space-y-6">
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
              <Label htmlFor="licenseFee">{t.licenseFee}</Label>
              <Input
                id="licenseFee"
                type="number"
                value={formData.licenseFeePerUser}
                onChange={(e) => handleChange('licenseFeePerUser', parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
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
            
            <div>
              <h4 className="font-medium mb-3">{t.segmentProducts}</h4>
              
              <div className="grid gap-2 max-h-60 overflow-y-auto p-2 border rounded">
                {products.map(product => (
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
          </div>
          
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
