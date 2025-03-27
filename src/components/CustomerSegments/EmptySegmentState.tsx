
import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { Button } from '@/components/ui/button';

interface EmptySegmentStateProps {
  t: TranslationObject;
  showIndividualCustomers: boolean;
  showSegments: boolean;
  openAddModal: () => void;
  openAddIndividualCustomerModal: () => void;
}

const EmptySegmentState: React.FC<EmptySegmentStateProps> = ({
  t,
  showIndividualCustomers,
  showSegments,
  openAddModal,
  openAddIndividualCustomerModal
}) => {
  return (
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
  );
};

export default EmptySegmentState;
