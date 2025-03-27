
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SegmentHeaderProps {
  t: TranslationObject;
  name: string;
  type: string;
  isIndividualCustomer: boolean;
  includesHardware: boolean;
  hardwareAcquisitionType?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const SegmentHeader: React.FC<SegmentHeaderProps> = ({
  t,
  name,
  type,
  isIndividualCustomer,
  includesHardware,
  hardwareAcquisitionType,
  onEdit,
  onDelete
}) => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          {isIndividualCustomer && (
            <Badge variant="outline" className="text-xs">{t.individualCustomer}</Badge>
          )}
        </div>
        <div className="flex items-center mt-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t[type as keyof TranslationObject] as string}
          </p>
          {includesHardware && hardwareAcquisitionType && (
            <Badge className="ml-2 text-xs" variant="secondary">
              {t[hardwareAcquisitionType as keyof TranslationObject] as string}
            </Badge>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <button onClick={onEdit} className="text-blue-600 dark:text-blue-400">
          <Edit2 className="h-5 w-5" />
        </button>
        <button onClick={onDelete} className="text-red-600 dark:text-red-400">
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SegmentHeader;
