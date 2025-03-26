
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, ReferenceLine, ComposedChart, Cell, AreaChart, Area
} from 'recharts';
import { 
  PlusCircle, Trash2, Edit2, Package, Activity, CreditCard, Calendar, 
  Users, BarChart2, Briefcase, Tag, Clock, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Language translations
const translations = {
  en: {
    title: 'STO Calculator',
    subtitle: 'Strategic financial planning for STO and growth companies',
    dashboard: 'Dashboard',
    products: 'Products',
    incomeStreams: 'Income Streams',
    fixedCosts: 'Fixed Costs',
    financialOverview: 'Financial Overview',
    allCategories: 'All categories',
    totalRevenue: 'Total Revenue',
    acrossPeriods: 'Across all periods',
    averageGrossMargin: 'Average Gross Margin',
    averageOverTime: 'Average over time',
    endingLiquidity: 'Ending Liquidity',
    endOfLastPeriod: 'At end of last period',
    latestOperatingResult: 'Latest Operating Result',
    resultDevelopment: 'Result Development',
    liquidityDevelopment: 'Liquidity Development',
    revenueByCategory: 'Revenue by Category',
    keyMetricsByCategory: 'Key Metrics by Category',
    averageCAC: 'Average CAC',
    averageCLV: 'Average CLV',
    averageAOV: 'Average AOV',
    averageCPO: 'Average CPO',
    addNew: 'Add New',
    name: 'Name',
    type: 'Type',
    category: 'Category',
    revenueType: 'Revenue Type',
    price: 'Price',
    marginPercentage: 'Margin %',
    actions: 'Actions',
    productMetricsAndProfitability: 'Product Metrics and Profitability',
    clv: 'CLV',
    cac: 'CAC',
    roi: 'ROI',
    margin: 'Margin',
    detailedMetrics: 'Detailed Metrics',
    costPerOrder: 'Cost per Order (CPO)',
    avgOrderValue: 'Avg. Order Value (AOV)',
    customerLifetime: 'Customer Lifetime',
    ordersPerYear: 'Orders/Year',
    subscribers: 'Subscribers',
    arpu: 'ARPU',
    churn: 'Churn',
    latestSubscribers: 'Subscribers (latest)',
    latestARPU: 'ARPU (latest)',
    latestChurn: 'Churn (latest)',
    totalRevenueMetric: 'Total Revenue',
    averageGrowth: 'Average Growth',
    cost: 'Cost',
    total: 'Total',
    addNewProduct: 'Add New Product/Service',
    productName: 'Product name',
    productType: 'Product',
    serviceType: 'Service',
    productionCost: 'Production Cost per Unit',
    logisticsCost: 'Logistics Cost per Delivery',
    operationalCost: 'Operational Cost',
    marketingCost: 'Marketing Cost per Unit',
    customerMetrics: 'Customer Metrics',
    avgOrdersPerYear: 'Average Number of Orders per Year',
    avgOrderValueLabel: 'Average Order Value',
    leaveBlank: 'Leave blank to use product price',
    customerRelationshipLength: 'Customer Relationship Length (months)',
    customerAcquisitionCost: 'Customer Acquisition Cost',
    cancel: 'Cancel',
    add: 'Add',
    editProduct: 'Edit Product/Service',
    update: 'Update',
    revenue: 'Revenue',
    netCashFlow: 'Net Cash Flow',
    cumulativeCashFlow: 'Cumulative Cash Flow',
    cogs: 'COGS',
    fixedCostsLabel: 'Fixed Costs',
    operatingResult: 'Operating Result',
    settings: 'Settings',
    language: 'Language',
    currency: 'Currency',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    productCategories: {
      dtc: 'Direct-to-Consumer (DTC)',
      dtb: 'Direct-to-Business (DTB)',
      reseller: 'Reseller',
      software: 'Software/Service'
    },
    revenueTypes: {
      product: 'Product-based',
      license: 'License-based',
      subscription: 'Subscription-based',
      service: 'Service-based'
    }
  },
  no: {
    title: 'STO Kalkulator',
    subtitle: 'Strategisk økonomisk planlegging for STO og vekstselskaper',
    dashboard: 'Dashboard',
    products: 'Produkter',
    incomeStreams: 'Inntektsstrømmer',
    fixedCosts: 'Faste kostnader',
    financialOverview: 'Økonomisk oversikt',
    allCategories: 'Alle kategorier',
    totalRevenue: 'Total omsetning',
    acrossPeriods: 'Over alle perioder',
    averageGrossMargin: 'Gjennomsnittlig bruttomargin',
    averageOverTime: 'Gjennomsnitt over tid',
    endingLiquidity: 'Slutt likviditet',
    endOfLastPeriod: 'Ved slutten av siste periode',
    latestOperatingResult: 'Siste driftsresultat',
    resultDevelopment: 'Resultatutvikling',
    liquidityDevelopment: 'Likviditetsutvikling',
    revenueByCategory: 'Omsetning etter kategori',
    keyMetricsByCategory: 'Nøkkeltall etter kategori',
    averageCAC: 'Gjennomsnittlig CAC',
    averageCLV: 'Gjennomsnittlig CLV',
    averageAOV: 'Gjennomsnittlig AOV',
    averageCPO: 'Gjennomsnittlig CPO',
    addNew: 'Legg til ny',
    name: 'Navn',
    type: 'Type',
    category: 'Kategori',
    revenueType: 'Inntektstype',
    price: 'Pris',
    marginPercentage: 'Margin %',
    actions: 'Handlinger',
    productMetricsAndProfitability: 'Produktmålinger og lønnsomhet',
    clv: 'CLV',
    cac: 'CAC',
    roi: 'ROI',
    margin: 'Margin',
    detailedMetrics: 'Detaljerte målinger',
    costPerOrder: 'Kostnad per ordre (CPO)',
    avgOrderValue: 'Gj.snitt ordeverdi (AOV)',
    customerLifetime: 'Kundeforhold lengde',
    ordersPerYear: 'Bestillinger/år',
    subscribers: 'Abonnenter',
    arpu: 'ARPU',
    churn: 'Churn',
    latestSubscribers: 'Abonnenter (siste)',
    latestARPU: 'ARPU (siste)',
    latestChurn: 'Churn (siste)',
    totalRevenueMetric: 'Total omsetning',
    averageGrowth: 'Gjennomsnittlig vekst',
    cost: 'Kostnad',
    total: 'Total',
    addNewProduct: 'Legg til nytt produkt/tjeneste',
    productName: 'Produktnavn',
    productType: 'Produkt',
    serviceType: 'Tjeneste',
    productionCost: 'Produksjonskostnad per enhet',
    logisticsCost: 'Logistikkostnad per levering',
    operationalCost: 'Driftskostnad',
    marketingCost: 'Markedsføringskostnad per enhet',
    customerMetrics: 'Kundemålinger',
    avgOrdersPerYear: 'Gjennomsnittlig antall bestillinger per år',
    avgOrderValueLabel: 'Gjennomsnittlig ordreverdi',
    leaveBlank: 'La være tom for å bruke produktpris',
    customerRelationshipLength: 'Kundeforholdets lengde (måneder)',
    customerAcquisitionCost: 'Kundeanskaffelseskostnad',
    cancel: 'Avbryt',
    add: 'Legg til',
    editProduct: 'Rediger produkt/tjeneste',
    update: 'Oppdater',
    revenue: 'Omsetning',
    netCashFlow: 'Netto kontantstrøm',
    cumulativeCashFlow: 'Kumulativ kontantstrøm',
    cogs: 'Varekostnad',
    fixedCostsLabel: 'Faste kostnader',
    operatingResult: 'Driftsresultat',
    settings: 'Innstillinger',
    language: 'Språk',
    currency: 'Valuta',
    theme: 'Tema',
    light: 'Lys',
    dark: 'Mørk',
    productCategories: {
      dtc: 'Direkte til forbruker (DTC)',
      dtb: 'Direkte til bedrift (DTB)',
      reseller: 'Forhandlersalg',
      software: 'Programvare/Tjeneste'
    },
    revenueTypes: {
      product: 'Produktbasert',
      license: 'Lisensbasert',
      subscription: 'Abonnementsbasert',
      service: 'Tjenestebasert'
    }
  }
};

// Updated Product categories with reseller
const PRODUCT_CATEGORIES = [
  { id: 'dtc', name: 'Direct-to-Consumer (DTC)' },
  { id: 'dtb', name: 'Direct-to-Business (DTB)' },
  { id: 'reseller', name: 'Reseller' },
  { id: 'software', name: 'Software/Service' },
];

// Revenue types
const REVENUE_TYPES = [
  { id: 'product', name: 'Product-based' },
  { id: 'license', name: 'License-based' },
  { id: 'subscription', name: 'Subscription-based' },
  { id: 'service', name: 'Service-based' },
];

// Initial products
const initialProducts = [
  { 
    id: 1, 
    name: 'Heat Patch Menstrual Pain 3pk', 
    price: 100, 
    productionCost: 12,
    logisticsCost: 5,
    marketingCost: 20,
    cost: 17, 
    margin: 83, 
    marginPercentage: 0.83,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 3.5,
    averageOrderValue: 100,
    customerLifetimeMonths: 12,
    acquisitionCost: 200,
  },
  { 
    id: 2, 
    name: 'Period Pain Relief International 3pk', 
    price: 100, 
    productionCost: 0,
    logisticsCost: 0,
    marketingCost: 25,
    cost: 0, 
    margin: 100, 
    marginPercentage: 1.0,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 4,
    averageOrderValue: 100,
    customerLifetimeMonths: 18,
    acquisitionCost: 180,
  },
  {
    id: 3,
    name: 'Subscription API Service',
    price: 5000,
    operationalCost: 1000,
    marketingCost: 500,
    cost: 1000,
    margin: 4000,
    marginPercentage: 0.8,
    type: 'service',
    category: 'dtb',
    revenueType: 'license',
    averageReorderRate: 1,
    averageOrderValue: 5000,
    customerLifetimeMonths: 24,
    acquisitionCost: 2000,
  },
  {
    id: 4,
    name: 'Health Product Bundle via Resellers',
    price: 500,
    productionCost: 150,
    logisticsCost: 50,
    marketingCost: 75,
    cost: 200,
    margin: 300,
    marginPercentage: 0.6,
    type: 'product',
    category: 'reseller',
    revenueType: 'product',
    averageReorderRate: 6,
    averageOrderValue: 500,
    customerLifetimeMonths: 36,
    acquisitionCost: 1000,
  }
];

// Initial periods
const initialPeriods = [
  { id: 1, date: new Date('2024-12-31'), label: '2024' },
  { id: 2, date: new Date('2025-12-31'), label: '2025' },
  { id: 3, date: new Date('2026-12-31'), label: '2026' },
  { id: 4, date: new Date('2027-12-31'), label: '2027' },
  { id: 5, date: new Date('2028-12-31'), label: '2028' }
];

// Initial income streams
const initialIncomeStreams = [
  {
    id: 1,
    name: 'DTC Online',
    type: 'subscription',
    category: 'dtc',
    revenueType: 'product',
    values: [
      { periodId: 1, averageRevenue: 1400, subscribers: 500, multiplier: 1, churnRate: 0.08 },
      { periodId: 2, averageRevenue: 1620, subscribers: 1200, multiplier: 1.2, churnRate: 0.076 },
      { periodId: 3, averageRevenue: 1750, subscribers: 2500, multiplier: 1.3, churnRate: 0.07 },
      { periodId: 4, averageRevenue: 1800, subscribers: 5000, multiplier: 1.5, churnRate: 0.065 },
      { periodId: 5, averageRevenue: 1850, subscribers: 8500, multiplier: 1.6, churnRate: 0.06 }
    ]
  },
  {
    id: 2,
    name: 'B2B Solutions',
    type: 'sales',
    category: 'dtb',
    revenueType: 'license',
    values: [
      { periodId: 1, revenue: 630000 },
      { periodId: 2, revenue: 1260000 },
      { periodId: 3, revenue: 2520000 },
      { periodId: 4, revenue: 5040000 },
      { periodId: 5, revenue: 7560000 }
    ]
  },
  {
    id: 3,
    name: 'Reseller Channel',
    type: 'sales',
    category: 'reseller',
    revenueType: 'product',
    values: [
      { periodId: 1, revenue: 420000 },
      { periodId: 2, revenue: 840000 },
      { periodId: 3, revenue: 1680000 },
      { periodId: 4, revenue: 3360000 },
      { periodId: 5, revenue: 5040000 }
    ]
  }
];

// Initial fixed costs
const initialFixedCosts = [
  { 
    id: 1, 
    name: 'Salaries', 
    values: [
      { periodId: 1, amount: 2000000 },
      { periodId: 2, amount: 3500000 },
      { periodId: 3, amount: 5000000 },
      { periodId: 4, amount: 7000000 },
      { periodId: 5, amount: 8500000 }
    ]
  },
  { 
    id: 2, 
    name: 'Marketing', 
    values: [
      { periodId: 1, amount: 1500000 },
      { periodId: 2, amount: 2500000 },
      { periodId: 3, amount: 3500000 },
      { periodId: 4, amount: 4500000 },
      { periodId: 5, amount: 5000000 }
    ]
  }
];

// Enhanced Color palette with reseller category
const COLORS = {
  primary: '#4f46e5',
  secondary: '#8b5cf6',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f97316',
  info: '#0ea5e9',
  dtc: '#10b981',
  dtb: '#0ea5e9',
  reseller: '#8b5cf6',
  software: '#f97316'
};

// Currency conversion rates
const CURRENCY_RATES = {
  USD: 1,
  NOK: 10.5
};

// Currency symbols
const CURRENCY_SYMBOLS = {
  USD: '$',
  NOK: 'kr'
};

// Main component
const STOCalculator = () => {
  const [periods, setPeriods] = useState(initialPeriods);
  const [products, setProducts] = useState(initialProducts);
  const [incomeStreams, setIncomeStreams] = useState(initialIncomeStreams);
  const [fixedCosts, setFixedCosts] = useState(initialFixedCosts);
  const [vatRate, setVatRate] = useState(0.25);
  const [results, setResults] = useState([]);
  const [cashFlowResults, setCashFlowResults] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [productMetrics, setProductMetrics] = useState([]);
  const [expandedMetrics, setExpandedMetrics] = useState({});
  const [filteredCategory, setFilteredCategory] = useState('all');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('light');
  const [showSettings, setShowSettings] = useState(false);
  
  // Get translations based on selected language
  const t = translations[language];

  // Get category names with translations
  const getProductCategories = useMemo(() => {
    return PRODUCT_CATEGORIES.map(cat => ({
      ...cat,
      name: t.productCategories[cat.id] || cat.name
    }));
  }, [language]);

  // Get revenue type names with translations
  const getRevenueTypes = useMemo(() => {
    return REVENUE_TYPES.map(type => ({
      ...type,
      name: t.revenueTypes[type.id] || type.name
    }));
  }, [language]);
  
  // New product state
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    productionCost: 0,
    logisticsCost: 0,
    operationalCost: 0,
    marketingCost: 0,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 2,
    averageOrderValue: 0,
    customerLifetimeMonths: 12,
    acquisitionCost: 0,
  });
  
  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);
  
  // Calculate results whenever inputs change
  useEffect(() => {
    calculateResults();
    calculateCashFlow();
  }, [periods, products, incomeStreams, fixedCosts, vatRate]);
  
  // Calculate product metrics
  useEffect(() => {
    calculateProductMetrics();
  }, [products]);

  // Calculate financial results
  const calculateResults = () => {
    const calculatedResults = periods.map(period => {
      // Calculate revenue
      let totalRevenue = 0;
      let totalCogs = 0;
      
      incomeStreams.forEach(stream => {
        const periodValue = stream.values.find(v => v.periodId === period.id);
        
        if (periodValue) {
          if (stream.type === 'subscription') {
            // Calculate subscribers with churn
            const effectiveSubscribers = periodValue.subscribers * (1 - periodValue.churnRate);
            const streamRevenue = effectiveSubscribers * periodValue.averageRevenue;
            totalRevenue += streamRevenue;
            
            // Find matching products
            const matchingProducts = products.filter(p => 
              p.category === stream.category
            );
            
            // Calculate average cost ratio from matching products
            let costRatio = 0.12; // Default fallback
            if (matchingProducts.length > 0) {
              const avgMarginPercentage = matchingProducts.reduce((sum, p) => sum + p.marginPercentage, 0) / matchingProducts.length;
              costRatio = 1 - avgMarginPercentage;
            }
            
            totalCogs += streamRevenue * costRatio;
          } else {
            // Direct sales
            totalRevenue += periodValue.revenue;
            
            // Use category-specific margins
            const category = stream.category || 'dtc';
            let costRatio = 0.13; // Default fallback
            
            // Find matching products by category
            const matchingProducts = products.filter(p => p.category === category);
            
            if (matchingProducts.length > 0) {
              const avgMarginPercentage = matchingProducts.reduce((sum, p) => sum + p.marginPercentage, 0) / matchingProducts.length;
              costRatio = 1 - avgMarginPercentage;
            }
            
            totalCogs += periodValue.revenue * costRatio;
          }
        }
      });
      
      // Calculate fixed costs
      let totalFixedCosts = 0;
      fixedCosts.forEach(cost => {
        const periodCost = cost.values.find(v => v.periodId === period.id);
        if (periodCost) {
          totalFixedCosts += periodCost.amount;
        }
      });
      
      // Calculate gross margin
      const grossMargin = totalRevenue - totalCogs;
      
      // Calculate operating result (EBIT)
      const operatingResult = grossMargin - totalFixedCosts;
      
      // Calculate VAT
      const vat = totalRevenue * vatRate;
      
      return {
        periodId: period.id,
        date: period.date,
        label: period.label,
        revenue: totalRevenue,
        revenueWithVat: totalRevenue * (1 + vatRate),
        cogs: totalCogs,
        grossMargin: grossMargin,
        grossMarginPercentage: totalRevenue > 0 ? (grossMargin / totalRevenue * 100) : 0,
        fixedCosts: totalFixedCosts,
        operatingResult: operatingResult,
        vat: vat
      };
    });
    
    setResults(calculatedResults);
  };
  
  // Calculate product metrics (CAC, CPO, AOV, CLV)
  const calculateProductMetrics = () => {
    const metrics = products.map(product => {
      // CPO - Cost Per Order
      const cpo = product.type === 'product' 
        ? product.productionCost + product.logisticsCost + product.marketingCost
        : product.operationalCost + product.marketingCost;
        
      // AOV - Average Order Value
      const aov = product.averageOrderValue || product.price;
      
      // CLV - Customer Lifetime Value
      const monthlyOrders = product.averageReorderRate / 12; // Average orders per month
      const totalOrders = monthlyOrders * product.customerLifetimeMonths;
      const clv = aov * product.marginPercentage * totalOrders;
      
      // ROI on customer acquisition
      const roi = (clv / product.acquisitionCost) * 100;
      
      return {
        productId: product.id,
        productName: product.name,
        category: product.category,
        revenueType: product.revenueType,
        cpo,
        aov,
        clv,
        acquisitionCost: product.acquisitionCost,
        roi,
        marginPercentage: product.marginPercentage * 100,
        averageReorderRate: product.averageReorderRate,
        customerLifetimeMonths: product.customerLifetimeMonths
      };
    });
    
    setProductMetrics(metrics);
  };
  
  // Calculate cash flow
  const calculateCashFlow = () => {
    const calculatedCashFlow = periods.map(period => {
      // Get income and expenses from results
      const periodResult = results.find(r => r.periodId === period.id) || {
        revenue: 0,
        cogs: 0,
        fixedCosts: 0,
        vat: 0
      };
      
      // Calculate cash inflows
      const cashInflows = periodResult.revenue;
      
      // Calculate cash outflows
      const cashOutflows = periodResult.cogs + periodResult.fixedCosts + periodResult.vat;
      
      // Calculate net cash flow
      const netCashFlow = cashInflows - cashOutflows;
      
      return {
        periodId: period.id,
        date: period.date,
        label: period.label,
        revenueInflow: periodResult.revenue,
        totalInflows: cashInflows,
        cogsOutflow: periodResult.cogs,
        fixedCostsOutflow: periodResult.fixedCosts,
        vatPayments: periodResult.vat,
        totalOutflows: cashOutflows,
        netCashFlow: netCashFlow
      };
    });
    
    // Calculate cumulative cash flow
    let cumulativeCashFlow = 0;
    calculatedCashFlow.forEach(flow => {
      cumulativeCashFlow += flow.netCashFlow;
      flow.cumulativeCashFlow = cumulativeCashFlow;
    });
    
    setCashFlowResults(calculatedCashFlow);
  };

  // Format number with currency
  const formatCurrency = (num) => {
    const value = num * CURRENCY_RATES[currency];
    const formattedValue = new Intl.NumberFormat(language === 'no' ? 'nb-NO' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.round(value));
    
    return currency === 'USD' 
      ? `${CURRENCY_SYMBOLS[currency]}${formattedValue}` 
      : `${formattedValue} ${CURRENCY_SYMBOLS[currency]}`;
  };

  // Toggle specific product metric expansion
  const toggleMetricExpansion = (productId) => {
    setExpandedMetrics({
      ...expandedMetrics,
      [productId]: !expandedMetrics[productId]
    });
  };
  
  // Edit a product
  const editProduct = (productId) => {
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
      ? (parseFloat(editingProduct.productionCost) + parseFloat(editingProduct.logisticsCost))
      : parseFloat(editingProduct.operationalCost);
    
    const margin = parseFloat(editingProduct.price) - cost;
    const marginPercentage = editingProduct.price > 0 ? margin / parseFloat(editingProduct.price) : 0;
    
    const updatedProduct = {
      ...editingProduct,
      cost: cost,
      margin: margin,
      marginPercentage: marginPercentage,
      averageOrderValue: parseFloat(editingProduct.averageOrderValue) || parseFloat(editingProduct.price),
    };
    
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setShowModal(false);
  };
  
  // Delete a product
  const deleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  
  // Add a new product
  const addProduct = () => {
    // Calculate margin and percentage
    const cost = newProduct.type === 'product' 
      ? (parseFloat(newProduct.productionCost) + parseFloat(newProduct.logisticsCost))
      : parseFloat(newProduct.operationalCost);
    
    const margin = parseFloat(newProduct.price) - cost;
    const marginPercentage = newProduct.price > 0 ? margin / parseFloat(newProduct.price) : 0;
    
    const product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      productionCost: parseFloat(newProduct.productionCost),
      logisticsCost: parseFloat(newProduct.logisticsCost),
      marketingCost: parseFloat(newProduct.marketingCost),
      operationalCost: parseFloat(newProduct.operationalCost),
      cost: cost,
      margin: margin,
      marginPercentage: marginPercentage,
      type: newProduct.type,
      category: newProduct.category,
      revenueType: newProduct.revenueType,
      averageReorderRate: parseFloat(newProduct.averageReorderRate),
      averageOrderValue: parseFloat(newProduct.averageOrderValue) || parseFloat(newProduct.price),
      customerLifetimeMonths: parseInt(newProduct.customerLifetimeMonths),
      acquisitionCost: parseFloat(newProduct.acquisitionCost),
    };
    
    setProducts([...products, product]);
    
    // Reset form
    setNewProduct({
      name: '',
      price: 0,
      productionCost: 0,
      logisticsCost: 0,
      marketingCost: 0,
      operationalCost: 0,
      type: 'product',
      category: 'dtc',
      revenueType: 'product',
      averageReorderRate: 2,
      averageOrderValue: 0,
      customerLifetimeMonths: 12,
      acquisitionCost: 0,
    });
    
    setShowModal(false);
  };

  // Modal for adding/editing products
  const renderModal = () => {
    if (!showModal) return null;
    
    const renderProductModal = () => (
      <>
        <h3 className="text-lg font-medium mb-4">{t.addNewProduct}</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t.name}</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            placeholder={t.productName}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t.price}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              {CURRENCY_SYMBOLS[currency]}
            </span>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              className="w-full px-3 py-2 pl-8 border rounded-md"
              min="0"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t.type}</label>
          <select
            value={newProduct.type}
            onChange={(e) => setNewProduct({...newProduct, type: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="product">{t.productType}</option>
            <option value="service">{t.serviceType}</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t.category}</label>
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
          >
            {getProductCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t.revenueType}</label>
          <select
            value={newProduct.revenueType}
            onChange={(e) => setNewProduct({...newProduct, revenueType: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
          >
            {getRevenueTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        
        {newProduct.type === 'product' ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t.productionCost}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  {CURRENCY_SYMBOLS[currency]}
                </span>
                <input
                  type="number"
                  value={newProduct.productionCost}
                  onChange={(e) => setNewProduct({...newProduct, productionCost: e.target.value})}
                  className="w-full px-3 py-2 pl-8 border rounded-md"
                  min="0"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t.logisticsCost}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  {CURRENCY_SYMBOLS[currency]}
                </span>
                <input
                  type="number"
                  value={newProduct.logisticsCost}
                  onChange={(e) => setNewProduct({...newProduct, logisticsCost: e.target.value})}
                  className="w-full px-3 py-2 pl-8 border rounded-md"
                  min="0"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t.operationalCost}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                {CURRENCY_SYMBOLS[currency]}
              </span>
              <input
                type="number"
                value={newProduct.operationalCost}
                onChange={(e) => setNewProduct({...newProduct, operationalCost: e.target.value})}
                className="w-full px-3 py-2 pl-8 border rounded-md"
                min="0"
              />
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t.marketingCost}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              {CURRENCY_SYMBOLS[currency]}
            </span>
            <input
              type="number"
              value={newProduct.marketingCost}
              onChange={(e) => setNewProduct({...newProduct, marketingCost: e.target.value})}
              className="w-full px-3 py-2 pl-8 border rounded-md"
              min="0"
            />
          </div>
        </div>
        
        <h4 className="text-md font-medium mt-6 mb-3">{t.customerMetrics}</h4>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t.avgOrdersPerYear}</label>
          <input
            type="number"
            value={newProduct.averageReorderRate}
            onChange={(e) => setNewProduct({...newProduct, averageReorderRate: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            min="0"
            step="0.1"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t.avgOrderValueLabel} ({currency})</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              {CURRENCY_SYMBOLS[currency]}
            </span>
            <input
              type="number"
              value={newProduct.averageOrderValue || newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, averageOrderValue: e.target.value})}
              className="w-full px-3 py-2 pl-8 border rounded-md"
              min="0"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{t.leaveBlank}</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t.customerRelationshipLength}</label>
          <input
            type="number"
            value={newProduct.customerLifetimeMonths}
            onChange={(e) => setNewProduct({...newProduct, customerLifetimeMonths: e.target.value})}
            className="w-full px-3 py-2 border rounded-md"
            min="1"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">{t.customerAcquisitionCost} ({currency})</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              {CURRENCY_SYMBOLS[currency]}
            </span>
            <input
              type="number"
              value={newProduct.acquisitionCost}
              onChange={(e) => setNewProduct({...newProduct, acquisitionCost: e.target.value})}
              className="w-full px-3 py-2 pl-8 border rounded-md"
              min="0"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border rounded-md transition-colors hover:bg-gray-100"
          >
            {t.cancel}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addProduct}
            className="px-4 py-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700"
            disabled={!newProduct.name || newProduct.price <= 0}
          >
            {t.add}
          </motion.button>
        </div>
      </>
    );
    
    const renderEditProductModal = () => {
      if (!editingProduct) return null;
      
      return (
        <>
          <h3 className="text-lg font-medium mb-4">{t.editProduct}</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t.name}</label>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              placeholder={t.productName}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t.price}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                {CURRENCY_SYMBOLS[currency]}
              </span>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                className="w-full px-3 py-2 pl-8 border rounded-md"
                min="0"
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t.type}</label>
            <select
              value={editingProduct.type}
              onChange={(e) => setEditingProduct({...editingProduct, type: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="product">{t.productType}</option>
              <option value="service">{t.serviceType}</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t.category}</label>
            <select
              value={editingProduct.category}
              onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
            >
              {getProductCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t.revenueType}</label>
            <select
              value={editingProduct.revenueType}
              onChange={(e) => setEditingProduct({...editingProduct, revenueType: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
            >
              {getRevenueTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          {editingProduct.type === 'product' ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">{t.productionCost}</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    {CURRENCY_SYMBOLS[currency]}
                  </span>
                  <input
                    type="number"
                    value={editingProduct.productionCost}
                    onChange={(e) => setEditingProduct({...editingProduct, productionCost: e.target.value})}
                    className="w-full px-3 py-2 pl-8 border rounded-md"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">{t.logisticsCost}</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    {CURRENCY_SYMBOLS[currency]}
                  </span>
                  <input
                    type="number"
                    value={editingProduct.logisticsCost}
                    onChange={(e) => setEditingProduct({...editingProduct, logisticsCost: e.target.value})}
                    className="w-full px-3 py-2 pl-8 border rounded-md"
                    min="0"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t.operationalCost}</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  {CURRENCY_SYMBOLS[currency]}
                </span>
                <input
                  type="number"
                  value={editingProduct.operationalCost}
                  onChange={(e) => setEditingProduct({...editingProduct, operationalCost: e.target.value})}
                  className="w-full px-3 py-2 pl-8 border rounded-md"
                  min="0"
                />
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t.marketingCost}</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                {CURRENCY_SYMBOLS[currency]}
              </span>
              <input
                type="number"
                value={editingProduct.marketingCost}
                onChange={(e) => setEditingProduct({...editingProduct, marketingCost: e.target.value})}
                className="w-full px-3 py-2 pl-8 border rounded-md"
                min="0"
              />
            </div>
          </div>
          
          <h4 className="text-md font-medium mt-6 mb-3">{t.customerMetrics}</h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t.avgOrdersPerYear}</label>
            <input
              type="number"
              value={editingProduct.averageReorderRate}
              onChange={(e) => setEditingProduct({...editingProduct, averageReorderRate: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              min="0"
              step="0.1"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t.avgOrderValueLabel} ({currency})</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                {CURRENCY_SYMBOLS[currency]}
              </span>
              <input
                type="number"
                value={editingProduct.averageOrderValue || editingProduct.price}
                onChange={(e) => setEditingProduct({...editingProduct, averageOrderValue: e.target.value})}
                className="w-full px-3 py-2 pl-8 border rounded-md"
                min="0"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{t.leaveBlank}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t.customerRelationshipLength}</label>
            <input
              type="number"
              value={editingProduct.customerLifetimeMonths}
              onChange={(e) => setEditingProduct({...editingProduct, customerLifetimeMonths: e.target.value})}
              className="w-full px-3 py-2 border rounded-md"
              min="1"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">{t.customerAcquisitionCost} ({currency})</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                {CURRENCY_SYMBOLS[currency]}
              </span>
              <input
                type="number"
                value={editingProduct.acquisitionCost}
                onChange={(e) => setEditingProduct({...editingProduct, acquisitionCost: e.target.value})}
                className="w-full px-3 py-2 pl-8 border rounded-md"
                min="0"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingProduct(null);
                setShowModal(false);
              }}
              className="px-4 py-2 border rounded-md transition-colors hover:bg-gray-100"
            >
              {t.cancel}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={updateProduct}
              className="px-4 py-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700"
              disabled={!editingProduct.name || editingProduct.price <= 0}
            >
              {t.update}
            </motion.button>
          </div>
        </>
      );
    };
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        >
          {modalType === 'product' && renderProductModal()}
          {modalType === 'editProduct' && renderEditProductModal()}
        </motion.div>
      </motion.div>
    );
  };

  // Render dashboard tab
  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Activity className="mr-2 text-blue-600" size={20} />
              {t.financialOverview}
            </h3>
            
            <div className="flex space-x-2">
              <select
                value={filteredCategory}
                onChange={(e) => setFilteredCategory(e.target.value)}
                className="px-2 py-1 border rounded-md text-sm"
              >
                <option value="all">{t.allCategories}</option>
                {getProductCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.length > 0 && (
              <>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{t.totalRevenue}</h4>
                    <CreditCard className="text-blue-600" size={18} />
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {formatCurrency(results.reduce((sum, r) => sum + r.revenue, 0))}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <TrendingUp size={14} className="mr-1" />
                    {t.acrossPeriods}
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -5 }}
                  className="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-green-100 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{t.averageGrossMargin}</h4>
                    <Tag className="text-green-600" size={18} />
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {(results.reduce((sum, r) => sum + r.grossMarginPercentage, 0) / results.length).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <BarChart2 size={14} className="mr-1" />
                    {t.averageOverTime}
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`border rounded-lg p-4 shadow-sm ${
                    cashFlowResults.length > 0 && cashFlowResults[cashFlowResults.length - 1].cumulativeCashFlow >= 0 
                      ? 'bg-gradient-to-br from-green-50 to-green-100' 
                      : 'bg-gradient-to-br from-red-50 to-red-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{t.endingLiquidity}</h4>
                    <CreditCard className={
                      cashFlowResults.length > 0 && cashFlowResults[cashFlowResults.length - 1].cumulativeCashFlow >= 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    } size={18} />
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {cashFlowResults.length > 0 ? formatCurrency(cashFlowResults[cashFlowResults.length - 1].cumulativeCashFlow) : 0}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <Clock size={14} className="mr-1" />
                    {t.endOfLastPeriod}
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`border rounded-lg p-4 shadow-sm ${
                    results[results.length - 1].operatingResult >= 0 
                      ? 'bg-gradient-to-br from-green-50 to-green-100' 
                      : 'bg-gradient-to-br from-red-50 to-red-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{t.latestOperatingResult}</h4>
                    <Activity className={
                      results[results.length - 1].operatingResult >= 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    } size={18} />
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {formatCurrency(results[results.length - 1].operatingResult)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {results[results.length - 1].label}
                  </p>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg shadow p-4"
          >
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <TrendingUp className="mr-2 text-blue-600" size={20} />
              {t.resultDevelopment}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={results} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorOperating" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS.success} stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fill: '#666' }} />
                <YAxis tick={{ fill: '#666' }} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), null]} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar dataKey="revenue" name={t.revenue} fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cogs" name={t.cogs} fill={COLORS.danger} radius={[4, 4, 0, 0]} />
                <Bar dataKey="fixedCosts" name={t.fixedCostsLabel} fill={COLORS.warning} radius={[4, 4, 0, 0]} />
                <Line 
                  type="monotone" 
                  dataKey="operatingResult" 
                  name={t.operatingResult} 
                  stroke={COLORS.success} 
                  strokeWidth={3}
                  dot={{ r: 6, fill: COLORS.success, stroke: 'white', strokeWidth: 2 }}
                  activeDot={{ r: 8, stroke: 'white', strokeWidth: 2 }}
                />
                <ReferenceLine y={0} stroke="#000" strokeWidth={2} strokeDasharray="3 3" />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg shadow p-4"
          >
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <CreditCard className="mr-2 text-blue-600" size={20} />
              {t.liquidityDevelopment}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cashFlowResults} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                <defs>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS.success} stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.info} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={COLORS.info} stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fill: '#666' }} />
                <YAxis tick={{ fill: '#666' }} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), null]} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <ReferenceLine y={0} stroke="#000" strokeWidth={2} strokeDasharray="3 3" />
                <Area 
                  type="monotone" 
                  dataKey="netCashFlow" 
                  name={t.netCashFlow} 
                  stroke={COLORS.success} 
                  fill="url(#colorNet)"
                  strokeWidth={2}
                  activeDot={{ r: 8, stroke: 'white', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="cumulativeCashFlow" 
                  name={t.cumulativeCashFlow} 
                  stroke={COLORS.info} 
                  fill="url(#colorCumulative)"
                  strokeWidth={2}
                  activeDot={{ r: 8, stroke: 'white', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-lg shadow p-4"
          >
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Briefcase className="mr-2 text-blue-600" size={20} />
              {t.revenueByCategory}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={PRODUCT_CATEGORIES.map(cat => {
                  // Calculate total revenue for this category
                  const categoryProducts = products.filter(p => p.category === cat.id);
                  const categoryIncomeStreams = incomeStreams.filter(s => s.category === cat.id);
                  
                  let categoryRevenue = 0;
                  
                  // Sum up revenue from all income streams in this category
                  categoryIncomeStreams.forEach(stream => {
                    stream.values.forEach(value => {
                      if (stream.type === 'subscription') {
                        categoryRevenue += value.subscribers * value.averageRevenue;
                      } else {
                        categoryRevenue += value.revenue;
                      }
                    });
                  });
                  
                  return {
                    name: getProductCategories.find(c => c.id === cat.id)?.name || cat.name,
                    value: categoryRevenue,
                    color: COLORS[cat.id] || COLORS.primary
                  };
                }).filter(item => item.value > 0)}
                margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fill: '#666' }} />
                <YAxis tick={{ fill: '#666' }} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), null]} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" name={t.revenue} radius={[4, 4, 0, 0]}>
                  {PRODUCT_CATEGORIES.map((cat, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[cat.id] || COLORS.primary} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-lg shadow p-4"
          >
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Users className="mr-2 text-blue-600" size={20} />
              {t.keyMetricsByCategory}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="border rounded-md p-3 bg-gradient-to-br from-blue-50 to-blue-100"
              >
                <h4 className="text-sm font-medium text-gray-700">{t.averageCAC}</h4>
                <p className="text-xl font-semibold mt-1">
                  {formatCurrency(
                    productMetrics.reduce((sum, m) => sum + m.acquisitionCost, 0) / productMetrics.length
                  )}
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="border rounded-md p-3 bg-gradient-to-br from-blue-50 to-blue-100"
              >
                <h4 className="text-sm font-medium text-gray-700">{t.averageCLV}</h4>
                <p className="text-xl font-semibold mt-1">
                  {formatCurrency(
                    productMetrics.reduce((sum, m) => sum + m.clv, 0) / productMetrics.length
                  )}
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="border rounded-md p-3 bg-gradient-to-br from-blue-50 to-blue-100"
              >
                <h4 className="text-sm font-medium text-gray-700">{t.averageAOV}</h4>
                <p className="text-xl font-semibold mt-1">
                  {formatCurrency(
                    productMetrics.reduce((sum, m) => sum + m.aov, 0) / productMetrics.length
                  )}
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="border rounded-md p-3 bg-gradient-to-br from-blue-50 to-blue-100"
              >
                <h4 className="text-sm font-medium text-gray-700">{t.averageCPO}</h4>
                <p className="text-xl font-semibold mt-1">
                  {formatCurrency(
                    productMetrics.reduce((sum, m) => sum + m.cpo, 0) / productMetrics.length
                  )}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  // Render products tab
  const renderProducts = () => {
    // Filter products if a category is selected
    const displayedProducts = filteredCategory === 'all' 
      ? products 
      : products.filter(p => p.category === filteredCategory);
      
    // Filter metrics based on selected category
    const displayedMetrics = filteredCategory === 'all'
      ? productMetrics
      : productMetrics.filter(m => m.category === filteredCategory);
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium flex items-center">
            <Package className="mr-2 text-blue-600" size={20} />
            {t.products}
          </h3>
          
          <div className="flex space-x-2">
            <select
              value={filteredCategory}
              onChange={(e) => setFilteredCategory(e.target.value)}
              className="px-2 py-1 border rounded-md text-sm"
            >
              <option value="all">{t.allCategories}</option>
              {getProductCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setModalType('product');
                setShowModal(true);
              }}
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm transition-colors hover:bg-blue-700"
            >
              <PlusCircle size={16} />
              <span>{t.addNew}</span>
            </motion.button>
          </div>
        </div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.name}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.type}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.category}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">{t.revenueType}</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">{t.price}</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">{t.marginPercentage}</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.map((product, index) => (
                  <motion.tr 
                    key={product.id} 
                    className={`border-t hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    whileHover={{ backgroundColor: 'rgba(219, 234, 254, 0.5)' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-4 py-3 font-medium">{product.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.type === 'product' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {product.type === 'product' ? t.productType : t.serviceType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        product.category === 'dtc' 
                          ? 'bg-green-100 text-green-800' 
                          : product.category === 'dtb'
                            ? 'bg-blue-100 text-blue-800'
                            : product.category === 'reseller'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-orange-100 text-orange-800'
                      }`}>
                        {getProductCategories.find(c => c.id === product.category)?.name || product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {getRevenueTypes.find(t => t.id === product.revenueType)?.name || product.revenueType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">{formatCurrency(product.price)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={product.marginPercentage >= 0.5 ? 'text-green-600' : 'text-yellow-600'}>
                        {(product.marginPercentage * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => editProduct(product.id)}
                          className="text-blue-600 hover:text-blue-800 p-1 transition-colors"
                          title={t.editProduct}
                        >
                          <Edit2 size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800 p-1 transition-colors"
                          title={t.cancel}
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </header>
        
        <div className="mb-6 flex flex-wrap justify-between items-center">
          <div className="flex space-x-1 mb-4 md:mb-0 bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.dashboard}
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'products' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t.products}
            </button>
          </div>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg bg-white shadow-sm transition-all hover:shadow"
          >
            <span>{t.settings}</span>
          </button>
        </div>
        
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-lg shadow mb-6 p-4"
          >
            <h3 className="text-lg font-medium mb-4">{t.settings}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t.language}</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="en">English</option>
                  <option value="no">Norsk</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">{t.currency}</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="USD">USD ($)</option>
                  <option value="NOK">NOK (kr)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">{t.theme}</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                      theme === 'light' ? 'bg-blue-100 border-blue-300' : 'bg-white'
                    }`}
                  >
                    <span className="mr-2">{t.light}</span>
                    {theme === 'light' && <Check size={16} className="text-blue-600" />}
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex items-center justify-center px-4 py-2 border rounded-md ${
                      theme === 'dark' ? 'bg-blue-100 border-blue-300' : 'bg-white'
                    }`}
                  >
                    <span className="mr-2">{t.dark}</span>
                    {theme === 'dark' && <Check size={16} className="text-blue-600" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'products' && renderProducts()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <AnimatePresence>
        {showModal && renderModal()}
      </AnimatePresence>
    </div>
  );
};

export default STOCalculator;
