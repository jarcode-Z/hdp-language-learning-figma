import MonoLabel from "./MonoLabel";
import IconButton from "./IconButton";
import SpeedPill from "./SpeedPill";
import { useI18n } from "../i18n";

const SPEEDS = [0.7, 0.85, 1.0, 1.15];

interface BottomBarProps {
  speed: number;
  onSpeedChange: (s: number) => void;
  isRecording: boolean;
  onRecord: () => void;
  compareMode: "original" | "mine";
  onCompareToggle: () => void;
  disabled?: boolean;
}

export default function BottomBar({
  speed,
  onSpeedChange,
  isRecording,
  onRecord,
  compareMode,
  onCompareToggle,
  disabled = false,
}: BottomBarProps) {
  const dis = disabled;
  const { t } = useI18n();

  return (
    <div
      className="border-t border-black/10 shrink-0 px-4 md:px-5"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Desktop: single row */}
      <div className="hidden md:flex items-center justify-between" style={{ height: "76px" }}>
        {/* Left: playback + record + compare */}
        <div className="flex items-center gap-2">
          <IconButton variant="glass" size="md" disabled={dis} title={t.listen} className={dis ? "opacity-30 cursor-not-allowed" : ""}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 6a5 5 0 0110 0v3a2 2 0 01-4 0V6a1 1 0 012 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M3 9v1a5 5 0 004 4.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </IconButton>

          <IconButton variant={isRecording ? "black" : "glass"} active={isRecording} size="md" onClick={onRecord} disabled={dis} title={isRecording ? t.stopRecord : t.record} className={dis ? "opacity-30 cursor-not-allowed" : ""}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="3.5" fill={isRecording ? "white" : "currentColor"}/>
              {isRecording && <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.5"/>}
            </svg>
          </IconButton>

          {isRecording && (
            <span className="text-[12px] text-black/50 font-mono uppercase tracking-wide animate-pulse">{t.recording}</span>
          )}

          {!isRecording && (
            <div className="flex items-center gap-1 ml-1">
              {(["original", "mine"] as const).map((m) => (
                <button key={m} onClick={() => compareMode !== m && onCompareToggle()} disabled={dis}
                  className={`px-3 py-1 rounded-[50px] text-[12px] font-[400] transition-all cursor-pointer ${compareMode === m ? "bg-black text-white" : "text-black/50 hover:text-black"} ${dis ? "opacity-30 cursor-not-allowed" : ""}`}
                  style={{ letterSpacing: "-0.1px" }}>
                  {m === "original" ? t.original : t.myVoice}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: sentence nav */}
        <div className="flex items-center gap-2">
          <button disabled={dis} className={`px-4 py-1.5 rounded-[50px] text-[13px] font-[400] border border-black/20 hover:border-black/60 transition-all cursor-pointer ${dis ? "opacity-30 cursor-not-allowed" : ""}`} style={{ letterSpacing: "-0.1px" }}>{t.again}</button>
          <button disabled={dis} className={`px-4 py-1.5 rounded-[50px] text-[13px] bg-black text-white font-[400] hover:opacity-80 transition-all cursor-pointer ${dis ? "opacity-30 cursor-not-allowed" : ""}`} style={{ letterSpacing: "-0.1px" }}>{t.next}</button>
        </div>

        {/* Right: speed */}
        <div className="flex items-center gap-2.5">
          <MonoLabel size="sm" className="text-black/35">{t.speed}</MonoLabel>
          <div className="flex items-center gap-1">
            {SPEEDS.map((s) => (
              <SpeedPill key={s} value={s} active={speed === s} onClick={() => onSpeedChange(s)} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: two rows */}
      <div className="flex md:hidden flex-col gap-0 py-2">
        {/* Row 1: playback controls + sentence nav */}
        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center gap-2">
            <IconButton variant="glass" size="sm" disabled={dis} title={t.listen} className={dis ? "opacity-30 cursor-not-allowed" : ""}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 6a5 5 0 0110 0v3a2 2 0 01-4 0V6a1 1 0 012 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M3 9v1a5 5 0 004 4.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </IconButton>

            <IconButton variant={isRecording ? "black" : "glass"} active={isRecording} size="sm" onClick={onRecord} disabled={dis} title={isRecording ? "停止" : "录音"} className={dis ? "opacity-30 cursor-not-allowed" : ""}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="3.5" fill={isRecording ? "white" : "currentColor"}/>
                {isRecording && <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.5"/>}
              </svg>
            </IconButton>

            {isRecording && (
              <span className="text-[11px] text-black/50 font-mono uppercase tracking-wide animate-pulse">录音中</span>
            )}

            {!isRecording && (
              <div className="flex items-center gap-1">
                {(["original", "mine"] as const).map((m) => (
                  <button key={m} onClick={() => compareMode !== m && onCompareToggle()} disabled={dis}
                    className={`px-2.5 py-0.5 rounded-[50px] text-[11px] font-[400] transition-all cursor-pointer ${compareMode === m ? "bg-black text-white" : "text-black/45 hover:text-black"} ${dis ? "opacity-30 cursor-not-allowed" : ""}`}>
                    {m === "original" ? t.original : t.myVoiceMobile}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button disabled={dis} className={`px-3 py-1 rounded-[50px] text-[12px] font-[400] border border-black/20 transition-all cursor-pointer ${dis ? "opacity-30 cursor-not-allowed" : ""}`}>再来</button>
            <button disabled={dis} className={`px-3 py-1 rounded-[50px] text-[12px] bg-black text-white font-[400] transition-all cursor-pointer ${dis ? "opacity-30 cursor-not-allowed" : ""}`}>下一句</button>
          </div>
        </div>

        {/* Row 2: speed pills */}
        <div className="flex items-center gap-2 pb-1">
          <MonoLabel size="sm" className="text-black/30">SPEED</MonoLabel>
          <div className="flex items-center gap-1">
            {SPEEDS.map((s) => (
              <SpeedPill key={s} value={s} active={speed === s} onClick={() => onSpeedChange(s)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
