
import { FixedCost } from '../../../types/calculator';

// Initial fixed costs data - realistic fixed costs with scaling over 3 years
export const initialFixedCosts: FixedCost[] = [
  {
    id: 1,
    name: 'Utviklere',
    category: 'personnel',
    values: [
      { periodId: 1, amount: 250000 },
      { periodId: 2, amount: 250000 },
      { periodId: 3, amount: 300000 },
      { periodId: 4, amount: 300000 },
      { periodId: 5, amount: 375000 },
      { periodId: 6, amount: 375000 },
      { periodId: 7, amount: 450000 },
      { periodId: 8, amount: 450000 },
      { periodId: 9, amount: 550000 },
      { periodId: 10, amount: 550000 },
      { periodId: 11, amount: 650000 },
      { periodId: 12, amount: 650000 }
    ]
  },
  {
    id: 2,
    name: 'Salg & Markedsføring',
    category: 'marketing',
    values: [
      { periodId: 1, amount: 120000 },
      { periodId: 2, amount: 140000 },
      { periodId: 3, amount: 160000 },
      { periodId: 4, amount: 180000 },
      { periodId: 5, amount: 200000 },
      { periodId: 6, amount: 240000 },
      { periodId: 7, amount: 280000 },
      { periodId: 8, amount: 320000 },
      { periodId: 9, amount: 380000 },
      { periodId: 10, amount: 440000 },
      { periodId: 11, amount: 500000 },
      { periodId: 12, amount: 560000 }
    ]
  },
  {
    id: 3,
    name: 'Kontorlokaler',
    category: 'facilities',
    values: [
      { periodId: 1, amount: 75000 },
      { periodId: 2, amount: 75000 },
      { periodId: 3, amount: 75000 },
      { periodId: 4, amount: 75000 },
      { periodId: 5, amount: 90000 },
      { periodId: 6, amount: 90000 },
      { periodId: 7, amount: 90000 },
      { periodId: 8, amount: 90000 },
      { periodId: 9, amount: 120000 },
      { periodId: 10, amount: 120000 },
      { periodId: 11, amount: 120000 },
      { periodId: 12, amount: 120000 }
    ]
  },
  {
    id: 4,
    name: 'Kundestøtte',
    category: 'customer_service',
    values: [
      { periodId: 1, amount: 50000 },
      { periodId: 2, amount: 65000 },
      { periodId: 3, amount: 80000 },
      { periodId: 4, amount: 95000 },
      { periodId: 5, amount: 110000 },
      { periodId: 6, amount: 130000 },
      { periodId: 7, amount: 150000 },
      { periodId: 8, amount: 170000 },
      { periodId: 9, amount: 200000 },
      { periodId: 10, amount: 230000 },
      { periodId: 11, amount: 260000 },
      { periodId: 12, amount: 290000 }
    ]
  },
  {
    id: 5,
    name: 'Administrasjon',
    category: 'admin',
    values: [
      { periodId: 1, amount: 90000 },
      { periodId: 2, amount: 90000 },
      { periodId: 3, amount: 90000 },
      { periodId: 4, amount: 90000 },
      { periodId: 5, amount: 110000 },
      { periodId: 6, amount: 110000 },
      { periodId: 7, amount: 130000 },
      { periodId: 8, amount: 130000 },
      { periodId: 9, amount: 150000 },
      { periodId: 10, amount: 150000 },
      { periodId: 11, amount: 180000 },
      { periodId: 12, amount: 180000 }
    ]
  },
  {
    id: 6,
    name: 'IT & Infrastruktur',
    category: 'it',
    values: [
      { periodId: 1, amount: 40000 },
      { periodId: 2, amount: 45000 },
      { periodId: 3, amount: 50000 },
      { periodId: 4, amount: 55000 },
      { periodId: 5, amount: 65000 },
      { periodId: 6, amount: 75000 },
      { periodId: 7, amount: 85000 },
      { periodId: 8, amount: 95000 },
      { periodId: 9, amount: 110000 },
      { periodId: 10, amount: 125000 },
      { periodId: 11, amount: 140000 },
      { periodId: 12, amount: 155000 }
    ]
  }
];
