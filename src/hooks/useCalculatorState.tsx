
import { useState, useEffect, useMemo } from 'react';
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
import { 
  Product, 
  IncomeStream, 
  FixedCost, 
  Period, 
  ResultData, 
  CashFlowResult,
  ProductMetric,
  NewProduct
} from '../types/calculator';
import { 
  calculateResults,
  calculateProductMetrics,
  calculateCashFlow,
  getCategoryName,
  getRevenueTypeName
} from '../utils/calculatorUtils';

export const useCalculatorState = (language: string = 'en', theme: string = 'light') => {
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
  const [currency, setCurrency] = useState('USD');
  const [showSettings, setShowSettings] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>(defaultNewProduct);
  
  const t = translations[language];

  const getProductCategories = useMemo(() => {
    return PRODUCT_CATEGORIES.map(cat => ({
      ...cat,
      name: getCategoryName(cat.id, language)
    }));
  }, [language]);

  const getRevenueTypes = useMemo(() => {
    return REVENUE_TYPES.map(type => ({
      ...type,
      name: getRevenueTypeName(type.id, language)
    }));
  }, [language]);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);
  
  useEffect(() => {
    const calculatedResults = calculateResults(periods, incomeStreams, products, fixedCosts, vatRate);
    setResults(calculatedResults);
    
    const cashFlow = calculateCashFlow(periods, calculatedResults);
    setCashFlowResults(cashFlow);
  }, [periods, products, incomeStreams, fixedCosts, vatRate]);
  
  useEffect(() => {
    const metrics = calculateProductMetrics(products);
    setProductMetrics(metrics);
  }, [products]);

  const toggleMetricExpansion = (productId: number) => {
    setExpandedMetrics({
      ...expandedMetrics,
      [productId]: !expandedMetrics[productId]
    });
  };
  
  const editProduct = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditingProduct(product);
      setModalType('editProduct');
      setShowModal(true);
    }
  };
  
  const updateProduct = () => {
    if (!editingProduct) return;
    
    const cost = editingProduct.type === 'product' 
      ? ((editingProduct as any).productionCost + (editingProduct as any).logisticsCost + editingProduct.marketingCost)
      : ((editingProduct as any).operationalCost + editingProduct.marketingCost);
    
    const margin = editingProduct.price - cost;
    const marginPercentage = editingProduct.price > 0 ? margin / editingProduct.price : 0;
    
    const updatedProduct = {
      ...editingProduct,
      cost,
      margin,
      marginPercentage
    };
    
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    
    setShowModal(false);
    setEditingProduct(null);
  };
  
  const addNewProduct = () => {
    const cost = newProduct.type === 'product'
      ? (newProduct.productionCost + newProduct.logisticsCost + newProduct.marketingCost)
      : (newProduct.operationalCost + newProduct.marketingCost);
    
    const margin = newProduct.price - cost;
    const marginPercentage = newProduct.price > 0 ? margin / newProduct.price : 0;
    
    const newId = Math.max(0, ...products.map(p => p.id)) + 1;
    
    const productToAdd: Product = {
      ...newProduct,
      id: newId,
      cost,
      margin,
      marginPercentage,
      averageOrderValue: newProduct.averageOrderValue || newProduct.price,
      type: newProduct.type === 'product' ? 'product' : 'service'
    } as Product;
    
    setProducts([...products, productToAdd]);
    
    setNewProduct(defaultNewProduct);
    
    setShowModal(false);
  };
  
  const deleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  
  const updateNewProductState = (field: string, value: any) => {
    setNewProduct({
      ...newProduct,
      [field]: value
    });
  };
  
  const updateEditingProductState = (field: string, value: any) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [field]: value
      });
    }
  };
  
  const filteredProducts = useMemo(() => {
    if (filteredCategory === 'all') {
      return products;
    }
    return products.filter(p => p.category === filteredCategory);
  }, [products, filteredCategory]);
  
  const summaryMetrics = useMemo(() => {
    if (results.length === 0) return null;
    
    const totalRevenue = results.reduce((sum, r) => sum + r.revenue, 0);
    
    const avgGrossMargin = results.reduce((sum, r) => sum + r.grossMarginPercentage, 0) / results.length;
    
    const endingLiquidity = cashFlowResults.length > 0 
      ? cashFlowResults[cashFlowResults.length - 1].cumulativeCashFlow || 0
      : 0;
    
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
  
  const categoryMetrics = useMemo(() => {
    const revenueByCategory: Record<string, number> = {};
    
    incomeStreams.forEach(stream => {
      const category = stream.category;
      if (!revenueByCategory[category]) {
        revenueByCategory[category] = 0;
      }
      
      stream.values.forEach(value => {
        if ('revenue' in value) {
          revenueByCategory[category] += value.revenue;
        } else if ('subscribers' in value && 'averageRevenue' in value) {
          revenueByCategory[category] += value.subscribers * value.averageRevenue;
        }
      });
    });
    
    const metricsByCategory: Record<string, any> = {};
    
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

  const openAddProductModal = () => {
    setModalType('addProduct');
    setShowModal(true);
  };

  const translateCategoryName = (categoryId: string): string => {
    return getCategoryName(categoryId, language);
  };
  
  const translateRevenueTypeName = (typeId: string): string => {
    return getRevenueTypeName(typeId, language);
  };

  return {
    // State
    periods,
    products,
    incomeStreams,
    fixedCosts,
    vatRate,
    results,
    cashFlowResults,
    activeTab,
    showModal,
    modalType,
    editingProduct,
    productMetrics,
    expandedMetrics,
    filteredCategory,
    language,
    currency,
    theme,
    showSettings,
    newProduct,
    t,
    
    // Computed values
    getProductCategories,
    getRevenueTypes,
    filteredProducts,
    summaryMetrics,
    categoryMetrics,
    
    // Methods
    setPeriods,
    setProducts,
    setIncomeStreams,
    setFixedCosts,
    setVatRate,
    setActiveTab,
    setShowModal,
    setModalType,
    setEditingProduct,
    setLanguage: (lang: string) => {/* This would be implemented by parent */},
    setCurrency,
    setTheme: (theme: string) => {/* This would be implemented by parent */},
    setShowSettings,
    setNewProduct,
    toggleMetricExpansion,
    editProduct,
    updateProduct,
    addNewProduct,
    deleteProduct,
    updateNewProductState,
    updateEditingProductState,
    setFilteredCategory,
    openAddProductModal,
    translateCategoryName,
    translateRevenueTypeName
  };
};
