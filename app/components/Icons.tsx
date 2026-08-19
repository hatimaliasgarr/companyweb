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
