
import { IncomeStream } from '../../../types/calculator';

// Initial income streams data - 3 year progression with growth
export const initialIncomeStreams: IncomeStream[] = [
  {
    id: 1,
    name: 'SaaS-abonnementer',
    type: 'subscription',
    category: 'dtc',
    values: [
      { periodId: 1, averageRevenue: 299, subscribers: 150, multiplier: 1, churnRate: 0.03 },
      { periodId: 2, averageRevenue: 299, subscribers: 200, multiplier: 1, churnRate: 0.03 },
      { periodId: 3, averageRevenue: 299, subscribers: 300, multiplier: 1, churnRate: 0.025 },
      { periodId: 4, averageRevenue: 299, subscribers: 450, multiplier: 1, churnRate: 0.025 },
      { periodId: 5, averageRevenue: 349, subscribers: 600, multiplier: 1, churnRate: 0.02 },
      { periodId: 6, averageRevenue: 349, subscribers: 800, multiplier: 1, churnRate: 0.02 },
      { periodId: 7, averageRevenue: 349, subscribers: 1100, multiplier: 1, churnRate: 0.015 },
      { periodId: 8, averageRevenue: 349, subscribers: 1500, multiplier: 1, churnRate: 0.015 },
      { periodId: 9, averageRevenue: 399, subscribers: 2000, multiplier: 1, churnRate: 0.01 },
      { periodId: 10, averageRevenue: 399, subscribers: 2600, multiplier: 1, churnRate: 0.01 },
      { periodId: 11, averageRevenue: 399, subscribers: 3400, multiplier: 1, churnRate: 0.01 },
      { periodId: 12, averageRevenue: 399, subscribers: 4500, multiplier: 1, churnRate: 0.01 }
    ]
  },
  {
    id: 2,
    name: 'B2B Enterprise-kunder',
    type: 'subscription',
    category: 'dtb',
    values: [
      { periodId: 1, averageRevenue: 1999, subscribers: 2, multiplier: 1, churnRate: 0.0 },
      { periodId: 2, averageRevenue: 1999, subscribers: 3, multiplier: 1, churnRate: 0.0 },
      { periodId: 3, averageRevenue: 1999, subscribers: 4, multiplier: 1, churnRate: 0.0 },
      { periodId: 4, averageRevenue: 1999, subscribers: 6, multiplier: 1, churnRate: 0.0 },
      { periodId: 5, averageRevenue: 2299, subscribers: 9, multiplier: 1, churnRate: 0.0 },
      { periodId: 6, averageRevenue: 2299, subscribers: 12, multiplier: 1, churnRate: 0.0 },
      { periodId: 7, averageRevenue: 2299, subscribers: 18, multiplier: 1, churnRate: 0.0 },
      { periodId: 8, averageRevenue: 2299, subscribers: 25, multiplier: 1, churnRate: 0.0 },
      { periodId: 9, averageRevenue: 2499, subscribers: 35, multiplier: 1, churnRate: 0.0 },
      { periodId: 10, averageRevenue: 2499, subscribers: 45, multiplier: 1, churnRate: 0.0 },
      { periodId: 11, averageRevenue: 2499, subscribers: 60, multiplier: 1, churnRate: 0.0 },
      { periodId: 12, averageRevenue: 2499, subscribers: 80, multiplier: 1, churnRate: 0.0 }
    ]
  },
  {
    id: 3,
    name: 'Hardware-salg',
    type: 'sales',
    category: 'hardware',
    values: [
      { periodId: 1, revenue: 50000 },
      { periodId: 2, revenue: 75000 },
      { periodId: 3, revenue: 100000 },
      { periodId: 4, revenue: 150000 },
      { periodId: 5, revenue: 200000 },
      { periodId: 6, revenue: 250000 },
      { periodId: 7, revenue: 350000 },
      { periodId: 8, revenue: 450000 },
      { periodId: 9, revenue: 600000 },
      { periodId: 10, revenue: 750000 },
      { periodId: 11, revenue: 900000 },
      { periodId: 12, revenue: 1200000 }
    ]
  },
  {
    id: 4,
    name: 'Konsulenttjenester',
    type: 'sales',
    category: 'services',
    values: [
      { periodId: 1, revenue: 85000 },
      { periodId: 2, revenue: 95000 },
      { periodId: 3, revenue: 110000 },
      { periodId: 4, revenue: 130000 },
      { periodId: 5, revenue: 150000 },
      { periodId: 6, revenue: 180000 },
      { periodId: 7, revenue: 220000 },
      { periodId: 8, revenue: 260000 },
      { periodId: 9, revenue: 300000 },
      { periodId: 10, revenue: 350000 },
      { periodId: 11, revenue: 400000 },
      { periodId: 12, revenue: 450000 }
    ]
  }
];
