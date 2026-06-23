type InforBlockProps = {
  tag: string;
  icon: React.ReactNode;
  item: number;
  setItem: React.Dispatch<React.SetStateAction<number>>

}

function InforBlock3({tag, icon, item, setItem}: InforBlockProps){
  return (
    <div className="flex items-center justify-center bg-gray-100 rounded-lg gap-1.5 px-3 w-37 h-12">
      {icon}
      <span className="text-sm">{tag}</span>

      <div className="flex gap-1 border border-gray-200 bg-white h-7 rounded-sm">
        <button onClick={()=>setItem(item-1)} disabled={item <= 0} className="flex items-center justify-center text-sm hover:bg-gray-300 active:bg-gray-400 disabled:text-gray-400 disabled:pointer-events-none w-4">-</button>
        <div className="w-5 flex justify-center items-center text-sm">{item}</div>
        <button onClick={()=>setItem(item+1)} className="flex items-center justify-center text-sm hover:bg-gray-300 active:bg-gray-400 w-4">+</button>
      </div>
    </div>
  )
}

export default InforBlock3;