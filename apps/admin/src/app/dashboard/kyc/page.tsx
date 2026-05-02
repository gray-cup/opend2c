"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type DocStatus = "verified" | "pending" | "rejected" | "missing";

type Document = {
  id: string;
  label: string;
  description: string;
  status: DocStatus;
  uploadedOn?: string;
  note?: string;
};

const documents: Document[] = [
  { id: "pan", label: "PAN Card", description: "Permanent Account Number for tax identity", status: "verified", uploadedOn: "Mar 10, 2025" },
  { id: "gstin", label: "GSTIN Certificate", description: "GST registration certificate", status: "verified", uploadedOn: "Mar 10, 2025" },
  { id: "aadhaar", label: "Aadhaar Card", description: "Government-issued identity proof", status: "pending", uploadedOn: "Apr 15, 2025" },
  { id: "fssai", label: "FSSAI License", description: "Food safety certification required for food commodities", status: "rejected", uploadedOn: "Apr 12, 2025", note: "Document unclear — please re-upload a higher quality scan." },
  { id: "bankstatement", label: "Bank Statement", description: "Last 6 months, showing business transactions", status: "missing" },
  { id: "cancelled_cheque", label: "Cancelled Cheque", description: "For bank account verification", status: "verified", uploadedOn: "Mar 10, 2025" },
];

const statusConfig: Record<DocStatus, { label: string; style: string; icon: React.ReactNode }> = {
  verified: {
    label: "Verified",
    style: "bg-green-50 text-green-700 border-green-200",
    icon: (
      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  pending: {
    label: "Under Review",
    style: "bg-yellow-50 text-yellow-700 border-yellow-200",
    icon: (
      <svg className="h-4 w-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  rejected: {
    label: "Rejected",
    style: "bg-red-50 text-red-600 border-red-200",
    icon: (
      <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
  missing: {
    label: "Not Uploaded",
    style: "bg-neutral-100 text-neutral-500 border-neutral-200",
    icon: (
      <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
};

const verifiedCount = documents.filter((d) => d.status === "verified").length;
const totalCount = documents.length;

export default function SellerKYCPage() {
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  return (
    <div className="px-8 py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">KYC Verification</h1>
        <p className="mt-0.5 text-sm text-neutral-500">
          Complete your KYC to unlock full selling capabilities and faster payouts.
        </p>
      </div>

      {/* Progress bar */}
      <div className="rounded-xl border border-neutral-200 bg-white p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-neutral-900">Verification Progress</p>
          <p className="text-sm text-neutral-500">{verifiedCount}/{totalCount} documents verified</p>
        </div>
        <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-neutral-900 rounded-full transition-all"
            style={{ width: `${(verifiedCount / totalCount) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-neutral-400">
          {verifiedCount === totalCount
            ? "All documents verified — your account is fully active."
            : `${totalCount - verifiedCount} document(s) still need attention.`}
        </p>
      </div>

      {/* Business info */}
      <div className="rounded-xl border border-neutral-200 bg-white p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-neutral-900">Business Information</h2>
          <button className="text-xs text-neutral-600 border border-neutral-200 px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors">
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {[
            { label: "Legal Business Name", value: "Brahmaputra Agri Pvt Ltd" },
            { label: "Business Type", value: "Private Limited Company" },
            { label: "PAN", value: "AAAAA0000A" },
            { label: "GSTIN", value: "27AAAAA0000A1Z5" },
            { label: "Registered Address", value: "12, Nehru Road, Dibrugarh, Assam 786001" },
            { label: "State", value: "Assam" },
          ].map((row) => (
            <div key={row.label}>
              <p className="text-xs text-neutral-500">{row.label}</p>
              <p className="mt-0.5 text-sm text-neutral-900">{row.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-neutral-900">Required Documents</h2>
        {documents.map((doc) => {
          const config = statusConfig[doc.status];
          return (
            <div
              key={doc.id}
              className={`rounded-xl border bg-white p-4 ${doc.status === "rejected" ? "border-red-200" : "border-neutral-200"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-7 w-7 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                    {config.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{doc.label}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{doc.description}</p>
                    {doc.uploadedOn && (
                      <p className="text-xs text-neutral-400 mt-0.5">Uploaded {doc.uploadedOn}</p>
                    )}
                    {doc.note && (
                      <p className="text-xs text-red-600 mt-1.5 bg-red-50 px-2 py-1 rounded">{doc.note}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.style}`}>
                    {config.label}
                  </span>
                  {(doc.status === "missing" || doc.status === "rejected") && (
                    <Button
                      variant="redoutline"
                      size="minor"
                      onClick={() => setUploadingId(uploadingId === doc.id ? null : doc.id)}
                    >
                      {doc.status === "rejected" ? "Re-upload" : "Upload"}
                    </Button>
                  )}
                  {doc.status === "verified" && (
                    <button className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
                      View
                    </button>
                  )}
                </div>
              </div>

              {uploadingId === doc.id && (
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className="border-2 border-dashed border-neutral-200 rounded-lg p-5 text-center hover:border-neutral-300 transition-colors cursor-pointer">
                    <svg className="mx-auto h-6 w-6 text-neutral-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="text-xs text-neutral-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-neutral-400 mt-0.5">PDF, PNG, JPG — max 5MB</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="redoutline" size="minor">Submit</Button>
                    <button
                      onClick={() => setUploadingId(null)}
                      className="text-xs text-neutral-600 border border-neutral-200 px-4 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
