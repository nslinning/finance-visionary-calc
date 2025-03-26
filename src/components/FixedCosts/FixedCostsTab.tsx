
import React, { useState } from 'react';
import { TranslationObject } from '../../constants/calculator';
import { FixedCost } from '../../types/calculator';
import { DollarSign, Edit, Save } from 'lucide-react';
import { formatCurrency } from '../../utils/calculatorUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FixedCostsTabProps {
  t: TranslationObject;
  fixedCosts: FixedCost[];
  setFixedCosts: React.Dispatch<React.SetStateAction<FixedCost[]>>;
  currency: string;
  language: string;
}

const FixedCostsTab: React.FC<FixedCostsTabProps> = ({
  t,
  fixedCosts,
  setFixedCosts,
  currency,
  language
}) => {
  const [editState, setEditState] = useState<{ costId: number | null, periodId: number | null }>({
    costId: null,
    periodId: null
  });
  
  // Group fixed costs by category for better visualization
  const costsByCategory: Record<string, FixedCost[]> = {};
  fixedCosts.forEach(cost => {
    if (!costsByCategory[cost.category]) {
      costsByCategory[cost.category] = [];
    }
    costsByCategory[cost.category].push(cost);
  });
  
  // Update fixed cost value
  const updateFixedCostValue = (costId: number, periodId: number, amount: number) => {
    setFixedCosts(prevCosts => {
      return prevCosts.map(cost => {
        if (cost.id === costId) {
          const updatedValues = cost.values.map(val => {
            if (val.periodId === periodId) {
              return { 
                ...val, 
                amount 
              };
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
  
  // Calculate totals per period
  const calculateTotalByPeriod = () => {
    const totals: Record<number, number> = {};
    
    fixedCosts.forEach(cost => {
      cost.values.forEach(value => {
        if (!totals[value.periodId]) {
          totals[value.periodId] = 0;
        }
        totals[value.periodId] += value.amount;
      });
    });
    
    return totals;
  };
  
  const periodTotals = calculateTotalByPeriod();
  
  // Get all unique period IDs across all fixed costs
  const allPeriodIds = Array.from(
    new Set(
      fixedCosts.flatMap(cost => 
        cost.values.map(value => value.periodId)
      )
    )
  ).sort((a, b) => a - b);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">{t.fixedCosts}</h2>
      
      {Object.entries(costsByCategory).map(([category, costs]) => (
        <Card key={category} className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {t.costCategories[category as keyof typeof t.costCategories] || category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[240px]">{t.costName}</TableHead>
                  {allPeriodIds.map(periodId => (
                    <TableHead key={periodId} className="text-right">
                      P{periodId}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {costs.map(cost => (
                  <TableRow key={cost.id}>
                    <TableCell className="font-medium">
                      {cost.name}
                    </TableCell>
                    
                    {allPeriodIds.map(periodId => {
                      const valueForPeriod = cost.values.find(v => v.periodId === periodId);
                      const amount = valueForPeriod ? valueForPeriod.amount : 0;
                      const isEditing = editState.costId === cost.id && editState.periodId === periodId;
                      
                      return (
                        <TableCell key={periodId} className="text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end space-x-2">
                              <Input 
                                type="number"
                                className="w-24 text-right"
                                value={amount}
                                onChange={(e) => updateFixedCostValue(
                                  cost.id, 
                                  periodId, 
                                  Number(e.target.value)
                                )}
                              />
                              <Save 
                                className="h-4 w-4 cursor-pointer text-green-500"
                                onClick={() => setEditState({ costId: null, periodId: null })}
                              />
                            </div>
                          ) : (
                            <div 
                              className="flex items-center justify-end space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded"
                              onClick={() => setEditState({ costId: cost.id, periodId })}
                            >
                              <span>{formatCurrency(amount, currency, language)}</span>
                              <Edit className="h-3 w-3 text-gray-400" />
                            </div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
                
                <TableRow className="font-bold bg-gray-50 dark:bg-gray-800">
                  <TableCell>
                    {t.totalCosts}
                  </TableCell>
                  {allPeriodIds.map(periodId => (
                    <TableCell key={periodId} className="text-right">
                      {formatCurrency(periodTotals[periodId] || 0, currency, language)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            {t.totalFixedCostsSummary}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(periodTotals).map(([periodId, total]) => (
              <div 
                key={periodId} 
                className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
              >
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  P{periodId}
                </div>
                <div className="text-2xl font-bold mt-1">
                  {formatCurrency(total, currency, language)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FixedCostsTab;
