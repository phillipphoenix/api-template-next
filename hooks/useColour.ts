import { useMemo } from "react";

const colours = {
  // Slate.
  "slate-50": "#f8fafc",
  "slate-100": "#f1f5f9",
  "slate-200": "#e2e8f0",
  "slate-300": "#cbd5e1",
  "slate-400": "#94a3b8",
  "slate-500": "#64748b",
  "slate-600": "#475569",
  "slate-700": "#334155",
  "slate-800": "#1e293b",
  "slate-900": "#0f172a",
};

export const useColour = (
  colour?: keyof typeof colours | string,
  colourDark?: keyof typeof colours | string,
  isDark: boolean = false
) => {
  const selectedColourName = useMemo(
    () => (isDark ? colourDark : colour),
    [colour, colourDark, isDark]
  );

  if (!selectedColourName) {
    console.warn("useColour failed to return colour as it wasn't defined.");
    return undefined;
  }

  return colours[selectedColourName as keyof typeof colours];
};
