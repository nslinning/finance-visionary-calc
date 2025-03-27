
import { useState } from 'react';
import { CustomerSegment } from '../../types/calculator';

export const useCustomerSegments = () => {
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  
  const addSegment = (segment: CustomerSegment) => {
    const newId = segments.length > 0 
      ? Math.max(...segments.map(s => s.id)) + 1 
      : 1;
    
    setSegments([...segments, { ...segment, id: newId }]);
  };
  
  const updateSegment = (updatedSegment: CustomerSegment) => {
    setSegments(segments.map(s => 
      s.id === updatedSegment.id ? updatedSegment : s
    ));
  };
  
  const deleteSegment = (id: number) => {
    setSegments(segments.filter(s => s.id !== id));
  };
  
  const calculateSegmentRevenue = (segment: CustomerSegment) => {
    const monthlyFee = segment.licenseFeePerUser * segment.employeeCount;
    
    // Apply discounts
    const volumeDiscount = segment.volumeDiscountRate / 100;
    const contractDiscount = segment.contractLengthDiscountRate / 100;
    const customDiscount = segment.customDiscountRate / 100;
    
    const totalDiscountRate = volumeDiscount + contractDiscount + customDiscount;
    const discountedMonthlyFee = monthlyFee * (1 - totalDiscountRate);
    
    return {
      monthly: discountedMonthlyFee,
      annual: discountedMonthlyFee * 12,
      total: discountedMonthlyFee * 12 * segment.contractLengthYears
    };
  };
  
  return {
    segments,
    setSegments,
    addSegment,
    updateSegment,
    deleteSegment,
    calculateSegmentRevenue
  };
};
