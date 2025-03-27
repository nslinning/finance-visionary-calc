
import { CustomerSegment } from '../../../types/calculator';

// Default new segment data
export const defaultNewSegment: CustomerSegment = {
  id: 0,
  name: '',
  type: 'b2b',
  products: [],
  licenseFeePerUser: 299,
  contractLengthYears: 1,
  volumeDiscountRate: 0,
  contractLengthDiscountRate: 0,
  customDiscountRate: 0,
  employeeCount: 10,
  includesHardware: false,
  hardwareAcquisitionType: 'purchase',
  leaseInterestRate: 5.0,
  subscriptionType: 'arr-commitment',
  calculationPurpose: 'offer',
  isIndividualCustomer: false,
  logisticsCostPercentage: 0,
  indirectCostPercentage: 0,
  additionalCosts: 0
};

// Demo customer segment - en stor bedrift med 10.000 ansatte
export const demoCustomerSegment: CustomerSegment = {
  id: 1,
  name: "StorBedrift AS",
  type: "b2b",
  products: [1, 2, 3, 7], // IDs for Sydera Basic, Pro, Enterprise og Smart Vending
  licenseFeePerUser: 249,
  contractLengthYears: 3,
  volumeDiscountRate: 15, // 15% volumrabatt
  contractLengthDiscountRate: 10, // 10% rabatt for langtidskontrakt
  customDiscountRate: 5, // 5% ekstra kundespesifikk rabatt
  employeeCount: 10000,
  includesHardware: true,
  hardwareAcquisitionType: "lease",
  hardwareId: 7, // Smart Vending
  leaseInterestRate: 4.5,
  subscriptionType: "arr-commitment",
  calculationPurpose: "offer",
  isIndividualCustomer: true,
  customerName: "StorBedrift AS",
  customerEmail: "kontakt@storbedrift.no",
  logisticsCostPercentage: 2,
  indirectCostPercentage: 3,
  additionalCosts: 15000
};
