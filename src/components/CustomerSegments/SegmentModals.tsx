
import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { CustomerSegment, ExportOptions } from '../../types/calculator';
import CustomerSegmentModal from './CustomerSegmentModal';
import ExportResults from '../Export/ExportResults';

interface SegmentModalsProps {
  t: TranslationObject;
  products: any[];
  showModal: boolean;
  showExportModal: boolean;
  currentSegment: CustomerSegment | null;
  isEdit: boolean;
  isIndividualCustomer: boolean;
  onSave: (segment: CustomerSegment) => void;
  onExport: (options: ExportOptions) => void;
  onCloseModal: () => void;
  onCloseExportModal: () => void;
}

const SegmentModals: React.FC<SegmentModalsProps> = ({
  t,
  products,
  showModal,
  showExportModal,
  currentSegment,
  isEdit,
  isIndividualCustomer,
  onSave,
  onExport,
  onCloseModal,
  onCloseExportModal
}) => {
  return (
    <>
      {showModal && (
        <CustomerSegmentModal
          t={t}
          segment={isEdit ? currentSegment : isIndividualCustomer ? { ...currentSegment, isIndividualCustomer: true } : currentSegment}
          products={products}
          isEdit={isEdit}
          onSave={onSave}
          onCancel={onCloseModal}
        />
      )}
      
      <ExportResults
        t={t}
        isOpen={showExportModal}
        onClose={onCloseExportModal}
        onExport={onExport}
      />
    </>
  );
};

export default SegmentModals;
