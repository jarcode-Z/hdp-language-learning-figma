import { useState } from "react";
import MonoLabel from "./MonoLabel";
import PillButton from "./PillButton";
import LangToggle from "./LangToggle";
import { useI18n } from "../i18n";

type ImportStep =
  | "select-video"
  | "playable"
  | "attach-subtitle"
  | "asr-progress"
  | "progress"
  | "complete";

type ProgressState = "success" | "subtitle-failure" | "asr-failure";
type AsrPhase = "downloading" | "transcribing";

const STEPS: ImportStep[] = [
  "select-video",
  "playable",
  "attach-subtitle",
  "asr-progress",
  "progress",
  "complete",
];

// Steps shown in the top indicator bar (asr-progress is inline, not a separate dot)
const INDICATOR_STEPS: ImportStep[] = [
  "select-video",
  "playable",
  "attach-subtitle",
  "progress",
  "complete",
];

interface ImportProps {
  onBack: () => void;
  onComplete: (title: string) => void;
}

function ReadinessRow({ label, done, active }: { label: string; done: boolean; active: boolean }) {
  return (
    <div className={`flex items-center gap-3 py-2 transition-opacity ${active || done ? "opacity-100" : "opacity-30"}`}>
      <div
        className={`w-3 h-3 rounded-full border-2 transition-all shrink-0 ${
          done ? "bg-black border-black" : active ? "border-black bg-transparent" : "border-black/30 bg-transparent"
        }`}
      />
      <MonoLabel size="sm" className={done || active ? "text-black" : "text-black/40"}>
        {label}
      </MonoLabel>
    </div>
  );
}

