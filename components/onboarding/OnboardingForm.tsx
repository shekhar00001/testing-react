"use client";

import { useFormContext } from "@/context/FormContext";
import Stepper from "./Stepper";
import PersonalInfo from "./steps/PersonalInfo";
import AddressDetails from "./steps/AddressDetails";
import DocumentUpload from "./steps/DocumentUpload";
import ReviewSubmit from "./steps/ReviewSubmit";

const STEP_META = [
  { title: "Personal Information", subtitle: "Tell us a bit about yourself" },
  { title: "Address Details", subtitle: "Where are you located?" },
  { title: "Document Upload", subtitle: "Upload your verification document" },
  { title: "Review & Submit", subtitle: "Verify your details before submitting" },
];

export default function OnboardingForm() {
  const { state } = useFormContext();
  const { currentStep } = state;
  const meta = STEP_META[currentStep - 1];

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalInfo />;
      case 2: return <AddressDetails />;
      case 3: return <DocumentUpload />;
      case 4: return <ReviewSubmit />;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Left Sidebar */}
      <div className="hidden md:flex w-72 lg:w-80 flex-shrink-0">
        <Stepper />
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800">{meta.title}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{meta.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 border border-violet-200 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-xs text-violet-600 font-medium">In Progress</span>
            </div>
          </div>
        </header>

        {/* Mobile stepper (simplified) */}
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  s < currentStep
                    ? "bg-violet-500"
                    : s === currentStep
                    ? "bg-violet-400"
                    : "bg-slate-200"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500">Step {currentStep} of 4 — {meta.title}</p>
        </div>

        {/* Form area */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <div className="max-w-lg mx-auto">
            {/* Step card */}
            <div
              key={currentStep}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8 animate-slide-in"
            >
              {renderStep()}
            </div>

            {/* Help text */}
            <p className="text-center text-xs text-slate-400 mt-5">
              🔒 Your data is encrypted and securely stored
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
