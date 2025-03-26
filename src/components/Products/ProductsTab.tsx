
import React from 'react';
import { Edit2, PlusCircle, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/calculatorUtils';
import { TranslationObject } from '../../constants/calculator';
import { Product, ProductMetric } from '../../types/calculator';

interface ProductsTabProps {
  t: TranslationObject;
  filteredProducts: Product[];
  expandedMetrics: Record<number, boolean>;
  productMetrics: ProductMetric[];
  filteredCategory: string;
  getCategoryName: (id: string) => string;
  getRevenueTypeName: (id: string) => string;
  getProductCategories: { id: string; name: string }[];
  editProduct: (id: number) => void;
  deleteProduct: (id: number) => void;
  toggleMetricExpansion: (id: number) => void;
  setFilteredCategory: (category: string) => void;
  openAddProductModal: () => void;
  currency: string;
  language: string;
}

const ProductsTab: React.FC<ProductsTabProps> = ({
  t,
  filteredProducts,
  expandedMetrics,
  productMetrics,
  filteredCategory,
  getCategoryName,
  getRevenueTypeName,
  getProductCategories,
  editProduct,
  deleteProduct,
  toggleMetricExpansion,
  setFilteredCategory,
  openAddProductModal,
  currency,
  language
}) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t.products}</h2>
        <button
          onClick={openAddProductModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          <span>{t.addNew}</span>
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t.category}
        </label>
        <select
          value={filteredCategory}
          onChange={(e) => setFilteredCategory(e.target.value)}
          className="block w-full md:w-1/4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2"
        >
          <option value="all">{t.allCategories}</option>
          {getProductCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.name}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.type}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.category}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.revenueType}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.price}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.marginPercentage}
              </th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProducts.map((product) => (
              <React.Fragment key={product.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleMetricExpansion(product.id)}
                      className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {product.name}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {product.type === 'product' ? t.productType : t.serviceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {getCategoryName(product.category)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {getRevenueTypeName(product.revenueType)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatCurrency(product.price, currency, language)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {(product.marginPercentage * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => editProduct(product.id)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-200"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedMetrics[product.id] && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">{t.productMetricsAndProfitability}</h4>
                        
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {productMetrics
                            .filter(metric => metric.productId === product.id)
                            .map(metric => (
                              <React.Fragment key={`metrics-${product.id}`}>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.clv}</p>
                                  <p className="font-semibold">{formatCurrency(metric.clv, currency, language)}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.cac}</p>
                                  <p className="font-semibold">{formatCurrency(metric.acquisitionCost, currency, language)}</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.roi}</p>
                                  <p className="font-semibold">{metric.roi.toFixed(1)}%</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.margin}</p>
                                  <p className="font-semibold">{metric.marginPercentage.toFixed(1)}%</p>
                                </div>
                              </React.Fragment>
                            ))}
                        </div>
                        
                        {/* Detailed Metrics */}
                        <div className="mt-4">
                          <h5 className="font-medium mb-2">{t.detailedMetrics}</h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.costPerOrder}</p>
                              <p className="font-semibold">{formatCurrency(product.cost, currency, language)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.avgOrderValue}</p>
                              <p className="font-semibold">{formatCurrency(product.averageOrderValue || product.price, currency, language)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.customerLifetime}</p>
                              <p className="font-semibold">{product.customerLifetimeMonths} {language === 'en' ? 'months' : 'måneder'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.ordersPerYear}</p>
                              <p className="font-semibold">{product.averageReorderRate.toFixed(1)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTab;
