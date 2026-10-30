import type { Period } from "@/src/components/dashboard/periodSelector";

export type FilterCategory = {
  name: string;
  color: string; // 6-digit hex
  icon: string; // kebab-case Font Awesome name
};

export type DateRangePreset = {
  label: string;
  value: Period;
};

export type FiltersData = {
  categories: FilterCategory[];
  dateRangePresets: DateRangePreset[];
};
