
import { NewProduct, CustomerSegment, Period, IncomeStream, FixedCost } from '../../types/calculator';

// Initial products data
export const initialProducts: NewProduct[] = [
  {
    name: 'Sydera Basic',
    price: 2990,
    productionCost: 1200,
    logisticsCost: 300,
    operationalCost: 0,
    marketingCost: 400,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 1.5,
    averageOrderValue: 3000,
    customerLifetimeMonths: 24,
    acquisitionCost: 500
  },
  {
    name: 'Sydera Pro',
    price: 4990,
    productionCost: 1800,
    logisticsCost: 400,
    operationalCost: 0,
    marketingCost: 600,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 2,
    averageOrderValue: 5000,
    customerLifetimeMonths: 36,
    acquisitionCost: 750
  },
  {
    name: 'Sydera Enterprise',
    price: 7990,
    productionCost: 2500,
    logisticsCost: 500,
    operationalCost: 0,
    marketingCost: 800,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 2.5,
    averageOrderValue: 8000,
    customerLifetimeMonths: 48,
    acquisitionCost: 1000
  },
  {
    name: 'Sydera Support',
    price: 990,
    productionCost: 0,
    logisticsCost: 0,
    operationalCost: 200,
    marketingCost: 100,
    type: 'service',
    category: 'dtc',
    revenueType: 'service',
    averageReorderRate: 0,
    averageOrderValue: 0,
    customerLifetimeMonths: 0,
    acquisitionCost: 0
  },
  {
    name: 'Sydera Training',
    price: 1490,
    productionCost: 0,
    logisticsCost: 0,
    operationalCost: 300,
    marketingCost: 150,
    type: 'service',
    category: 'dtc',
    revenueType: 'service',
    averageReorderRate: 0,
    averageOrderValue: 0,
    customerLifetimeMonths: 0,
    acquisitionCost: 0
  },
  {
    name: 'Sydera Consulting',
    price: 1990,
    productionCost: 0,
    logisticsCost: 0,
    operationalCost: 400,
    marketingCost: 200,
    type: 'service',
    category: 'dtc',
    revenueType: 'service',
    averageReorderRate: 0,
    averageOrderValue: 0,
    customerLifetimeMonths: 0,
    acquisitionCost: 0
  },
  {
    name: 'Sydera Smart Vending',
    price: 12990,
    productionCost: 5000,
    logisticsCost: 1000,
    operationalCost: 0,
    marketingCost: 1500,
    type: 'product',
    category: 'dtb',
    revenueType: 'product',
    averageReorderRate: 3,
    averageOrderValue: 15000,
    customerLifetimeMonths: 60,
    acquisitionCost: 2000
  }
];

// Default new product data
export const defaultNewProduct: NewProduct = {
  name: '',
  price: 0,
  productionCost: 0,
  logisticsCost: 0,
  operationalCost: 0,
  marketingCost: 0,
  type: 'product',
  category: 'dtc',
  revenueType: 'product',
  averageReorderRate: 1,
  averageOrderValue: 0,
  customerLifetimeMonths: 12,
  acquisitionCost: 0
};

// Default new segment data
export const defaultNewSegment: CustomerSegment = {
  id: 0,
  name: '',
  type: 'b2b',
  products: [],
  licenseFeePerUser: 299,
  contractLengthYears: 1,
  volumeDiscountRate: 0,
  contractLengthDiscountRate: 0,
  customDiscountRate: 0,
  employeeCount: 10,
  includesHardware: false,
  hardwareAcquisitionType: 'purchase',
  leaseInterestRate: 5.0,
  subscriptionType: 'arr-commitment',
  calculationPurpose: 'offer',
  isIndividualCustomer: false,
  logisticsCostPercentage: 0,
  indirectCostPercentage: 0,
  additionalCosts: 0
};

// Product subscription tiers
export const subscriptionTiers = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPricePerUser: 199,
    features: [
      'Core functionality',
      'Basic reporting',
      'Email support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPricePerUser: 299,
    features: [
      'Advanced reporting',
      'Priority support',
      'API access',
      'Custom integrations'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPricePerUser: 499,
    features: [
      'Dedicated support',
      'Custom development',
      'SLA guarantee',
      'Advanced security',
      'User management'
    ]
  }
];

// Initial periods data (3 years with quarters)
export const initialPeriods: Period[] = [
  { id: 1, label: 'Q1 2023', date: new Date(2023, 0, 1) },
  { id: 2, label: 'Q2 2023', date: new Date(2023, 3, 1) },
  { id: 3, label: 'Q3 2023', date: new Date(2023, 6, 1) },
  { id: 4, label: 'Q4 2023', date: new Date(2023, 9, 1) },
  { id: 5, label: 'Q1 2024', date: new Date(2024, 0, 1) },
  { id: 6, label: 'Q2 2024', date: new Date(2024, 3, 1) },
  { id: 7, label: 'Q3 2024', date: new Date(2024, 6, 1) },
  { id: 8, label: 'Q4 2024', date: new Date(2024, 9, 1) },
  { id: 9, label: 'Q1 2025', date: new Date(2025, 0, 1) },
  { id: 10, label: 'Q2 2025', date: new Date(2025, 3, 1) },
  { id: 11, label: 'Q3 2025', date: new Date(2025, 6, 1) },
  { id: 12, label: 'Q4 2025', date: new Date(2025, 9, 1) }
];

