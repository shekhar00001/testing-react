"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressSchema } from "@/lib/validations";
import { useFormContext } from "@/context/FormContext";
import FormField from "@/components/ui/FormField";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
];

export default function AddressDetails() {
  const { state, dispatch, nextStep, prevStep } = useFormContext();
  const { address } = state.formData;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: address,
  });

  const values = watch();

  useEffect(() => {
    dispatch({ type: "UPDATE_ADDRESS", payload: values });
  }, [values.address, values.city, values.state, values.pincode]);

  const onSubmit = (data: AddressSchema) => {
    dispatch({ type: "UPDATE_ADDRESS", payload: data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="flex-1 space-y-5">
        <FormField
          label="Street Address"
          id="address"
          placeholder="123, MG Road, Connaught Place"
          error={errors.address?.message}
          {...register("address")}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="City"
            id="city"
            placeholder="New Delhi"
            error={errors.city?.message}
            {...register("city")}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
          />

          <FormField
            label="Pincode"
            id="pincode"
            placeholder="110001"
            error={errors.pincode?.message}
            {...register("pincode")}
            maxLength={6}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                <rect x="1" y="3" width="15" height="13" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 8h4l3 3v5h-7V8z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            }
          />
        </div>

        {/* State dropdown */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="state" className="text-sm font-medium text-slate-700">
            State
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <select
              id="state"
              {...register("state")}
              className={`w-full pl-10 pr-10 py-3 border rounded-xl bg-white text-sm text-slate-700 appearance-none transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400
                ${errors.state ? "border-red-400 ring-1 ring-red-400" : "border-slate-200 hover:border-slate-300"}
              `}
            >
              <option value="">Select state</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          {errors.state && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 flex-shrink-0">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {errors.state.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center gap-2 px-5 py-3 text-slate-600 hover:text-slate-800 font-medium text-sm rounded-xl hover:bg-slate-100 transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="group flex items-center gap-2 px-7 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-200 text-sm"
        >
          Continue
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </form>
  );
}
