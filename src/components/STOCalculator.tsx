
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import custom hooks and types
import { useCalculatorState } from '../hooks/useCalculatorState';
import { ExportOptions } from '../types/calculator';

// Import components
import CalculatorHeader from './Header/CalculatorHeader';
import TabNavigation from './Navigation/TabNavigation';
import DashboardTab from './Dashboard/DashboardTab';
import ProductsTab from './Products/ProductsTab';
import ProductModal from './Products/ProductModal';
import SettingsModal from './Settings/SettingsModal';
import IncomeStreamsTab from './IncomeStreams/IncomeStreamsTab';
import FixedCostsTab from './FixedCosts/FixedCostsTab';
import TimelinePlanningTab from './Timeline/TimelinePlanningTab';
import CustomerSegmentsTab from './CustomerSegments/CustomerSegmentsTab';
import ExportResults from './Export/ExportResults';
import { useToast } from '@/components/ui/use-toast';

// Main component
const STOCalculator = () => {
  const [language, setLanguage] = useState('no'); // Norwegian as default
  const [theme, setTheme] = useState('light');
  const [showExport, setShowExport] = useState(false);
  const { toast } = useToast();
  
  const {
    activeTab,
    products,
    segments,
    incomeStreams,
    fixedCosts,
    results,
    cashFlowResults,
    showModal,
    modalType,
    editingProduct,
    newProduct,
    showSettings,
    t,
    productMetrics,
    expandedMetrics,
    filteredCategory,
    filteredProducts,
    currency,
    summaryMetrics,
    categoryMetrics,
    periods,
    getProductCategories,
    getRevenueTypes,
    
    // Methods
    setActiveTab,
    setIncomeStreams,
    setFixedCosts,
    setShowSettings,
    setPeriods,
    setSegments,
    toggleMetricExpansion,
    editProduct,
    deleteProduct,
    updateProduct,
    addNewProduct,
    setFilteredCategory,
    openAddProductModal,
    updateNewProductState,
    updateEditingProductState,
    setShowModal,
    setCurrency,
    translateCategoryName
  } = useCalculatorState(language, theme);
  
  const handleExport = (options: ExportOptions) => {
    // In a real application, this would generate the export
    toast({
      title: t.exportPreparing,
      description: t.exportPreparingDescription,
    });
    
    // Mock a delay for export generation
    setTimeout(() => {
      toast({
        title: t.exportReady,
        description: t.exportReadyDescription,
      });
    }, 2000);
  };
  
  const renderModal = () => {
    if (modalType === 'editProduct') {
      return (
        <ProductModal
          t={t}
          isEdit={true}
          productData={editingProduct}
          getProductCategories={getProductCategories}
          getRevenueTypes={getRevenueTypes}
          updateProductState={updateEditingProductState}
          handleSave={updateProduct}
          handleCancel={() => {
            setShowModal(false);
          }}
        />
      );
    } else if (modalType === 'addProduct') {
      return (
        <ProductModal
          t={t}
          isEdit={false}
          productData={newProduct}
          getProductCategories={getProductCategories}
          getRevenueTypes={getRevenueTypes}
          updateProductState={updateNewProductState}
          handleSave={addNewProduct}
          handleCancel={() => {
            setShowModal(false);
          }}
        />
      );
    }
    
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <CalculatorHeader 
        t={t} 
        setShowSettings={setShowSettings} 
        setShowExport={setShowExport}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} t={t} />
        
        <main>
          {activeTab === 'dashboard' && (
            <DashboardTab
              t={t}
              summaryMetrics={summaryMetrics}
              results={results}
              cashFlowResults={cashFlowResults}
              categoryMetrics={categoryMetrics}
              currency={currency}
              language={language}
              getCategoryName={translateCategoryName}
            />
          )}
          
          {activeTab === 'timeline' && (
            <TimelinePlanningTab
              t={t}
              setPeriods={setPeriods}
            />
          )}
          
          {activeTab === 'products' && (
            <ProductsTab
              t={t}
              filteredProducts={filteredProducts}
              expandedMetrics={expandedMetrics}
              productMetrics={productMetrics}
              filteredCategory={filteredCategory}
              getCategoryName={translateCategoryName}
              getRevenueTypeName={(id) => t.revenueTypes[id as keyof typeof t.revenueTypes] || id}
              getProductCategories={getProductCategories}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
              toggleMetricExpansion={toggleMetricExpansion}
              setFilteredCategory={setFilteredCategory}
              openAddProductModal={openAddProductModal}
              currency={currency}
              language={language}
            />
          )}
          
          {activeTab === 'customerSegments' && (
            <CustomerSegmentsTab
              t={t}
              segments={segments}
              setSegments={setSegments}
              products={products}
              currency={currency}
              language={language}
            />
          )}
          
          {activeTab === 'incomeStreams' && 
            <IncomeStreamsTab 
              t={t} 
              incomeStreams={incomeStreams}
              setIncomeStreams={setIncomeStreams}
              currency={currency}
              language={language}
            />
          }
          
          {activeTab === 'fixedCosts' && 
            <FixedCostsTab 
              t={t} 
              fixedCosts={fixedCosts}
              setFixedCosts={setFixedCosts}
              currency={currency}
              language={language}
            />
          }
        </main>
      </div>
      
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderModal()}
          </motion.div>
        )}
        
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SettingsModal
              t={t}
              language={language}
              currency={currency}
              theme={theme}
              setLanguage={setLanguage}
              setCurrency={setCurrency}
              setTheme={setTheme}
              closeModal={() => setShowSettings(false)}
            />
          </motion.div>
        )}
        
        {showExport && (
          <ExportResults
            t={t}
            isOpen={showExport}
            onClose={() => setShowExport(false)}
            onExport={handleExport}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default STOCalculator;
