"use client";

import { useState, useRef, useCallback } from "react";
import { useFormContext } from "@/context/FormContext";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_SIZE_MB = 5;

export default function DocumentUpload() {
  const { state, dispatch, nextStep, prevStep } = useFormContext();
  const { document: doc } = state.formData;
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    setError("");

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Only PDF, JPG, and PNG files are accepted.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File must be under ${MAX_SIZE_MB}MB.`);
      return;
    }

    const sizeKB = file.size / 1024;
    const sizeDisplay = sizeKB > 1024
      ? `${(sizeKB / 1024).toFixed(1)} MB`
      : `${sizeKB.toFixed(0)} KB`;

    dispatch({
      type: "UPDATE_DOCUMENT",
      payload: {
        file,
        fileName: file.name,
        fileSize: sizeDisplay,
        fileType: file.type,
      },
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const removeFile = () => {
    dispatch({
      type: "UPDATE_DOCUMENT",
      payload: { file: null, fileName: "", fileSize: "", fileType: "" },
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getFileIcon = (type: string) => {
    if (type === "application/pdf") return "📄";
    if (type.startsWith("image/")) return "🖼️";
    return "📎";
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {!doc.fileName ? (
          <>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative flex flex-col items-center justify-center w-full h-52 rounded-2xl border-2 border-dashed cursor-pointer
                transition-all duration-300 ease-out
                ${isDragging
                  ? "border-violet-500 bg-violet-50 scale-[1.01]"
                  : "border-slate-200 bg-slate-50 hover:border-violet-400 hover:bg-violet-50/50"
                }
              `}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${isDragging ? "bg-violet-100" : "bg-white border border-slate-200"}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={`w-7 h-7 ${isDragging ? "text-violet-500" : "text-slate-400"}`}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                {isDragging ? "Release to upload" : "Drop file here, or click to browse"}
              </p>
              <p className="text-xs text-slate-400">PDF, JPG, PNG up to {MAX_SIZE_MB}MB</p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </div>

            {error && (
              <div className="mt-3 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-red-500 flex-shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Accepted formats */}
            <div className="mt-5">
              <p className="text-xs text-slate-500 font-medium mb-3">Accepted formats</p>
              <div className="flex gap-2.5">
                {[
                  { ext: "PDF", color: "bg-red-50 text-red-600 border-red-100" },
                  { ext: "JPG", color: "bg-blue-50 text-blue-600 border-blue-100" },
                  { ext: "PNG", color: "bg-green-50 text-green-600 border-green-100" },
                ].map(({ ext, color }) => (
                  <span key={ext} className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${color}`}>
                    {ext}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* File preview */
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-violet-50 border border-violet-200 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-white border border-violet-200 flex items-center justify-center text-2xl flex-shrink-0">
                {getFileIcon(doc.fileType)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{doc.fileName}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-500">{doc.fileSize}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-xs text-violet-600 font-medium uppercase">
                    {doc.fileType.split("/")[1]}
                  </span>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200 flex-shrink-0"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2.5 p-3 bg-green-50 border border-green-200 rounded-xl">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-3 h-3">
                  <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-xs text-green-700 font-medium">Document ready for upload</p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-violet-600 hover:text-violet-800 font-medium underline underline-offset-2"
            >
              Choose a different file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </div>
        )}
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
          type="button"
          onClick={nextStep}
          disabled={!doc.fileName}
          className="group flex items-center gap-2 px-7 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-200 text-sm"
        >
          Continue
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
