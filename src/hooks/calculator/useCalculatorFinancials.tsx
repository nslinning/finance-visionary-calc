
import { useState, useEffect, useMemo } from 'react';
import { 
  Period, 
  IncomeStream, 
  FixedCost, 
  ResultData, 
  CashFlowResult,
  CategoryMetrics,
  SummaryMetrics,
} from '../../types/calculator';
import { 
  calculateResults,
  calculateCashFlow
} from '../../utils/calculator';

export const useCalculatorFinancials = (
  periods: Period[],
  products: any[],
  incomeStreams: IncomeStream[],
  fixedCosts: FixedCost[]
) => {
  const [vatRate, setVatRate] = useState(0.25);
  const [results, setResults] = useState<ResultData[]>([]);
  const [cashFlowResults, setCashFlowResults] = useState<CashFlowResult[]>([]);
  
  useEffect(() => {
    if (periods.length === 0) return;
    
    const calculatedResults = calculateResults(periods, incomeStreams, products, fixedCosts, vatRate);
    setResults(calculatedResults);
    
    const cashFlow = calculateCashFlow(periods, calculatedResults);
    setCashFlowResults(cashFlow);
  }, [periods, products, incomeStreams, fixedCosts, vatRate]);
  
  const summaryMetrics = useMemo<SummaryMetrics | null>(() => {
    if (results.length === 0) return null;
    
    const totalRevenue = results.reduce((sum, r) => sum + r.revenue, 0);
    
    const avgGrossMargin = results.reduce((sum, r) => sum + r.grossMarginPercentage, 0) / results.length;
    
    const endingLiquidity = cashFlowResults.length > 0 
      ? cashFlowResults[cashFlowResults.length - 1].cumulativeCashFlow || 0
      : 0;
    
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
  
  const categoryMetrics = useMemo<Record<string, CategoryMetrics>>(() => {
    const revenueByCategory: Record<string, number> = {};
    
    incomeStreams.forEach(stream => {
      const category = stream.category;
      if (!revenueByCategory[category]) {
        revenueByCategory[category] = 0;
      }
      
      stream.values.forEach(value => {
        if ('revenue' in value) {
          revenueByCategory[category] += value.revenue;
        } else if ('subscribers' in value && 'averageRevenue' in value) {
          revenueByCategory[category] += value.subscribers * value.averageRevenue;
        }
      });
    });
    
    const metricsByCategory: Record<string, CategoryMetrics> = {};
    
    // Calculate metrics for each category
    Object.keys(revenueByCategory).forEach(category => {
      const matchingProducts = products.filter(p => p.category === category);
      
      if (matchingProducts.length > 0) {
        const avgCAC = matchingProducts.reduce((sum, p) => sum + p.acquisitionCost, 0) / matchingProducts.length;
        const avgCLV = matchingProducts.reduce((sum, p) => {
          // Simple CLV calculation based on AOV * Reorder Rate * Lifetime months
          const clv = (p.averageOrderValue || p.price) * p.averageReorderRate * (p.customerLifetimeMonths / 12);
          return sum + clv;
        }, 0) / matchingProducts.length;
        
        const avgAOV = matchingProducts.reduce((sum, p) => sum + (p.averageOrderValue || p.price), 0) / matchingProducts.length;
        const avgCPO = matchingProducts.reduce((sum, p) => sum + (p.cost / (p.averageOrderValue || p.price)), 0) / matchingProducts.length;
        
        metricsByCategory[category] = {
          avgCAC,
          avgCLV,
          avgAOV,
          avgCPO,
          revenue: revenueByCategory[category]
        };
      }
    });
    
    return metricsByCategory;
  }, [incomeStreams, products]);
  
  return {
    vatRate,
    results,
    cashFlowResults,
    summaryMetrics,
    categoryMetrics,
    
    setVatRate
  };
};
