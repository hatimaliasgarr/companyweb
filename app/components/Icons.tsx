import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type IconComponent = (props: IconProps) => ReactNode;
type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & { size?: number; strokeWidth?: number };

function icon(glyph: string) {
  return function Icon({ size = 20, className = "", style, strokeWidth, ...props }: IconProps) {
    void strokeWidth;
    const merged: CSSProperties = { fontSize: size, ...style };
    return <span className={`icon-glyph ${className}`} style={merged} aria-hidden="true" {...props}>{glyph}</span>;
  };
}

export const ArrowRight = icon("→");
export const ArrowLeft = icon("←");
export const ArrowDown = icon("↓");
export const MoveUpRight = icon("↗");
export const Check = icon("✓");
export const Menu = icon("≡");
export const X = icon("×");
export const CircleDot = icon("◉");
export const Compass = icon("⌖");
export const Globe2 = icon("◎");
export const Network = icon("⌘");
export const Rocket = icon("↟");
export const MessagesSquare = icon("••");
export const Code2 = icon("</>");
export const ShieldCheck = icon("◇");
export const Braces = icon("{ }");
export const Palette = icon("◒");
export const Boxes = icon("▦");
export const Megaphone = icon("◢");
export const Search = icon("⌕");
export const Bot = icon("✦");
export const BarChart3 = icon("▥");
export const Gauge = icon("◴");
export const Layers3 = icon("≋");
export const LineChart = icon("⌁");
export const ShoppingBag = icon("□");
export const Sparkles = icon("✦");
export const Workflow = icon("⌘");
export const Clock3 = icon("◷");
export const Linkedin = icon("in");
export const Instagram = icon("◎");
export const Github = icon("GH");
export const Whatsapp = icon("WA");

export function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
