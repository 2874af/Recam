import { useState } from "react";


type PhotoDisplayDialogProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: string[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function PhotoDisplayDialog({setOpen, list, page, setPage}:PhotoDisplayDialogProps){


  return (
    <div className="bg-black/40 inset-0 fixed px-6 py-20 flex flex-col lg:px-30">
      <div className="mb-4 sm:mt-20 sm:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={()=>setOpen(false)} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white/90 ml-auto hover:text-white/60 active:text-white/40">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>

      <div className="w-full flex items-center gap-3 mt-11 sm:mt-8">
        <div className="w-8 h-8">
          {page > 0 && 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={()=>setPage(prev => prev - 1)} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white/90 hover:text-white/60 active:text-white/40">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
          }
        </div>

        <div className="flex-1 h-80 flex justify-center items-center lg:h-100">
          <img src={list[page]} alt="photo" className="w-full h-full object-contain" />
        </div>

        <div className="w-8 h-8">
          {page < list.length - 1 && 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={()=>setPage(prev => prev + 1)} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white/90 hover:text-white/60 active:text-white/40">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          }
        </div>

      </div>

      <div className="w-full justify-center flex sm:mt-8">
        <span className="text-white/90 text-lg sm:text-2xl">{`${page + 1} / ${list.length}`}</span>
      </div>
    </div>
  )
}

export default PhotoDisplayDialog;