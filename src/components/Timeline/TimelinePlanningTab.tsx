
import React, { useState } from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { Period, FinancialData } from '../../types/calculator';
import { addMonths, format, parse, startOfMonth } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface TimelinePlanningTabProps {
  t: TranslationObject;
  setPeriods: React.Dispatch<React.SetStateAction<Period[]>>;
}

const TimelinePlanningTab: React.FC<TimelinePlanningTabProps> = ({ t, setPeriods }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(startOfMonth(new Date()));
  const [duration, setDuration] = useState(12);
  const [interval, setInterval] = useState('month');
  const [initialBalance, setInitialBalance] = useState(0);
  const [initialReceivables, setInitialReceivables] = useState(0);
  const [initialPayables, setInitialPayables] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  const generatePeriods = () => {
    if (!startDate) return;
    
    const periods: Period[] = [];
    let currentDate = new Date(startDate);
    
    const intervalMonths = interval === 'month' ? 1 : interval === 'quarter' ? 3 : 12;
    const periods_count = interval === 'month' ? duration : interval === 'quarter' ? duration * 4 : duration * 12;
    
    for (let i = 0; i < periods_count; i++) {
      const periodDate = addMonths(currentDate, i * intervalMonths);
      
      // Create financial data for the first period
      const financialData: FinancialData | undefined = i === 0 ? {
        initialBalance,
        initialReceivables,
        initialPayables
      } : undefined;
      
      let label = '';
      if (interval === 'month') {
        label = format(periodDate, 'MMM yyyy');
      } else if (interval === 'quarter') {
        const quarter = Math.floor(periodDate.getMonth() / 3) + 1;
        label = `Q${quarter} ${format(periodDate, 'yyyy')}`;
      } else {
        label = format(periodDate, 'yyyy');
      }
      
      periods.push({
        id: i + 1,
        date: periodDate,
        label,
        financialData
      });
    }
    
    setPeriods(periods);
  };
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">{t.timelinePlanning}</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t.timelineStartDate}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="startDate">{t.setStartDate}</Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal mt-1"
                    >
                      {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setStartDate(date);
                        setCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="duration">{t.timelineDuration}</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    id="duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                    min={1}
                    max={120}
                  />
                  <span>{t[interval as keyof TranslationObject] as string}</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="interval">{t.timelineInterval}</Label>
                <Select value={interval} onValueChange={setInterval}>
                  <SelectTrigger id="interval" className="mt-1">
                    <SelectValue placeholder={t.timelineInterval} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">{t.month}</SelectItem>
                    <SelectItem value="quarter">{t.quarter}</SelectItem>
                    <SelectItem value="year">{t.year}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t.initialFinancialData || "Initial Financial Data"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="initialBalance">{t.initialBalance || "Initial Balance"}</Label>
                <Input
                  id="initialBalance"
                  type="number"
                  value={initialBalance}
                  onChange={(e) => setInitialBalance(parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="initialReceivables">{t.initialReceivables || "Initial Receivables"}</Label>
                <Input
                  id="initialReceivables"
                  type="number"
                  value={initialReceivables}
                  onChange={(e) => setInitialReceivables(parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="initialPayables">{t.initialPayables || "Initial Payables"}</Label>
                <Input
                  id="initialPayables"
                  type="number"
                  value={initialPayables}
                  onChange={(e) => setInitialPayables(parseFloat(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Button onClick={generatePeriods} className="w-full md:w-auto">
          {t.applyTimeline}
        </Button>
      </div>
      
      <Separator className="my-6" />
      
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t.timelinePlanning} {t.dashboardInstructions}
      </p>
    </div>
  );
};

export default TimelinePlanningTab;
