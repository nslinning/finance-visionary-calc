
import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { CustomerSegment, Product } from '../../types/calculator';
import SegmentCard from './SegmentCard/SegmentCard';

interface SegmentsListProps {
  t: TranslationObject;
  segments: CustomerSegment[];
  products: Product[];
  currency: string;
  language: string;
  calculateSegmentRevenue: (segment: CustomerSegment) => any;
  onEdit: (segment: CustomerSegment) => void;
  onDelete: (id: number) => void;
}

const SegmentsList: React.FC<SegmentsListProps> = ({
  t,
  segments,
  products,
  currency,
  language,
  calculateSegmentRevenue,
  onEdit,
  onDelete
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {segments.map(segment => {
        const revenue = calculateSegmentRevenue(segment);
        
        return (
          <SegmentCard
            key={segment.id}
            t={t}
            segment={segment}
            revenue={revenue}
            products={products}
            currency={currency}
            language={language}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default SegmentsList;
