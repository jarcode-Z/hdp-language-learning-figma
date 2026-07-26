import { useState } from "react";
import MonoLabel from "./MonoLabel";
import ReadyStateBadge from "./ReadyStateBadge";
import PillButton from "./PillButton";
import IconButton from "./IconButton";
import LangToggle from "./LangToggle";
import { useI18n } from "../i18n";

type LibraryState = "empty" | "populated" | "with-stats";

interface MaterialItem {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  readyState: "playable" | "readable" | "shadowable";
  builtin: boolean;
  progress?: number; // sentences practiced
  thumb: string; // gradient css string
}

const BUILTIN: MaterialItem[] = [
  {
    id: 1,
    title: "Hotel Check-in Dialogue",
    subtitle: "Everyday English · Beginner",
    duration: "3:17",
    readyState: "shadowable",
    builtin: true,
    progress: 24,
    thumb: "linear-gradient(135deg,#1a1a2e,#533483)",
  },
  {
    id: 2,
    title: "Coffee Shop Order",
    subtitle: "Everyday English · Beginner",
    duration: "1:52",
    readyState: "readable",
    builtin: true,
    progress: 0,
    thumb: "linear-gradient(135deg,#16213e,#0f3460)",
  },
];

const LOCAL: MaterialItem[] = [
  {
    id: 3,
    title: "TED Talk: The Power of Vulnerability",
    subtitle: "Imported · 2026-07-18",
    duration: "20:14",
    readyState: "shadowable",
    builtin: false,
    progress: 61,
    thumb: "linear-gradient(135deg,#3a0ca3,#e94560)",
  },
  {
    id: 4,
    title: "BBC News Clip — Climate Summit",
    subtitle: "Imported · 2026-07-15",
    duration: "4:33",
    readyState: "playable",
    builtin: false,
    progress: 0,
    thumb: "linear-gradient(135deg,#023e8a,#0096c7)",
  },
];

const STATES: { id: LibraryState; label: string }[] = [
  { id: "empty", label: "Empty" },
  { id: "populated", label: "Populated" },
  { id: "with-stats", label: "With Stats" },
];

interface LibraryProps {
  onPractice: (id: number, title: string) => void;
  onImport: () => void;
}

// Pencil SVG icon
function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" />
    </svg>
  );
}

// Trash SVG icon
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.8 7.2A1 1 0 003.8 12h6.4a1 1 0 001-.8L12 4" />
    </svg>
  );
}

function DeleteModal({ title, onConfirm, onCancel }: { title: string; onConfirm: () => void; onCancel: () => void }) {
  const { t } = useI18n();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-[16px] shadow-2xl p-6 w-[320px] max-w-[90vw] flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-[16px] font-[540] text-black" style={{ letterSpacing: "-0.15px" }}>
            {t.deleteConfirmTitle}
          </p>
          <p className="mt-1.5 text-[13px] text-black/55 font-[330] leading-relaxed">
            「{title}」
          </p>
          <p className="mt-1 text-[13px] text-black/45 font-[330]">{t.deleteConfirmBody}</p>
        </div>
        <div className="flex gap-2 justify-end">
          <PillButton variant="white" size="sm" onClick={onCancel}>{t.cancelAction}</PillButton>
          <PillButton variant="black" size="sm" onClick={onConfirm}>{t.deleteConfirmAction}</PillButton>
        </div>
      </div>
    </div>
  );
}

