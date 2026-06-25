import { useEffect, useState } from "react";
import CoverDetail from "./CoverDetail";


type DialogProps = {
  setSelectc: React.Dispatch<React.SetStateAction<boolean>>;
  photo: string[];
  video:string[];
  setCover: React.Dispatch<React.SetStateAction<string>>;
  cover: string;
}

export type MixedSelector = {
  url: string;
  type: "photo" | "video";
}

function SelectCoverDialog({setSelectc, photo, setCover, video, cover}:DialogProps){
  const [reserve, setReserve] = useState(cover);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [photoVideo, setPhotoVideo] = useState<MixedSelector[]>([])

  useEffect(()=>{
    const photos = photo.map(p => (
      {url: p, type: "photo" as const}
    ));

    const videos = video.map(v => (
      {url: v, type: "video" as const}
    ));

    setPhotoVideo([...videos, ...photos,]);
  },[])

  return (
    <div className="flex inset-0 fixed bg-black/40 justify-center items-center z-100">
      {open && <CoverDetail list={photoVideo} page={page} setPage={setPage} setOpen={setOpen} reserve={reserve} setReserve={setReserve} />}
      <div className="flex flex-col bg-white w-[95%] rounded-2xl mt-13 h-[80vh] px-8 pb-5 pt-14 overflow-auto relative sm:w-[55%] sm:h-[85%]">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Hero Media</span>
          <span className="text-gray-500 text-[10px] sm:text-xs">Please select <span className="font-bold">ONE</span> cover media to be displayed on the first page.</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>setSelectc(false)} className="size-6 text-gray-400 rounded absolute top-4 right-6  hover:bg-gray-100 active:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="border-t border-gray-300 h-1 mt-4 mb-2"></div>

        <div className="grid grid-cols-3 content-start gap-3 justify-between px-1 overflow-auto h-[75%] sm:grid-cols-5 sm:gap-3 sm:px-3 sm:pt-6">
          {photoVideo.map((p, index) => (
            <div key={index} className="aspect-square sm:px-3 sm:py-3 sm:hover:bg-gray-200 relative rounded-lg">
              <input type="radio" value={p.url} onChange={(event)=>{setReserve(event.target.value)}} name="coverPage" className="absolute w-4 h-4 right-1 top-1 sm:right-4 sm:top-4 z-50" checked={reserve === p.url} />
              <img src={p.url} alt="photo" className="w-full h-full object-cover rounded-lg" onClick={()=>{
                setOpen(true);
                setPage(index);
              }} />

              {reserve !== p.url && (
                <div className="absolute inset-0 sm:inset-3 bg-black/40 rounded-lg" onClick={()=>{
                setOpen(true);
                setPage(index);
              }} />
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 h-1 mb-4"></div>


        <div className="flex gap-2 w-full">
          <button onClick={()=>setSelectc(false)} className="border-2 border-black ml-auto flex justify-center w-24 py-1 rounded-4xl font-bold hover:bg-gray-200 active:bg-gray-300">
            Cancel
          </button>

          <button 
            className="bg-black text-white w-24 flex justify-center py-1 rounded-4xl font-bold hover:bg-gray-700 active:bg-gray-600 sm:bg-blue-500 sm:hover:bg-blue-600 sm:active:bg-blue-700"
            onClick={()=>{
              setCover(reserve);
              setSelectc(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectCoverDialog;