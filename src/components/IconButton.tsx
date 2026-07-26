import React from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "glass" | "black" | "white";
  size?: "sm" | "md" | "lg";
  active?: boolean;
  children: React.ReactNode;
}

export default function IconButton({
  variant = "glass",
  size = "md",
  active = false,
  children,
  className = "",
  ...props
}: IconButtonProps) {
  const sizeClass = { sm: "w-8 h-8 text-[14px]", md: "w-10 h-10 text-[16px]", lg: "w-12 h-12 text-[18px]" }[size];

  const variantClass = active
    ? "bg-black text-white"
    : {
        glass: "bg-black/8 text-black hover:bg-black/12",
        black: "bg-black text-white hover:opacity-80",
        white: "bg-white text-black border border-black/20 hover:border-black/40",
      }[variant];

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full transition-all cursor-pointer select-none ${sizeClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
