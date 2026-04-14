import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
});

export const addressSchema = z.object({
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address is too long"),
  city: z
    .string()
    .min(2, "City name is required")
    .regex(/^[a-zA-Z\s]+$/, "City must contain only letters"),
  state: z.string().min(1, "Please select a state"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
});

export const documentSchema = z.object({
  fileName: z.string().min(1, "Please upload a document"),
});

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
export type AddressSchema = z.infer<typeof addressSchema>;
export type DocumentSchema = z.infer<typeof documentSchema>;
