"use client";

import { useFormContext } from "@/context/FormContext";
import { StepId } from "@/lib/types";

const STEPS = [
  {
    id: 1,
    title: "Personal Info",
    subtitle: "Name, email, phone",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Address",
    subtitle: "Location details",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Documents",
    subtitle: "Upload files",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="10 9 9 9 8 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Review",
    subtitle: "Confirm & submit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <polyline points="9 11 12 14 22 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Stepper() {
  const { state } = useFormContext();
  const { currentStep } = state;
  const progress = ((currentStep - 1) / 3) * 100;

  return (
    <aside className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-8 w-full">
      {/* Brand */}
      <div className="mb-10">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">FormFlow new</span>
        </div>
        <p className="text-slate-400 text-xs mt-1 pl-10">Onboarding Suite</p>
      </div>

      {/* Progress */}
      <div className="mb-8 bg-slate-700/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400 font-medium">Overall Progress</span>
          <span className="text-xs font-bold text-violet-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Step {currentStep} of 4
        </p>
      </div>

      {/* Steps */}
      <nav className="flex flex-col gap-1 relative flex-1">
        {/* Vertical connecting line */}
        <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-slate-700" />
        <div
          className="absolute left-[19px] top-8 w-0.5 bg-gradient-to-b from-violet-500 to-fuchsia-500 transition-all duration-700 ease-out"
          style={{ height: `${((currentStep - 1) / 3) * 100}%` }}
        />

        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <div
              key={step.id}
              className={`
                relative flex items-center gap-4 px-3 py-3 rounded-xl
                transition-all duration-300 ease-out
                ${isCurrent ? "bg-violet-500/15 border border-violet-500/30" : ""}
                ${isCompleted ? "opacity-100" : ""}
                ${isUpcoming ? "opacity-40" : ""}
              `}
            >
              {/* Step circle */}
              <div
                className={`
                  relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                  transition-all duration-500 ease-out
                  ${isCompleted
                    ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/40"
                    : isCurrent
                    ? "bg-slate-800 border-2 border-violet-400 shadow-lg shadow-violet-500/20"
                    : "bg-slate-700/60 border border-slate-600"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckIcon />
                ) : (
                  <span
                    className={`${
                      isCurrent ? "text-violet-300" : "text-slate-500"
                    }`}
                  >
                    {step.icon}
                  </span>
                )}
              </div>

              {/* Step info */}
              <div>
                <p
                  className={`text-sm font-semibold leading-tight transition-colors duration-300 ${
                    isCurrent
                      ? "text-white"
                      : isCompleted
                      ? "text-slate-300"
                      : "text-slate-500"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{step.subtitle}</p>
              </div>

              {/* Current indicator dot */}
              {isCurrent && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white">
            R
          </div>
          <div>
            <p className="text-xs font-medium text-slate-300">Rahul Sharma</p>
            <p className="text-xs text-slate-500">rahul@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
