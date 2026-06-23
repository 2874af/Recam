type InforBlockProps = {
  icon: React.ReactNode;
  num: number;
  item: string;
}

function InforBlock2({icon, num, item}:InforBlockProps){
  return (
    <div className="flex flex-col items-center rounded-full w-15 h-15 justify-center text-gray-400 text-xs gap-2 sm:text-gray-200">
      <div className="border-2 border-gray-400 rounded-full flex justify-center items-center px-2 py-2 sm:border-gray-200">
        {icon}
      </div>

      <span>{`${num} ${item}${num > 1 ? "s" : ""}`}</span>

    </div>
  )
}

export default InforBlock2;