function MaterialRow({
  item,
  showStats,
  onPractice,
  onDelete,
  practiceLabel,
  resumeLabel,
}: {
  item: MaterialItem;
  showStats: boolean;
  onPractice: () => void;
  onDelete?: () => void;
  practiceLabel: string;
  resumeLabel: string;
}) {
  const { t } = useI18n();
  const canEdit = !item.builtin && item.readyState !== "playable";
  const canDelete = !item.builtin;

  return (
    <div className="flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 border-b border-black/6 hover:bg-black/[0.02] transition-colors group cursor-pointer">
      <div
        className="w-12 h-8 md:w-14 md:h-10 rounded-[4px] shrink-0"
        style={{ background: item.thumb }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-[450] text-black leading-snug truncate" style={{ letterSpacing: "-0.1px" }}>
          {item.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="hidden sm:inline text-[12px] text-black/40 font-[330]">{item.subtitle}</span>
          <span className="hidden sm:inline text-black/20">·</span>
          <span className="text-[12px] text-black/40 font-mono">{item.duration}</span>
          {showStats && item.progress != null && item.progress > 0 && (
            <>
              <span className="text-black/20">·</span>
              <span className="text-[11px] text-black/35 font-mono">{item.progress} s</span>
            </>
          )}
        </div>
      </div>
      {/* ReadyState badge */}
      <div className="shrink-0">
        <ReadyStateBadge state={item.readyState} />
      </div>
      {/* Edit (pencil) — only for local items with cues */}
      {canEdit && (
        <IconButton
          variant="glass"
          size="sm"
          title={t.editSubtitle}
          aria-label={t.editSubtitle}
          onClick={(e) => e.stopPropagation()}
        >
          <PencilIcon />
        </IconButton>
      )}
      {/* Delete (trash) — only for local items */}
      {canDelete && (
        <IconButton
          variant="glass"
          size="sm"
          title={t.deleteItem}
          aria-label={t.deleteItem}
          onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
        >
          <TrashIcon />
        </IconButton>
      )}
      {/* Practice CTA */}
      <div className="shrink-0">
        <PillButton variant="black" size="sm" onClick={(e) => { e.stopPropagation(); onPractice(); }}>
          {showStats && (item.progress ?? 0) > 0 ? resumeLabel : practiceLabel}
        </PillButton>
      </div>
    </div>
  );
}

export default function Library({ onPractice, onImport }: LibraryProps) {
  const [libState, setLibState] = useState<LibraryState>("populated");
  const [localItems, setLocalItems] = useState<MaterialItem[]>(LOCAL);
  const [deleteTarget, setDeleteTarget] = useState<MaterialItem | null>(null);
  const { t } = useI18n();

  const showStats = libState === "with-stats";
  const showLocal = libState !== "empty";

  function confirmDelete() {
    if (deleteTarget) {
      setLocalItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  }

  return (
    <div className="flex flex-col h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {/* State switcher */}
      <div className="flex items-center gap-1 px-5 py-2 border-b border-black/8 bg-black/[0.02] shrink-0">
        <MonoLabel size="sm" className="text-black/30 mr-2 shrink-0">STATE</MonoLabel>
        {STATES.map((s) => (
          <button
            key={s.id}
            onClick={() => setLibState(s.id)}
            className={`px-3 py-0.5 rounded-[50px] text-[11px] font-mono transition-all cursor-pointer shrink-0 ${
              libState === s.id
                ? "bg-black text-white"
                : "text-black/40 hover:text-black border border-transparent hover:border-black/20"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-5 pt-3 md:pt-0 md:h-14 border-b border-black/10 shrink-0 gap-2 pb-3 md:pb-0">
        <span className="text-[18px] md:text-[20px] font-[700] text-black" style={{ letterSpacing: "-0.3px" }}>
          {t.appName}
        </span>

        {showStats && (
          <div className="flex items-center gap-4 md:gap-6">
            {[
              { label: t.todaySentences, value: "47" },
              { label: t.practiceTime, value: "28 min" },
              { label: t.streak, value: "5 d" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-start md:items-end">
                <span className="text-[16px] md:text-[18px] font-[540] text-black" style={{ letterSpacing: "-0.2px" }}>{stat.value}</span>
                <MonoLabel size="sm" className="text-black/35">{stat.label}</MonoLabel>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <LangToggle />
          <PillButton variant="black" size="sm" onClick={onImport}>
            {t.importMaterial}
          </PillButton>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Curated / Builtin section */}
        <div>
          <div className="flex items-center gap-3 px-5 pt-5 pb-2">
            <MonoLabel size="sm" className="text-black/35">{t.curatedMaterials}</MonoLabel>
            <div className="flex-1 h-px bg-black/8" />
          </div>
          {BUILTIN.map((item) => (
            <MaterialRow
              key={item.id}
              item={item}
              showStats={showStats}
              onPractice={() => onPractice(item.id, item.title)}
              practiceLabel={t.practice}
              resumeLabel={t.resume}
            />
          ))}
        </div>

        {/* Local / imported section */}
        {showLocal ? (
          <div>
            <div className="flex items-center gap-3 px-5 pt-5 pb-2">
              <MonoLabel size="sm" className="text-black/35">{t.myMaterials}</MonoLabel>
              <div className="flex-1 h-px bg-black/8" />
            </div>
            {localItems.map((item) => (
              <MaterialRow
                key={item.id}
                item={item}
                showStats={showStats}
                onPractice={() => onPractice(item.id, item.title)}
                onDelete={() => setDeleteTarget(item)}
                practiceLabel={t.practice}
                resumeLabel={t.resume}
              />
            ))}
          </div>
        ) : (
          <div className="px-5 pt-5 pb-2">
            <div className="flex items-center gap-3 mb-4">
              <MonoLabel size="sm" className="text-black/35">{t.myMaterials}</MonoLabel>
              <div className="flex-1 h-px bg-black/8" />
            </div>
            <div className="flex flex-col items-start gap-3 py-8 px-1">
              <p className="text-[14px] text-black/35 font-[330]" style={{ letterSpacing: "-0.1px" }}>
                {t.noMaterialHint}
              </p>
              <PillButton variant="white" size="sm" onClick={onImport}>
                {t.importMaterial}
              </PillButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
