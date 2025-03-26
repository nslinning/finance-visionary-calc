
import React from 'react';
import { TranslationObject } from '../../constants/calculator';

interface PlaceholderTabProps {
  title: string;
}

const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ title }) => (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    <p>Management UI will be implemented here</p>
  </div>
);

export const FixedCostsTab: React.FC<{ t: TranslationObject }> = ({ t }) => (
  <PlaceholderTab title={t.fixedCosts} />
);
