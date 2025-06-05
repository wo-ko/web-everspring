"use client";
import { useThemeContext } from "@app/context/theme-context";
import BtnChangeLanguage from "./btn-change-language";
import BtnColorPicker from "./btn-color-picker";

export default function Title() {
  const { changeThemeColor1 } = useThemeContext();
  return (
    <div className="px-16 py-2 grid grid-cols-3">
      <div>
        <div>Everspring Agrochem Co.,Ltd.</div>
        <div>บริษัท เอเวอร์สปริง อโกรเคม จำกัด</div>
      </div>
      <div className="flex justify-center items-center">
        {/* Logo */}
        <img
          src="https://res.cloudinary.com/dyg6r8pec/image/upload/w_130,h_100,c_fit/v1749023798/logo_everspring-01-Photoroom_lq2qb3.png"
          alt="Logo"
        />
      </div>
      <div className="flex justify-between items-center">
        <div>02-363-8560</div>
        <div className="grid grid-cols-3 gap-2 items-center align-middle justify-items-center">
          {/* <BtnColorPicker color={"#D9D9D9"} />
          <BtnColorPicker color="#323296" />
          <BtnColorPicker color="#009646" /> */}
          <BtnColorPicker
            color={"#D9D9D9"}
            changeThemeColor={changeThemeColor1}
          />
          <BtnColorPicker
            color="#323296"
            changeThemeColor={changeThemeColor1}
          />
          <BtnColorPicker
            color="#009646"
            changeThemeColor={changeThemeColor1}
          />
        </div>
        <div>
          <BtnChangeLanguage />
        </div>
      </div>
    </div>
  );
}
