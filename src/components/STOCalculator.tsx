
import React, { useState, useEffect, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, ReferenceLine, ComposedChart, Cell, AreaChart, Area
} from 'recharts';
import { 
  PlusCircle, Trash2, Edit2, Package, Activity, CreditCard, Calendar, 
  Users, BarChart2, Briefcase, Tag, Clock, TrendingUp, Check, DollarSign,
  Settings
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

// More specific type for nested translations
interface ProductCategories {
  dtc: string;
  dtb: string;
  reseller: string;
  software: string;
}

interface RevenueTypes {
  product: string;
  license: string;
  subscription: string;
  service: string;
}

interface TranslationObject {
  title: string;
  subtitle: string;
  dashboard: string;
  products: string;
  incomeStreams: string;
  fixedCosts: string;
  financialOverview: string;
  allCategories: string;
  totalRevenue: string;
  acrossPeriods: string;
  averageGrossMargin: string;
  averageOverTime: string;
  endingLiquidity: string;
  endOfLastPeriod: string;
  latestOperatingResult: string;
  resultDevelopment: string;
  liquidityDevelopment: string;
  revenueByCategory: string;
  keyMetricsByCategory: string;
  averageCAC: string;
  averageCLV: string;
  averageAOV: string;
  averageCPO: string;
  addNew: string;
  name: string;
  type: string;
  category: string;
  revenueType: string;
  price: string;
  marginPercentage: string;
  actions: string;
  productMetricsAndProfitability: string;
  clv: string;
  cac: string;
  roi: string;
  margin: string;
  detailedMetrics: string;
  costPerOrder: string;
  avgOrderValue: string;
  customerLifetime: string;
  ordersPerYear: string;
  subscribers: string;
  arpu: string;
  churn: string;
  latestSubscribers: string;
  latestARPU: string;
  latestChurn: string;
  totalRevenueMetric: string;
  averageGrowth: string;
  cost: string;
  total: string;
  addNewProduct: string;
  productName: string;
  productType: string;
  serviceType: string;
  productionCost: string;
  logisticsCost: string;
  operationalCost: string;
  marketingCost: string;
  customerMetrics: string;
  avgOrdersPerYear: string;
  avgOrderValueLabel: string;
  leaveBlank: string;
  customerRelationshipLength: string;
  customerAcquisitionCost: string;
  cancel: string;
  add: string;
  editProduct: string;
  update: string;
  revenue: string;
  netCashFlow: string;
  cumulativeCashFlow: string;
  cogs: string;
  fixedCostsLabel: string;
  operatingResult: string;
  settings: string;
  language: string;
  currency: string;
  theme: string;
  light: string;
  dark: string;
  productCategories: ProductCategories;
  revenueTypes: RevenueTypes;
}

// Language translations with proper typing
const translations: {
  [key: string]: TranslationObject
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

// Constants and initial data that were missing
const PRODUCT_CATEGORIES = [
  { id: 'dtc', name: 'Direct-to-Consumer (DTC)' },
  { id: 'dtb', name: 'Direct-to-Business (DTB)' },
  { id: 'reseller', name: 'Reseller' },
  { id: 'software', name: 'Software/Service' }
];

const REVENUE_TYPES = [
  { id: 'product', name: 'Product-based' },
  { id: 'license', name: 'License-based' },
  { id: 'subscription', name: 'Subscription-based' },
  { id: 'service', name: 'Service-based' }
];

const COLORS = {
  revenue: '#4263EB',
  cogs: '#FA5252',
  fixedCosts: '#FF922B',
  operatingResult: '#40C057',
  cashFlow: '#4263EB',
  cumulativeCashFlow: '#40C057',
  dtc: '#4263EB',
  dtb: '#FA5252',
  reseller: '#FF922B',
  software: '#40C057'
};

const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.77,
  NOK: 10.5,
  DKK: 6.8,
  SEK: 10.3
};

const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  NOK: 'kr',
  DKK: 'kr',
  SEK: 'kr'
};

// Initial periods (e.g., quarters or months)
const initialPeriods = [
  { id: 1, label: 'Q1 2023', date: new Date(2023, 2, 31) },
  { id: 2, label: 'Q2 2023', date: new Date(2023, 5, 30) },
  { id: 3, label: 'Q3 2023', date: new Date(2023, 8, 30) },
  { id: 4, label: 'Q4 2023', date: new Date(2023, 11, 31) },
  { id: 5, label: 'Q1 2024', date: new Date(2024, 2, 31) },
  { id: 6, label: 'Q2 2024', date: new Date(2024, 5, 30) }
];

