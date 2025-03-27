
import { Period, ResultData, CashFlowResult } from '../../types/calculator';

// Calculate cash flow
export const calculateCashFlow = (periods: Period[], results: ResultData[]): CashFlowResult[] => {
  const calculatedCashFlow = periods.map((period, index) => {
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
  // Start with initial balance if provided
  let cumulativeCashFlow = 0;
  if (periods.length > 0 && periods[0].financialData) {
    const firstPeriod = periods[0];
    cumulativeCashFlow = firstPeriod.financialData.initialBalance + 
                         firstPeriod.financialData.initialReceivables - 
                         firstPeriod.financialData.initialPayables;
  }
  
  calculatedCashFlow.forEach(flow => {
    cumulativeCashFlow += flow.netCashFlow;
    flow.cumulativeCashFlow = cumulativeCashFlow;
  });
  
  return calculatedCashFlow;
};
