
import { TranslationObject } from './types';
import { englishTranslations } from './languages/en';
import { norwegianTranslations } from './languages/no';

export const translations: {
  [key: string]: TranslationObject
} = {
  en: englishTranslations,
  no: norwegianTranslations
};
