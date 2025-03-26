
import { 
  CURRENCY_RATES, 
  CURRENCY_SYMBOLS, 
  translations 
} from '../constants/calculator';
import {
  CashFlowResult,
  FixedCost,
  IncomeStream,
  Period,
  Product,
  ProductMetric,
  ResultData,
  SalesValue,
  SubscriptionValue
} from '../types/calculator';

// Format number with currency
export const formatCurrency = (num: number, currency: string, language: string) => {
  const value = num * CURRENCY_RATES[currency as keyof typeof CURRENCY_RATES];
  const formattedValue = new Intl.NumberFormat(language === 'no' ? 'nb-NO' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(value));
  
  return currency === 'USD' 
    ? `${CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]}${formattedValue}` 
    : `${formattedValue} ${CURRENCY_SYMBOLS[currency as keyof typeof CURRENCY_SYMBOLS]}`;
};

// Get translated category name safely
export const getCategoryName = (categoryId: string, language: string): string => {
  const t = translations[language];
  return t.productCategories[categoryId as keyof typeof t.productCategories] || categoryId;
};

// Get translated revenue type name safely
export const getRevenueTypeName = (typeId: string, language: string): string => {
  const t = translations[language];
  return t.revenueTypes[typeId as keyof typeof t.revenueTypes] || typeId;
};

// Calculate financial results
export const calculateResults = (
  periods: Period[], 
  incomeStreams: IncomeStream[], 
  products: Product[], 
  fixedCosts: FixedCost[],
  vatRate: number
): ResultData[] => {
  return periods.map(period => {
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
};

// Calculate product metrics (CAC, CPO, AOV, CLV)
export const calculateProductMetrics = (products: Product[]): ProductMetric[] => {
  return products.map(product => {
    // CPO - Cost Per Order
    const cpo = product.type === 'product' 
      ? (product as any).productionCost + (product as any).logisticsCost + product.marketingCost
      : (product as any).operationalCost + product.marketingCost;
      
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
};

// Calculate cash flow
export const calculateCashFlow = (periods: Period[], results: ResultData[]): CashFlowResult[] => {
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
  
  return calculatedCashFlow;
};
