
import React from 'react';
import { Button } from '@/components/ui/button';
import { TranslationObject } from '../../constants/calculator/types';
import { CustomerSegment } from '../../types/calculator';
import { FieldErrors } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface SegmentModalContainerProps {
  t: TranslationObject;
  isEdit: boolean;
  formData: CustomerSegment;
  errors?: FieldErrors;
  isValid?: boolean;
  children: React.ReactNode;
  onSave: () => void;
  onCancel: () => void;
}

const SegmentModalContainer: React.FC<SegmentModalContainerProps> = ({
  t,
  isEdit,
  formData,
  errors,
  isValid,
  children,
  onSave,
  onCancel
}) => {
  // Count total errors
  const errorCount = errors ? Object.keys(errors).length : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            {isEdit ? t.editSegment : formData.isIndividualCustomer ? t.addIndividualCustomer : t.addNewSegment}
          </h3>

          {errorCount > 0 && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errorCount === 1 ? 'There is 1 error in the form' : `There are ${errorCount} errors in the form`}. 
                Please check the highlighted fields.
              </AlertDescription>
            </Alert>
          )}
          
          {children}
          
          <div className="flex justify-end mt-6 space-x-2">
            <Button variant="outline" onClick={onCancel} type="button">
              {t.cancel}
            </Button>
            <Button onClick={onSave} disabled={!isValid && errorCount > 0} type="submit">
              {isEdit ? t.update : t.add}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentModalContainer;
