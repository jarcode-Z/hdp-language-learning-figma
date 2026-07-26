import React from "react";

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "black" | "white" | "ghost";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export default function PillButton({
  variant = "black",
  size = "md",
  children,
  className = "",
  ...props
}: PillButtonProps) {
  const base = "inline-flex items-center justify-center rounded-[50px] font-sans font-normal transition-opacity cursor-pointer select-none";

  const sizeClass = size === "sm"
    ? "px-4 py-1.5 text-[13px]"
    : "px-5 py-2 text-[15px]";

  const variantClass = {
    black: "bg-black text-white hover:opacity-80",
    white: "bg-white text-black border border-black hover:opacity-80",
    ghost: "bg-transparent text-black border border-black/20 hover:border-black/40",
  }[variant];

  return (
    <button
      className={`${base} ${sizeClass} ${variantClass} ${className}`}
      style={{ letterSpacing: "-0.14px" }}
      {...props}
    >
      {children}
    </button>
  );
}
