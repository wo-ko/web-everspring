import { IBtnColorPickerProps } from "@app/types/lang.type";

export default function BtnColorPicker({
  color,
  changeThemeColor,
}: IBtnColorPickerProps) {
  const handleClick = () => {
    // @ts-expect-error: changeThemeColor อาจมี type mismatch
    changeThemeColor(color);
  };

  return (
    <button
      className="w-4 h-4 bg-black rounded-full"
      onClick={handleClick}
      style={{ backgroundColor: color }}
    />
  );
}
