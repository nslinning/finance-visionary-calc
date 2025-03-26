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
    
    const metricsByCategory: Record<string, any> = {};
    
    return metricsByCategory;
  }, [incomeStreams]);
  
  return {
    vatRate,
    results,
    cashFlowResults,
    summaryMetrics,
    categoryMetrics,
    
    setVatRate
  };
};
