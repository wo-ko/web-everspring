import clsx from 'clsx';

export default function PatternFill(props: {
  text: string;
  customClass?: string;
}) {
  return (
    <p
      className={clsx('whitespace-pre-line', props.customClass)}>
      {props.text}
    </p>
  )
}