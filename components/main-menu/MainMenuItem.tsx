import { FC, ReactElement } from "react";

type MainMenuItemProps = {
  label: string;
  icon?: ReactElement;
  onClick?: () => void;
};

export const MainMenuItem: FC<MainMenuItemProps> = ({
  label,
  icon,
  onClick,
}) => {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="hover:bg-slate-100 px-2 py-1 hover:cursor-pointer flex gap-1 items-center active:bg-slate-200 rounded-sm"
    >
      {icon && icon}
      <span className="font-bold">{label}</span>
    </button>
  );
};
