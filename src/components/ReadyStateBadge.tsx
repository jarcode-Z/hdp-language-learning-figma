import { useI18n } from "../i18n";

type ReadyState = "playable" | "readable" | "shadowable";

interface ReadyStateBadgeProps {
  state: ReadyState;
}

export default function ReadyStateBadge({ state }: ReadyStateBadgeProps) {
  const { t } = useI18n();
  const labels: Record<ReadyState, string> = {
    playable: t.playable,
    readable: t.readable,
    shadowable: t.shadowable,
  };
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.6px] text-black/60">
      <span className="w-1.5 h-1.5 rounded-full bg-black border border-black" />
      {labels[state]}
    </span>
  );
}
