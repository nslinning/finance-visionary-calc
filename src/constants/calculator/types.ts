
// TypeScript interface for translation object structure
export interface ProductCategories {
  dtc: string;
  dtb: string;
  reseller: string;
  software: string;
  b2b?: string;
  b2c?: string;
  b2b2c?: string;
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
  
  // Customer segments
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
  
  // Timeline planning
  timelineStartDate: string;
  timelineDuration: string;
  timelineInterval: string;
  year: string;
  quarter: string;
  month: string;
  applyTimeline: string;
  setStartDate: string; 
  discountBasedOn: string;
  
  // Dashboard welcome screen
  welcomeToDashboard: string;
  dashboardInstructions: string;
  firstStepTitle: string;
  firstStepDescription: string;
  secondStepTitle: string;
  secondStepDescription: string;
  startWithTimeline: string;
  addProducts: string;
  
  // Hardware options
  basicInfo: string;
  pricingOptions: string;
  hardwareOptions: string;
  includeHardware: string;
  hardwareAcquisitionType: string;
  hardwareProduct: string;
  selectHardwareAcquisitionType: string;
  purchase: string;
  rent: string;
  lease: string;
  leaseInterestRate: string;
  leaseRequiresCommitment: string;
  leaseMinimumContractLength: string;
  selectHardware: string;
  subscriptionType: string;
  selectSubscriptionType: string;
  mrrNoCommitment: string;
  arrWithCommitment: string;
  
  // Individual customer
  addIndividualCustomer: string;
  isIndividualCustomer: string;
  customerName: string;
  customerEmail: string;
  customerDetails: string;
  calculationPurpose: string;
  createOffer: string;
  calculateValue: string;
  selectPurpose: string;
  
  // Segments and individual customers
  segments: string;
  individualCustomers: string;
  noCustomerSegments: string;
  noIndividualCustomers: string;
  noCustomerSegmentsOrIndividuals: string;
  individualCustomer: string;
  
  // Hardware details
  hardwareDetails: string;
  hardware: string;
  acquisitionType: string;
  interestRate: string;
  
  // Export functionality
  export: string;
  exportResults: string;
  exportResultsDescription: string;
  exportFormat: string;
  selectFormat: string;
  contentToInclude: string;
  includeGraphs: string;
  includeFinancials: string;
  includeCustomerSegments: string;
  includeProducts: string;
  exportPreparing: string;
  exportPreparingDescription: string;
  exportReady: string;
  exportReadyDescription: string;
  
  // Subscription tiers
  subscriptionTiers: string;
  userMonth: string;
  moreFeatures: string;
  licenseFeePricePerUser: string;
  
  // Monthly fee per user
  monthlyPerUserFee: string;
  
  // Form messages
  email: string;
  
  // Initial financial data
  initialFinancialData: string;
  initialBalance: string;
  initialReceivables: string;
  initialPayables: string;
  
  // Additional costs for customer segments
  additionalCostsTab: string;
  logisticsCosts: string;
  logisticsCostPercentage: string;
  indirectCosts: string;
  indirectCostPercentage: string;
  additionalCosts: string;
  additionalFixedCosts: string;
  logisticsCostDescription: string;
  indirectCostDescription: string;
  additionalCostDescription: string;
  costBreakdown: string;
  
  // Fixed costs section
  addFixedCost: string;
  costName: string;
  costCategory: string;
  save: string;
}
