import { useState } from "react";
import type { Selector } from "../pages2/ShowPage";
import VideoDetail from "./VideoDetail";


type DialogProps = {
  setSelectv: React.Dispatch<React.SetStateAction<boolean>>;
  ovideo: Selector[];
  setOvideo: React.Dispatch<React.SetStateAction<Selector[]>>;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string[]>>;
}


function SelectVideoDialog({setSelectv, ovideo, setOvideo, setSelectedVideo}:DialogProps){
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  const picker = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newOfloor = ovideo.map((v, i) => (
      i === index
        ?
          {...v, isSelected: event.target.checked}
        :
          v
    ))

    setOvideo(newOfloor);
  }

  const finalPicker = () => {
    const newSelectedVideo = ovideo.filter(v =>(
      v.isSelected === true
    )).map(v => v.url);

    setSelectedVideo(newSelectedVideo);
  }

  const selectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    var newSelectedVideo = [...ovideo];

    if (checked === false){
      newSelectedVideo = ovideo.map(v => (
        {url: v.url, isSelected: false}
      ));
    } else {
      newSelectedVideo = ovideo.map(v => (
        {url: v.url, isSelected: true}
      ));
    }

    setOvideo(newSelectedVideo);
  }


  return (
    <div className="flex inset-0 fixed bg-black/40 justify-center items-center z-100">
      {open && <VideoDetail list={ovideo} page={page} setPage={setPage} setOpen={setOpen} picker={picker} />}
      <div className="flex flex-col bg-white w-[95%] rounded-2xl mt-13 h-[80vh] px-8 pb-5 pt-14 overflow-auto relative sm:w-[55%] sm:h-[85%]">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Select Display Video</span>
          <span className="text-gray-500 text-[10px] sm:text-xs">Please select videos to be displayed on the first page.</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>setSelectv(false)} className="size-6 text-gray-400 rounded absolute top-4 right-6  hover:bg-gray-100 active:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="border-t border-gray-300 h-1 mt-4 mb-2"></div>

        <div className="grid grid-cols-3 content-start px-1 gap-3 justify-between overflow-auto h-[75%] sm:grid-cols-5 sm:gap-3 sm:px-3 sm:pt-6">
          {ovideo.map((v, index) => (
            <div key={index} className="aspect-square sm:px-3 sm:py-3 sm:hover:bg-gray-200 relative rounded-lg">
              <input type="checkbox" className="absolute w-4 h-4 right-1 top-1 sm:right-4 sm:top-4 z-50" checked={v.isSelected === true} onChange={(event)=>{picker(index, event)}} />
              <img src={v.url} alt="photo" className="w-full h-full object-cover rounded-lg" onClick={()=>{
                setOpen(true);
                setPage(index);
              }} />

              {v.isSelected === false && (
                <div className="absolute inset-0 sm:inset-3 bg-black/40 rounded-lg" onClick={()=>{
                setOpen(true);
                setPage(index);
              }} />
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 h-1 mb-4"></div>

        <div className="flex items-center gap-2 px-2 sm:hidden">
          <input type="checkbox" checked={ovideo.every(v => v.isSelected === true)} onChange={(event)=>selectAll(event)} className="w-4 h-4" />
          <label className="text-sm">Select All</label>

          <div className="bg-gray-200 px-3 flex items-center rounded-lg py-1 gap-1.5 ml-auto">
            <span className="font-bold text-sm">{`${ovideo.filter(v => v.isSelected === true).length} / ${ovideo.length}`}</span>
            <span className="text-gray-400 text-sm">selected</span>
          </div>
        </div>


        <div className="flex gap-2 w-full mt-4 sm:mt-0 sm:px-4">
          <div className="hidden sm:flex items-center gap-2 px-2">
            <input type="checkbox" checked={ovideo.every(v => v.isSelected === true)} onChange={(event)=>selectAll(event)} className="w-4 h-4" />
            <label className="text-sm sm:font-bold">Select All</label>

            <div className="bg-gray-200 px-3 flex items-center rounded-lg py-1 gap-1.5 ml-auto sm:ml-4">
              <span className="font-bold text-sm">{`${ovideo.filter(v => v.isSelected === true).length} / ${ovideo.length}`}</span>
              <span className="text-gray-400 text-sm">selected</span>
            </div>
          </div>

          <button onClick={()=>setSelectv(false)} className="border-2 border-black ml-auto flex justify-center w-24 py-1 rounded-4xl font-bold hover:bg-gray-200 active:bg-gray-300">
            Cancel
          </button>

          <button 
            className="bg-black text-white w-24 flex justify-center py-1 rounded-4xl font-bold hover:bg-gray-700 active:bg-gray-600 sm:bg-blue-500 sm:hover:bg-blue-600 sm:active:bg-blue-700"
            onClick={()=>{
              setSelectv(false);
              finalPicker();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectVideoDialog;