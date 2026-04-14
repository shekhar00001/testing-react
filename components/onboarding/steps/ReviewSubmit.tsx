"use client";

import { useFormContext } from "@/context/FormContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface ReviewRowProps {
  label: string;
  value: string;
}

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-slate-100 last:border-0">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider w-28 flex-shrink-0">{label}</span>
      <span className="text-sm text-slate-800 font-medium text-right flex-1 ml-4">{value || "—"}</span>
    </div>
  );
}

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  step: number;
  children: React.ReactNode;
  onEdit: () => void;
}

function SectionCard({ title, icon, children, onEdit }: SectionCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-sm font-semibold text-slate-700">{title}</span>
        </div>
        <button
          onClick={onEdit}
          className="text-xs font-medium text-violet-600 hover:text-violet-800 flex items-center gap-1 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Edit
        </button>
      </div>
      <div className="px-5">{children}</div>
    </div>
  );
}

export default function ReviewSubmit() {
  const { state, dispatch, prevStep, goToStep } = useFormContext();
  const { formData, isSubmitting, isSubmitted } = state;
  const { personalInfo, address, document: doc } = formData;

  const handleSubmit = async () => {
    dispatch({ type: "SET_SUBMITTING", payload: true });
    // Simulate API call
    await new Promise((res) => setTimeout(res, 2000));
    dispatch({ type: "SET_SUBMITTED" });
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-5 shadow-xl shadow-violet-500/30 animate-bounce-once">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-9 h-9">
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">All Done! 🎉</h3>
        <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
          Your onboarding is complete. We'll review your details and get back to you within 24 hours.
        </p>
        <div className="mt-6 p-4 bg-violet-50 border border-violet-200 rounded-xl">
          <p className="text-xs text-violet-700 font-medium">Reference ID: <span className="font-mono font-bold">FF-{Date.now().toString().slice(-8)}</span></p>
        </div>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="mt-6 text-sm text-slate-500 hover:text-slate-700 underline underline-offset-2 transition-colors"
        >
          Start a new submission
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-3 overflow-y-auto">
        <SectionCard
          title="Personal Info"
          step={1}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
          onEdit={() => goToStep(1)}
        >
          <ReviewRow label="Name" value={personalInfo.name} />
          <ReviewRow label="Email" value={personalInfo.email} />
          <ReviewRow label="Phone" value={personalInfo.phone ? `+91 ${personalInfo.phone}` : ""} />
        </SectionCard>

        <SectionCard
          title="Address"
          step={2}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          }
          onEdit={() => goToStep(2)}
        >
          <ReviewRow label="Address" value={address.address} />
          <ReviewRow label="City" value={address.city} />
          <ReviewRow label="State" value={address.state} />
          <ReviewRow label="Pincode" value={address.pincode} />
        </SectionCard>

        <SectionCard
          title="Document"
          step={3}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          onEdit={() => goToStep(3)}
        >
          <ReviewRow label="File" value={doc.fileName} />
          <ReviewRow label="Size" value={doc.fileSize} />
          <ReviewRow label="Type" value={doc.fileType.split("/")[1]?.toUpperCase() || ""} />
        </SectionCard>
      </div>

      <div className="pt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-3 text-slate-600 hover:text-slate-800 font-medium text-sm rounded-xl hover:bg-slate-100 transition-all duration-200 disabled:opacity-50"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="group flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/50 transition-all duration-200 text-sm"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" />
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5">
                <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22 11 13 2 9l20-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
