
import { CURRENCY_RATES, CURRENCY_SYMBOLS } from '../../constants/calculator/currency';
import { translations } from '../../constants/calculator/translations';

// Format number with currency
export const formatCurrency = (num: number, currency: string, language: string) => {
  const value = num * CURRENCY_RATES[currency as keyof typeof CURRENCY_RATES];
  const formattedValue = new Intl.NumberFormat(language === 'no' ? 'nb-NO' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(value));
  
  return currency === 'USD' 
    ? `${CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]}${formattedValue}` 
    : `${formattedValue} ${CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]}`;
};

// Get translated category name safely
export const getCategoryName = (categoryId: string, language: string): string => {
  const t = translations[language];
  return t.productCategories[categoryId as keyof typeof t.productCategories] || categoryId;
};

// Get translated revenue type name safely
export const getRevenueTypeName = (typeId: string, language: string): string => {
  const t = translations[language];
  return t.revenueTypes[typeId as keyof typeof t.revenueTypes] || typeId;
};
