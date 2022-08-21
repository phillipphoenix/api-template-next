import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import { useClassnames } from "../../../hooks/useClassnames";

type ButtonColourScheme = "primary" | "secondary" | "danger" | "success";
type Size = "xs" | "sm" | "md" | "lg";
type AnimationVariant = "default" | "scale";

const buttonColourSchemes: Record<ButtonColourScheme, string> = {
  primary:
    "bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-300 disabled:bg-blue-200",
  secondary:
    "bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-300 disabled:bg-gray-200",
  danger:
    "bg-red-500 hover:bg-red-600 text-white focus:ring-red-300 disabled:bg-red-200",
  success:
    "bg-lime-500 hover:bg-lime-600 text-white focus:ring-lime-300 disabled:bg-lime-200",
};

const sizes: Record<Size, string> = {
  xs: "px-2 py-1 text-sm",
  sm: "px-2 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-8 py-4 text-xl",
};

const animationVariants: Record<AnimationVariant, string> = {
  default: "transition-colors transition-bg duration-200",
  scale:
    "transition-colors transition-bg duration-100 transition-transform hover:scale-105",
};

export type ButtonProps = {
  children: string | ReactNode;
  colourScheme?: ButtonColourScheme;
  size?: Size;
  animationVariant?: AnimationVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  children,
  colourScheme = "primary",
  size = "md",
  animationVariant = "default",
  className,
  ...restBtnProps
}) => {
  const colourSchemeClassnames = useClassnames(
    colourScheme,
    buttonColourSchemes
  );

  const sizeClassnames = useClassnames(size, sizes);

  const animationVariantClassnames = useClassnames(
    animationVariant,
    animationVariants
  );

  const fullClassnames = useMemo(
    () =>
      colourSchemeClassnames +
      " " +
      sizeClassnames +
      " " +
      animationVariantClassnames +
      " " +
      className,
    [
      colourSchemeClassnames,
      sizeClassnames,
      animationVariantClassnames,
      className,
    ]
  );

  return (
    <button
      {...restBtnProps}
      className={`transform cursor-pointer rounded-md font-medium capitalize tracking-wide focus:outline-none focus:ring focus:ring-opacity-80 disabled:cursor-default ${fullClassnames}`}
    >
      {children}
    </button>
  );
};
