import { useState, useRef } from "react";
import Button from "./Button";


type ProfileUploaderProps = {
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

function ProfileUploader({title, setOpen, image, setImage}: ProfileUploaderProps) {
  const [preview, setPreview] = useState("");
  const InputRef = useRef<HTMLInputElement>(null);
  const [scale, setScale] = useState(1);
  
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(file){
      setPreview(URL.createObjectURL(file))
    }
  };

  return (
    <div className="bg-black/40 inset-0 fixed flex justify-center items-center">
      <div className="flex bg-white w-[40%] items-center flex-col relative px-9 pt-5 rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} onClick={()=>setOpen(false)} stroke="currentColor" className="size-6 text-gray-400 relative rounded ml-auto  hover:bg-gray-100 active:bg-gray-200">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

        <p className="px-1 pb-5 text-xl text-left text-medium font-bold">{title}</p>
        <div className="border-t w-full pb-8 h-1 border-gray-300" />
        
        <div className="flex justify-center">
          <input type="file"
            ref={InputRef}
            className="hidden"
            onChange={changeHandler}
          />

          {preview ?
            <div className="flex flex-col items-center"> 
              <div className="w-35 h-35 overflow-hidden rounded-2xl">
                <img style={{ transform: `scale(${scale})` }} onClick={() => InputRef.current?.click()} src={preview} alt="logo" className="w-full h-full object-cover rounded-2xl hover:border-2 hover:border-blue-500 active:border-2 active:border-blue-700"/>
              </div>
              
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5 text-gray-620">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>

                <input type="range" min={1} max={2} step={0.01} value={scale} onChange={(event)=>setScale(Number(event.target.value))} />

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>

              </div>
            </div>
            :
            <div onClick={() => InputRef.current?.click()} className="w-35 h-35 bg-gray-100 rounded-2xl flex justify-center items-center hover:border-2 hover:border-blue-500 active:border-2 active:border-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          }
        </div>

        <Button type="button" className="w-40"
          onClick={()=>{
            setImage(preview);
            setOpen(false);
          }} 
        >Save</Button>
      </div>
    </div>
  )
}

export default ProfileUploader;