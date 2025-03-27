
import { useState } from 'react';
import { CustomerSegment, HardwareAcquisitionType, Product } from '../../types/calculator';

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
  
  const addIndividualCustomer = (customerSegment: CustomerSegment) => {
    const newId = segments.length > 0 
      ? Math.max(...segments.map(s => s.id)) + 1 
      : 1;
    
    setSegments([...segments, { 
      ...customerSegment, 
      id: newId,
      isIndividualCustomer: true 
    }]);
  };
  
  const calculateHardwarePayment = (
    segment: CustomerSegment, 
    products: Product[]
  ) => {
    if (!segment.includesHardware || !segment.hardwareId) {
      return { monthly: 0, annual: 0, total: 0 };
    }
    
    const hardware = products.find(p => p.id === segment.hardwareId);
    if (!hardware) return { monthly: 0, annual: 0, total: 0 };
    
    const hardwarePrice = hardware.price;
    
    switch (segment.hardwareAcquisitionType) {
      case 'purchase':
        // Full payment upfront
        return {
          monthly: 0, // No monthly payment
          annual: 0,  // No annual recurring
          total: hardwarePrice // One-time payment
        };
        
      case 'rent':
        // Monthly rental fee (typically higher than leasing)
        const rentalFeeMonthly = hardwarePrice * 0.05; // 5% of price per month
        return {
          monthly: rentalFeeMonthly,
          annual: rentalFeeMonthly * 12,
          total: rentalFeeMonthly * 12 * segment.contractLengthYears
        };
        
      case 'lease':
        // Leasing calculation with interest
        const interestRate = (segment.leaseInterestRate || 5) / 100;
        const months = segment.contractLengthYears * 12;
        
        // Simple leasing calculation: (Price + Total Interest) / Number of Months
        const totalInterest = hardwarePrice * interestRate * segment.contractLengthYears;
        const monthlyPayment = (hardwarePrice + totalInterest) / months;
        
        return {
          monthly: monthlyPayment,
          annual: monthlyPayment * 12,
          total: monthlyPayment * months
        };
        
      default:
        return { monthly: 0, annual: 0, total: 0 };
    }
  };
  
  const calculateSegmentRevenue = (segment: CustomerSegment, products: Product[] = []) => {
    // Base license calculation
    const monthlyLicenseFee = segment.licenseFeePerUser * segment.employeeCount;
    
    // Apply discounts
    const volumeDiscount = segment.volumeDiscountRate / 100;
    const contractDiscount = segment.contractLengthDiscountRate / 100;
    const customDiscount = segment.customDiscountRate / 100;
    
    const totalDiscountRate = volumeDiscount + contractDiscount + customDiscount;
    const discountedMonthlyFee = monthlyLicenseFee * (1 - totalDiscountRate);
    
    // Calculate hardware costs if applicable
    const hardwarePayment = calculateHardwarePayment(segment, products);
    
    // Add hardware costs to monthly fee
    const totalMonthlyFee = discountedMonthlyFee + hardwarePayment.monthly;
    
    // Calculate total based on contract length and commitment type
    let annualFee = 0;
    let totalContractValue = 0;
    
    if (segment.subscriptionType === 'mrr-no-commitment') {
      // MRR - Only calculate based on monthly fees
      annualFee = totalMonthlyFee * 12;
      totalContractValue = totalMonthlyFee * 12 * segment.contractLengthYears;
    } else {
      // ARR - Annual commitment
      annualFee = totalMonthlyFee * 12;
      totalContractValue = annualFee * segment.contractLengthYears;
      
      // Add one-time hardware purchase cost if applicable
      if (segment.includesHardware && 
          segment.hardwareAcquisitionType === 'purchase') {
        totalContractValue += hardwarePayment.total;
      }
    }
    
    // Calculate monthly per user fee (this is what's shown to customers)
    const monthlyPerUserFee = totalMonthlyFee / segment.employeeCount;
    
    return {
      monthly: totalMonthlyFee,
      annual: annualFee,
      total: totalContractValue,
      monthlyPerUser: monthlyPerUserFee,
      hardwareMonthly: hardwarePayment.monthly,
      hardwareTotal: hardwarePayment.total
    };
  };
  
  return {
    segments,
    setSegments,
    addSegment,
    updateSegment,
    deleteSegment,
    addIndividualCustomer,
    calculateSegmentRevenue,
    calculateHardwarePayment
  };
};
