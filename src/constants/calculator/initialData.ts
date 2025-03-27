
// Initial data for application state
export const initialPeriods = [
  // Empty initially - will be filled by user
];

export const initialProducts = [
  {
    id: 1,
    name: 'STÖ heat patches 3 pcs',
    price: 100,
    productionCost: 12,
    logisticsCost: 5,
    marketingCost: 3,
    cost: 20,
    margin: 80,
    marginPercentage: 0.8,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 2.0,
    averageOrderValue: 100,
    customerLifetimeMonths: 24,
    acquisitionCost: 20
  },
  {
    id: 2,
    name: 'STÖ heat patches 6 pcs',
    price: 150,
    productionCost: 22,
    logisticsCost: 5,
    marketingCost: 3,
    cost: 30,
    margin: 120,
    marginPercentage: 0.8,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 2.0,
    averageOrderValue: 150,
    customerLifetimeMonths: 24,
    acquisitionCost: 20
  },
  {
    id: 3,
    name: 'SYDERA SMART VENDING',
    price: 200000,
    productionCost: 100000,
    logisticsCost: 5000,
    marketingCost: 3000,
    cost: 108000,
    margin: 92000,
    marginPercentage: 0.46,
    type: 'product',
    category: 'dtb',
    revenueType: 'product',
    averageReorderRate: 0.25,
    averageOrderValue: 200000,
    customerLifetimeMonths: 60,
    acquisitionCost: 5000
  }
];

export const initialIncomeStreams = [
  // Empty initially
];

export const initialFixedCosts = [
  // Empty initially
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

// Default customer segment
export const defaultNewSegment = {
  name: '',
  type: 'b2b',
  products: [],
  licenseFeePerUser: 0,
  contractLengthYears: 1,
  volumeDiscountRate: 0,
  contractLengthDiscountRate: 0,
  customDiscountRate: 0,
  employeeCount: 1,
  
  // New fields for hardware options
  includesHardware: false,
  hardwareAcquisitionType: 'purchase' as const,
  leaseInterestRate: 5.0, // Default 5% interest rate
  
  // Subscription type
  subscriptionType: 'arr-commitment' as const,
  
  // Is this an individual customer
  isIndividualCustomer: false,
  
  // Default calculation purpose
  calculationPurpose: 'offer' as const
};

export const subscriptionTiers = [
  {
    id: 'essential',
    name: 'Essential',
    monthlyPricePerUser: 500,
    features: [
      'Basic workplace wellness assessment',
      'Standard product access via ASD lockers',
      'Privacy-focused anonymous access',
      'Basic compliance documentation'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPricePerUser: 800,
    features: [
      'Advanced wellness analytics',
      'Home delivery options',
      'ISO 45010 compliance tools',
      'ESG reporting dashboard',
      'Blockchain-secured privacy'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPricePerUser: 1500, // Custom pricing, but we set a default
    features: [
      'Full wellness ecosystem',
      'Integration with corporate systems',
      'ROI & Impact calculator module',
      'Advanced ESG/CSRD reporting',
      'Dedicated success manager',
      'Custom AI-powered analytics'
    ]
  }
];

