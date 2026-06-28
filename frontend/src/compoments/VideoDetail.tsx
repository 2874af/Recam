import type { Selector } from "../pages2/ShowPage";


type DialogProps = {
  list: Selector[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  picker: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
}

function VideoDetail({list, page, setPage, setOpen, picker}: DialogProps){

  return (
    <div className="bg-black inset-0 fixed flex flex-col z-150 pb-8 sm:bg-black/80 sm:pb-25">
      <div className="px-6 py-6 sm:mb-10 sm:pt-10 sm:px-15">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={()=>setOpen(false)} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white/90 ml-auto hover:text-white/60 active:text-white/40">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>

      {list.map((v, index)=>(
        <div key={index} onClick={()=>setPage(index)} className={`h-100 flex justify-center relative items-center ${
          page === index
            ? "block"
            : "hidden"
        }`}>
          <img src={v.url} alt="photo" className="w-full h-full object-contain" />
          <input type="checkbox" checked={v.isSelected === true} className="absolute right-5 top-4 w-8 h-8 sm:right-60 sm:top-4" onChange={(event)=>{picker(index, event)}} />
        </div>
      ))}

      <div className="w-full flex justify-center mt-auto">
        <div className="sm:w-150 px-2 w-full overflow-auto scrollbar-none">
          <div className="flex gap-2 items-center min-w-full w-max justify-center">
            {list.map((v, index)=>(
              <div key={index} onClick={()=>setPage(index)} className={`relative shrink-0 ${
                page === index
                  ? "w-17 h-17 rounded-xs border-3 border-white"
                  : "w-14 h-14"
              }`}>
                <img src={v.url} alt="photo" className="w-full h-full object-cover" />

                {v.isSelected === true &&
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-green-400 absolute top-0.5 right-0.5 sm:-top-1.5 sm:-right-1.5 sm:z-100">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                }

                {page !== index &&
                  <div className="inset-0 absolute bg-black/40 hover:opacity-0">
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full mt-4 justify-center gap-7">
        <button className="text-white border border-white px-4 py-1 text-xs rounded-2xl flex items-center gap-1 hover:bg-gray-800 active:bg-gray-500 sm:py-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-white">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
          </svg>
          <span>Download Video</span>
        </button>
      </div>

    </div>
  )
}

export default VideoDetail;