import MonoLabel from "./MonoLabel";
import ReadyStateBadge from "./ReadyStateBadge";
import LangToggle from "./LangToggle";

type ReadyState = "playable" | "readable" | "shadowable";

interface TopBarProps {
  materialTitle: string;
  readyState: ReadyState;
  onBack?: () => void;
}

export default function TopBar({ materialTitle, readyState, onBack }: TopBarProps) {
  return (
    <div className="flex items-center justify-between h-12 px-5 border-b border-black/10 shrink-0">
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-black/40 hover:text-black transition-colors text-[13px] cursor-pointer shrink-0"
          style={{ letterSpacing: "-0.1px" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <MonoLabel size="sm" className="text-current">LIBRARY</MonoLabel>
        </button>

        <div className="w-px h-4 bg-black/10 shrink-0" />

        <span
          className="text-[15px] text-black font-[450] truncate"
          style={{ letterSpacing: "-0.14px" }}
        >
          {materialTitle}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <LangToggle />
        <ReadyStateBadge state={readyState} />
      </div>
    </div>
  );
}
