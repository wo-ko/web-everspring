
export default function TextTitle(props: { text?: string }) {
  return (
    <h2 className="font-black pt-3">
      {props?.text}
    </h2>
  )
}