
import React from 'react';
import { TranslationObject } from '../../../constants/calculator/types';
import { CustomerSegment, Product } from '../../../types/calculator';
import SegmentHeader from './SegmentHeader';
import SegmentRevenueDetails from './SegmentRevenueDetails';
import AdditionalCostsDisplay from './AdditionalCostsDisplay';
import HardwareDetails from './HardwareDetails';
import ProductsList from './ProductsList';
import CustomerDetails from './CustomerDetails';

interface SegmentCardProps {
  t: TranslationObject;
  segment: CustomerSegment;
  revenue: {
    monthly: number;
    monthlyWithCosts: number;
    annual: number;
    total: number;
    monthlyPerUser: number;
    additionalCosts: {
      logistics: number;
      indirect: number;
      fixed: number;
      total: number;
    }
  };
  products: Product[];
  currency: string;
  language: string;
  onEdit: (segment: CustomerSegment) => void;
  onDelete: (id: number) => void;
}

const SegmentCard: React.FC<SegmentCardProps> = ({
  t,
  segment,
  revenue,
  products,
  currency,
  language,
  onEdit,
  onDelete
}) => {
  const hardwareProduct = segment.includesHardware && segment.hardwareId
    ? products.find(p => p.id === segment.hardwareId)
    : undefined;
  
  const showCostBreakdown = !!(
    segment.logisticsCostPercentage || 
    segment.indirectCostPercentage || 
    segment.additionalCosts
  );
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <SegmentHeader
        t={t}
        name={segment.name}
        type={segment.type}
        isIndividualCustomer={segment.isIndividualCustomer}
        includesHardware={segment.includesHardware}
        hardwareAcquisitionType={segment.hardwareAcquisitionType}
        onEdit={() => onEdit(segment)}
        onDelete={() => onDelete(segment.id)}
      />
      
      <SegmentRevenueDetails
        t={t}
        employeeCount={segment.employeeCount}
        monthlyPerUser={revenue.monthlyPerUser}
        monthly={revenue.monthly}
        monthlyWithCosts={revenue.monthlyWithCosts}
        annual={revenue.annual}
        total={revenue.total}
        contractLengthYears={segment.contractLengthYears}
        subscriptionType={segment.subscriptionType}
        showCostBreakdown={showCostBreakdown}
        currency={currency}
        language={language}
      />
      
      {showCostBreakdown && (
        <AdditionalCostsDisplay
          t={t}
          logistics={revenue.additionalCosts.logistics}
          logisticsCostPercentage={segment.logisticsCostPercentage || 0}
          indirect={revenue.additionalCosts.indirect}
          indirectCostPercentage={segment.indirectCostPercentage || 0}
          fixed={revenue.additionalCosts.fixed}
          total={revenue.additionalCosts.total}
          currency={currency}
          language={language}
        />
      )}
      
      {segment.includesHardware && hardwareProduct && (
        <HardwareDetails
          t={t}
          hardwareProduct={hardwareProduct}
          hardwareAcquisitionType={segment.hardwareAcquisitionType || 'purchase'}
          leaseInterestRate={segment.leaseInterestRate}
        />
      )}
      
      <ProductsList
        t={t}
        products={products}
        segmentProductIds={segment.products}
      />
      
      {segment.isIndividualCustomer && (
        <CustomerDetails
          t={t}
          customerName={segment.customerName}
          customerEmail={segment.customerEmail}
        />
      )}
    </div>
  );
};

export default SegmentCard;
