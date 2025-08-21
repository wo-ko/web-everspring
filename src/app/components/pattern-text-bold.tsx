
export default function PatternTextBorder(props: {
  text: string;
  customClass?: string;
}) {
  return (
    <div className={'font-bold'}>
      {props.text}
    </div>
  )
}