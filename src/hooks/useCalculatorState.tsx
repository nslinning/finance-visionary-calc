
import { useState, useEffect, useMemo } from 'react';
import { translations } from '../constants/calculator/translations';
import { initialProducts } from '../constants/calculator/initialData';
import { Product, ProductMetric } from '../types/calculator';
import { 
  calculateProductMetrics,
  getCategoryName,
  getRevenueTypeName
} from '../utils/calculatorUtils';

import { useCalculatorProducts } from './calculator/useCalculatorProducts';
import { useCalculatorFinancials } from './calculator/useCalculatorFinancials';
import { useCalculatorData } from './calculator/useCalculatorData';
import { useCalculatorUI } from './calculator/useCalculatorUI';

export const useCalculatorState = (language: string = 'en', theme: string = 'light') => {
  const {
    periods,
    incomeStreams,
    fixedCosts,
    setPeriods,
    setIncomeStreams,
    setFixedCosts,
    updateIncomeStreamValue,
    updateFixedCostValue
  } = useCalculatorData();
  
  const {
    products,
    productMetrics,
    expandedMetrics,
    filteredCategory,
    editingProduct,
    newProduct,
    getProductCategories,
    getRevenueTypes,
    filteredProducts,
    setProducts,
    setEditingProduct,
    setNewProduct,
    toggleMetricExpansion,
    editProduct,
    updateProduct,
    addNewProduct,
    deleteProduct,
    updateNewProductState,
    updateEditingProductState,
    setFilteredCategory,
    translateCategoryName,
    translateRevenueTypeName
  } = useCalculatorProducts(language);
  
  const {
    activeTab,
    showModal,
    modalType,
    currency,
    showSettings,
    setActiveTab,
    setShowModal,
    setModalType,
    setCurrency,
    setShowSettings,
    openAddProductModal
  } = useCalculatorUI(theme);
  
  useEffect(() => {
    setProducts(initialProducts as Product[]);
  }, []);
  
  const {
    vatRate,
    results,
    cashFlowResults,
    summaryMetrics,
    categoryMetrics,
    setVatRate
  } = useCalculatorFinancials(periods, products, incomeStreams, fixedCosts);
  
  const t = translations[language];
  
  const enhancedCategoryMetrics = useMemo(() => {
    const metricsByCategory: Record<string, any> = { ...categoryMetrics };
    
    const productsByCategory: Record<string, Product[]> = {};
    products.forEach(p => {
      if (!productsByCategory[p.category]) {
        productsByCategory[p.category] = [];
      }
      productsByCategory[p.category].push(p);
    });
    
    Object.entries(productsByCategory).forEach(([category, categoryProducts]) => {
      if (categoryProducts.length > 0) {
        const avgCAC = categoryProducts.reduce((sum, p) => sum + p.acquisitionCost, 0) / categoryProducts.length;
        
        const avgCLV = productMetrics
          .filter(m => m.category === category)
          .reduce((sum, m) => sum + m.clv, 0) / categoryProducts.length;
        
        const avgAOV = categoryProducts.reduce((sum, p) => sum + (p.averageOrderValue || p.price), 0) / categoryProducts.length;
        
        const avgCPO = productMetrics
          .filter(m => m.category === category)
          .reduce((sum, m) => sum + m.cpo, 0) / categoryProducts.length;
        
        metricsByCategory[category] = {
          avgCAC,
          avgCLV,
          avgAOV,
          avgCPO,
          revenue: (categoryMetrics[category]?.revenue || 0)
        };
      }
    });
    
    return metricsByCategory;
  }, [categoryMetrics, products, productMetrics]);
  
  return {
    periods,
    incomeStreams,
    fixedCosts,
    products,
    productMetrics,
    expandedMetrics,
    filteredCategory,
    editingProduct,
    newProduct,
    getProductCategories,
    getRevenueTypes,
    filteredProducts,
    vatRate,
    results,
    cashFlowResults,
    summaryMetrics,
    categoryMetrics: enhancedCategoryMetrics,
    activeTab,
    showModal,
    modalType,
    currency,
    showSettings,
    t,
    setPeriods,
    setIncomeStreams,
    setFixedCosts,
    setProducts,
    setEditingProduct,
    setNewProduct,
    toggleMetricExpansion,
    editProduct,
    updateProduct,
    addNewProduct,
    deleteProduct,
    updateNewProductState,
    updateEditingProductState,
    setFilteredCategory,
    translateCategoryName,
    translateRevenueTypeName,
    setVatRate,
    setActiveTab,
    setShowModal,
    setModalType,
    setCurrency,
    setShowSettings,
    openAddProductModal,
    setLanguage: (lang: string) => {/* This would be implemented by parent */},
    setTheme: (theme: string) => {/* This would be implemented by parent */},
  };
};
