
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, ReferenceLine, ComposedChart, Cell, AreaChart, Area
} from 'recharts';
import { Activity, Briefcase, CreditCard, TrendingUp } from 'lucide-react';
import { COLORS } from '../../constants/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import { TranslationObject } from '../../constants/calculator';
import { CategoryMetrics, CashFlowResult, ResultData, SummaryMetrics } from '../../types/calculator';

interface DashboardTabProps {
  t: TranslationObject;
  summaryMetrics: SummaryMetrics | null;
  results: ResultData[];
  cashFlowResults: CashFlowResult[];
  categoryMetrics: Record<string, CategoryMetrics>;
  currency: string;
  language: string;
  getCategoryName: (id: string) => string;
}

const DashboardTab: React.FC<DashboardTabProps> = ({ 
  t, 
  summaryMetrics, 
  results,
  cashFlowResults,
  categoryMetrics,
  currency,
  language,
  getCategoryName
}) => {
  if (!summaryMetrics) return <div className="p-4">Loading data...</div>;
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">{t.financialOverview}</h2>
      
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.totalRevenue}</p>
              <h3 className="text-2xl font-bold">{formatCurrency(summaryMetrics.totalRevenue, currency, language)}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.acrossPeriods}</p>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.averageGrossMargin}</p>
              <h3 className="text-2xl font-bold">{summaryMetrics.avgGrossMargin.toFixed(1)}%</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.averageOverTime}</p>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.endingLiquidity}</p>
              <h3 className="text-2xl font-bold">{formatCurrency(summaryMetrics.endingLiquidity, currency, language)}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.endOfLastPeriod}</p>
            </div>
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
              <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t.latestOperatingResult}</p>
              <h3 className="text-2xl font-bold">{formatCurrency(summaryMetrics.latestOperatingResult, currency, language)}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.endOfLastPeriod}</p>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Operating Result Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t.resultDevelopment}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={results}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number, currency, language)} />
                <Legend />
                <Bar dataKey="revenue" name={t.revenue} fill={COLORS.revenue} />
                <Bar dataKey="cogs" name={t.cogs} fill={COLORS.cogs} />
                <Bar dataKey="fixedCosts" name={t.fixedCostsLabel} fill={COLORS.fixedCosts} />
                <Bar dataKey="operatingResult" name={t.operatingResult} fill={COLORS.operatingResult} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Cash Flow Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t.liquidityDevelopment}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={cashFlowResults}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number, currency, language)} />
                <Legend />
                <Bar dataKey="netCashFlow" name={t.netCashFlow} fill={COLORS.cashFlow} />
                <Line
                  type="monotone"
                  dataKey="cumulativeCashFlow"
                  name={t.cumulativeCashFlow}
                  stroke={COLORS.cumulativeCashFlow}
                  strokeWidth={2}
                />
                <ReferenceLine y={0} stroke="#000" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Category Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Category */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t.revenueByCategory}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={Object.entries(categoryMetrics).map(([category, metrics]) => ({
                  name: getCategoryName(category),
                  revenue: metrics.revenue
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number, currency, language)} />
                <Legend />
                <Bar dataKey="revenue" name={t.revenue} fill={COLORS.revenue}>
                  {Object.keys(categoryMetrics).map((category, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[category as keyof typeof COLORS] || `#${Math.floor(Math.random()*16777215).toString(16)}`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Key Metrics by Category */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">{t.keyMetricsByCategory}</h3>
          <div className="space-y-4">
            {Object.entries(categoryMetrics).map(([category, metrics]) => (
              <div key={category} className="border-b pb-2 last:border-b-0">
                <h4 className="font-medium">{getCategoryName(category)}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t.averageCAC}</p>
                    <p className="font-semibold">{formatCurrency(metrics.avgCAC, currency, language)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t.averageCLV}</p>
                    <p className="font-semibold">{formatCurrency(metrics.avgCLV, currency, language)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t.averageAOV}</p>
                    <p className="font-semibold">{formatCurrency(metrics.avgAOV, currency, language)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t.averageCPO}</p>
                    <p className="font-semibold">{formatCurrency(metrics.avgCPO, currency, language)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
