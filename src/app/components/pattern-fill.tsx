import { useThemeContext } from '@app/context/theme-context';
import clsx from 'clsx';

export default function PatternFill(props: {
  text: string;
  customClass?: string;
}) {
  // const { themeColor } = useThemeContext();
  return (
    <p
      // style={{ backgroundColor: themeColor }}
      className={clsx('whitespace-pre-line', props.customClass)}>
      {props.text}
    </p>
  )
}