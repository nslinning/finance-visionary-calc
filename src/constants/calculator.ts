// More specific type for nested translations
export interface ProductCategories {
  dtc: string;
  dtb: string;
  reseller: string;
  software: string;
}

export interface RevenueTypes {
  product: string;
  license: string;
  subscription: string;
  service: string;
}

export interface FixedCostCategories {
  personnel: string;
  facilities: string;
  marketing: string;
  [key: string]: string;
}

export interface FixedCostTypes {
  personnel: string;
  facilities: string;
  marketing: string;
  [key: string]: string;
}

export interface TranslationObject {
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
  fixedCostCategories: FixedCostCategories;
  fixedCostTypes: FixedCostTypes;
  period: string;
  amount: string;
  totalFixedCosts: string;
  totalFixedCostsSummary: string;
}

// Language translations with proper typing
export const translations: {
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
    },
    fixedCostCategories: {
      personnel: 'Personnel',
      facilities: 'Facilities',
      marketing: 'Marketing'
    },
    fixedCostTypes: {
      personnel: 'Personnel Costs',
      facilities: 'Facility Costs',
      marketing: 'Marketing Costs'
    },
    period: 'Period',
    amount: 'Amount',
    totalFixedCosts: 'Total Fixed Costs',
    totalFixedCostsSummary: 'Total fixed costs across all categories for the latest period.'
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
    },
    fixedCostCategories: {
      personnel: 'Personell',
      facilities: 'Fasiliteter',
      marketing: 'Markedsføring'
    },
    fixedCostTypes: {
      personnel: 'Personellkostnader',
      facilities: 'Fasilitetskostnader',
      marketing: 'Markedsføringskostnader'
    },
    period: 'Periode',
    amount: 'Beløp',
    totalFixedCosts: 'Totale faste kostnader',
    totalFixedCostsSummary: 'Totale faste kostnader for alle kategorier i siste periode.'
  }
};

export const PRODUCT_CATEGORIES = [
  { id: 'dtc', name: 'Direct-to-Consumer (DTC)' },
  { id: 'dtb', name: 'Direct-to-Business (DTB)' },
  { id: 'reseller', name: 'Reseller' },
  { id: 'software', name: 'Software/Service' }
];

export const REVENUE_TYPES = [
  { id: 'product', name: 'Product-based' },
  { id: 'license', name: 'License-based' },
  { id: 'subscription', name: 'Subscription-based' },
  { id: 'service', name: 'Service-based' }
];

export const COLORS = {
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

export const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.77,
  NOK: 10.5,
  DKK: 6.8,
  SEK: 10.3
};

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  NOK: 'kr',
  DKK: 'kr',
  SEK: 'kr'
};

export const initialPeriods = [
  { id: 1, label: 'Q1 2023', date: new Date(2023, 2, 31) },
  { id: 2, label: 'Q2 2023', date: new Date(2023, 5, 30) },
  { id: 3, label: 'Q3 2023', date: new Date(2023, 8, 30) },
  { id: 4, label: 'Q4 2023', date: new Date(2023, 11, 31) },
  { id: 5, label: 'Q1 2024', date: new Date(2024, 2, 31) },
  { id: 6, label: 'Q2 2024', date: new Date(2024, 5, 30) }
];

export const initialProducts = [
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

export const initialIncomeStreams = [
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

export const initialFixedCosts = [
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

export const defaultNewProduct = {
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