// Initial income streams data - 3 year progression with growth
export const initialIncomeStreams: IncomeStream[] = [
  {
    id: 1,
    name: 'SaaS-abonnementer',
    type: 'subscription',
    category: 'dtc',
    values: [
      { periodId: 1, averageRevenue: 299, subscribers: 150, multiplier: 1, churnRate: 0.03 },
      { periodId: 2, averageRevenue: 299, subscribers: 200, multiplier: 1, churnRate: 0.03 },
      { periodId: 3, averageRevenue: 299, subscribers: 300, multiplier: 1, churnRate: 0.025 },
      { periodId: 4, averageRevenue: 299, subscribers: 450, multiplier: 1, churnRate: 0.025 },
      { periodId: 5, averageRevenue: 349, subscribers: 600, multiplier: 1, churnRate: 0.02 },
      { periodId: 6, averageRevenue: 349, subscribers: 800, multiplier: 1, churnRate: 0.02 },
      { periodId: 7, averageRevenue: 349, subscribers: 1100, multiplier: 1, churnRate: 0.015 },
      { periodId: 8, averageRevenue: 349, subscribers: 1500, multiplier: 1, churnRate: 0.015 },
      { periodId: 9, averageRevenue: 399, subscribers: 2000, multiplier: 1, churnRate: 0.01 },
      { periodId: 10, averageRevenue: 399, subscribers: 2600, multiplier: 1, churnRate: 0.01 },
      { periodId: 11, averageRevenue: 399, subscribers: 3400, multiplier: 1, churnRate: 0.01 },
      { periodId: 12, averageRevenue: 399, subscribers: 4500, multiplier: 1, churnRate: 0.01 }
    ]
  },
  {
    id: 2,
    name: 'B2B Enterprise-kunder',
    type: 'subscription',
    category: 'dtb',
    values: [
      { periodId: 1, averageRevenue: 1999, subscribers: 2, multiplier: 1, churnRate: 0.0 },
      { periodId: 2, averageRevenue: 1999, subscribers: 3, multiplier: 1, churnRate: 0.0 },
      { periodId: 3, averageRevenue: 1999, subscribers: 4, multiplier: 1, churnRate: 0.0 },
      { periodId: 4, averageRevenue: 1999, subscribers: 6, multiplier: 1, churnRate: 0.0 },
      { periodId: 5, averageRevenue: 2299, subscribers: 9, multiplier: 1, churnRate: 0.0 },
      { periodId: 6, averageRevenue: 2299, subscribers: 12, multiplier: 1, churnRate: 0.0 },
      { periodId: 7, averageRevenue: 2299, subscribers: 18, multiplier: 1, churnRate: 0.0 },
      { periodId: 8, averageRevenue: 2299, subscribers: 25, multiplier: 1, churnRate: 0.0 },
      { periodId: 9, averageRevenue: 2499, subscribers: 35, multiplier: 1, churnRate: 0.0 },
      { periodId: 10, averageRevenue: 2499, subscribers: 45, multiplier: 1, churnRate: 0.0 },
      { periodId: 11, averageRevenue: 2499, subscribers: 60, multiplier: 1, churnRate: 0.0 },
      { periodId: 12, averageRevenue: 2499, subscribers: 80, multiplier: 1, churnRate: 0.0 }
    ]
  },
  {
    id: 3,
    name: 'Hardware-salg',
    type: 'sales',
    category: 'hardware',
    values: [
      { periodId: 1, revenue: 50000 },
      { periodId: 2, revenue: 75000 },
      { periodId: 3, revenue: 100000 },
      { periodId: 4, revenue: 150000 },
      { periodId: 5, revenue: 200000 },
      { periodId: 6, revenue: 250000 },
      { periodId: 7, revenue: 350000 },
      { periodId: 8, revenue: 450000 },
      { periodId: 9, revenue: 600000 },
      { periodId: 10, revenue: 750000 },
      { periodId: 11, revenue: 900000 },
      { periodId: 12, revenue: 1200000 }
    ]
  },
  {
    id: 4,
    name: 'Konsulenttjenester',
    type: 'sales',
    category: 'services',
    values: [
      { periodId: 1, revenue: 85000 },
      { periodId: 2, revenue: 95000 },
      { periodId: 3, revenue: 110000 },
      { periodId: 4, revenue: 130000 },
      { periodId: 5, revenue: 150000 },
      { periodId: 6, revenue: 180000 },
      { periodId: 7, revenue: 220000 },
      { periodId: 8, revenue: 260000 },
      { periodId: 9, revenue: 300000 },
      { periodId: 10, revenue: 350000 },
      { periodId: 11, revenue: 400000 },
      { periodId: 12, revenue: 450000 }
    ]
  }
];

