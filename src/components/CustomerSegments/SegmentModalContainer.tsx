
import React from 'react';
import { Button } from '@/components/ui/button';
import { TranslationObject } from '../../constants/calculator/types';
import { CustomerSegment } from '../../types/calculator';

interface SegmentModalContainerProps {
  t: TranslationObject;
  isEdit: boolean;
  formData: CustomerSegment;
  children: React.ReactNode;
  onSave: (segment: CustomerSegment) => void;
  onCancel: () => void;
}

const SegmentModalContainer: React.FC<SegmentModalContainerProps> = ({
  t,
  isEdit,
  formData,
  children,
  onSave,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            {isEdit ? t.editSegment : formData.isIndividualCustomer ? t.addIndividualCustomer : t.addNewSegment}
          </h3>
          
          {children}
          
          <div className="flex justify-end mt-6 space-x-2">
            <Button variant="outline" onClick={onCancel}>
              {t.cancel}
            </Button>
            <Button onClick={() => onSave(formData)}>
              {isEdit ? t.update : t.add}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentModalContainer;
