
import React, { useState, useEffect, useMemo } from 'react';
import { Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import types and constants
import { 
  PRODUCT_CATEGORIES, 
  REVENUE_TYPES,
  translations, 
  initialPeriods, 
  initialProducts, 
  initialIncomeStreams, 
  initialFixedCosts,
  defaultNewProduct
} from '../constants/calculator';

// Import types
import { 
  Product, 
  CashFlowResult, 
  ResultData, 
  ProductMetric, 
  CategoryMetrics,
  SummaryMetrics,
  NewProduct
} from '../types/calculator';

// Import utils
import { 
  formatCurrency, 
  getCategoryName, 
  getRevenueTypeName,
  calculateResults,
  calculateProductMetrics,
  calculateCashFlow
} from '../utils/calculatorUtils';

// Import components
import DashboardTab from './Dashboard/DashboardTab';
import ProductsTab from './Products/ProductsTab';
import ProductModal from './Products/ProductModal';
import SettingsModal from './Settings/SettingsModal';
import { FixedCostsTab } from './Placeholders/PlaceholderTabs';
import IncomeStreamsTab from './IncomeStreams/IncomeStreamsTab';

// Main component
const STOCalculator = () => {
  const [periods, setPeriods] = useState(initialPeriods);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [incomeStreams, setIncomeStreams] = useState(initialIncomeStreams);
  const [fixedCosts, setFixedCosts] = useState(initialFixedCosts);
  const [vatRate, setVatRate] = useState(0.25);
  const [results, setResults] = useState<ResultData[]>([]);
  const [cashFlowResults, setCashFlowResults] = useState<CashFlowResult[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productMetrics, setProductMetrics] = useState<ProductMetric[]>([]);
  const [expandedMetrics, setExpandedMetrics] = useState<Record<number, boolean>>({});
  const [filteredCategory, setFilteredCategory] = useState('all');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('light');
  const [showSettings, setShowSettings] = useState(false);
  
  // New product state
  const [newProduct, setNewProduct] = useState<NewProduct>(defaultNewProduct);
  
  // Get translations based on selected language
  const t = translations[language];

  // Get category names with translations
  const getProductCategories = useMemo(() => {
    return PRODUCT_CATEGORIES.map(cat => ({
      ...cat,
      name: getCategoryName(cat.id, language)
    }));
  }, [language]);

  // Get revenue type names with translations
  const getRevenueTypes = useMemo(() => {
    return REVENUE_TYPES.map(type => ({
      ...type,
      name: getRevenueTypeName(type.id, language)
    }));
  }, [language]);
  
  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);
  
  // Calculate results whenever inputs change
  useEffect(() => {
    const calculatedResults = calculateResults(periods, incomeStreams, products, fixedCosts, vatRate);
    setResults(calculatedResults);
    
    const cashFlow = calculateCashFlow(periods, calculatedResults);
    setCashFlowResults(cashFlow);
  }, [periods, products, incomeStreams, fixedCosts, vatRate]);
  
  // Calculate product metrics
  useEffect(() => {
    const metrics = calculateProductMetrics(products);
    setProductMetrics(metrics);
  }, [products]);

  // Toggle specific product metric expansion
  const toggleMetricExpansion = (productId: number) => {
    setExpandedMetrics({
      ...expandedMetrics,
      [productId]: !expandedMetrics[productId]
    });
  };
  
  // Edit a product
  const editProduct = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditingProduct(product);
      setModalType('editProduct');
      setShowModal(true);
    }
  };
  
  // Update existing product
  const updateProduct = () => {
    if (!editingProduct) return;
    
    const cost = editingProduct.type === 'product' 
      ? ((editingProduct as any).productionCost + (editingProduct as any).logisticsCost + editingProduct.marketingCost)
      : ((editingProduct as any).operationalCost + editingProduct.marketingCost);
    
    const margin = editingProduct.price - cost;
    const marginPercentage = editingProduct.price > 0 ? margin / editingProduct.price : 0;
    
    // Create updated product with recalculated values
    const updatedProduct = {
      ...editingProduct,
      cost,
      margin,
      marginPercentage
    };
    
    // Update products state
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    
    // Close modal
    setShowModal(false);
    setEditingProduct(null);
  };
  
  // Add new product
  const addNewProduct = () => {
    // Calculate costs based on product type
    const cost = newProduct.type === 'product'
      ? (newProduct.productionCost + newProduct.logisticsCost + newProduct.marketingCost)
      : (newProduct.operationalCost + newProduct.marketingCost);
    
    // Calculate margin
    const margin = newProduct.price - cost;
    const marginPercentage = newProduct.price > 0 ? margin / newProduct.price : 0;
    
    // Assign an ID to the new product
    const newId = Math.max(0, ...products.map(p => p.id)) + 1;
    
    // Create product object with all properties
    const productToAdd: Product = {
      ...newProduct,
      id: newId,
      cost,
      margin,
      marginPercentage,
      averageOrderValue: newProduct.averageOrderValue || newProduct.price,
      type: newProduct.type as 'product' | 'service'
    } as Product;
    
    // Add product to state
    setProducts([...products, productToAdd]);
    
    // Reset form
    setNewProduct(defaultNewProduct);
    
    // Close modal
    setShowModal(false);
  };
  
  // Delete a product
  const deleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  
  // Update new product form state
  const updateNewProductState = (field: string, value: any) => {
    setNewProduct({
      ...newProduct,
      [field]: value
    });
  };
  
  // Update editing product form state
  const updateEditingProductState = (field: string, value: any) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [field]: value
      });
    }
  };
  
  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (filteredCategory === 'all') {
      return products;
    }
    return products.filter(p => p.category === filteredCategory);
  }, [products, filteredCategory]);
  
  // Calculate summary metrics
  const summaryMetrics = useMemo(() => {
    if (results.length === 0) return null;
    
    // Total revenue across all periods
    const totalRevenue = results.reduce((sum, r) => sum + r.revenue, 0);
    
    // Average gross margin percentage
    const avgGrossMargin = results.reduce((sum, r) => sum + r.grossMarginPercentage, 0) / results.length;
    
    // Ending liquidity (last period's cumulative cash flow)
    const endingLiquidity = cashFlowResults.length > 0 
      ? cashFlowResults[cashFlowResults.length - 1].cumulativeCashFlow || 0
      : 0;
    
    // Latest operating result
    const latestOperatingResult = results.length > 0
      ? results[results.length - 1].operatingResult
      : 0;
    
    return {
      totalRevenue,
      avgGrossMargin,
      endingLiquidity,
      latestOperatingResult
    };
  }, [results, cashFlowResults]);
  
  // Calculate category-specific metrics
  const categoryMetrics = useMemo(() => {
    // Group revenue by category
    const revenueByCategory: Record<string, number> = {};
    
    // Process income streams
    incomeStreams.forEach(stream => {
      const category = stream.category;
      if (!revenueByCategory[category]) {
        revenueByCategory[category] = 0;
      }
      
      // Sum up revenue across all periods
      stream.values.forEach(value => {
        if ('revenue' in value) {
          revenueByCategory[category] += value.revenue;
        } else if ('subscribers' in value && 'averageRevenue' in value) {
          revenueByCategory[category] += value.subscribers * value.averageRevenue;
        }
      });
    });
    
    // Calculate average metrics by category
    const metricsByCategory: Record<string, CategoryMetrics> = {};
    
    PRODUCT_CATEGORIES.forEach(cat => {
      const categoryProducts = products.filter(p => p.category === cat.id);
      
      if (categoryProducts.length > 0) {
        const avgCAC = categoryProducts.reduce((sum, p) => sum + p.acquisitionCost, 0) / categoryProducts.length;
        
        const avgCLV = productMetrics
          .filter(m => m.category === cat.id)
          .reduce((sum, m) => sum + m.clv, 0) / categoryProducts.length;
        
        const avgAOV = categoryProducts.reduce((sum, p) => sum + (p.averageOrderValue || p.price), 0) / categoryProducts.length;
        
        const avgCPO = productMetrics
          .filter(m => m.category === cat.id)
          .reduce((sum, m) => sum + m.cpo, 0) / categoryProducts.length;
        
        metricsByCategory[cat.id] = {
          avgCAC,
          avgCLV,
          avgAOV,
          avgCPO,
          revenue: revenueByCategory[cat.id] || 0
        };
      }
    });
    
    return metricsByCategory;
  }, [products, incomeStreams, productMetrics]);

  // Open the add product modal
  const openAddProductModal = () => {
    setModalType('addProduct');
    setShowModal(true);
  };

  // Get translation wrappers for component props
  const translateCategoryName = (categoryId: string): string => {
    return getCategoryName(categoryId, language);
  };
  
  const translateRevenueTypeName = (typeId: string): string => {
    return getRevenueTypeName(typeId, language);
  };
  
  // Render the modals based on modal type
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
            setEditingProduct(null);
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
            setNewProduct(defaultNewProduct);
          }}
        />
      );
    }
    
    return null;
  };
  
  // Main render
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.subtitle}</p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
          
          {activeTab === 'products' && (
            <ProductsTab
              t={t}
              filteredProducts={filteredProducts}
              expandedMetrics={expandedMetrics}
              productMetrics={productMetrics}
              filteredCategory={filteredCategory}
              getCategoryName={translateCategoryName}
              getRevenueTypeName={translateRevenueTypeName}
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
          
          {activeTab === 'incomeStreams' && 
            <IncomeStreamsTab 
              t={t} 
              incomeStreams={incomeStreams}
              setIncomeStreams={setIncomeStreams}
              currency={currency}
              language={language}
            />
          }
          
          {activeTab === 'fixedCosts' && <FixedCostsTab t={t} />}
        </main>
      </div>
      
      {/* Modals */}
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
      </AnimatePresence>
    </div>
  );
};

export default STOCalculator;
