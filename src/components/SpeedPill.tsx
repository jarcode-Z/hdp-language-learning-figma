interface SpeedPillProps {
  value: number;
  active: boolean;
  onClick: () => void;
}

export default function SpeedPill({ value, active, onClick }: SpeedPillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center rounded-[50px] px-3 py-1
        text-[12px] font-mono font-normal transition-all cursor-pointer select-none
        ${active
          ? "bg-black text-white"
          : "bg-transparent text-black border border-black/20 hover:border-black/60"
        }
      `}
      style={{ letterSpacing: "0.3px", minWidth: "3rem" }}
    >
      {value.toFixed(2).replace(/\.?0+$/, "") || value}×
    </button>
  );
}
