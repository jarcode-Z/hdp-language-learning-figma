interface VideoPanelProps {
  disabled?: boolean;
}

export default function VideoPanel({ disabled = false }: VideoPanelProps) {
  return (
    <div className="relative w-full md:h-full aspect-video md:aspect-auto bg-black overflow-hidden">
      {/* Simulated colorful video content — the only color in the UI */}
      <div
        className="absolute inset-0"
        style={{
          background: disabled
            ? "#111"
            : "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%)",
        }}
      />

      {/* Simulated video frame content */}
      {!disabled && (
        <>
          {/* Subtitles overlay */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center px-8">
            <div className="bg-black/60 rounded px-3 py-1.5 max-w-[90%]">
              <p className="text-white text-[15px] text-center font-[330] leading-snug" style={{ letterSpacing: "-0.1px" }}>
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>

          {/* Play indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
            <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-white ml-1" />
            </div>
          </div>

          {/* Time indicator */}
          <div className="absolute bottom-3 right-4">
            <span className="text-white/50 text-[11px] font-mono">0:42 / 3:17</span>
          </div>
        </>
      )}

      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/30 text-[13px] font-mono uppercase tracking-wider">No media loaded</p>
        </div>
      )}
    </div>
  );
}
