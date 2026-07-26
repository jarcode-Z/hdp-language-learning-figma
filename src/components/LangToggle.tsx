import { useI18n } from "../i18n";

export default function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex items-center gap-0.5 shrink-0">
      {(["zh", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-0.5 rounded-[50px] text-[11px] font-mono uppercase tracking-wide transition-all cursor-pointer ${
            lang === l ? "bg-black text-white" : "text-black/35 hover:text-black"
          }`}
        >
          {l === "zh" ? "中" : "EN"}
        </button>
      ))}
    </div>
  );
}
