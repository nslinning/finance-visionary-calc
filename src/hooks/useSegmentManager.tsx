
import { useState } from 'react';
import { CustomerSegment, ExportOptions } from '../types/calculator';
import { useToast } from '@/components/ui/use-toast';

export const useSegmentManager = (
  segments: CustomerSegment[], 
  setSegments: (segments: CustomerSegment[]) => void,
  products: any[]
) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentSegment, setCurrentSegment] = useState<CustomerSegment | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isIndividualCustomer, setIsIndividualCustomer] = useState(false);
  
  // Segment filters
  const [showIndividualCustomers, setShowIndividualCustomers] = useState(true);
  const [showSegments, setShowSegments] = useState(true);
  
  const openAddModal = () => {
    setCurrentSegment(null);
    setIsEdit(false);
    setIsIndividualCustomer(false);
    setShowModal(true);
  };
  
  const openAddIndividualCustomerModal = () => {
    setCurrentSegment(null);
    setIsEdit(false);
    setIsIndividualCustomer(true);
    setShowModal(true);
  };
  
  const openEditModal = (segment: CustomerSegment) => {
    setCurrentSegment({ ...segment });
    setIsEdit(true);
    setIsIndividualCustomer(segment.isIndividualCustomer);
    setShowModal(true);
  };
  
  const deleteSegment = (id: number) => {
    setSegments(segments.filter(s => s.id !== id));
  };
  
  const handleSave = (segment: CustomerSegment) => {
    if (isIndividualCustomer) {
      segment.isIndividualCustomer = true;
    }
    
    if (isEdit && currentSegment) {
      setSegments(segments.map(s => s.id === segment.id ? segment : s));
    } else {
      const newId = segments.length > 0 
        ? Math.max(...segments.map(s => s.id)) + 1 
        : 1;
      setSegments([...segments, { ...segment, id: newId }]);
    }
    setShowModal(false);
  };
  
  const handleExport = (options: ExportOptions) => {
    // In a real application, this would generate and download the export
    toast({
      title: "Export feature",
      description: `This would generate a ${options.format.toUpperCase()} export in a real application.`,
    });
    
    // Mock download after a short delay
    setTimeout(() => {
      toast({
        title: "Export Ready",
        description: "Your export file is ready to download.",
      });
    }, 2000);
  };
  
  // Calculate revenue values
  const calculateSegmentRevenue = (segment: CustomerSegment) => {
    const monthlyFee = segment.licenseFeePerUser * segment.employeeCount;
    
    // Apply discounts
    const volumeDiscount = segment.volumeDiscountRate / 100;
    const contractDiscount = segment.contractLengthDiscountRate / 100;
    const customDiscount = segment.customDiscountRate / 100;
    
    const totalDiscountRate = volumeDiscount + contractDiscount + customDiscount;
    let discountedMonthlyFee = monthlyFee * (1 - totalDiscountRate);
    
    // Handle hardware costs if applicable
    let hardwareCost = 0;
    if (segment.includesHardware && segment.hardwareId) {
      const hardware = products.find(p => p.id === segment.hardwareId);
      if (hardware) {
        if (segment.hardwareAcquisitionType === 'purchase') {
          // One-time cost, not added to monthly
          hardwareCost = hardware.price;
        } else if (segment.hardwareAcquisitionType === 'rent') {
          // Monthly rent (5% of price)
          const monthlyRent = hardware.price * 0.05;
          discountedMonthlyFee += monthlyRent;
        } else if (segment.hardwareAcquisitionType === 'lease') {
          // Monthly lease payment with interest
          const interestRate = (segment.leaseInterestRate || 5) / 100;
          const months = segment.contractLengthYears * 12;
          const totalInterest = hardware.price * interestRate * segment.contractLengthYears;
          const monthlyPayment = (hardware.price + totalInterest) / months;
          discountedMonthlyFee += monthlyPayment;
        }
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
  
  const getFilteredSegments = () => {
    return segments.filter(segment => 
      (segment.isIndividualCustomer && showIndividualCustomers) || 
      (!segment.isIndividualCustomer && showSegments)
    );
  };
  
  return {
    showModal,
    showExportModal,
    currentSegment,
    isEdit,
    isIndividualCustomer,
    showIndividualCustomers,
    showSegments,
    setShowModal,
    setShowExportModal,
    setShowIndividualCustomers,
    setShowSegments,
    openAddModal,
    openAddIndividualCustomerModal,
    openEditModal,
    deleteSegment,
    handleSave,
    handleExport,
    calculateSegmentRevenue,
    getFilteredSegments
  };
};
