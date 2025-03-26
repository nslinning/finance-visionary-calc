
import React from 'react';
import { TranslationObject } from '../../constants/calculator/types';
import { Product, NewProduct } from '../../types/calculator';

interface ProductModalProps {
  t: TranslationObject;
  isEdit: boolean;
  productData: Product | NewProduct | null;
  getProductCategories: { id: string; name: string }[];
  getRevenueTypes: { id: string; name: string }[];
  updateProductState: (field: string, value: any) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  t,
  isEdit,
  productData,
  getProductCategories,
  getRevenueTypes,
  updateProductState,
  handleSave,
  handleCancel
}) => {
  if (!productData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            {isEdit ? t.editProduct : t.addNewProduct}
          </h3>
          
          <div className="space-y-4">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.productName}
              </label>
              <input
                type="text"
                value={productData.name}
                onChange={(e) => updateProductState('name', e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.type}
                </label>
                <select
                  value={productData.type}
                  onChange={(e) => updateProductState('type', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                >
                  <option value="product">{t.productType}</option>
                  <option value="service">{t.serviceType}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.category}
                </label>
                <select
                  value={productData.category}
                  onChange={(e) => updateProductState('category', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                >
                  {getProductCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.revenueType}
                </label>
                <select
                  value={productData.revenueType}
                  onChange={(e) => updateProductState('revenueType', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                >
                  {getRevenueTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t.price}
              </label>
              <input
                type="number"
                value={productData.price}
                onChange={(e) => updateProductState('price', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
              />
            </div>
            
            {/* Cost Structure */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h4 className="font-medium mb-2">{t.cost}</h4>
              {productData.type === 'product' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.productionCost}
                    </label>
                    <input
                      type="number"
                      value={(productData as any).productionCost || 0}
                      onChange={(e) => updateProductState('productionCost', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t.logisticsCost}
                    </label>
                    <input
                      type="number"
                      value={(productData as any).logisticsCost || 0}
                      onChange={(e) => updateProductState('logisticsCost', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.operationalCost}
                  </label>
                  <input
                    type="number"
                    value={(productData as any).operationalCost || 0}
                    onChange={(e) => updateProductState('operationalCost', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                  />
                </div>
              )}
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.marketingCost}
                </label>
                <input
                  type="number"
                  value={productData.marketingCost}
                  onChange={(e) => updateProductState('marketingCost', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                />
              </div>
            </div>
            
            {/* Customer Metrics */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <h4 className="font-medium mb-2">{t.customerMetrics}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.avgOrdersPerYear}
                  </label>
                  <input
                    type="number"
                    value={productData.averageReorderRate}
                    onChange={(e) => updateProductState('averageReorderRate', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.1"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.avgOrderValueLabel}
                    <span className="text-xs text-gray-500 ml-1">({t.leaveBlank})</span>
                  </label>
                  <input
                    type="number"
                    value={productData.averageOrderValue || ''}
                    onChange={(e) => updateProductState('averageOrderValue', e.target.value ? parseFloat(e.target.value) : null)}
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                    placeholder={productData.price.toString()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.customerRelationshipLength}
                  </label>
                  <input
                    type="number"
                    value={productData.customerLifetimeMonths}
                    onChange={(e) => updateProductState('customerLifetimeMonths', parseInt(e.target.value) || 0)}
                    min="1"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.customerAcquisitionCost}
                  </label>
                  <input
                    type="number"
                    value={productData.acquisitionCost}
                    onChange={(e) => updateProductState('acquisitionCost', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                    className="w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 bg-white dark:bg-gray-900"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {isEdit ? t.update : t.add}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
