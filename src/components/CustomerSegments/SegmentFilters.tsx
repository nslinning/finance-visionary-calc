
import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { Button } from '@/components/ui/button';

interface SegmentFiltersProps {
  t: TranslationObject;
  showSegments: boolean;
  showIndividualCustomers: boolean;
  setShowSegments: (show: boolean) => void;
  setShowIndividualCustomers: (show: boolean) => void;
}

const SegmentFilters: React.FC<SegmentFiltersProps> = ({
  t,
  showSegments,
  showIndividualCustomers,
  setShowSegments,
  setShowIndividualCustomers
}) => {
  return (
    <div className="mb-6 flex space-x-2">
      <Button
        variant={showSegments ? "default" : "outline"}
        onClick={() => setShowSegments(!showSegments)}
        size="sm"
      >
        {t.segments}
      </Button>
      <Button
        variant={showIndividualCustomers ? "default" : "outline"}
        onClick={() => setShowIndividualCustomers(!showIndividualCustomers)}
        size="sm"
      >
        {t.individualCustomers}
      </Button>
    </div>
  );
};

export default SegmentFilters;
