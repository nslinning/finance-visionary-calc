
import React, { useState } from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { FixedCost } from '../../types/calculator';
import FixedCostCategory from './FixedCostCategory';
import TotalFixedCosts from './TotalFixedCosts';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCost, setNewCost] = useState({
    name: '',
    category: 'personnel',
    amount: 0,
    periodId: 1
  });

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
  
  const handleAddNewCost = () => {
    const newFixedCost: FixedCost = {
      id: fixedCosts.length + 1,
      name: newCost.name,
      category: newCost.category,
      values: [{
        periodId: newCost.periodId,
        amount: newCost.amount
      }]
    };

    setFixedCosts([...fixedCosts, newFixedCost]);
    setIsAddModalOpen(false);
    setNewCost({ name: '', category: 'personnel', amount: 0, periodId: 1 });
  };
  
  const costsByCategory: Record<string, FixedCost[]> = {};
  fixedCosts.forEach(cost => {
    if (!costsByCategory[cost.category]) {
      costsByCategory[cost.category] = [];
    }
    costsByCategory[cost.category].push(cost);
  });

  const getLatestValue = (cost: FixedCost): number => {
    if (cost.values.length === 0) return 0;
    
    const sortedValues = [...cost.values].sort((a, b) => b.periodId - a.periodId);
    return sortedValues[0].amount;
  };

  const totalCostsByCategory: Record<string, number> = {};
  Object.entries(costsByCategory).forEach(([category, costs]) => {
    totalCostsByCategory[category] = costs.reduce((sum, cost) => {
      return sum + getLatestValue(cost);
    }, 0);
  });

  const totalFixedCosts = Object.values(totalCostsByCategory).reduce((sum, value) => sum + value, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.fixedCosts}</h2>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" /> {t.addFixedCost}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.addFixedCost}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.costName}</label>
                <input 
                  type="text" 
                  value={newCost.name}
                  onChange={(e) => setNewCost({...newCost, name: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.costCategory}</label>
                <select 
                  value={newCost.category}
                  onChange={(e) => setNewCost({...newCost, category: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  {Object.keys(t.fixedCostCategories).map(category => (
                    <option key={category} value={category}>
                      {t.fixedCostCategories[category as keyof typeof t.fixedCostCategories]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.amount}</label>
                <input 
                  type="number" 
                  value={newCost.amount}
                  onChange={(e) => setNewCost({...newCost, amount: Number(e.target.value)})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <Button onClick={handleAddNewCost} className="w-full">
                {t.save}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {Object.entries(costsByCategory).map(([category, costs]) => (
        <FixedCostCategory
          key={category}
          category={category}
          costs={costs}
          totalCost={totalCostsByCategory[category]}
          t={t}
          currency={currency}
          language={language}
          updateFixedCostValue={updateFixedCostValue}
        />
      ))}
      
      <TotalFixedCosts
        totalFixedCosts={totalFixedCosts}
        t={t}
        currency={currency}
        language={language}
      />
    </div>
  );
};

export default FixedCostsTab;
