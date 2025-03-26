
import React, { useState } from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { IncomeStream, SubscriptionValue, SalesValue } from '../../types/calculator';
import CategorySection from './CategorySection';

interface IncomeStreamsTabProps {
  t: TranslationObject;
  incomeStreams: IncomeStream[];
  setIncomeStreams: React.Dispatch<React.SetStateAction<IncomeStream[]>>;
  currency: string;
  language: string;
}

const IncomeStreamsTab: React.FC<IncomeStreamsTabProps> = ({ 
  t, 
  incomeStreams, 
  setIncomeStreams,
  currency,
  language
}) => {
  const updateIncomeStreamValue = (streamId: number, periodId: number, field: string, value: number) => {
    setIncomeStreams(prevStreams => {
      return prevStreams.map(stream => {
        if (stream.id === streamId) {
          const updatedValues = stream.values.map(val => {
            if (val.periodId === periodId) {
              if (stream.type === 'subscription' && 'subscribers' in val) {
                return { 
                  ...val, 
                  [field]: value 
                } as SubscriptionValue;
              } else if (stream.type === 'sales' && 'revenue' in val) {
                return { 
                  ...val, 
                  [field]: value 
                } as SalesValue;
              }
            }
            return val;
          });
          
          return {
            ...stream,
            values: updatedValues
          };
        }
        return stream;
      });
    });
  };
  
  // Group income streams by category for better visualization
  const streamsByCategory: Record<string, IncomeStream[]> = {};
  incomeStreams.forEach(stream => {
    if (!streamsByCategory[stream.category]) {
      streamsByCategory[stream.category] = [];
    }
    streamsByCategory[stream.category].push(stream);
  });
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">{t.incomeStreams}</h2>
      
      {Object.entries(streamsByCategory).map(([category, streams]) => (
        <CategorySection
          key={category}
          category={category}
          streams={streams}
          t={t}
          updateIncomeStreamValue={updateIncomeStreamValue}
          currency={currency}
          language={language}
        />
      ))}
    </div>
  );
};

export default IncomeStreamsTab;
