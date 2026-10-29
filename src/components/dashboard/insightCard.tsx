import CategoryIcon from "@/src/features/categoryIcon";
import type { Insight } from "@/src/types/insightTypes";

export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="flex items-start gap-3 rounded-xl border border-border p-4">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg"
        style={{ backgroundColor: `${insight.color}26`, color: insight.color }}
      >
        <CategoryIcon name={insight.icon} />
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-primary">
          {insight.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          {insight.description}
        </p>
      </div>
    </article>
  );
}
