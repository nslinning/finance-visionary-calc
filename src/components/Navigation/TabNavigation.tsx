import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  t: TranslationObject;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, t }) => {
  return (
    <nav className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`px-4 py-2 mr-2 rounded-t-lg ${
          activeTab === 'dashboard'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        {t.dashboard}
      </button>
      <button
        onClick={() => setActiveTab('products')}
        className={`px-4 py-2 mr-2 rounded-t-lg ${
          activeTab === 'products'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        {t.products}
      </button>
      <button
        onClick={() => setActiveTab('incomeStreams')}
        className={`px-4 py-2 mr-2 rounded-t-lg ${
          activeTab === 'incomeStreams'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        {t.incomeStreams}
      </button>
      <button
        onClick={() => setActiveTab('fixedCosts')}
        className={`px-4 py-2 rounded-t-lg ${
          activeTab === 'fixedCosts'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        {t.fixedCosts}
      </button>
    </nav>
  );
};

export default TabNavigation;
