'use client';
import { useThemeContext } from '@app/context/theme-context'
import BtnChangeLanguage from "./btn-change-language"
import BtnColorPicker from "./btn-color-picker"

export default function Title() {
  const { changeThemeColor1 } = useThemeContext();
  return (
    <div className='px-16 py-2 grid grid-cols-3'>
      <div>
        <div>
          Everspring Agrochem Co.,Ltd.
        </div>
        <div>
          บริษัท เอเวอร์สปริง อโกรเคม จำกัด
        </div>
      </div>
      <div className='flex justify-center items-center'>
        Logo
      </div>
      <div className='flex justify-between items-center'>
        <div>
          02-363-8560
        </div>
        <div className='grid grid-cols-3 gap-2 items-center align-middle justify-items-center'>
          <BtnColorPicker color={'#888'} />
          <BtnColorPicker color='#FF0000' />
          <BtnColorPicker color='#00FF00' />
        </div>
        <div>
          <BtnChangeLanguage />
        </div>
      </div>
    </div>
  )
}