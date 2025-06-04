import { useThemeContext } from '@app/context/theme-context';

export default function PatternTextBorder(props: {
  text: string;
  customClass?: string;
}) {
  // const { themeColor } = useThemeContext();
  return (
    <div className={'font-bold'}>
      {props.text}
    </div>
  )
}