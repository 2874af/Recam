import type { Section } from "../pages2/ShowPage";

type MenuDialogProps ={
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  choice: string;
  onClick: (id:string) => void;
  photo: boolean;
  video: boolean;
  floor: boolean;
  vr: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  sections: Section[];
  edit: boolean;
}

function MenuDialog({setMenu, choice, onClick, photo, video, floor, vr, setEdit, sections, edit}:MenuDialogProps){
  return (
    <div className="fixed inset-0 bg-black/40 flex z-100">
      <div className="h-full w-50 bg-white flex flex-col items-center py-7 gap-2">
        <button onClick={()=>{
          setEdit(true);
          setMenu(false);
        }} className={`bg-black text-white flex items-center justify-center rounded-2xl py-2 gap-1 w-30 text-xs hover:bg-gray-700 active:bg-gray-500 ${edit ? "hidden" : "block"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>

          <span>Edit</span>
        </button>

        <button onClick={()=>{
          setEdit(false);
          setMenu(false);
        }} className={`bg-black text-white flex items-center justify-center rounded-2xl py-2 gap-1 w-30 text-xs hover:bg-gray-700 active:bg-gray-500 ${edit ? "block" : "hidden"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
          <span>Exit</span>
        </button>

        <button className="bg-black text-white flex items-center justify-center rounded-2xl py-2 gap-1 w-30 text-xs hover:bg-gray-700 active:bg-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
          </svg>
          <span>Preview</span>
        </button>

        <button className="border-2 border-black flex items-center justify-center rounded-2xl py-1.5 gap-1 w-30 text-xs hover:bg-gray-200 active:bg-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
          </svg>

          <span>Copy Link</span>
        </button>

        <button className="border-2 border-black flex items-center justify-center rounded-2xl py-1.5 gap-1 w-30 text-xs hover:bg-gray-200 active:bg-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
          </svg>
          <span>Publish</span>
        </button>

        <div className="flex flex-col mt-6 gap-2">
          {sections.map((section, index)=>(
            <div key={index}>
              {section.id === "description" &&
                <div onClick={()=>onClick("description")} id="description" className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
                  choice === "description"
                    ? "bg-gray-200"
                    : "bg-white"
                }`}>
                  <span>Description</span>
                </div>
              }

              {photo && section.id === "photo" &&
                <div onClick={()=>onClick("photo")} id="photo" className={`w-34 flex justify-center items-center rounded-lg hover:bg-gray-200 active:bg-gray-300 py-1 ${
                  choice === "photo"
                    ? "bg-gray-200"
                    : "bg-white"
                }`}>
                  <span>Photography</span>
                </div>
              }

              {floor && section.id === "floor" &&
                <div onClick={()=>onClick("floor")} id="floor" className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
                  choice === "floor"
                    ? "bg-gray-200"
                    : "bg-white"
                }`}>
                  <span>Floor Plan</span>
                </div>
              }

              {video && section.id === "video" &&
                <div onClick={()=>onClick("video")} id="video" className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
                  choice === "video"
                    ? "bg-gray-200"
                    : "bg-white"
                }`}>
                  <span>Videography</span>
                </div>
              }

              {vr && section.id === "vr" &&
                <div onClick={()=>onClick("vr")} id="vr" className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
                  choice === "video"
                    ? "bg-gray-200"
                    : "bg-white"
                }`}>
                  <span>VR</span>
                </div>
              }

              {section.id === "location" &&
                <div onClick={()=>onClick("location")} id="location" className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
                  choice === "location"
                    ? "bg-gray-200"
                    : "bg-white"
                }`}>
                  <span>Location</span>
                </div>
              }

              {section.id === "contact" &&
                <div onClick={()=>onClick("contact")} id="contact" className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
                  choice === "contact"
                    ? "bg-gray-200"
                    : "bg-white"
                }`}>
                  <span>Contact</span>
                </div>
              }
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 h-full" onClick={()=>setMenu(false)} />

    </div>
  )
}

export default MenuDialog;

