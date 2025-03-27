
import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { CustomerSegment, Product } from '../../types/calculator';
import SegmentFilters from './SegmentFilters';
import SegmentsList from './SegmentsList';
import EmptySegmentState from './EmptySegmentState';

interface SegmentContentProps {
  t: TranslationObject;
  segments: CustomerSegment[];
  products: Product[];
  currency: string;
  language: string;
  showIndividualCustomers: boolean;
  showSegments: boolean;
  setShowIndividualCustomers: (show: boolean) => void;
  setShowSegments: (show: boolean) => void;
  calculateSegmentRevenue: (segment: CustomerSegment) => any;
  onEdit: (segment: CustomerSegment) => void;
  onDelete: (id: number) => void;
  openAddModal: () => void;
  openAddIndividualCustomerModal: () => void;
  filteredSegments: CustomerSegment[];
}

const SegmentContent: React.FC<SegmentContentProps> = ({
  t,
  segments,
  products,
  currency,
  language,
  showIndividualCustomers,
  showSegments,
  setShowIndividualCustomers,
  setShowSegments,
  calculateSegmentRevenue,
  onEdit,
  onDelete,
  openAddModal,
  openAddIndividualCustomerModal,
  filteredSegments
}) => {
  return (
    <>
      <SegmentFilters
        t={t}
        showSegments={showSegments}
        showIndividualCustomers={showIndividualCustomers}
        setShowSegments={setShowSegments}
        setShowIndividualCustomers={setShowIndividualCustomers}
      />
      
      {filteredSegments.length === 0 ? (
        <EmptySegmentState
          t={t}
          showIndividualCustomers={showIndividualCustomers}
          showSegments={showSegments}
          openAddModal={openAddModal}
          openAddIndividualCustomerModal={openAddIndividualCustomerModal}
        />
      ) : (
        <SegmentsList
          t={t}
          segments={filteredSegments}
          products={products}
          currency={currency}
          language={language}
          calculateSegmentRevenue={calculateSegmentRevenue}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
};

export default SegmentContent;