// Initial sample products
const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Widget',
    price: 99,
    productionCost: 25,
    logisticsCost: 15,
    marketingCost: 10,
    cost: 50,
    margin: 49,
    marginPercentage: 0.49,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 2.1,
    averageOrderValue: 99,
    customerLifetimeMonths: 24,
    acquisitionCost: 30
  },
  {
    id: 2,
    name: 'Business Solution',
    price: 199,
    operationalCost: 40,
    marketingCost: 20,
    cost: 60,
    margin: 139,
    marginPercentage: 0.7,
    type: 'service',
    category: 'dtb',
    revenueType: 'subscription',
    averageReorderRate: 12,
    averageOrderValue: 199,
    customerLifetimeMonths: 36,
    acquisitionCost: 100
  },
  {
    id: 3,
    name: 'Budget Widget',
    price: 49,
    productionCost: 15,
    logisticsCost: 10,
    marketingCost: 5,
    cost: 30,
    margin: 19,
    marginPercentage: 0.39,
    type: 'product',
    category: 'reseller',
    revenueType: 'product',
    averageReorderRate: 1.5,
    averageOrderValue: 49,
    customerLifetimeMonths: 18,
    acquisitionCost: 15
  },
  {
    id: 4,
    name: 'SaaS Platform',
    price: 99,
    operationalCost: 20,
    marketingCost: 10,
    cost: 30,
    margin: 69,
    marginPercentage: 0.7,
    type: 'service',
    category: 'software',
    revenueType: 'subscription',
    averageReorderRate: 12,
    averageOrderValue: 99,
    customerLifetimeMonths: 24,
    acquisitionCost: 50
  }
];

// Initial income streams
const initialIncomeStreams = [
  {
    id: 1,
    name: 'DTC Sales',
    type: 'sales',
    category: 'dtc',
    values: [
      { periodId: 1, revenue: 50000 },
      { periodId: 2, revenue: 65000 },
      { periodId: 3, revenue: 80000 },
      { periodId: 4, revenue: 110000 },
      { periodId: 5, revenue: 95000 },
      { periodId: 6, revenue: 125000 }
    ]
  },
  {
    id: 2,
    name: 'B2B Sales',
    type: 'sales',
    category: 'dtb',
    values: [
      { periodId: 1, revenue: 120000 },
      { periodId: 2, revenue: 130000 },
      { periodId: 3, revenue: 150000 },
      { periodId: 4, revenue: 180000 },
      { periodId: 5, revenue: 200000 },
      { periodId: 6, revenue: 220000 }
    ]
  },
  {
    id: 3,
    name: 'SaaS Subscription',
    type: 'subscription',
    category: 'software',
    values: [
      { periodId: 1, subscribers: 500, averageRevenue: 99, multiplier: 1, churnRate: 0.03 },
      { periodId: 2, subscribers: 650, averageRevenue: 99, multiplier: 1, churnRate: 0.03 },
      { periodId: 3, subscribers: 800, averageRevenue: 99, multiplier: 1, churnRate: 0.025 },
      { periodId: 4, subscribers: 950, averageRevenue: 99, multiplier: 1, churnRate: 0.025 },
      { periodId: 5, subscribers: 1100, averageRevenue: 99, multiplier: 1, churnRate: 0.02 },
      { periodId: 6, subscribers: 1300, averageRevenue: 99, multiplier: 1, churnRate: 0.02 }
    ]
  }
];

