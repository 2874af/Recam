import { useState } from "react";

type DescriptionDialogProps ={
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDes: React.Dispatch<React.SetStateAction<boolean>>;
}

function DescriptionDialog({setDes, setDescription, description}:DescriptionDialogProps){
  const [describe, setDescribe] = useState(description);

  return (
    <div className="fixed inset-0 bg-black/40 justify-center items-center flex z-100">
      <div className="flex flex-col bg-white w-[95%] rounded-2xl h-[80vh] px-8 pb-5 pt-14 overflow-auto relative sm:w-180">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Property Description</span>
          <span className="text-gray-500 text-[10px]">Please describe the key features and highlights the property.</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>setDes(false)} className="size-6 text-gray-400 rounded absolute top-4 right-6  hover:bg-gray-100 active:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="border-t border-gray-300 h-1 my-7"></div>

        <textarea className="w-full bg-gray-100 flex-1 rounded-xl px-2 py-2 text-lg" value={describe} onChange={(event)=>setDescribe(event.target.value)} />
        <div className="border-t border-gray-300 h-1 mt-7 mb-4"></div>

        <div className="flex gap-2 w-full">
          <button onClick={()=>setDes(false)} className="border-2 border-black ml-auto flex justify-center w-24 py-1 rounded-4xl font-bold hover:bg-gray-200 active:bg-gray-300">
            Cancel
          </button>

          <button onClick={()=>{
            setDescription(describe);
            setDes(false);
          }} className="bg-black text-white w-24 flex justify-center py-1 rounded-4xl font-bold hover:bg-gray-700 active:bg-gray-600">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default DescriptionDialog;