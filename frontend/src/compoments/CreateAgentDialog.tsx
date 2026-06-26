import { useState } from "react";
import type { AgentType } from "../pages2/ShowPage";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

type DialogProps ={
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  agent: AgentType[];
  setAgent: React.Dispatch<React.SetStateAction<AgentType[]>>;
  setCreateAgent: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAgent: React.Dispatch<React.SetStateAction<AgentType[]>>;
  setEditAgent: React.Dispatch<React.SetStateAction<boolean>>;
  setMedia: React.Dispatch<React.SetStateAction<string>>;
  setFirstname: React.Dispatch<React.SetStateAction<string>>;
  setLastname: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setOffice: React.Dispatch<React.SetStateAction<string>>;
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setAindex: React.Dispatch<React.SetStateAction<number>>;
}

function CreateAgentDialog({setOpen, agent, setAgent, setCreateAgent, setSelectedAgent, setEditAgent, setEmail, setFirstname, setIsSelected, setLastname, setMedia, setOffice, setPhone, setAindex}:DialogProps){
  const [dele, setDele] = useState(false);
  const [index, setIndex] = useState(0);

  const changeHandler = (event:React.ChangeEvent<HTMLInputElement>, index:number) => {
    const newList = agent.map((a, i) => (
      i === index ? {...a, isSelected: event.target.checked} : a
    ));

    setAgent(newList);
  }

  const checkValid = () => {
    if (agent.every(a => a.isSelected === false)){
      return true;
    }

    return false;
  }

  const saveHandler = () => {
    const selectedList = agent.filter(a => a.isSelected === true);
    
    setSelectedAgent(selectedList);
  }

  const editHandler = (a: AgentType, index: number) => {
    setOpen(false);
    setEditAgent(true);
    setMedia(a.media);
    setFirstname(a.firstname);
    setLastname(a.lastname);
    setEmail(a.email);
    setPhone(a.phone);
    setOffice(a.office);
    setIsSelected(a.isSelected);
    setAindex(index)
  }

  const deleteHandler = () => {
    setDele(true);
  }

  return (
    <div className="fixed inset-0 bg-black/40 justify-center items-center flex z-100">
      <div className="flex flex-col bg-white w-[95%] rounded-2xl max-h-[96vh] px-8 pb-5 pt-14 relative sm:w-180 sm:max-h-[85vh]">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Agent Contact</span>
          <span className="text-gray-500 text-[10px] sm:text-xs">Please complete the contact information.</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>setOpen(false)} className="size-6 text-gray-400 rounded absolute top-4 right-6  hover:bg-gray-100 active:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="border-t border-gray-300 h-1 my-5"></div>

        <div className="px-2 flex w-full justify-center">
          <button onClick={()=>{
            setCreateAgent(true);
            setOpen(false);
          }} className="border-2 w-full rounded-xl py-2 font-bold hover:bg-gray-200 active:bg-gray-300 sm:w-70">
            <span>Create a new agent</span>
          </button>
        </div>

        <div className="flex mt-6 font-bold mb-2">
          <span>Saved Agents</span>
        </div>

        <div className="flex flex-col min-h-40 gap-2 overflow-auto">
          {agent.map((a, index) => (
            <div key={index} className="w-full h-16 shrink-0 bg-gray-100 items-center flex px-3 rounded-lg gap-2 sm:h-20">
              <img src={a.media} alt="media" className="w-10 h-10 rounded-full" />
              <div className="flex flex-col">
                <span className="text-sm">{`${a.firstname} ${a.lastname}`}</span>
                <span className="text-sm text-gray-400">{a.office}</span>
              </div>

              <div className="flex flex-1 items-center gap-3">
                <div onClick={()=>editHandler(a, index)} className="flex items-center justify-center rounded-full bg-gray-200 w-6 h-6 ml-auto hover:bg-blue-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-gray-400 group-hover:text-white">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                  </svg>
                </div>

                <div onClick={() => {
                  deleteHandler();
                  setIndex(index);
                }} className="flex items-center justify-center rounded-full bg-gray-200 w-6 h-6 mr-2 hover:bg-red-300 group">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3.5 text-gray-400 group-hover:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </div>

                <input type="checkbox" checked={a.isSelected===true} className="w-5 h-5" onChange={(event)=>{changeHandler(event, index)}} />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 h-1 my-5"></div>

        <div className="flex w-full">
          <button onClick={()=>{
            setOpen(false);
            saveHandler();
          }} disabled={checkValid()} className="border-2 px-8 ml-auto py-1.5 rounded-3xl bg-black text-white hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-400 sm:bg-blue-500 sm:hover:bg-blue-600 sm:active:bg-blue-700">
            <span>Save</span>
          </button>
        </div>
        
        {dele && <DeleteConfirmDialog setDele={setDele} agent={agent} setAgent={setAgent} i={index} />}
      </div>
    </div>
  )
}

export default CreateAgentDialog;