import type { CSSProperties } from "react";

type Props = {
  name: string;
  fill?: boolean;
  style?: CSSProperties;
  className?: string;
};

export default function MsIcon({ name, fill, style, className }: Props) {
  const cls = ["ms", fill ? "msf" : "", className || ""].filter(Boolean).join(" ");
  return (
    <span className={cls} style={style}>
      {name}
    </span>
  );
}
