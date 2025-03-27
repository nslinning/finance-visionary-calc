
// TypeScript interface for income stream value types
export interface SubscriptionValue {
  periodId: number;
  averageRevenue: number;
  subscribers: number;
  multiplier: number;
  churnRate: number;
}

export interface SalesValue {
  periodId: number;
  revenue: number;
}

export type IncomeStreamValue = SubscriptionValue | SalesValue;

// TypeScript interface for product types
export interface BaseProduct {
  id: number;
  name: string;
  price: number;
  marketingCost: number;
  cost: number;
  margin: number;
  marginPercentage: number;
  category: string;
  revenueType: string;
  averageReorderRate: number;
  averageOrderValue: number;
  customerLifetimeMonths: number;
  acquisitionCost: number;
}

export interface PhysicalProduct extends BaseProduct {
  type: 'product';
  productionCost: number;
  logisticsCost: number;
}

export interface ServiceProduct extends BaseProduct {
  type: 'service';
  operationalCost: number;
}

export type Product = PhysicalProduct | ServiceProduct;

// Interface for cash flow results
export interface CashFlowResult {
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

export interface FinancialData {
  initialBalance: number;
  initialReceivables: number;
  initialPayables: number;
}

export interface Period {
  id: number;
  label: string;
  date: Date;
  financialData?: FinancialData;
}

export interface IncomeStream {
  id: number;
  name: string;
  type: string;
  category: string;
  values: IncomeStreamValue[];
}

export interface FixedCost {
  id: number;
  name: string;
  category: string;
  values: { periodId: number; amount: number }[];
}

export interface ProductMetric {
  productId: number;
  productName: string;
  category: string;
  revenueType: string;
  cpo: number;
  aov: number;
  clv: number;
  acquisitionCost: number;
  roi: number;
  marginPercentage: number;
  averageReorderRate: number;
  customerLifetimeMonths: number;
}

export interface ResultData {
  periodId: number;
  date: Date;
  label: string;
  revenue: number;
  revenueWithVat: number;
  cogs: number;
  grossMargin: number;
  grossMarginPercentage: number;
  fixedCosts: number;
  operatingResult: number;
  vat: number;
}

export interface CategoryMetrics {
  avgCAC: number;
  avgCLV: number;
  avgAOV: number;
  avgCPO: number;
  revenue: number;
}

export interface SummaryMetrics {
  totalRevenue: number;
  avgGrossMargin: number;
  endingLiquidity: number;
  latestOperatingResult: number;
}

export interface NewProduct {
  name: string;
  price: number;
  productionCost: number;
  logisticsCost: number;
  operationalCost: number;
  marketingCost: number;
  type: string;
  category: string;
  revenueType: string;
  averageReorderRate: number;
  averageOrderValue: number;
  customerLifetimeMonths: number;
  acquisitionCost: number;
}

export type HardwareAcquisitionType = 'purchase' | 'rent' | 'lease';

export type SubscriptionCommitmentType = 'mrr-no-commitment' | 'arr-commitment';

export interface CustomerSegment {
  id: number;
  name: string;
  type: string; // b2b, b2c, b2b2c
  products: number[]; // array of product IDs
  licenseFeePerUser: number;
  contractLengthYears: number;
  volumeDiscountRate: number; // percentage
  contractLengthDiscountRate: number; // percentage
  customDiscountRate: number; // percentage
  employeeCount: number;
  
  // New fields for hardware options
  includesHardware: boolean;
  hardwareAcquisitionType?: HardwareAcquisitionType;
  hardwareId?: number; // Reference to the hardware product
  leaseInterestRate?: number; // Interest rate for leasing
  
  // New fields for commitment type
  subscriptionType: SubscriptionCommitmentType;
  
  // Purpose of the calculation
  calculationPurpose?: 'offer' | 'valuation';
  
  // New field for customer name if this is an individual customer
  isIndividualCustomer: boolean;
  customerName?: string;
  customerEmail?: string;
}

export interface ExportOptions {
  format: 'pdf' | 'excel';
  includeGraphs: boolean;
  includeFinancials: boolean;
  includeCustomerSegments: boolean;
  includeProducts: boolean;
}
