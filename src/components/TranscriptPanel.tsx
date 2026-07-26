import { useRef, useEffect } from "react";
import MonoLabel from "./MonoLabel";
import TranscriptLine from "./TranscriptLine";
import { useI18n } from "../i18n";

export interface CueLine {
  id: number;
  text: string;
  translation: string;
  startTime: number;
}

interface TranscriptPanelProps {
  cues: CueLine[];
  activeCueId: number;
  showTranslation?: boolean;
  disabled?: boolean;
  onCueClick?: (id: number) => void;
}

export default function TranscriptPanel({
  cues,
  activeCueId,
  showTranslation = false,
  disabled = false,
  onCueClick,
}: TranscriptPanelProps) {
  const { t } = useI18n();
  const activeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = activeRef.current;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;
      const elTop = el.offsetTop;
      const elBottom = elTop + el.clientHeight;

      if (elTop < containerTop + 80 || elBottom > containerBottom - 80) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeCueId]);

  return (
    <div className="flex flex-col h-full border-l border-black/10">
      {/* Header */}
      <div className="flex items-center justify-between h-10 px-5 shrink-0 border-b border-black/8">
        <MonoLabel size="sm" className="text-black/40">{t.transcript}</MonoLabel>
        {disabled && (
          <span className="text-[11px] text-black/30 font-mono uppercase tracking-wide">Unavailable</span>
        )}
      </div>

      {/* Scrollable cue list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6">
        {disabled ? (
          <div className="flex flex-col items-start gap-2 pt-6 px-1">
            <p className="text-[14px] text-black/35 font-[330] leading-relaxed" style={{ letterSpacing: "-0.1px" }}>
              {t.addSubtitleHint}
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            {cues.map((cue) => {
              const status =
                cue.id < activeCueId ? "done"
                : cue.id === activeCueId ? "active"
                : "upcoming";

              return (
                <div
                  key={cue.id}
                  ref={cue.id === activeCueId ? activeRef : null}
                >
                  <TranscriptLine
                    text={cue.text}
                    translation={cue.translation}
                    status={status}
                    showTranslation={showTranslation}
                    onClick={() => onCueClick?.(cue.id)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
