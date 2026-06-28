import type { AgentType } from "../pages2/ShowPage";
import { Mail, Phone } from 'lucide-react';

type DialogProps = {
  setContact: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAgent: AgentType[];
}

function ContactAgentDialog({setContact, selectedAgent}:DialogProps){
  return (
    <div className="inset-0 fixed bg-black/40 flex items-center justify-center z-100">
      <div className="flex flex-col bg-white w-[95%] rounded-2xl max-h-[60vh] px-8 pb-10 pt-14 relative sm:w-180 sm:max-h-[85vh]">
        <div className="flex flex-col gap-1 pb-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>setContact(false)} className="size-6 text-gray-400 rounded absolute top-4 right-6  hover:bg-gray-100 active:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="flex flex-col min-h-40 gap-2 sm:gap-3 overflow-auto">
          {selectedAgent.map((a, index) => (
            <div key={index} className="w-full h-17 shrink-0 bg-gray-100 items-center flex px-3 rounded-lg gap-2 sm:h-20">
              <img src={a.media} alt="media" className="w-10 h-10 rounded-full" />
              <div className="flex flex-col">
                <span className="text-sm">{`${a.firstname} ${a.lastname}`}</span>
                <span className="text-sm text-gray-400">{a.office}</span>
              </div>

              <div className="flex flex-1 items-center gap-3">
                <div className="flex items-center justify-center rounded-full bg-black text-white w-7 h-7 ml-auto hover:bg-gray-700 active:bg-gray-600 group sm:hidden">
                  <Mail className="w-4 h-4"/>
                </div>

                <div className="flex items-center justify-center rounded-full bg-black text-white w-7 h-7 mr-2 hover:bg-gray-700 active:bg-gray-600 group sm:hidden">
                  <Phone className="w-4 h-4" />
                </div>

                <button className="hidden sm:flex justify-center gap-1.5 border-2 w-28 ml-auto items-center rounded-2xl py-0.5 hover:bg-gray-200 active:bg-gray-300">
                  <Phone className="w-4 h-4"/>
                  <span>Call</span>
                </button>
                
                <button className="hidden sm:flex justify-center gap-1.5 border-2 w-28 items-center rounded-3xl py-1 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
                  <Mail className="w-4 h-4"/>
                  <span>Email</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactAgentDialog;