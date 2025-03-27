
import { NewProduct } from '../../../types/calculator';

// Initial products data
export const initialProducts: NewProduct[] = [
  {
    name: 'Sydera Basic',
    price: 2990,
    productionCost: 1200,
    logisticsCost: 300,
    operationalCost: 0,
    marketingCost: 400,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 1.5,
    averageOrderValue: 3000,
    customerLifetimeMonths: 24,
    acquisitionCost: 500
  },
  {
    name: 'Sydera Pro',
    price: 4990,
    productionCost: 1800,
    logisticsCost: 400,
    operationalCost: 0,
    marketingCost: 600,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 2,
    averageOrderValue: 5000,
    customerLifetimeMonths: 36,
    acquisitionCost: 750
  },
  {
    name: 'Sydera Enterprise',
    price: 7990,
    productionCost: 2500,
    logisticsCost: 500,
    operationalCost: 0,
    marketingCost: 800,
    type: 'product',
    category: 'dtc',
    revenueType: 'product',
    averageReorderRate: 2.5,
    averageOrderValue: 8000,
    customerLifetimeMonths: 48,
    acquisitionCost: 1000
  },
  {
    name: 'Sydera Support',
    price: 990,
    productionCost: 0,
    logisticsCost: 0,
    operationalCost: 200,
    marketingCost: 100,
    type: 'service',
    category: 'dtc',
    revenueType: 'service',
    averageReorderRate: 0,
    averageOrderValue: 0,
    customerLifetimeMonths: 0,
    acquisitionCost: 0
  },
  {
    name: 'Sydera Training',
    price: 1490,
    productionCost: 0,
    logisticsCost: 0,
    operationalCost: 300,
    marketingCost: 150,
    type: 'service',
    category: 'dtc',
    revenueType: 'service',
    averageReorderRate: 0,
    averageOrderValue: 0,
    customerLifetimeMonths: 0,
    acquisitionCost: 0
  },
  {
    name: 'Sydera Consulting',
    price: 1990,
    productionCost: 0,
    logisticsCost: 0,
    operationalCost: 400,
    marketingCost: 200,
    type: 'service',
    category: 'dtc',
    revenueType: 'service',
    averageReorderRate: 0,
    averageOrderValue: 0,
    customerLifetimeMonths: 0,
    acquisitionCost: 0
  },
  {
    name: 'Sydera Smart Vending',
    price: 12990,
    productionCost: 5000,
    logisticsCost: 1000,
    operationalCost: 0,
    marketingCost: 1500,
    type: 'product',
    category: 'dtb',
    revenueType: 'product',
    averageReorderRate: 3,
    averageOrderValue: 15000,
    customerLifetimeMonths: 60,
    acquisitionCost: 2000
  }
];

// Default new product data
export const defaultNewProduct: NewProduct = {
  name: '',
  price: 0,
  productionCost: 0,
  logisticsCost: 0,
  operationalCost: 0,
  marketingCost: 0,
  type: 'product',
  category: 'dtc',
  revenueType: 'product',
  averageReorderRate: 1,
  averageOrderValue: 0,
  customerLifetimeMonths: 12,
  acquisitionCost: 0
};