// Initial fixed costs data - realistic fixed costs with scaling over 3 years
export const initialFixedCosts: FixedCost[] = [
  {
    id: 1,
    name: 'Utviklere',
    category: 'personnel',
    values: [
      { periodId: 1, amount: 250000 },
      { periodId: 2, amount: 250000 },
      { periodId: 3, amount: 300000 },
      { periodId: 4, amount: 300000 },
      { periodId: 5, amount: 375000 },
      { periodId: 6, amount: 375000 },
      { periodId: 7, amount: 450000 },
      { periodId: 8, amount: 450000 },
      { periodId: 9, amount: 550000 },
      { periodId: 10, amount: 550000 },
      { periodId: 11, amount: 650000 },
      { periodId: 12, amount: 650000 }
    ]
  },
  {
    id: 2,
    name: 'Salg & Markedsføring',
    category: 'marketing',
    values: [
      { periodId: 1, amount: 120000 },
      { periodId: 2, amount: 140000 },
      { periodId: 3, amount: 160000 },
      { periodId: 4, amount: 180000 },
      { periodId: 5, amount: 200000 },
      { periodId: 6, amount: 240000 },
      { periodId: 7, amount: 280000 },
      { periodId: 8, amount: 320000 },
      { periodId: 9, amount: 380000 },
      { periodId: 10, amount: 440000 },
      { periodId: 11, amount: 500000 },
      { periodId: 12, amount: 560000 }
    ]
  },
  {
    id: 3,
    name: 'Kontorlokaler',
    category: 'facilities',
    values: [
      { periodId: 1, amount: 75000 },
      { periodId: 2, amount: 75000 },
      { periodId: 3, amount: 75000 },
      { periodId: 4, amount: 75000 },
      { periodId: 5, amount: 90000 },
      { periodId: 6, amount: 90000 },
      { periodId: 7, amount: 90000 },
      { periodId: 8, amount: 90000 },
      { periodId: 9, amount: 120000 },
      { periodId: 10, amount: 120000 },
      { periodId: 11, amount: 120000 },
      { periodId: 12, amount: 120000 }
    ]
  },
  {
    id: 4,
    name: 'Kundestøtte',
    category: 'customer_service',
    values: [
      { periodId: 1, amount: 50000 },
      { periodId: 2, amount: 65000 },
      { periodId: 3, amount: 80000 },
      { periodId: 4, amount: 95000 },
      { periodId: 5, amount: 110000 },
      { periodId: 6, amount: 130000 },
      { periodId: 7, amount: 150000 },
      { periodId: 8, amount: 170000 },
      { periodId: 9, amount: 200000 },
      { periodId: 10, amount: 230000 },
      { periodId: 11, amount: 260000 },
      { periodId: 12, amount: 290000 }
    ]
  },
  {
    id: 5,
    name: 'Administrasjon',
    category: 'admin',
    values: [
      { periodId: 1, amount: 90000 },
      { periodId: 2, amount: 90000 },
      { periodId: 3, amount: 90000 },
      { periodId: 4, amount: 90000 },
      { periodId: 5, amount: 110000 },
      { periodId: 6, amount: 110000 },
      { periodId: 7, amount: 130000 },
      { periodId: 8, amount: 130000 },
      { periodId: 9, amount: 150000 },
      { periodId: 10, amount: 150000 },
      { periodId: 11, amount: 180000 },
      { periodId: 12, amount: 180000 }
    ]
  },
  {
    id: 6,
    name: 'IT & Infrastruktur',
    category: 'it',
    values: [
      { periodId: 1, amount: 40000 },
      { periodId: 2, amount: 45000 },
      { periodId: 3, amount: 50000 },
      { periodId: 4, amount: 55000 },
      { periodId: 5, amount: 65000 },
      { periodId: 6, amount: 75000 },
      { periodId: 7, amount: 85000 },
      { periodId: 8, amount: 95000 },
      { periodId: 9, amount: 110000 },
      { periodId: 10, amount: 125000 },
      { periodId: 11, amount: 140000 },
      { periodId: 12, amount: 155000 }
    ]
  }
];

// Demo customer segment - en stor bedrift med 10.000 ansatte
export const demoCustomerSegment: CustomerSegment = {
  id: 1,
  name: "StorBedrift AS",
  type: "b2b",
  products: [1, 2, 3, 7], // IDs for Sydera Basic, Pro, Enterprise og Smart Vending
  licenseFeePerUser: 249,
  contractLengthYears: 3,
  volumeDiscountRate: 15, // 15% volumrabatt
  contractLengthDiscountRate: 10, // 10% rabatt for langtidskontrakt
  customDiscountRate: 5, // 5% ekstra kundespesifikk rabatt
  employeeCount: 10000,
  includesHardware: true,
  hardwareAcquisitionType: "lease",
  hardwareId: 7, // Smart Vending
  leaseInterestRate: 4.5,
  subscriptionType: "arr-commitment",
  calculationPurpose: "offer",
  isIndividualCustomer: true,
  customerName: "StorBedrift AS",
  customerEmail: "kontakt@storbedrift.no",
  logisticsCostPercentage: 2,
  indirectCostPercentage: 3,
  additionalCosts: 15000
};

