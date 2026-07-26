interface TranscriptLineProps {
  text: string;
  translation?: string;
  status: "done" | "active" | "upcoming";
  showTranslation?: boolean;
  onClick?: () => void;
}

export default function TranscriptLine({
  text,
  translation,
  status,
  showTranslation = false,
  onClick,
}: TranscriptLineProps) {
  const textStyle = {
    done: "text-black/25 font-[330]",
    active: "text-black font-[540]",
    upcoming: "text-black/60 font-[330]",
  }[status];

  const paddingClass = status === "active" ? "py-4" : "py-2.5";

  return (
    <div
      onClick={onClick}
      className={`relative pl-5 pr-3 ${paddingClass} cursor-pointer transition-all`}
    >
      {/* Left indicator bar for active line */}
      <div
        className={`absolute left-0 top-3 bottom-3 w-[2px] rounded-full transition-all ${
          status === "active" ? "bg-black" : "bg-transparent"
        }`}
      />

      <p
        className={`text-[18px] leading-[1.72] transition-all ${textStyle}`}
        style={{ letterSpacing: "-0.1px" }}
      >
        {text}
      </p>

      {showTranslation && translation && status === "active" && (
        <p
          className="mt-2 text-[13px] text-black/45 font-[330] leading-relaxed"
          style={{ letterSpacing: "-0.05px" }}
        >
          {translation}
        </p>
      )}
    </div>
  );
}
