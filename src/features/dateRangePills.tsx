import type { Period } from "@/src/components/dashboard/periodSelector";
import type { DateRangePreset } from "@/src/types/filterTypes";

type DateRangePillsProps = {
  presets: DateRangePreset[];
  value: Period;
  onChange: (value: Period) => void;
};

export default function DateRangePills({
  presets,
  value,
  onChange,
}: DateRangePillsProps) {
  return (
    <div role="radiogroup" aria-label="Date range" className="flex gap-2">
      {presets.map((p) => {
        const active = p.value === value;
        return (
          <button
            key={p.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={p.label}
            title={p.label}
            onClick={() => onChange(p.value)}
            className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-colors ${
              active
                ? "bg-blue-600 text-white"
                : "bg-surface-muted text-secondary hover:bg-surface-hover"
            }`}
          >
            {p.value}
          </button>
        );
      })}
    </div>
  );
}
