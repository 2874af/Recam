import { useState } from "react";
import Button from "./Button";


type ConfirmEmailDialogProps = {
  setCemail: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConfirmEmailDialog({setCemail}:ConfirmEmailDialogProps){
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");


  return (
    <div className="inset-0 fixed bg-black/40 flex items-center justify-center">
      <div className="flex flex-col bg-white w-[60%] rounded-2xl px-8 py-6">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>setCemail(false)} className="size-6 text-gray-400 rounded ml-auto  hover:bg-gray-100 active:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="flex">
          <span className="text-2xl font-bold">Confirmation Email</span>
        </div>

        <div className="border-t border-gray-300 h-1 mt-3 mb-4"></div>

        <div className="flex items-center gap-6">
          <div className="rounded-sm border w-12 h-9 flex justify-center items-center ml-2">
            <span className="text-lg">To</span>
          </div>

          <input placeholder="Alex Green (alexgreen@gmail.com)" value={to} onChange={(event)=>setTo(event.target.value)}
            className="focus:outline-none focus:placeholder:opacity-0 w-[85%] h-12 text-xl"
          />
        </div>

        <div className="border-t border-gray-300 h-1  my-4"></div>

        <div className="flex items-center gap-6">
          <div className="rounded-sm border w-12 h-9 flex justify-center items-center ml-2">
            <span className="text-lg">CC</span>
          </div>

          <input placeholder="alexgreen@gmail.com" value={cc} onChange={(event)=>setCc(event.target.value)}
            className="focus:outline-none focus:placeholder:opacity-0 w-[85%] h-12 text-xl"
          />
        </div>

        <div className="border-t border-gray-300 h-1 mt-4 mb-2"></div>
          <input placeholder="Add a subject" value={subject} onChange={(event)=>setSubject(event.target.value)}
            className="focus:outline-none focus:placeholder:opacity-0 w-[85%] h-12 text-xl font-bold"
          />
        <div className="border-t border-gray-300 h-1 mt-2 mb-4"></div>
          <textarea placeholder="Type to add more content" value={content} onChange={(event)=>setContent(event.target.value)}
            className="focus:outline-none focus:placeholder:opacity-0 text-xl font-bold w-full h-70"
          />

        <div className="border-t border-gray-300 h-1 mt-2 mb-6"></div>
        <div className="flex">
          <Button className="ml-auto w-30">Confirm</Button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmEmailDialog;