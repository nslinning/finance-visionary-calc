
import React from 'react';
import { Settings, Download } from 'lucide-react';
import { TranslationObject } from '../../constants/calculator/types';
import { Button } from '@/components/ui/button';

interface CalculatorHeaderProps {
  t: TranslationObject;
  setShowSettings: (show: boolean) => void;
  setShowExport?: (show: boolean) => void;
}

const CalculatorHeader: React.FC<CalculatorHeaderProps> = ({ 
  t, 
  setShowSettings,
  setShowExport
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            <span className="text-blue-600">STÖ ANALYTICS</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t.subtitle}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {setShowExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExport(true)}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span>{t.export}</span>
            </Button>
          )}
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default CalculatorHeader;
