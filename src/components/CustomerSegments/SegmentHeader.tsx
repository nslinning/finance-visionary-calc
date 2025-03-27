
import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import SegmentActions from './SegmentActions';

interface SegmentHeaderProps {
  t: TranslationObject;
  openAddModal: () => void;
  openAddIndividualCustomerModal: () => void;
  openExportModal: () => void;
}

const SegmentHeader: React.FC<SegmentHeaderProps> = ({
  t,
  openAddModal,
  openAddIndividualCustomerModal,
  openExportModal
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">{t.customerSegments}</h2>
      <SegmentActions
        t={t}
        openAddModal={openAddModal}
        openAddIndividualCustomerModal={openAddIndividualCustomerModal}
        openExportModal={openExportModal}
      />
    </div>
  );
};

export default SegmentHeader;
