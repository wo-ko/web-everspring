
export default function TextInBlock(props: { text?: string }) {
  return (
    <div className="flex flex-col items-center gap-12 my-8 ">
      <div className="whitespace-pre-line rounded-lg p-4 px-6 shadow-sm max-w-xl text-center border border-gray-300 bg-transparent">
        {props?.text}
      </div>
    </div>
  )
}