interface MonoLabelProps {
  children: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}

export default function MonoLabel({ children, size = "md", className = "" }: MonoLabelProps) {
  const sizeClass = size === "sm"
    ? "text-[11px] tracking-[0.6px]"
    : "text-[13px] tracking-[0.54px]";

  return (
    <span
      className={`font-mono uppercase font-normal ${sizeClass} ${className}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {children}
    </span>
  );
}
