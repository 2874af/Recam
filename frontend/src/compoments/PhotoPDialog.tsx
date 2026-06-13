import { useRef, useState } from "react";
import Button from "./Button";
import { FolderUp } from 'lucide-react';

type PhotoPDialogProps = {
  pp: File[];
  setPp: React.Dispatch<React.SetStateAction<File[]>>;
  setPpsuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setPpopen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PhotoPDialog({pp, setPp, setPpsuccess, setPpopen}:PhotoPDialogProps){

  const InputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<File[]>(pp);
  const [dragging, setDragging] = useState(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from((event.target.files || []));
    setPreview(pre => [...pre, ...selected])
  }

 
  const dragOverHandler = (event: React.DragEvent)=>{
    event.preventDefault();
  }

  const dropHandler = (event:React.DragEvent)=>{
    event.preventDefault();
    setDragging(false);
    const dropped = Array.from(event.dataTransfer.files);
    
    setPreview(prev=>[...prev, ...dropped])
  }

  return (
    <div className="inset-0 fixed bg-black/40 flex justify-center items-center">
      <div className="flex flex-col bg-white w-230 rounded-2xl px-13 pt-6 pb-7">
        <div className="flex">
          <span className="text-2xl font-bold">Upload Photography-P</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>setPpopen(false)} className="size-6 text-gray-400 rounded ml-auto  hover:bg-gray-100 active:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

          <div className="border-t border-gray-300 h-1 my-6"></div>
          
          <div 
            className={`flex flex-col items-center gap-6 rounded-2xl py-5 border-2 ${
              dragging ? " border-blue-500 bg-gray-300" : " border-gray-300"
            }`}
            onDrop={dropHandler} 
            onDragOver={dragOverHandler}
            onDragEnter={()=>setDragging(true)}
            onDragLeave={()=>setDragging(false)}
          >
          <input type="file" className="hidden" ref={InputRef} onChange={changeHandler} multiple accept="image/*"/>
          <span className="text-xl font-bold">Drop your images here to upload</span>
          <Button className="flex items-center gap-3 w-60 justify-center" onClick={()=>InputRef.current?.click()}>
            <FolderUp />
            Choose Files
          </Button>
         </div>

         {preview && (
          <div className="grid grid-cols-4 gap-4 mt-6 justify-items-center h-90 overflow-auto">
            {preview.map((file, index) => (
              <div key={index} className="w-45 group">
                <div className="w-full relative">
                  <img src={URL.createObjectURL(file)} alt="photo-w" className="w-full h-35 object-cover"/>
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 flex justify-center items-center group-hover:opacity-70">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-15 text-white" onClick={()=>{
                      setPreview(prev => prev.filter((_, i)=>(i !== index)));
                    }}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <p className="truncate w-full">{file.name}</p>
              </div>
            ))}
          </div>
         )}

         <div className="border-t border-gray-300 h-1 mb-6"></div>

         <div className="flex">
          <div className="bg-gray-200 py-3 px-6 rounded-2xl flex gap-2">
            <span className="font-bold">{preview.length}</span>
            <span className="text-gray-400">images</span>
          </div>

          <Button className="w-40 ml-auto" onClick={()=>{
              setPp(preview);
              setPpopen(false);
              setPpsuccess(true);
            }}>Upload</Button>
         </div>

      </div>
    </div>
  )
}

export default PhotoPDialog;