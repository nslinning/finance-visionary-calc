
import React, { useState } from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/calculator';
import { Button } from '@/components/ui/button';
import { CustomerSegment } from '../../types/calculator';
import CustomerSegmentModal from './CustomerSegmentModal';

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
  const [showModal, setShowModal] = useState(false);
  const [currentSegment, setCurrentSegment] = useState<CustomerSegment | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  
  const openAddModal = () => {
    setCurrentSegment(null);
    setIsEdit(false);
    setShowModal(true);
  };
  
  const openEditModal = (segment: CustomerSegment) => {
    setCurrentSegment({ ...segment });
    setIsEdit(true);
    setShowModal(true);
  };
  
  const deleteSegment = (id: number) => {
    setSegments(segments.filter(s => s.id !== id));
  };
  
  const handleSave = (segment: CustomerSegment) => {
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
  
  // Calculate annual value
  const calculateAnnualValue = (segment: CustomerSegment) => {
    const monthlyFee = segment.licenseFeePerUser * segment.employeeCount;
    
    // Apply discounts
    const volumeDiscount = segment.volumeDiscountRate / 100;
    const contractDiscount = segment.contractLengthDiscountRate / 100;
    const customDiscount = segment.customDiscountRate / 100;
    
    const totalDiscountRate = volumeDiscount + contractDiscount + customDiscount;
    const discountedMonthlyFee = monthlyFee * (1 - totalDiscountRate);
    
    return discountedMonthlyFee * 12;
  };
  
  // Calculate total contract value
  const calculateTotalContractValue = (segment: CustomerSegment) => {
    const annualValue = calculateAnnualValue(segment);
    return annualValue * segment.contractLengthYears;
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t.customerSegments}</h2>
        <Button 
          onClick={openAddModal}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          <span>{t.addNewSegment}</span>
        </Button>
      </div>
      
      {segments.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Ingen kundesegmenter er opprettet ennå.
          </p>
          <Button 
            onClick={openAddModal}
            variant="outline"
            className="mx-auto"
          >
            {t.addNewSegment}
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {segments.map(segment => (
            <div key={segment.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{segment.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t[segment.type as keyof typeof t]}</p>
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
                  <span className="text-gray-600 dark:text-gray-400">{t.monthlyFee}:</span>
                  <span className="font-medium">
                    {formatCurrency(segment.licenseFeePerUser * segment.employeeCount, currency, language)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t.annualRecurringRevenue}:</span>
                  <span className="font-medium">
                    {formatCurrency(calculateAnnualValue(segment), currency, language)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t.totalContractValue}:</span>
                  <span className="font-medium">
                    {formatCurrency(calculateTotalContractValue(segment), currency, language)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t.contractLength}:</span>
                  <span className="font-medium">{segment.contractLengthYears} {t.years}</span>
                </div>
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
            </div>
          ))}
        </div>
      )}
      
      {showModal && (
        <CustomerSegmentModal
          t={t}
          segment={currentSegment}
          products={products}
          isEdit={isEdit}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CustomerSegmentsTab;
