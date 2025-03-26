
import { useState } from 'react';
import { 
  IncomeStream, 
  FixedCost,
  SubscriptionValue,
  SalesValue,
  Period
} from '../../types/calculator';
import { 
  initialPeriods, 
  initialIncomeStreams, 
  initialFixedCosts
} from '../../constants/calculator';

export const useCalculatorData = () => {
  const [periods, setPeriods] = useState<Period[]>(initialPeriods);
  const [incomeStreams, setIncomeStreams] = useState<IncomeStream[]>(initialIncomeStreams);
  const [fixedCosts, setFixedCosts] = useState<FixedCost[]>(initialFixedCosts);
  
  // Method to update income stream values
  const updateIncomeStreamValue = (streamId: number, periodId: number, field: string, value: number) => {
    setIncomeStreams(prevStreams => {
      return prevStreams.map(stream => {
        if (stream.id === streamId) {
          const updatedValues = stream.values.map(val => {
            if (val.periodId === periodId) {
              if (stream.type === 'subscription' && 'subscribers' in val) {
                return { 
                  ...val, 
                  [field]: value 
                } as SubscriptionValue;
              } else if (stream.type === 'sales' && 'revenue' in val) {
                return { 
                  ...val, 
                  [field]: value 
                } as SalesValue;
              }
            }
            return val;
          });
          
          return {
            ...stream,
            values: updatedValues
          };
        }
        return stream;
      });
    });
  };
  
  // Method to update fixed cost values
  const updateFixedCostValue = (costId: number, periodId: number, amount: number) => {
    setFixedCosts(prevCosts => {
      return prevCosts.map(cost => {
        if (cost.id === costId) {
          const updatedValues = cost.values.map(val => {
            if (val.periodId === periodId) {
              return { ...val, amount };
            }
            return val;
          });
          
          return {
            ...cost,
            values: updatedValues
          };
        }
        return cost;
      });
    });
  };
  
  return {
    periods,
    incomeStreams,
    fixedCosts,
    
    setPeriods,
    setIncomeStreams,
    setFixedCosts,
    updateIncomeStreamValue,
    updateFixedCostValue
  };
};
