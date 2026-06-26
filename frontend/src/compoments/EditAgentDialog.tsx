import { useRef, useState } from "react";
import type { AgentType } from "../pages2/ShowPage";

type DialogProps ={
  setAopen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditAgent: React.Dispatch<React.SetStateAction<boolean>>;
  agent: AgentType[];
  setAgent: React.Dispatch<React.SetStateAction<AgentType[]>>;
  initialMedia: string;
  initialFirstname: string;
  initialLastname: string;
  initialEmail: string;
  initialPhone: string;
  initialOffice: string;
  initialIsSelected: boolean
  index: number;
}

function EditAgentDialog({setAgent, setEditAgent, agent, setAopen, initialEmail, initialFirstname, index, initialLastname, initialMedia, initialOffice, initialPhone, initialIsSelected}:DialogProps){
  const [media, setMedia] = useState(initialMedia);
  const [firstname, setFirstname] = useState(initialFirstname);
  const [lastname, setLastname] = useState(initialLastname);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [office, setOffice] = useState(initialOffice);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setMedia(file ? URL.createObjectURL(file) : "");
  }

  const saveHandler = () => {
    const newAgent = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      office: office,
      media: media!,
      isSelected: initialIsSelected,
    }

    const newList = agent.map((a, i) => (
      i === index
        ?  newAgent
        : a
    ))

    setAgent(newList);
    setEditAgent(false);
    setAopen(true);
    console.log(newAgent);
  }

  const checkValid = () => {
    if (!firstname || !lastname || !email || !phone || !office || !media){
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 justify-center items-center flex z-100">
      <div className="flex flex-col bg-white w-[95%] rounded-2xl max-h-[98vh] px-8 pb-5 pt-10 overflow-auto relative sm:w-180 sm:max-h-[90vh]">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Create a new agent</span>
          <span className="text-gray-500 text-[10px] sm:text-xs">Please complete the information below.</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>{
            setEditAgent(false);
            setAopen(true);
          }} className="size-6 text-gray-400 rounded absolute top-4 right-6  hover:bg-gray-100 active:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="border-t border-gray-300 h-1 my-4"></div>

        <input ref={inputRef} type="file" onChange={fileHandler} className="hidden"/>

        <div className="flex flex-col items-center gap-2">
          {media ? 
            <img src={media} className="w-15 h-15 sm:w-17 sm:h-17 rounded-full hover:ring-2 hover:ring-gray-300 active:ring-gray-400" onClick={()=>inputRef.current?.click()} />
            :
            <div onClick={()=>{
              inputRef.current?.click();
            }} className="w-15 h-15 sm:w-17 sm:h-17 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 active:ring-gray-400 hover:ring-gray-300">
              <span className="text-white text-4xl">+</span>
            </div>
          }
          <span>Photo</span>
        </div>

        <div className="flex flex-col w-full gap-2 sm:px-35">

          <div className="flex flex-col w-full gap-2">
            <label className="text-gray-600">First Name</label>
            <input value={firstname} onChange={(event)=>setFirstname(event.target.value)} className="focus:outline-none px-2 focus:ring-2 focus:ring-blue-500 w-full border h-9 rounded border-gray-400" />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label className="text-gray-600">Last Name</label>
            <input value={lastname} onChange={(event)=>setLastname(event.target.value)} className="focus:outline-none px-2 focus:ring-2 focus:ring-blue-500 w-full border h-9 rounded border-gray-400" />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label className="text-gray-600">Email</label>
            <input value={email} onChange={(event)=>setEmail(event.target.value)} className="focus:outline-none px-2 focus:ring-2 focus:ring-blue-500 w-full border h-9 rounded border-gray-400" />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label className="text-gray-600">Phone Number</label>
            <input value={phone} onChange={(event)=>setPhone(event.target.value)} className="focus:outline-none px-2 focus:ring-2 focus:ring-blue-500 w-full border h-9 rounded border-gray-400" />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label className="text-gray-600">Team or Office Name</label>
            <input value={office} onChange={(event)=>setOffice(event.target.value)} className="focus:outline-none px-2 focus:ring-2 focus:ring-blue-500 w-full border h-9 rounded border-gray-400" />
          </div>

        </div>

        <div className="border-t border-gray-300 h-1 my-4"></div>

        <div className="flex">
          <button onClick={()=>saveHandler()} disabled={checkValid()} className="border-2 px-8 ml-auto py-1.5 rounded-3xl bg-black text-white hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-400 sm:bg-blue-500 sm:hover:bg-blue-600 sm:active:bg-blue-700">Save</button>
        </div>

      </div>
    </div>
  )
}

export default EditAgentDialog;