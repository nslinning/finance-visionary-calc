
import React from 'react';
import { TranslationObject } from '../../constants/calculator';

interface SettingsModalProps {
  t: TranslationObject;
  language: string;
  currency: string;
  theme: string;
  setLanguage: (lang: string) => void;
  setCurrency: (currency: string) => void;
  setTheme: (theme: string) => void;
  closeModal: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  t,
  language,
  currency,
  theme,
  setLanguage,
  setCurrency,
  setTheme,
  closeModal
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">{t.settings}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.language}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
              >
                <option value="en">English</option>
                <option value="no">Norsk</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.currency}
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="NOK">NOK (kr)</option>
                <option value="DKK">DKK (kr)</option>
                <option value="SEK">SEK (kr)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.theme}
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
              >
                <option value="light">{t.light}</option>
                <option value="dark">{t.dark}</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={closeModal}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {t.update}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
