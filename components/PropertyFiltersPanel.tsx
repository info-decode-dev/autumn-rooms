"use client";

import { SlidersHorizontal } from "lucide-react";
import countriesData from "@/data/countries.json";

interface PropertyFiltersPanelProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  maxBudget: number;
  onMaxBudgetChange: (value: number) => void;
  availableOnly: boolean;
  onAvailableOnlyChange: (value: boolean) => void;
  onClear: () => void;
  showHeader?: boolean;
  showClearButton?: boolean;
}

export function getActiveFilterCount(
  selectedCountry: string,
  maxBudget: number,
  availableOnly: boolean,
  defaultMaxBudget = 2000
) {
  let count = 0;
  if (selectedCountry !== "All") count += 1;
  if (availableOnly) count += 1;
  if (maxBudget < defaultMaxBudget) count += 1;
  return count;
}

export default function PropertyFiltersPanel({
  selectedCountry,
  onCountryChange,
  maxBudget,
  onMaxBudgetChange,
  availableOnly,
  onAvailableOnlyChange,
  onClear,
  showHeader = true,
  showClearButton = true,
}: PropertyFiltersPanelProps) {
  return (
    <div className="flex flex-col gap-8">
      {showHeader && (
        <div className="flex items-center gap-3 pb-4 border-b border-[var(--foreground)]/10">
          <div className="w-10 h-10 rounded-full bg-[var(--foreground)]/5 flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-[var(--foreground)]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[var(--foreground)]">Filters</h3>
        </div>
      )}

      <div>
        <h4 className="text-[10px] font-bold text-[var(--foreground)]/40 uppercase tracking-widest mb-4">Location</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCountryChange("All")}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              selectedCountry === "All"
                ? "bg-[var(--foreground)] text-[var(--background)] shadow-md"
                : "bg-[var(--foreground)]/5 text-[var(--foreground)]/70 hover:bg-[var(--foreground)]/10"
            }`}
          >
            All
          </button>
          {countriesData.map((country) => (
            <button
              key={country.code}
              onClick={() => onCountryChange(country.name)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCountry === country.name
                  ? "bg-[var(--foreground)] text-[var(--background)] shadow-md"
                  : "bg-[var(--foreground)]/5 text-[var(--foreground)]/70 hover:bg-[var(--foreground)]/10"
              }`}
            >
              {country.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[10px] font-bold text-[var(--foreground)]/40 uppercase tracking-widest">Max Budget</h4>
          <span className="text-sm font-bold text-[var(--color-soft-gold)]">Up to £{maxBudget.toLocaleString("en-GB")}</span>
        </div>
        <input
          type="range"
          min="200"
          max="2000"
          step="50"
          value={maxBudget}
          onChange={(e) => onMaxBudgetChange(Number(e.target.value))}
          className="w-full accent-[var(--color-soft-gold)]"
        />
        <div className="flex justify-between text-xs font-bold text-[var(--foreground)]/50 mt-2">
          <span>£200</span>
          <span>£2,000+</span>
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-bold text-[var(--foreground)]/40 uppercase tracking-widest mb-4">Availability</h4>
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-bold text-[var(--foreground)]/80 group-hover:text-[var(--foreground)] transition-colors">
            Show available only
          </span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={availableOnly}
              onChange={(e) => onAvailableOnlyChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-[var(--foreground)]/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-soft-gold)]" />
          </div>
        </label>
      </div>

      {showClearButton && (
        <button
          onClick={onClear}
          className="w-full py-3 rounded-full text-sm font-bold border border-[var(--foreground)]/10 text-[var(--foreground)]/70 hover:bg-[var(--foreground)]/5 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
