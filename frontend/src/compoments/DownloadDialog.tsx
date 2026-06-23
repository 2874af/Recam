import { useState } from "react";

type DownloadDialog = {
  setDownload: React.Dispatch<React.SetStateAction<boolean>>;
  pnum: number;
  wnum: number;
  fnum: number;
  vnum: number;
}

function DownloadDialog({setDownload, pnum, wnum, fnum, vnum}:DownloadDialog){
  const [pphoto, setPphoto] = useState(false);
  const [wphoto, setWphoto] = useState(false);
  const [floor, setFloor] = useState(false);
  const [video, setVideo] = useState(false);

  return (
    <div className="inset-0 fixed bg-black/40 flex justify-center">
      <div className="bg-white w-[365px] mt-20 rounded-xl py-3 px-3 flex flex-col items-center h-90">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>setDownload(false)} className="size-5 text-gray-400 rounded ml-auto hover:bg-gray-100 active:bg-gray-200">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

        <div className="w-full flex justify-center my-5">
          <span className="text-xl font-bold">Download</span>
        </div>

        <div className="flex flex-col w-full pl-4 gap-4 text-sm">
          <div className="flex gap-2 items-center">
            <input type="checkbox" checked={pphoto} onChange={event=>setPphoto(event.target.checked)} className="w-5 h-5" />
            <label>{`Print Quality Photography (${pnum})`}</label>
          </div>

          <div className="flex gap-2 items-center">
            <input type="checkbox" checked={wphoto} onChange={event=>setWphoto(event.target.checked)} className="w-5 h-5" />
            <label>{`Web Quality Photography (${wnum})`}</label>
          </div>

          <div className="flex gap-2 items-center">
            <input type="checkbox" checked={floor} onChange={event=>setFloor(event.target.checked)} className="w-5 h-5" />
            <label>{`Floor Plan (${fnum})`}</label>
          </div>

          <div className="flex gap-2 items-center">
            <input type="checkbox" checked={video} onChange={event=>setVideo(event.target.checked)} className="w-5 h-5" />
            <label>{`Videography (${vnum})`}</label>
          </div>
        </div>

        <div className="flex w-full px-4 mt-20">
          <div className="flex gap-2 items-center">
            <input type="checkbox" checked={video && floor && pphoto && wphoto} onChange={(event)=>{
              setVideo(event.target.checked);
              setPphoto(event.target.checked);
              setWphoto(event.target.checked);
              setFloor(event.target.checked);
            }} className="w-5 h-5" />
            <label>Select All</label>
          </div>

          <button onClick={()=>setDownload(true)} className="bg-black text-white text-sm flex gap-2 rounded-2xl py-1 px-3 items-center ml-auto hover:bg-gray-300 active:bg-gray-500 sm:bg-blue-500 sm:py-1.5 sm:hover:bg-blue-600 sm:active:bg-blue-700">
            <svg className="w-4 h-4" viewBox="0 0 14 14" fill="white" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_25_62)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.00008 0.729126C3.5368 0.729126 0.729248 3.53667 0.729248 6.99996C0.729248 10.4633 3.5368 13.2708 7.00008 13.2708C10.4634 13.2708 13.2709 10.4633 13.2709 6.99996C13.2709 3.53667 10.4634 0.729126 7.00008 0.729126ZM7.58342 4.08329C7.58342 3.76113 7.32226 3.49996 7.00008 3.49996C6.67791 3.49996 6.41675 3.76113 6.41675 4.08329V5.83329H5.54175C5.30581 5.83329 5.09311 5.97545 5.00282 6.19338C4.91253 6.41138 4.96244 6.66227 5.12927 6.8291L6.58761 8.28743C6.8154 8.51529 7.18476 8.51529 7.41256 8.28743L8.87089 6.8291C9.03772 6.66227 9.08766 6.41138 8.99736 6.19338C8.90706 5.97545 8.69437 5.83329 8.45842 5.83329H7.58342V4.08329ZM5.24438 9.04163C4.92222 9.04163 4.66105 9.30278 4.66105 9.62496C4.66105 9.94713 4.92222 10.2083 5.24438 10.2083H8.74437C9.06654 10.2083 9.3277 9.94713 9.3277 9.62496C9.3277 9.30278 9.06654 9.04163 8.74437 9.04163H5.24438Z" fill="white"/>
              </g>
              <defs>
              <clipPath id="clip0_25_62">
              <rect width="14" height="14" fill="white"/>
              </clipPath>
              </defs>
            </svg>

            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DownloadDialog;