import clsx from 'clsx';

export default function Paragraph(props: {
  text: string;
  customClass?: string;
}) {
  // const { themeColor } = useThemeContext();
  // indent-4
  return (
    <p
      className={clsx('whitespace-pre-line py-2 px-4', props.customClass)}
      >
      {props.text}
    </p>
  )
}