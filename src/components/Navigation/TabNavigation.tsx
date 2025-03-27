
import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  t: TranslationObject;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  t
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
      <nav className="flex -mb-px space-x-5 overflow-x-auto">
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'dashboard'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          {t.dashboard}
        </button>
        
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'timeline'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('timeline')}
        >
          {t.timelinePlanning}
        </button>
        
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'products'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('products')}
        >
          {t.products}
        </button>
        
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'customerSegments'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('customerSegments')}
        >
          {t.customerSegments}
        </button>
        
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'incomeStreams'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('incomeStreams')}
        >
          {t.incomeStreams}
        </button>
        
        <button
          className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'fixedCosts'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('fixedCosts')}
        >
          {t.fixedCosts}
        </button>
      </nav>
    </div>
  );
};

export default TabNavigation;
