
import { Product, ProductMetric } from '../../types/calculator';

// Calculate product metrics (CAC, CPO, AOV, CLV)
export const calculateProductMetrics = (products: Product[]): ProductMetric[] => {
  return products.map(product => {
    // CPO - Cost Per Order
    const cpo = product.type === 'product' 
      ? (product as any).productionCost + (product as any).logisticsCost + product.marketingCost
      : (product as any).operationalCost + product.marketingCost;
      
    // AOV - Average Order Value
    const aov = product.averageOrderValue || product.price;
    
    // CLV - Customer Lifetime Value
    const monthlyOrders = product.averageReorderRate / 12; // Average orders per month
    const totalOrders = monthlyOrders * product.customerLifetimeMonths;
    const clv = aov * product.marginPercentage * totalOrders;
    
    // ROI on customer acquisition
    const roi = (clv / product.acquisitionCost) * 100;
    
    return {
      productId: product.id,
      productName: product.name,
      category: product.category,
      revenueType: product.revenueType,
      cpo,
      aov,
      clv,
      acquisitionCost: product.acquisitionCost,
      roi,
      marginPercentage: product.marginPercentage * 100,
      averageReorderRate: product.averageReorderRate,
      customerLifetimeMonths: product.customerLifetimeMonths
    };
  });
};
