
import { Period, IncomeStream, Product, FixedCost, ResultData } from '../../types/calculator';

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
          const subscriptionValue = periodValue as any;
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
          const salesValue = periodValue as any;
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