export default function Import({ onBack, onComplete }: ImportProps) {
  const { t } = useI18n();
  const [step, setStep] = useState<ImportStep>("select-video");
  const [progressState, setProgressState] = useState<ProgressState>("success");
  const [asrPhase, setAsrPhase] = useState<AsrPhase>("downloading");
  const [videoName] = useState("hotel_checkin_dialogue.mp4");
  const [subtitleName] = useState("hotel_checkin_dialogue.srt");

  // Index into INDICATOR_STEPS for the progress dots
  const indicatorIndex = INDICATOR_STEPS.indexOf(
    step === "asr-progress" ? "attach-subtitle" : step
  );

  const advance = () => {
    const idx = STEPS.indexOf(step);
    const next = STEPS[idx + 1];
    if (next) setStep(next);
  };

  const stepLabels: Partial<Record<ImportStep, string>> = {
    "select-video": t.step_selectVideo,
    "playable": t.step_playable,
    "attach-subtitle": t.step_attachSubtitle,
    "progress": t.step_progress,
    "complete": t.step_complete,
  };

  return (
    <div className="flex flex-col h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Top bar */}
      <div className="flex items-center h-12 px-5 border-b border-black/10 shrink-0 gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-black/40 hover:text-black transition-colors text-[13px] cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <MonoLabel size="sm" className="text-current">{t.backToLibrary}</MonoLabel>
        </button>

        <div className="w-px h-4 bg-black/10" />
        <MonoLabel size="sm" className="text-black/50">{t.importTitle}</MonoLabel>

        {/* Step indicators */}
        <div className="hidden sm:flex items-center gap-2 ml-4">
          {INDICATOR_STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 ${i <= indicatorIndex ? "opacity-100" : "opacity-25"}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${i <= indicatorIndex ? "bg-black" : "bg-black/30"}`} />
                <span className="text-[11px] font-mono text-black/50 uppercase tracking-wide hidden md:inline">
                  {stepLabels[s]}
                </span>
              </div>
              {i < INDICATOR_STEPS.length - 1 && (
                <div className={`w-8 h-px ${i < indicatorIndex ? "bg-black/30" : "bg-black/10"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="ml-auto">
          <LangToggle />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex items-start justify-center px-6 md:px-8 pt-10 md:pt-12 pb-8">
        <div className="w-full max-w-lg">

          {/* Step 1: Select video */}
          {step === "select-video" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[22px] font-[540] text-black" style={{ letterSpacing: "-0.3px" }}>
                  {t.selectVideoTitle}
                </h2>
                <p className="mt-1.5 text-[14px] text-black/45 font-[330]" style={{ letterSpacing: "-0.1px" }}>
                  {t.selectVideoHint}
                </p>
              </div>
              <div
                className="border-2 border-dashed border-black/20 rounded-lg flex flex-col items-center justify-center gap-3 py-16 px-8 cursor-pointer hover:border-black/40 transition-colors"
                onClick={advance}
              >
                <div className="w-10 h-10 rounded-full bg-black/6 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 3v9M5 7l4-4 4 4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 14h14" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-[13px] text-black/40 font-[330]">{t.dropOrSelect}</p>
                <PillButton variant="black" size="sm" onClick={(e) => { e.stopPropagation(); advance(); }}>
                  {t.selectFile}
                </PillButton>
              </div>
            </div>
          )}

          {/* Step 2: Playable */}
          {step === "playable" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[22px] font-[540] text-black" style={{ letterSpacing: "-0.3px" }}>
                  {t.videoReadyTitle}
                </h2>
                <p className="mt-1.5 text-[14px] text-black/45 font-[330]" style={{ letterSpacing: "-0.1px" }}>
                  {t.videoReadyHint}
                </p>
              </div>
              <div
                className="w-full aspect-video rounded-lg overflow-hidden relative"
                style={{ background: "linear-gradient(135deg,#1a1a2e,#533483)" }}
              >
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <div className="bg-black/60 rounded px-3 py-1">
                    <span className="text-white/70 text-[12px] font-mono">0:00 / 3:17</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                <span className="text-[13px] text-black/60 font-mono">{videoName}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <PillButton variant="black" size="sm" onClick={advance}>
                  {t.nextAttachSubtitle}
                </PillButton>
                <PillButton variant="ghost" size="sm" onClick={() => onComplete("Hotel Check-in Dialogue")}>
                  {t.skipPractice}
                </PillButton>
              </div>
            </div>
          )}

          {/* Step 3: Attach subtitle — two-column layout */}
          {step === "attach-subtitle" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[22px] font-[540] text-black" style={{ letterSpacing: "-0.3px" }}>
                  {t.attachSubtitleTitle}
                </h2>
                <p className="mt-1.5 text-[14px] text-black/45 font-[330]" style={{ letterSpacing: "-0.1px" }}>
                  {t.attachSubtitleHint}
                </p>
              </div>

              {/* Two-column: upload vs generate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left: upload subtitle file */}
                <div
                  className="border-2 border-dashed border-black/20 rounded-lg flex flex-col items-center justify-center gap-3 py-10 px-6 cursor-pointer hover:border-black/40 transition-colors"
                  onClick={advance}
                >
                  <div className="w-9 h-9 rounded-full bg-black/6 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="2" width="12" height="12" rx="2" stroke="#000" strokeWidth="1.4"/>
                      <path d="M5 6h6M5 9h4" stroke="#000" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-[450] text-black" style={{ letterSpacing: "-0.1px" }}>
                      {t.selectSubtitleFile}
                    </p>
                    <p className="text-[11px] font-mono text-black/35 uppercase tracking-wide mt-1">.SRT / .VTT</p>
                  </div>
                  <PillButton variant="black" size="sm" onClick={(e) => { e.stopPropagation(); advance(); }}>
                    {t.selectSubtitleFile}
                  </PillButton>
                </div>

                {/* Right: generate via Local ASR */}
                <div
                  className="border-2 border-dashed border-black/15 rounded-lg flex flex-col items-center justify-center gap-3 py-10 px-6 cursor-pointer hover:border-black/35 transition-colors"
                  onClick={() => { setAsrPhase("downloading"); setStep("asr-progress"); }}
                >
                  <div className="w-9 h-9 rounded-full bg-black/6 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v8M5 7l3 3 3-3" stroke="#000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 12a2 2 0 002 2h6a2 2 0 002-2" stroke="#000" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] font-[450] text-black" style={{ letterSpacing: "-0.1px" }}>
                      {t.generateSubtitle}
                    </p>
                    <MonoLabel size="sm" className="text-black/35 mt-1">{t.localAsr}</MonoLabel>
                  </div>
                  <PillButton
                    variant="white"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); setAsrPhase("downloading"); setStep("asr-progress"); }}
                  >
                    {t.generateSubtitle}
                  </PillButton>
                </div>
              </div>

              <div className="flex items-center gap-3 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-black/30" />
                <span className="text-[13px] text-black/40 font-[330]">{videoName}</span>
              </div>
            </div>
          )}

          {/* Step 3b: ASR Progress */}
          {step === "asr-progress" && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-[22px] font-[540] text-black" style={{ letterSpacing: "-0.3px" }}>
                  {t.generateSubtitle}
                </h2>
                <p className="mt-1.5 text-[14px] text-black/45 font-[330]" style={{ letterSpacing: "-0.1px" }}>
                  {t.localAsr}
                </p>
              </div>

              {/* Honest phase indicator */}
              <div className="flex flex-col gap-3 px-1">
                <div className={`flex items-center gap-3 py-2 transition-opacity ${asrPhase === "downloading" ? "opacity-100" : "opacity-40"}`}>
                  <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${asrPhase === "downloading" ? "border-black bg-transparent animate-pulse" : "bg-black border-black"}`} />
                  <MonoLabel size="sm" className="text-black">
                    {t.asrDownloadingModel}
                  </MonoLabel>
                </div>
                <div className={`flex items-center gap-3 py-2 transition-opacity ${asrPhase === "transcribing" ? "opacity-100" : "opacity-30"}`}>
                  <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${asrPhase === "transcribing" ? "border-black bg-transparent animate-pulse" : "border-black/30"}`} />
                  <MonoLabel size="sm" className={asrPhase === "transcribing" ? "text-black" : "text-black/40"}>
                    {t.asrTranscribing}
                  </MonoLabel>
                </div>
              </div>

              {/* Mock phase switcher */}
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-black/35 font-mono">{t.simulate}:</span>
                {(["downloading", "transcribing"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setAsrPhase(p)}
                    className={`px-3 py-0.5 rounded-[50px] text-[11px] font-mono cursor-pointer transition-all ${asrPhase === p ? "bg-black text-white" : "border border-black/20 text-black/50"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {/* Complete ASR → go to progress */}
                <PillButton variant="black" size="sm" onClick={() => { setProgressState("success"); advance(); }}>
                  {t.viewResult}
                </PillButton>
                {/* Cancel → back to attach-subtitle */}
                <PillButton variant="ghost" size="sm" onClick={() => setStep("attach-subtitle")}>
                  {t.asrCancel}
                </PillButton>
              </div>
            </div>
          )}

          {/* Step 4: ReadyProgress */}
          {step === "progress" && (
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-[22px] font-[540] text-black" style={{ letterSpacing: "-0.3px" }}>
                  {t.processingTitle}
                </h2>
              </div>

              {/* Readiness visualization */}
              <div className="flex flex-col gap-1 px-1">
                <ReadinessRow label={`${t.playable} — ${t.step_playable}`} done active={false} />
                <ReadinessRow
                  label={`${t.readable} — ${t.step_attachSubtitle}`}
                  done={progressState === "success"}
                  active={progressState !== "success"}
                />
                <ReadinessRow label={`${t.shadowable} — ${t.step_progress}`} done={false} active={false} />
              </div>

              {/* Failure messages */}
              {progressState === "subtitle-failure" && (
                <div className="border border-black/15 rounded-lg px-4 py-3">
                  <p className="text-[13px] text-black/70 font-[330]" style={{ letterSpacing: "-0.1px" }}>
                    {t.processingFailure}
                  </p>
                </div>
              )}
              {progressState === "asr-failure" && (
                <div className="border border-black/15 rounded-lg px-4 py-3">
                  <p className="text-[13px] text-black/70 font-[330]" style={{ letterSpacing: "-0.1px" }}>
                    {t.asrFailure}
                  </p>
                </div>
              )}

              {/* Mock state switcher */}
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-[12px] text-black/35 font-mono">{t.simulate}:</span>
                {(["success", "subtitle-failure", "asr-failure"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setProgressState(s)}
                    className={`px-3 py-0.5 rounded-[50px] text-[11px] font-mono cursor-pointer transition-all ${progressState === s ? "bg-black text-white" : "border border-black/20 text-black/50"}`}
                  >
                    {s}
                  </button>
                ))}
                <PillButton variant="black" size="sm" onClick={advance}>
                  {progressState === "success" ? t.viewResult : t.retry}
                </PillButton>
              </div>
            </div>
          )}

          {/* Step 5: Complete */}
          {step === "complete" && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-[22px] font-[540] text-black" style={{ letterSpacing: "-0.3px" }}>
                  {t.completeTitle}
                </h2>
                <p className="mt-1.5 text-[14px] text-black/45 font-[330]" style={{ letterSpacing: "-0.1px" }}>
                  {t.completeHint}
                </p>
              </div>
              <div className="flex flex-col gap-1 px-1">
                <ReadinessRow label={`${t.playable} — ${t.step_playable}`} done active={false} />
                <ReadinessRow label={`${t.readable} — ${t.step_attachSubtitle}`} done active={false} />
                <ReadinessRow label={`${t.shadowable} — ${t.step_progress}`} done active={false} />
              </div>
              <div className="flex items-center gap-2 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                <span className="text-[13px] text-black/55 font-mono">{videoName}</span>
                <span className="text-black/20">·</span>
                <span className="text-[13px] text-black/55 font-mono">{subtitleName}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <PillButton variant="black" size="md" onClick={() => onComplete("Hotel Check-in Dialogue")}>
                  {t.startPractice}
                </PillButton>
                <PillButton variant="ghost" size="md" onClick={onBack}>
                  {t.backToLib}
                </PillButton>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
