"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, PersonalInfoSchema } from "@/lib/validations";
import { useFormContext } from "@/context/FormContext";
import FormField from "@/components/ui/FormField";

export default function PersonalInfo() {
  const { state, dispatch, nextStep } = useFormContext();
  const { personalInfo } = state.formData;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: personalInfo,
  });

  const values = watch();

  useEffect(() => {
    dispatch({ type: "UPDATE_PERSONAL_INFO", payload: values });
  }, [values.name, values.email, values.phone]);

  const onSubmit = (data: PersonalInfoSchema) => {
    dispatch({ type: "UPDATE_PERSONAL_INFO", payload: data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="flex-1 space-y-5">
        <FormField
          label="Full Name"
          id="name"
          placeholder="Rahul Sharma"
          error={errors.name?.message}
          {...register("name")}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        />

        <FormField
          label="Email Address"
          id="email"
          type="email"
          placeholder="rahul@example.com"
          error={errors.email?.message}
          {...register("email")}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />

        <FormField
          label="Phone Number"
          id="phone"
          type="tel"
          placeholder="9876543210"
          error={errors.phone?.message}
          {...register("phone")}
          hint="10-digit Indian mobile number"
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15.09 15.91l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
      </div>

      <div className="pt-6 flex justify-end">
        <button
          type="submit"
          disabled={!isValid}
          className="group flex items-center gap-2 px-7 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-200 text-sm"
        >
          Continue
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </form>
  );
}