// Initial fixed costs
const initialFixedCosts = [
  {
    id: 1,
    name: 'Salaries',
    category: 'personnel',
    values: [
      { periodId: 1, amount: 50000 },
      { periodId: 2, amount: 50000 },
      { periodId: 3, amount: 60000 },
      { periodId: 4, amount: 60000 },
      { periodId: 5, amount: 70000 },
      { periodId: 6, amount: 70000 }
    ]
  },
  {
    id: 2,
    name: 'Office & Facilities',
    category: 'facilities',
    values: [
      { periodId: 1, amount: 15000 },
      { periodId: 2, amount: 15000 },
      { periodId: 3, amount: 15000 },
      { periodId: 4, amount: 15000 },
      { periodId: 5, amount: 18000 },
      { periodId: 6, amount: 18000 }
    ]
  },
  {
    id: 3,
    name: 'Marketing',
    category: 'marketing',
    values: [
      { periodId: 1, amount: 20000 },
      { periodId: 2, amount: 25000 },
      { periodId: 3, amount: 30000 },
      { periodId: 4, amount: 40000 },
      { periodId: 5, amount: 30000 },
      { periodId: 6, amount: 35000 }
    ]
  }
];

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

  // Get translated category name safely
  const getCategoryName = (categoryId: string): string => {
    return t.productCategories[categoryId as keyof ProductCategories] || categoryId;
  };
  
  // Get translated revenue type name safely
  const getRevenueTypeName = (typeId: string): string => {
    return t.revenueTypes[typeId as keyof RevenueTypes] || typeId;
  };

  // Get category names with translations
  const getProductCategories = useMemo(() => {
    return PRODUCT_CATEGORIES.map(cat => ({
      ...cat,
      name: getCategoryName(cat.id)
    }));
  }, [language]);

  // Get revenue type names with translations
  const getRevenueTypes = useMemo(() => {
    return REVENUE_TYPES.map(type => ({
      ...type,
      name: getRevenueTypeName(type.id)
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
      ? ((editingProduct as PhysicalProduct).productionCost + (editingProduct as PhysicalProduct).logisticsCost + editingProduct.marketingCost)
      : ((editingProduct as ServiceProduct).operationalCost + editingProduct.marketingCost);
    
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
    const productToAdd = {
      ...newProduct,
      id: newId,
      cost,
      margin,
      marginPercentage,
      averageOrderValue: newProduct.averageOrderValue || newProduct.price
    };
    
    // Add product to state
    setProducts([...products, productToAdd as Product]);
    
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
  
  // Render functions
  
  // Render Dashboard Tab
  const renderDashboard = () => {
    if (!summaryMetrics) return <div className="p-4">Loading data...</div>;
    
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">{t.financialOverview}</h2>
        
        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.totalRevenue}</p>
                <h3 className="text-2xl font-bold">{formatCurrency(summaryMetrics.totalRevenue)}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.acrossPeriods}</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.averageGrossMargin}</p>
                <h3 className="text-2xl font-bold">{summaryMetrics.avgGrossMargin.toFixed(1)}%</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.averageOverTime}</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.endingLiquidity}</p>
                <h3 className="text-2xl font-bold">{formatCurrency(summaryMetrics.endingLiquidity)}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.endOfLastPeriod}</p>
              </div>
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.latestOperatingResult}</p>
                <h3 className="text-2xl font-bold">{formatCurrency(summaryMetrics.latestOperatingResult)}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.endOfLastPeriod}</p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Operating Result Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">{t.resultDevelopment}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={results}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="revenue" name={t.revenue} fill={COLORS.revenue} />
                  <Bar dataKey="cogs" name={t.cogs} fill={COLORS.cogs} />
                  <Bar dataKey="fixedCosts" name={t.fixedCostsLabel} fill={COLORS.fixedCosts} />
                  <Bar dataKey="operatingResult" name={t.operatingResult} fill={COLORS.operatingResult} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Cash Flow Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">{t.liquidityDevelopment}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={cashFlowResults}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="netCashFlow" name={t.netCashFlow} fill={COLORS.cashFlow} />
                  <Line
                    type="monotone"
                    dataKey="cumulativeCashFlow"
                    name={t.cumulativeCashFlow}
                    stroke={COLORS.cumulativeCashFlow}
                    strokeWidth={2}
                  />
                  <ReferenceLine y={0} stroke="#000" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Category Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Category */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">{t.revenueByCategory}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(categoryMetrics).map(([category, metrics]) => ({
                      name: getCategoryName(category),
                      value: metrics.revenue
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={(entry) => `${entry.name}: ${formatCurrency(entry.value)}`}
                  >
                    {Object.keys(categoryMetrics).map((category, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[category] || `#${Math.floor(Math.random()*16777215).toString(16)}`} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Key Metrics by Category */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">{t.keyMetricsByCategory}</h3>
            <div className="space-y-4">
              {Object.entries(categoryMetrics).map(([category, metrics]) => (
                <div key={category} className="border-b pb-2 last:border-b-0">
                  <h4 className="font-medium">{getCategoryName(category)}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{t.averageCAC}</p>
                      <p className="font-semibold">{formatCurrency(metrics.avgCAC)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{t.averageCLV}</p>
                      <p className="font-semibold">{formatCurrency(metrics.avgCLV)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{t.averageAOV}</p>
                      <p className="font-semibold">{formatCurrency(metrics.avgAOV)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{t.averageCPO}</p>
                      <p className="font-semibold">{formatCurrency(metrics.avgCPO)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render Products Tab
  const renderProducts = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t.products}</h2>
        <button
          onClick={() => {
            setModalType('addProduct');
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          <span>{t.addNew}</span>
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.category}
        </label>
        <select
          value={filteredCategory}
          onChange={(e) => setFilteredCategory(e.target.value)}
          className="block w-full md:w-1/4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
        >
          <option value="all">{t.allCategories}</option>
          {getProductCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.name}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.type}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.category}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.revenueType}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.price}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.marginPercentage}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProducts.map((product) => (
              <React.Fragment key={product.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleMetricExpansion(product.id)}
                      className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {product.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {product.type === 'product' ? t.productType : t.serviceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {getCategoryName(product.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {getRevenueTypeName(product.revenueType)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {(product.marginPercentage * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => editProduct(product.id)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedMetrics[product.id] && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">{t.productMetricsAndProfitability}</h4>
                        
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {productMetrics
                            .filter(metric => metric.productId === product.id)
                            .map(metric => (
                              <React.Fragment key={`metrics-${product.id}`}>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.clv}</p>
                                  <p className="font-semibold">{formatCurrency(metric.clv)}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.cac}</p>
                                  <p className="font-semibold">{formatCurrency(metric.acquisitionCost)}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.roi}</p>
                                  <p className="font-semibold">{metric.roi.toFixed(1)}%</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.margin}</p>
                                  <p className="font-semibold">{metric.marginPercentage.toFixed(1)}%</p>
                                </div>
                              </React.Fragment>
                            ))}
                        </div>
                        
                        {/* Detailed Metrics */}
                        <div className="mt-4">
                          <h5 className="font-medium mb-2">{t.detailedMetrics}</h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.costPerOrder}</p>
                              <p className="font-semibold">{formatCurrency(product.cost)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.avgOrderValue}</p>
                              <p className="font-semibold">{formatCurrency(product.averageOrderValue || product.price)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.customerLifetime}</p>
                              <p className="font-semibold">{product.customerLifetimeMonths} {language === 'en' ? 'months' : 'måneder'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.ordersPerYear}</p>
                              <p className="font-semibold">{product.averageReorderRate.toFixed(1)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  // Render Income Streams Tab (placeholder)
  const renderIncomeStreams = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">{t.incomeStreams}</h2>
      <p>Income streams management UI will be implemented here</p>
    </div>
  );
  
  // Render Fixed Costs Tab (placeholder)
  const renderFixedCosts = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">{t.fixedCosts}</h2>
      <p>Fixed costs management UI will be implemented here</p>
    </div>
  );
  
  // Modal for adding or editing products
  const renderModal = () => {
    const isEdit = modalType === 'editProduct';
    const productData = isEdit ? editingProduct : newProduct;
    
    if (!productData) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              {isEdit ? t.editProduct : t.addNewProduct}
            </h3>
            
            <div className="space-y-4">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.productName}
                </label>
                <input
                  type="text"
                  value={productData.name}
                  onChange={(e) => isEdit
                    ? updateEditingProductState('name', e.target.value)
                    : updateNewProductState('name', e.target.value)
                  }
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.type}
                  </label>
                  <select
                    value={productData.type}
                    onChange={(e) => isEdit
                      ? updateEditingProductState('type', e.target.value)
                      : updateNewProductState('type', e.target.value)
                    }
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                  >
                    <option value="product">{t.productType}</option>
                    <option value="service">{t.serviceType}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.category}
                  </label>
                  <select
                    value={productData.category}
                    onChange={(e) => isEdit
                      ? updateEditingProductState('category', e.target.value)
                      : updateNewProductState('category', e.target.value)
                    }
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                  >
                    {getProductCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.revenueType}
                  </label>
                  <select
                    value={productData.revenueType}
                    onChange={(e) => isEdit
                      ? updateEditingProductState('revenueType', e.target.value)
                      : updateNewProductState('revenueType', e.target.value)
                    }
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                  >
                    {getRevenueTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.price}
                </label>
                <input
                  type="number"
                  value={productData.price}
                  onChange={(e) => isEdit
                    ? updateEditingProductState('price', parseFloat(e.target.value) || 0)
                    : updateNewProductState('price', parseFloat(e.target.value) || 0)
                  }
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                />
              </div>
              
              {/* Cost Structure */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <h4 className="font-medium mb-2">{t.cost}</h4>
                {productData.type === 'product' ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t.productionCost}
                      </label>
                      <input
                        type="number"
                        value={(productData as any).productionCost || 0}
                        onChange={(e) => isEdit
                          ? updateEditingProductState('productionCost', parseFloat(e.target.value) || 0)
                          : updateNewProductState('productionCost', parseFloat(e.target.value) || 0)
                        }
                        min="0"
                        step="0.01"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t.logisticsCost}
                      </label>
                      <input
                        type="number"
                        value={(productData as any).logisticsCost || 0}
                        onChange={(e) => isEdit
                          ? updateEditingProductState('logisticsCost', parseFloat(e.target.value) || 0)
                          : updateNewProductState('logisticsCost', parseFloat(e.target.value) || 0)
                        }
                        min="0"
                        step="0.01"
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.operationalCost}
                    </label>
                    <input
                      type="number"
                      value={(productData as any).operationalCost || 0}
                      onChange={(e) => isEdit
                        ? updateEditingProductState('operationalCost', parseFloat(e.target.value) || 0)
                        : updateNewProductState('operationalCost', parseFloat(e.target.value) || 0)
                      }
                      min="0"
                      step="0.01"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                    />
                  </div>
                )}
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.marketingCost}
                  </label>
                  <input
                    type="number"
                    value={productData.marketingCost}
                    onChange={(e) => isEdit
                      ? updateEditingProductState('marketingCost', parseFloat(e.target.value) || 0)
                      : updateNewProductState('marketingCost', parseFloat(e.target.value) || 0)
                    }
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                  />
                </div>
              </div>
              
              {/* Customer Metrics */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <h4 className="font-medium mb-2">{t.customerMetrics}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.avgOrdersPerYear}
                    </label>
                    <input
                      type="number"
                      value={productData.averageReorderRate}
                      onChange={(e) => isEdit
                        ? updateEditingProductState('averageReorderRate', parseFloat(e.target.value) || 0)
                        : updateNewProductState('averageReorderRate', parseFloat(e.target.value) || 0)
                      }
                      min="0"
                      step="0.1"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.avgOrderValueLabel}
                      <span className="text-xs text-gray-500 ml-1">({t.leaveBlank})</span>
                    </label>
                    <input
                      type="number"
                      value={productData.averageOrderValue || ''}
                      onChange={(e) => isEdit
                        ? updateEditingProductState('averageOrderValue', e.target.value ? parseFloat(e.target.value) : null)
                        : updateNewProductState('averageOrderValue', e.target.value ? parseFloat(e.target.value) : null)
                      }
                      min="0"
                      step="0.01"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                      placeholder={productData.price.toString()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.customerRelationshipLength}
                    </label>
                    <input
                      type="number"
                      value={productData.customerLifetimeMonths}
                      onChange={(e) => isEdit
                        ? updateEditingProductState('customerLifetimeMonths', parseInt(e.target.value) || 0)
                        : updateNewProductState('customerLifetimeMonths', parseInt(e.target.value) || 0)
                      }
                      min="1"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.customerAcquisitionCost}
                    </label>
                    <input
                      type="number"
                      value={productData.acquisitionCost}
                      onChange={(e) => isEdit
                        ? updateEditingProductState('acquisitionCost', parseFloat(e.target.value) || 0)
                        : updateNewProductState('acquisitionCost', parseFloat(e.target.value) || 0)
                      }
                      min="0"
                      step="0.01"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {t.cancel}
              </button>
              <button
                onClick={isEdit ? updateProduct : addNewProduct}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {isEdit ? t.update : t.add}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Settings Modal
  const renderSettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">{t.settings}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.language}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
              >
                <option value="en">English</option>
                <option value="no">Norsk</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.currency}
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="NOK">NOK (kr)</option>
                <option value="DKK">DKK (kr)</option>
                <option value="SEK">SEK (kr)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.theme}
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
              >
                <option value="light">{t.light}</option>
                <option value="dark">{t.dark}</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowSettings(false)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {t.update}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
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
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'incomeStreams' && renderIncomeStreams()}
          {activeTab === 'fixedCosts' && renderFixedCosts()}
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
            {renderSettingsModal()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default STOCalculator;
