
import React, { useState } from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
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
  
  const generatePeriods = () => {
    if (!startDate) return;
    
    const durationYears = parseInt(duration);
    const periods: Period[] = [];
    let currentDate = new Date(startDate);
    
    if (interval === "year") {
      for (let i = 0; i < durationYears; i++) {
        const year = currentDate.getFullYear();
        periods.push({
          id: i + 1,
          label: year.toString(),
          date: new Date(currentDate)
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
          date: new Date(currentDate)
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
          date: new Date(currentDate)
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
                disabled={{ before: new Date() }}
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
