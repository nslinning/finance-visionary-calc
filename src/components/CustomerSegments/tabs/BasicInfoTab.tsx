
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { CustomerSegment } from '../../../types/calculator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  formData: CustomerSegment;
  handleChange: (field: string, value: any) => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ t, formData, handleChange }) => {
  return (
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
    </div>
  );
};

export default BasicInfoTab;
