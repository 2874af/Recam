import type { AgentType } from "../pages2/ShowPage";

type DialogProps = {
  setDele: React.Dispatch<React.SetStateAction<boolean>>;
  agent: AgentType[];
  setAgent: React.Dispatch<React.SetStateAction<AgentType[]>>;
  i: number;
}

function DeleteConfirmDialog({setDele, agent, setAgent, i}:DialogProps){
  const confirmHandler = (i: number) => {
    setDele(false);
    const newList = agent.filter((_, index) => index !== i);
    setAgent(newList);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="w-[80%] h-50 bg-white relative flex flex-col items-center pt-12 rounded-2xl sm:w-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>{
          setDele(false);
        }} className="size-6 text-gray-400 rounded absolute top-4 right-6  hover:bg-gray-100 active:bg-gray-200">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

        <span className="text-lg font-bold">Delete agent information</span>
        <span className="text-gray-500 text-xs mt-2">Are you sure to delete this agent?</span>

        <button onClick={() => confirmHandler(i)} className="border-2 px-8 my-auto py-1.5 rounded-3xl bg-black text-white hover:bg-gray-800 active:bg-gray-700 sm:bg-blue-500 sm:hover:bg-blue-600 sm:active:bg-blue-700">Confirm</button>
      </div>
    </div>
  )
}

export default DeleteConfirmDialog;