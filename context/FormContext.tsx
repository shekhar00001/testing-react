"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { FormData, StepId } from "@/lib/types";

interface FormState {
  currentStep: StepId;
  formData: FormData;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

type FormAction =
  | { type: "SET_STEP"; payload: StepId }
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<FormData["personalInfo"]> }
  | { type: "UPDATE_ADDRESS"; payload: Partial<FormData["address"]> }
  | { type: "UPDATE_DOCUMENT"; payload: Partial<FormData["document"]> }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_SUBMITTED" }
  | { type: "RESET" };

const initialState: FormState = {
  currentStep: 1,
  formData: {
    personalInfo: { name: "", email: "", phone: "" },
    address: { address: "", city: "", state: "", pincode: "" },
    document: { file: null, fileName: "", fileSize: "", fileType: "" },
  },
  isSubmitting: false,
  isSubmitted: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        formData: {
          ...state.formData,
          personalInfo: { ...state.formData.personalInfo, ...action.payload },
        },
      };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        formData: {
          ...state.formData,
          address: { ...state.formData.address, ...action.payload },
        },
      };
    case "UPDATE_DOCUMENT":
      return {
        ...state,
        formData: {
          ...state.formData,
          document: { ...state.formData.document, ...action.payload },
        },
      };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "SET_SUBMITTED":
      return { ...state, isSubmitted: true, isSubmitting: false };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  goToStep: (step: StepId) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const goToStep = (step: StepId) => dispatch({ type: "SET_STEP", payload: step });
  const nextStep = () => {
    if (state.currentStep < 4) goToStep((state.currentStep + 1) as StepId);
  };
  const prevStep = () => {
    if (state.currentStep > 1) goToStep((state.currentStep - 1) as StepId);
  };

  return (
    <FormContext.Provider value={{ state, dispatch, goToStep, nextStep, prevStep }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within FormProvider");
  return ctx;
}
