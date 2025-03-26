
// Initial data for application state
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
