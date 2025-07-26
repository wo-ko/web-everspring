
export default function ImageFull(props: { image?: string }) {
  return (
    <div className="justify-items-center">
      <img src={props?.image||''} alt="" />
    </div>
  )
}