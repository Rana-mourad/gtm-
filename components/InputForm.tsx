'use client';

import React, { useState } from 'react';
import { Search, Loader2, ChevronDown } from 'lucide-react';

interface FormData {
  businessName: string;
  productService: string;
  valueProp: string;
  targetMarket: string;
  priceRange: string;
  scalingGoal: string;
}

interface InputFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const SCALING_OPTIONS = [
  '500 - 1,000 Companies',
  '1,000 - 3,000 Companies',
  '3,000 - 8,000 Companies',
  '8,000 - 15,000 Companies',
  '15,000+ Companies (Enterprise)',
];

const inputClass =
  'w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-slate-300';

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    productService: '',
    valueProp: '',
    targetMarket: '',
    priceRange: '',
    scalingGoal: SCALING_OPTIONS[1],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 md:p-12 rounded-[2rem]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label
            htmlFor="businessName"
            className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1"
          >
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            required
            type="text"
            className={inputClass}
            placeholder="e.g. Acme Corporation"
            value={formData.businessName}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-3">
          <label
            htmlFor="productService"
            className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1"
          >
            Product / Service
          </label>
          <input
            id="productService"
            name="productService"
            required
            type="text"
            className={inputClass}
            placeholder="e.g. AI-Powered CRM Extension"
            value={formData.productService}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="valueProp"
          className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1"
        >
          Primary Value Proposition
        </label>
        <textarea
          id="valueProp"
          name="valueProp"
          required
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Describe the core problem you solve and the unique benefit you provide..."
          value={formData.valueProp}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label
            htmlFor="targetMarket"
            className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1"
          >
            Target Market
          </label>
          <input
            id="targetMarket"
            name="targetMarket"
            required
            type="text"
            className={inputClass}
            placeholder="e.g. Mid-market SaaS companies in EMEA"
            value={formData.targetMarket}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-3">
          <label
            htmlFor="priceRange"
            className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1"
          >
            Average Contract Value (ACV)
          </label>
          <input
            id="priceRange"
            name="priceRange"
            type="text"
            className={inputClass}
            placeholder="e.g. $15,000 - $45,000"
            value={formData.priceRange}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label
          htmlFor="scalingGoal"
          className="block text-xs font-bold uppercase tracking-wider text-slate-400 ml-1"
        >
          Scaling Goal (Target Company Count)
        </label>
        <div className="relative">
          <select
            id="scalingGoal"
            name="scalingGoal"
            className={`${inputClass} appearance-none pr-10 cursor-pointer`}
            value={formData.scalingGoal}
            onChange={handleChange}
          >
            {SCALING_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold text-sm flex items-center justify-center gap-4 hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing Market Intelligence...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Generate Intelligence Report
          </>
        )}
      </button>
    </form>
  );
}
