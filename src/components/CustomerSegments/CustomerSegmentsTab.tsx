
import React, { useState } from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { PlusCircle, Edit2, Trash2, UserPlus, Download } from 'lucide-react';
import { formatCurrency } from '../../utils/calculator';
import { Button } from '@/components/ui/button';
import { CustomerSegment, ExportOptions } from '../../types/calculator';
import CustomerSegmentModal from './CustomerSegmentModal';
import ExportResults from '../Export/ExportResults';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

interface CustomerSegmentsTabProps {
  t: TranslationObject;
  segments: CustomerSegment[];
  setSegments: (segments: CustomerSegment[]) => void;
  products: any[];
  currency: string;
  language: string;
}

const CustomerSegmentsTab: React.FC<CustomerSegmentsTabProps> = ({
  t,
  segments,
  setSegments,
  products,
  currency,
  language
}) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentSegment, setCurrentSegment] = useState<CustomerSegment | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isIndividualCustomer, setIsIndividualCustomer] = useState(false);
  
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
        title: t.exportReady,
        description: t.exportReadyDescription,
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
    const discountedMonthlyFee = monthlyFee * (1 - totalDiscountRate);
    
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
    
    const annualFee = discountedMonthlyFee * 12;
    const totalContractValue = annualFee * segment.contractLengthYears;
    
    // Calculate monthly per user fee
    const monthlyPerUserFee = discountedMonthlyFee / segment.employeeCount;
    
    return {
      monthly: discountedMonthlyFee,
      annual: annualFee,
      total: totalContractValue + (segment.hardwareAcquisitionType === 'purchase' ? hardwareCost : 0),
      monthlyPerUser: monthlyPerUserFee,
      hardwareCost
    };
  };
  
  // Segment filters
  const [showIndividualCustomers, setShowIndividualCustomers] = useState(true);
  const [showSegments, setShowSegments] = useState(true);
  
  const filteredSegments = segments.filter(segment => 
    (segment.isIndividualCustomer && showIndividualCustomers) || 
    (!segment.isIndividualCustomer && showSegments)
  );
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t.customerSegments}</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            <span>{t.export}</span>
          </Button>
          <Button 
            variant="outline"
            onClick={openAddIndividualCustomerModal}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-5 w-5" />
            <span>{t.addIndividualCustomer}</span>
          </Button>
          <Button 
            onClick={openAddModal}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>{t.addNewSegment}</span>
          </Button>
        </div>
      </div>
      
      <div className="mb-6 flex space-x-2">
        <Button
          variant={showSegments ? "default" : "outline"}
          onClick={() => setShowSegments(!showSegments)}
          size="sm"
        >
          {t.segments}
        </Button>
        <Button
          variant={showIndividualCustomers ? "default" : "outline"}
          onClick={() => setShowIndividualCustomers(!showIndividualCustomers)}
          size="sm"
        >
          {t.individualCustomers}
        </Button>
      </div>
      
      {filteredSegments.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {showIndividualCustomers && showSegments
              ? t.noCustomerSegmentsOrIndividuals
              : showIndividualCustomers 
                ? t.noIndividualCustomers 
                : t.noCustomerSegments}
          </p>
          {showIndividualCustomers && (
            <Button 
              onClick={openAddIndividualCustomerModal}
              variant="outline"
              className="mx-auto mb-2"
            >
              {t.addIndividualCustomer}
            </Button>
          )}
          {showSegments && (
            <Button 
              onClick={openAddModal}
              variant="outline"
              className="mx-auto"
            >
              {t.addNewSegment}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSegments.map(segment => {
            const revenue = calculateSegmentRevenue(segment);
            const hardwareProduct = segment.includesHardware && segment.hardwareId
              ? products.find(p => p.id === segment.hardwareId)
              : null;
              
            return (
              <div key={segment.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{segment.name}</h3>
                      {segment.isIndividualCustomer && (
                        <Badge variant="outline" className="text-xs">{t.individualCustomer}</Badge>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t[segment.type as keyof TranslationObject] as string}
                      </p>
                      {segment.includesHardware && (
                        <Badge className="ml-2 text-xs" variant="secondary">
                          {t[segment.hardwareAcquisitionType as keyof TranslationObject] as string}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => openEditModal(segment)} className="text-blue-600 dark:text-blue-400">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button onClick={() => deleteSegment(segment.id)} className="text-red-600 dark:text-red-400">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.employeeCount}:</span>
                    <span className="font-medium">{segment.employeeCount}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.monthlyPerUserFee}:</span>
                    <span className="font-medium">
                      {formatCurrency(revenue.monthlyPerUser, currency, language)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.monthlyFee}:</span>
                    <span className="font-medium">
                      {formatCurrency(revenue.monthly, currency, language)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.annualRecurringRevenue}:</span>
                    <span className="font-medium">
                      {formatCurrency(revenue.annual, currency, language)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.totalContractValue}:</span>
                    <span className="font-medium">
                      {formatCurrency(revenue.total, currency, language)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.contractLength}:</span>
                    <span className="font-medium">{segment.contractLengthYears} {t.years}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.subscriptionType}:</span>
                    <span className="font-medium">
                      {segment.subscriptionType === 'mrr-no-commitment' ? t.mrrNoCommitment : t.arrWithCommitment}
                    </span>
                  </div>
                  
                  {segment.includesHardware && hardwareProduct && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-medium mb-2">{t.hardwareDetails}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{t.hardware}:</span>
                          <span className="font-medium">{hardwareProduct.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{t.acquisitionType}:</span>
                          <span className="font-medium">
                            {t[segment.hardwareAcquisitionType as keyof TranslationObject] as string}
                          </span>
                        </div>
                        {segment.hardwareAcquisitionType === 'lease' && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">{t.interestRate}:</span>
                            <span className="font-medium">{segment.leaseInterestRate}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {segment.products.length > 0 && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-2">{t.segmentProducts}</h4>
                    <ul className="space-y-1 text-sm">
                      {segment.products.map(productId => {
                        const product = products.find(p => p.id === productId);
                        return product ? (
                          <li key={productId} className="text-gray-600 dark:text-gray-400">
                            {product.name}
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                )}
                
                {segment.isIndividualCustomer && segment.customerName && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium mb-2">{t.customerDetails}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">{t.name}:</span>
                        <span>{segment.customerName}</span>
                      </div>
                      {segment.customerEmail && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{t.email}:</span>
                          <span>{segment.customerEmail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      
      {showModal && (
        <CustomerSegmentModal
          t={t}
          segment={isEdit ? currentSegment : isIndividualCustomer ? { ...currentSegment, isIndividualCustomer: true } : currentSegment}
          products={products}
          isEdit={isEdit}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
      
      <ExportResults
        t={t}
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />
    </div>
  );
};

export default CustomerSegmentsTab;
