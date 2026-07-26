import { useState } from "react";
import TopBar from "./TopBar";
import VideoPanel from "./VideoPanel";
import TranscriptPanel, { CueLine } from "./TranscriptPanel";
import BottomBar from "./BottomBar";
import MonoLabel from "./MonoLabel";
import { useI18n } from "../i18n";

type DeskState = "default" | "cue-highlight" | "speed" | "recording" | "compare" | "playable-only" | "readable-only";

const MOCK_CUES: CueLine[] = [
  { id: 1, text: "Good morning. I'd like to check in, please.", translation: "早上好，我想办理入住手续。", startTime: 0 },
  { id: 2, text: "Of course. Do you have a reservation?", translation: "当然可以，您有预订吗？", startTime: 5 },
  { id: 3, text: "Yes, my name is Sarah Chen. I booked a room for three nights.", translation: "是的，我叫陈莎拉，我预订了三晚。", startTime: 10 },
  { id: 4, text: "Let me pull up your reservation. One moment, please.", translation: "让我查一下您的预订，请稍候。", startTime: 16 },
  { id: 5, text: "I've found it. You're in room 412, a deluxe queen on the fourth floor.", translation: "找到了，您住在412房间，四楼的豪华大床房。", startTime: 22 },
  { id: 6, text: "That sounds wonderful. Is breakfast included?", translation: "听起来很好，包括早餐吗？", startTime: 29 },
  { id: 7, text: "Yes, breakfast is served daily from six to ten in the restaurant on the ground floor.", translation: "是的，早餐每天六点到十点在一楼餐厅供应。", startTime: 34 },
  { id: 8, text: "Perfect. Could I also get a late checkout, perhaps until two?", translation: "太好了，我能申请延迟退房到下午两点吗？", startTime: 42 },
];

interface PracticeDeskProps {
  materialTitle?: string;
  onBack?: () => void;
}

export default function PracticeDesk({ materialTitle = "Hotel Check-in Dialogue", onBack }: PracticeDeskProps) {
  const { t } = useI18n();
  const STATES: { id: DeskState; label: string }[] = [
    { id: "default", label: t.stateDefault },
    { id: "cue-highlight", label: t.stateCueHighlight },
    { id: "speed", label: t.stateSpeed },
    { id: "recording", label: t.stateRecording },
    { id: "compare", label: t.stateCompare },
    { id: "playable-only", label: t.statePlayableOnly },
    { id: "readable-only", label: t.stateReadableOnly },
  ];
  const [deskState, setDeskState] = useState<DeskState>("default");
  const [activeCueId, setActiveCueId] = useState(4);
  const [speed, setSpeed] = useState(0.85);
  const [isRecording, setIsRecording] = useState(false);
  const [compareMode, setCompareMode] = useState<"original" | "mine">("original");

  // Derived flags from desk state
  const transcriptDisabled = deskState === "playable-only";
  const showTranslation = deskState === "default" || deskState === "cue-highlight" || deskState === "readable-only";
  const isRecordingActive = deskState === "recording" || isRecording;
  const readyState =
    deskState === "playable-only" ? "playable"
    : deskState === "readable-only" ? "readable"
    : "shadowable";

  // Sync recording state with deskState
  const handleStateChange = (s: DeskState) => {
    setDeskState(s);
    setIsRecording(s === "recording");
    if (s === "compare") setCompareMode("original");
  };

  return (
    <div
      className="flex flex-col"
      style={{ height: "100vh", minHeight: 0, fontFamily: "var(--font-sans)" }}
    >
      {/* State switcher — for design review only */}
      <div className="flex items-center gap-1 px-5 py-2 border-b border-black/8 bg-black/[0.02] shrink-0 overflow-x-auto">
        <MonoLabel size="sm" className="text-black/30 mr-2 shrink-0">{t.state}</MonoLabel>
        {STATES.map((s) => (
          <button
            key={s.id}
            onClick={() => handleStateChange(s.id)}
            className={`px-3 py-0.5 rounded-[50px] text-[11px] font-mono transition-all cursor-pointer shrink-0 ${
              deskState === s.id
                ? "bg-black text-white"
                : "text-black/40 hover:text-black border border-transparent hover:border-black/20"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Top bar */}
      <TopBar
        materialTitle={materialTitle}
        readyState={readyState}
        onBack={onBack}
      />

      {/* Main content area — desktop: side-by-side | mobile: video top, transcript below */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* Video: full-width on mobile, 55% on desktop */}
        <div className="shrink-0 md:w-[55%] w-full">
          <VideoPanel disabled={false} />
        </div>

        {/* Transcript: flex-1 on desktop, fixed height on mobile */}
        <div className="flex-1 min-h-0 min-w-0 md:border-l border-l-0 border-t md:border-t-0 border-black/10">
          <TranscriptPanel
            cues={MOCK_CUES}
            activeCueId={activeCueId}
            showTranslation={showTranslation}
            disabled={transcriptDisabled}
            onCueClick={(id) => {
              if (!transcriptDisabled) setActiveCueId(id);
            }}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <BottomBar
        speed={speed}
        onSpeedChange={setSpeed}
        isRecording={isRecordingActive}
        onRecord={() => {
          setIsRecording((r) => !r);
          if (deskState !== "recording") setDeskState("recording");
          else setDeskState("default");
        }}
        compareMode={compareMode}
        onCompareToggle={() =>
          setCompareMode((m) => (m === "original" ? "mine" : "original"))
        }
        disabled={transcriptDisabled}
      />
    </div>
  );
}
