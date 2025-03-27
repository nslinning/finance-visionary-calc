
// TypeScript interface for translation object structure
export interface ProductCategories {
  dtc: string;
  dtb: string;
  reseller: string;
  software: string;
  b2b?: string;  // Legger til b2b
  b2c?: string;  // Legger til b2c
  b2b2c?: string;  // Legger til b2b2c
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
  customerSegments: string;
  timelinePlanning: string;
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
  // Nye egenskaper for kundesegmenter
  addNewSegment: string;
  editSegment: string;
  segmentName: string;
  segmentType: string;
  segmentProducts: string;
  licenseFee: string;
  employeeCount: string;
  contractLength: string;
  years: string;
  discountParameters: string;
  volumeDiscount: string;
  contractLengthDiscount: string;
  customDiscount: string;
  monthlyFee: string;
  annualRecurringRevenue: string;
  totalContractValue: string;
  b2b: string;
  b2c: string;
  b2b2c: string;
  // Nye egenskaper for tidslinjeplanlegging
  timelineStartDate: string;
  timelineDuration: string;
  timelineInterval: string;
  year: string;
  quarter: string;
  month: string;
  applyTimeline: string;
}
