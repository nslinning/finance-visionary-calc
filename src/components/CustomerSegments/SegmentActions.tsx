
import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, UserPlus, Download } from 'lucide-react';

interface SegmentActionsProps {
  t: TranslationObject;
  openAddModal: () => void;
  openAddIndividualCustomerModal: () => void;
  openExportModal: () => void;
}

const SegmentActions: React.FC<SegmentActionsProps> = ({
  t,
  openAddModal,
  openAddIndividualCustomerModal,
  openExportModal
}) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline"
        onClick={openExportModal}
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
  );
};

export default SegmentActions;
