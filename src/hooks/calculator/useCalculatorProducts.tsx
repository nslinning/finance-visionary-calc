
import { useState, useMemo } from 'react';
import { 
  Product, 
  ProductMetric,
  NewProduct
} from '../../types/calculator';
import { 
  calculateProductMetrics,
  getCategoryName,
  getRevenueTypeName
} from '../../utils/calculatorUtils';
import { 
  PRODUCT_CATEGORIES, 
  REVENUE_TYPES,
  defaultNewProduct
} from '../../constants/calculator';

export const useCalculatorProducts = (language: string) => {
  const [products, setProducts] = useState<Product[]>([] as Product[]);
  const [productMetrics, setProductMetrics] = useState<ProductMetric[]>([]);
  const [expandedMetrics, setExpandedMetrics] = useState<Record<number, boolean>>({});
  const [filteredCategory, setFilteredCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<NewProduct>(defaultNewProduct);
  
  // Computed values
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
  
  const filteredProducts = useMemo(() => {
    if (filteredCategory === 'all') {
      return products;
    }
    return products.filter(p => p.category === filteredCategory);
  }, [products, filteredCategory]);

  // Methods
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
      return product;
    }
    return null;
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
    
    setEditingProduct(null);
    
    return updatedProduct;
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
    
    return productToAdd;
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

  // Side effect to recalculate product metrics when products change
  useMemo(() => {
    const metrics = calculateProductMetrics(products);
    setProductMetrics(metrics);
  }, [products]);

  const translateCategoryName = (categoryId: string): string => {
    return getCategoryName(categoryId, language);
  };
  
  const translateRevenueTypeName = (typeId: string): string => {
    return getRevenueTypeName(typeId, language);
  };

  return {
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
  };
};
