type BlockProps ={
  icon: React.ReactNode;
  tag: string;
  className?: string;
  classNameDiv: string;
  onClick?: ()=>void;
  num: number;
  save?: boolean
  
}

function ServiceBlock2({icon, tag, className, classNameDiv, onClick, num, save}: BlockProps){
  return (
    <div className={`pt-6 px-4 pb-4 h-34 relative flex flex-col rounded-lg justify-center items-center w-[16%] ${classNameDiv}`} onClick={onClick}>
      {num > 0 && 
        <div className="rounded-full w-8 h-8 absolute text-white font-bold flex justify-center items-center bg-blue-500 -right-2 -top-3">
          {num}
        </div>
      }

      {save && 
        <div className="rounded-full w-10 h-10 absolute -right-2.5 -top-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
        </div>
      }

      <div className="flex justify-center py-5 w-full">
        {icon}
      </div>
      <span className={`text-xs font-bold ${className}`}>{tag}</span>
    </div>
  )
}

export default ServiceBlock2;