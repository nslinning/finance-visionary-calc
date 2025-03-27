import { useState, useEffect } from 'react';
import { CustomerSegment } from '../../types/calculator';
import { demoCustomerSegment } from '../../constants/calculator/data';

export const useCustomerSegments = () => {
  const [segments, setSegments] = useState<CustomerSegment[]>([demoCustomerSegment]);
  
  // Method to add a new segment
  const addSegment = (segment: CustomerSegment) => {
    const newSegment: CustomerSegment = {
      ...segment,
      id: segments.length > 0 ? Math.max(...segments.map(s => s.id)) + 1 : 1
    };
    
    setSegments([...segments, newSegment]);
    return newSegment;
  };
  
  // Method to update an existing segment
  const updateSegment = (updatedSegment: CustomerSegment) => {
    setSegments(prevSegments => 
      prevSegments.map(segment => 
        segment.id === updatedSegment.id ? updatedSegment : segment
      )
    );
    return updatedSegment;
  };
  
  // Method to delete a segment
  const deleteSegment = (segmentId: number) => {
    setSegments(prevSegments => 
      prevSegments.filter(segment => segment.id !== segmentId)
    );
  };
  
  // Calculate revenue for a segment
  const calculateSegmentRevenue = (segment: CustomerSegment) => {
    const monthlyFee = segment.licenseFeePerUser * segment.employeeCount;
    
    // Apply discounts
    const volumeDiscount = segment.volumeDiscountRate / 100;
    const contractDiscount = segment.contractLengthDiscountRate / 100;
    const customDiscount = segment.customDiscountRate / 100;
    
    // Combined discount
    const totalDiscountRate = volumeDiscount + contractDiscount + customDiscount;
    let discountedMonthlyFee = monthlyFee * (1 - totalDiscountRate);
    
    // Handle hardware costs if applicable
    let hardwareCost = 0;
    if (segment.includesHardware && segment.hardwareId) {
      // For demo assume a standard hardware cost of 15,000 per unit
      const vendingMachinePrice = 15000;
      const units = 15; // For the demo scenario with 15 smart vending machines
      
      if (segment.hardwareAcquisitionType === 'purchase') {
        hardwareCost = vendingMachinePrice * units;
      } else if (segment.hardwareAcquisitionType === 'rent') {
        const monthlyRent = vendingMachinePrice * 0.05 * units;
        discountedMonthlyFee += monthlyRent;
      } else if (segment.hardwareAcquisitionType === 'lease') {
        const interestRate = (segment.leaseInterestRate || 5) / 100;
        const months = segment.contractLengthYears * 12;
        const totalInterest = vendingMachinePrice * units * interestRate * segment.contractLengthYears;
        const monthlyPayment = (vendingMachinePrice * units + totalInterest) / months;
        discountedMonthlyFee += monthlyPayment;
      }
    }
    
    // Calculate additional costs
    const logisticsCost = (segment.logisticsCostPercentage || 0) / 100 * discountedMonthlyFee;
    const indirectCost = (segment.indirectCostPercentage || 0) / 100 * discountedMonthlyFee;
    const additionalCost = segment.additionalCosts || 0;
    
    const totalAdditionalCosts = logisticsCost + indirectCost + additionalCost;
    const totalMonthlyFee = discountedMonthlyFee + totalAdditionalCosts;
    
    const annualFee = totalMonthlyFee * 12;
    const totalContractValue = annualFee * segment.contractLengthYears + 
      (segment.hardwareAcquisitionType === 'purchase' ? hardwareCost : 0);
    
    // Calculate monthly per user fee
    const monthlyPerUserFee = discountedMonthlyFee / segment.employeeCount;
    
    return {
      monthly: discountedMonthlyFee,
      monthlyWithCosts: totalMonthlyFee,
      annual: annualFee,
      total: totalContractValue,
      monthlyPerUser: monthlyPerUserFee,
      hardwareCost,
      additionalCosts: {
        logistics: logisticsCost,
        indirect: indirectCost,
        fixed: additionalCost,
        total: totalAdditionalCosts
      }
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
