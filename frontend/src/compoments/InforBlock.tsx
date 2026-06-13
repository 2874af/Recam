type InforBlockProps = {
  tag: string;
  icon: React.ReactNode;
  item: number;
  setItem: React.Dispatch<React.SetStateAction<number>>

}

function InforBlock({tag, icon, item, setItem}: InforBlockProps){
  return (
    <div className="flex items-center bg-gray-100 rounded-2xl gap-3 w-55 h-16 px-5">
      {icon}
      <span className="text-lg">{tag}</span>

      <div className="flex gap-1 ml-auto border border-gray-200 bg-white h-8.5 rounded-sm">
        <button onClick={()=>setItem(item-1)} disabled={item <= 0} className="hover:bg-gray-300 active:bg-gray-400 disabled:text-gray-400 disabled:pointer-events-none w-6">-</button>
        <div className="w-6 flex justify-center items-center">{item}</div>
        <button onClick={()=>setItem(item+1)} className="hover:bg-gray-300 active:bg-gray-400 w-6">+</button>
      </div>
    </div>
  )
}

export default InforBlock