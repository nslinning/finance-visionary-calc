
import React, { useState } from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Period } from '../../types/calculator';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

interface TimelinePlanningTabProps {
  t: TranslationObject;
  setPeriods: (periods: Period[]) => void;
}

const TimelinePlanningTab: React.FC<TimelinePlanningTabProps> = ({ t, setPeriods }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [duration, setDuration] = useState<string>("1");
  const [interval, setInterval] = useState<string>("year");
  const [initialBalance, setInitialBalance] = useState<string>("0");
  const [initialReceivables, setInitialReceivables] = useState<string>("0");
  const [initialPayables, setInitialPayables] = useState<string>("0");
  
  const generatePeriods = () => {
    if (!startDate) return;
    
    const durationYears = parseInt(duration);
    const periods: Period[] = [];
    let currentDate = new Date(startDate);
    
    // Add initial financial data to the first period metadata
    const initialFinancialData = {
      initialBalance: parseFloat(initialBalance) || 0,
      initialReceivables: parseFloat(initialReceivables) || 0,
      initialPayables: parseFloat(initialPayables) || 0
    };
    
    if (interval === "year") {
      for (let i = 0; i < durationYears; i++) {
        const year = currentDate.getFullYear();
        periods.push({
          id: i + 1,
          label: year.toString(),
          date: new Date(currentDate),
          ...(i === 0 ? { financialData: initialFinancialData } : {})
        });
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
    } else if (interval === "quarter") {
      for (let i = 0; i < durationYears * 4; i++) {
        const year = currentDate.getFullYear();
        const quarter = Math.floor(currentDate.getMonth() / 3) + 1;
        periods.push({
          id: i + 1,
          label: `Q${quarter} ${year}`,
          date: new Date(currentDate),
          ...(i === 0 ? { financialData: initialFinancialData } : {})
        });
        currentDate.setMonth(currentDate.getMonth() + 3);
      }
    } else if (interval === "month") {
      for (let i = 0; i < durationYears * 12; i++) {
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString('nb-NO', { month: 'short' });
        periods.push({
          id: i + 1,
          label: `${month} ${year}`,
          date: new Date(currentDate),
          ...(i === 0 ? { financialData: initialFinancialData } : {})
        });
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }
    
    setPeriods(periods);
  };
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">{t.timelinePlanning}</h2>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{t.timelineStartDate}</h3>
            <div className="border rounded-md p-4">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                locale={nb}
                className="p-3 pointer-events-auto"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{t.timelineDuration}</h3>
              <Select
                value={duration}
                onValueChange={setDuration}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t.timelineDuration} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 {t.years}</SelectItem>
                  <SelectItem value="2">2 {t.years}</SelectItem>
                  <SelectItem value="3">3 {t.years}</SelectItem>
                  <SelectItem value="4">4 {t.years}</SelectItem>
                  <SelectItem value="5">5 {t.years}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">{t.timelineInterval}</h3>
              <Select
                value={interval}
                onValueChange={setInterval}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t.timelineInterval} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year">{t.year}</SelectItem>
                  <SelectItem value="quarter">{t.quarter}</SelectItem>
                  <SelectItem value="month">{t.month}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Initial Financial Data Section */}
            <div className="border p-4 rounded-md space-y-3">
              <h3 className="text-lg font-medium">{t.initialFinancialData || "Initial Financial Data"}</h3>
              
              <div className="space-y-2">
                <Label htmlFor="initialBalance">{t.initialBalance || "Initial Balance"}</Label>
                <Input
                  id="initialBalance"
                  type="number"
                  value={initialBalance}
                  onChange={(e) => setInitialBalance(e.target.value)}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="initialReceivables">{t.initialReceivables || "Initial Receivables"}</Label>
                <Input
                  id="initialReceivables"
                  type="number"
                  value={initialReceivables}
                  onChange={(e) => setInitialReceivables(e.target.value)}
                  placeholder="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="initialPayables">{t.initialPayables || "Initial Payables"}</Label>
                <Input
                  id="initialPayables"
                  type="number"
                  value={initialPayables}
                  onChange={(e) => setInitialPayables(e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={generatePeriods}
                disabled={!startDate}
                className="w-full"
              >
                {t.applyTimeline}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePlanningTab;
