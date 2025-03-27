
import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { CustomerSegment } from '../../types/calculator';
import { useSegmentManager } from '../../hooks/useSegmentManager';
import SegmentHeader from './SegmentHeader';
import SegmentContent from './SegmentContent';
import SegmentModals from './SegmentModals';

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
  const {
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
  } = useSegmentManager(segments, setSegments, products);

  const filteredSegments = getFilteredSegments();
  
  return (
    <div className="p-4">
      <SegmentHeader 
        t={t}
        openAddModal={openAddModal}
        openAddIndividualCustomerModal={openAddIndividualCustomerModal}
        openExportModal={() => setShowExportModal(true)}
      />
      
      <SegmentContent
        t={t}
        segments={segments}
        products={products}
        currency={currency}
        language={language}
        showIndividualCustomers={showIndividualCustomers}
        showSegments={showSegments}
        setShowIndividualCustomers={setShowIndividualCustomers}
        setShowSegments={setShowSegments}
        calculateSegmentRevenue={calculateSegmentRevenue}
        onEdit={openEditModal}
        onDelete={deleteSegment}
        openAddModal={openAddModal}
        openAddIndividualCustomerModal={openAddIndividualCustomerModal}
        filteredSegments={filteredSegments}
      />
      
      <SegmentModals
        t={t}
        products={products}
        showModal={showModal}
        showExportModal={showExportModal}
        currentSegment={currentSegment}
        isEdit={isEdit}
        isIndividualCustomer={isIndividualCustomer}
        onSave={handleSave}
        onExport={handleExport}
        onCloseModal={() => setShowModal(false)}
        onCloseExportModal={() => setShowExportModal(false)}
      />
    </div>
  );
};

export default CustomerSegmentsTab;
