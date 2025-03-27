
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { CustomerSegment, Product } from '../../../types/calculator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  formData: CustomerSegment;
  handleChange: (field: string, value: any) => void;
  handleProductToggle: (productId: number) => void;
  products: Product[];
  hardwareProducts: Product[];
}

const HardwareTab: React.FC<HardwareTabProps> = ({ 
  t, 
  formData, 
  handleChange, 
  handleProductToggle,
  products,
  hardwareProducts 
}) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default HardwareTab;
