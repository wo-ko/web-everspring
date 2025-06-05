import { ThemeContext, useThemeContext } from "@app/context/theme-context";
import { IBtnColorPickerProps } from "@app/types/lang.type";
import { useContext } from "react";

export default function BtnColorPicker({
  color,
  changeThemeColor,
}: IBtnColorPickerProps) {
  const handleClick = () => {
    // changeThemeColor();
  };

  return (
    <button
      className="w-4 h-4 bg-black rounded-full"
      onClick={handleClick}
      style={{ backgroundColor: color }}
    />
  );
}
