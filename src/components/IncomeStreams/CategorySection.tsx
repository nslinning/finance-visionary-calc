
import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { IncomeStream } from '../../types/calculator';
import IncomeStreamCard from './IncomeStreamCard';

interface CategorySectionProps {
  category: string;
  streams: IncomeStream[];
  t: TranslationObject;
  updateIncomeStreamValue: (streamId: number, periodId: number, field: string, value: number) => void;
  currency: string;
  language: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  category, 
  streams, 
  t, 
  updateIncomeStreamValue, 
  currency, 
  language 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3 border-b pb-2 dark:border-gray-700">
        {t.productCategories[category as keyof typeof t.productCategories]}
      </h3>
      
      <div className="space-y-4">
        {streams.map(stream => (
          <IncomeStreamCard
            key={stream.id}
            stream={stream}
            t={t}
            updateIncomeStreamValue={updateIncomeStreamValue}
            currency={currency}
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
