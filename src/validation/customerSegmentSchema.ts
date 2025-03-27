
import { z } from "zod";

// Base schema definition
export const customerSegmentSchema = z.object({
  name: z.string().min(1, { message: "Segment name is required" }),
  type: z.enum(["b2b", "b2c", "b2b2c"], {
    required_error: "Segment type is required",
  }),
  products: z.array(z.number()),
  licenseFeePerUser: z.number().min(0, { message: "License fee must be a positive number" }),
  contractLengthYears: z.number().int().min(1, { message: "Contract length must be at least 1 year" }),
  volumeDiscountRate: z.number().min(0, { message: "Volume discount must be a positive number" }).max(100, { message: "Volume discount cannot exceed 100%" }),
  contractLengthDiscountRate: z.number().min(0, { message: "Contract length discount must be a positive number" }).max(100, { message: "Contract length discount cannot exceed 100%" }),
  customDiscountRate: z.number().min(0, { message: "Custom discount must be a positive number" }).max(100, { message: "Custom discount cannot exceed 100%" }),
  employeeCount: z.number().int().min(1, { message: "Employee count must be at least 1" }),
  
  // Hardware options validation
  includesHardware: z.boolean(),
  hardwareAcquisitionType: z.enum(["purchase", "rent", "lease"]).optional(),
  hardwareId: z.number().optional(),
  leaseInterestRate: z.number().min(0, { message: "Interest rate must be a positive number" }).max(100, { message: "Interest rate cannot exceed 100%" }).optional(),
  
  // Subscription type validation
  subscriptionType: z.enum(["mrr-no-commitment", "arr-commitment"], {
    required_error: "Subscription type is required",
  }),
  
  // Calculation purpose
  calculationPurpose: z.enum(["offer", "valuation"]).optional(),
  
  // Individual customer fields
  isIndividualCustomer: z.boolean(),
  customerName: z.string().optional(),
  customerEmail: z.string().email({ message: "Invalid email address" }).optional(),
  
  // Cost calculation fields
  logisticsCostPercentage: z.number().min(0, { message: "Logistics cost must be a positive number" }).max(100, { message: "Logistics cost cannot exceed 100%" }).optional(),
  indirectCostPercentage: z.number().min(0, { message: "Indirect cost must be a positive number" }).max(100, { message: "Indirect cost cannot exceed 100%" }).optional(),
  additionalCosts: z.number().min(0, { message: "Additional costs must be a positive number" }).optional(),
});

// Type for the form data
export type CustomerSegmentFormData = z.infer<typeof customerSegmentSchema>;

// Conditional validation function
export const validateCustomerSegmentForm = (data: any) => {
  // Create a refined schema based on conditions
  let refinedSchema = customerSegmentSchema;
  
  // Add conditional validation for hardware
  if (data.includesHardware) {
    refinedSchema = refinedSchema.refine(
      (values) => !values.includesHardware || values.hardwareAcquisitionType !== undefined,
      {
        message: "Hardware acquisition type is required when hardware is included",
        path: ["hardwareAcquisitionType"]
      }
    ).refine(
      (values) => !values.includesHardware || values.hardwareId !== undefined,
      {
        message: "Hardware product is required when hardware is included",
        path: ["hardwareId"]
      }
    );
    
    // Additional validation for lease
    if (data.hardwareAcquisitionType === "lease") {
      refinedSchema = refinedSchema.refine(
        (values) => values.hardwareAcquisitionType !== "lease" || 
                   (values.leaseInterestRate !== undefined && values.leaseInterestRate > 0),
        {
          message: "Lease interest rate is required for leasing hardware",
          path: ["leaseInterestRate"]
        }
      );
    }
  }
  
  // Individual customer validation
  if (data.isIndividualCustomer) {
    refinedSchema = refinedSchema.refine(
      (values) => !values.isIndividualCustomer || 
                 (values.customerName !== undefined && values.customerName.length > 0),
      {
        message: "Customer name is required for individual customers",
        path: ["customerName"]
      }
    );
  }
  
  return refinedSchema;
};
