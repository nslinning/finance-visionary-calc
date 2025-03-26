import React, { useState, useEffect, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, ReferenceLine, ComposedChart, Cell, AreaChart, Area
} from 'recharts';
import { 
  PlusCircle, Trash2, Edit2, Package, Activity, CreditCard, Calendar, 
  Users, BarChart2, Briefcase, Tag, Clock, TrendingUp, Check, DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// TypeScript interface for income stream value types
interface SubscriptionValue {
  periodId: number;
  averageRevenue: number;
  subscribers: number;
  multiplier: number;
  churnRate: number;
}

interface SalesValue {
  periodId: number;
  revenue: number;
}

type IncomeStreamValue = SubscriptionValue | SalesValue;

// TypeScript interface for product types
interface BaseProduct {
  id: number;
  name: string;
  price: number;
  marketingCost: number;
  cost: number;
  margin: number;
  marginPercentage: number;
  type: string;
  category: string;
  revenueType: string;
  averageReorderRate: number;
  averageOrderValue: number;
  customerLifetimeMonths: number;
  acquisitionCost: number;
}

interface PhysicalProduct extends BaseProduct {
  type: 'product';
  productionCost: number;
  logisticsCost: number;
}

interface ServiceProduct extends BaseProduct {
  type: 'service';
  operationalCost: number;
}

type Product = PhysicalProduct | ServiceProduct;

// Interface for cash flow results
interface CashFlowResult {
  periodId: number;
  date: Date;
  label: string;
  revenueInflow: number;
  totalInflows: number;
  cogsOutflow: number;
  fixedCostsOutflow: number;
  vatPayments: number;
  totalOutflows: number;
  netCashFlow: number;
  cumulativeCashFlow?: number;
}

// Language translations
const translations: {
  [key: string]: any
} = {
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
const initialProducts: Product[] = [
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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [incomeStreams, setIncomeStreams] = useState(initialIncomeStreams);
  const [fixedCosts, setFixedCosts] = useState(initialFixedCosts);
  const [vatRate, setVatRate] = useState(0.25);
  const [results, setResults] = useState<any[]>([]);
  const [cashFlowResults, setCashFlowResults] = useState<CashFlowResult[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productMetrics, setProductMetrics] = useState<any[]>([]);
  const [expandedMetrics, setExpandedMetrics] = useState<Record<number, boolean>>({});
  const [filteredCategory, setFilteredCategory] = useState('all');
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('light');
  const [showSettings, setShowSettings] = useState(false);
  
  // Default new product state
  const defaultNewProduct = {
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
  };
  
  // New product state
  const [newProduct, setNewProduct] = useState(defaultNewProduct);
  
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
            // Type guard to ensure we're dealing with a subscription value
            const subscriptionValue = periodValue as SubscriptionValue;
            // Calculate subscribers with churn
            const effectiveSubscribers = subscriptionValue.subscribers * (1 - subscriptionValue.churnRate);
            const streamRevenue = effectiveSubscribers * subscriptionValue.averageRevenue;
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
            // Type guard to ensure we're dealing with a sales value
            const salesValue = periodValue as SalesValue;
            // Direct sales
            totalRevenue += salesValue.revenue;
            
            // Use category-specific margins
            const category = stream.category || 'dtc';
            let costRatio = 0.13; // Default fallback
            
            // Find matching products by category
            const matchingProducts = products.filter(p => p.category === category);
            
            if (matchingProducts.length > 0) {
              const avgMarginPercentage = matchingProducts.reduce((sum, p) => sum + p.marginPercentage, 0) / matchingProducts.length;
              costRatio = 1 - avgMarginPercentage;
            }
            
            totalCogs += salesValue.revenue * costRatio;
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
        ? (product as PhysicalProduct).productionCost + (product as PhysicalProduct).logisticsCost + product.marketingCost
        : (product as ServiceProduct).operationalCost + product.marketingCost;
        
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
      } as CashFlowResult;
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
  const formatCurrency = (num: number) => {
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
      ? ((editingProduct as PhysicalProduct).productionCost + (editingProduct as PhysicalProduct).logisticsCost)
      : (editingProduct as ServiceProduct).operationalCost;
    
    const margin = editingProduct.price - cost;
    const marginPercentage = editingProduct.price > 0 ? margin / editingProduct.price : 0;
    
    const updatedProduct = {
      ...editingProduct,
      cost: cost,
      margin: margin,
      marginPercentage: marginPercentage,
      averageOrderValue: parseFloat(String(editingProduct.averageOrderValue)) || editingProduct.price,
    };
    
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setShowModal(false);
  };
  
  // Delete a product
  const deleteProduct = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };
  
  // Add a new product
  const addProduct = () => {
    // Calculate margin and percentage
    const cost = newProduct.type === 'product' 
      ? (parseFloat(String(newProduct.productionCost)) + parseFloat(String(newProduct.logisticsCost)))
      : parseFloat(String(newProduct.operationalCost));
    
    const margin = parseFloat(String(newProduct.price)) - cost;
    const marginPercentage = newProduct.price > 0 ? margin / parseFloat(String(newProduct.price)) : 0;
    
    if (newProduct.type === 'product') {
      const physicalProduct: PhysicalProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: newProduct.name,
        price: parseFloat(String(newProduct.price)),
        productionCost: parseFloat(String(newProduct.productionCost)),
        logisticsCost: parseFloat(String(newProduct.logisticsCost)),
        marketingCost: parseFloat(String(newProduct.marketingCost)),
        cost: cost,
        margin: margin,
        marginPercentage: marginPercentage,
        type: 'product',
        category: newProduct.category,
        revenueType: newProduct.revenueType,
        averageReorderRate: parseFloat(String(newProduct.averageReorderRate)),
        averageOrderValue: parseFloat(String(newProduct.averageOrderValue)) || parseFloat(String(newProduct.price)),
        customerLifetimeMonths: parseInt(String(newProduct.customerLifetimeMonths)),
        acquisitionCost: parseFloat(String(newProduct.acquisitionCost)),
      };
      
      setProducts([...products, physicalProduct]);
    } else {
      const serviceProduct: ServiceProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: newProduct.name,
        price: parseFloat(String(newProduct.price)),
        operationalCost: parseFloat(String(newProduct.operationalCost)),
        marketingCost: parseFloat(String(newProduct.marketingCost)),
        cost: cost,
        margin: margin,
        marginPercentage: marginPercentage,
        type: 'service',
        category: newProduct.category,
        revenueType: newProduct.revenueType,
        averageReorderRate: parseFloat(String(newProduct.averageReorderRate)),
        averageOrderValue: parseFloat(String(newProduct.averageOrderValue)) || parseFloat(String(newProduct.price)),
        customerLifetimeMonths: parseInt(String(newProduct.customerLifetimeMonths)),
        acquisitionCost: parseFloat(String(newProduct.acquisitionCost)),
      };
      
      setProducts([...products, serviceProduct]);
    }
    
    // Reset form
    setNewProduct(defaultNewProduct);
    
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
