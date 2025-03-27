
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { Product } from '../../../types/calculator';

interface ProductsListProps {
  t: TranslationObject;
  products: Product[];
  segmentProductIds: number[];
}

const ProductsList: React.FC<ProductsListProps> = ({
  t,
  products,
  segmentProductIds
}) => {
  if (segmentProductIds.length === 0) return null;
  
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <h4 className="font-medium mb-2">{t.segmentProducts}</h4>
      <ul className="space-y-1 text-sm">
        {segmentProductIds.map(productId => {
          const product = products.find(p => p.id === productId);
          return product ? (
            <li key={productId} className="text-gray-600 dark:text-gray-400">
              {product.name}
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default ProductsList;
