import type { FC } from "react";
import { useMemo } from "react";
import { useColour } from "../../../hooks/useColour";

export type TailSpinProps = {
  size?: "sm" | "md" | "lg";
  colour?: string;
};

/**
 * <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
 */
export const TailSpin: FC<TailSpinProps> = ({ size = "md", colour }) => {
  const actualColour = useColour(colour);
  const setColour = useMemo(() => actualColour || "#fff", [actualColour]);
  const sizeClassName = useMemo(() => {
    switch (size) {
      case "md":
        return "scale-[2]";
      case "lg":
        return "scale-[3]";
      case "sm":
      default:
        return "";
    }
  }, [size]);

  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      className={sizeClassName}
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor={setColour} stopOpacity="0" offset="0%" />
          <stop stopColor={setColour} stopOpacity=".631" offset="63.146%" />
          <stop stopColor={setColour} offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="url(#a)"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill={setColour} cx="36" cy="18" r="1">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
};
