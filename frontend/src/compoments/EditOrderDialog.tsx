import Button from "./Button";
import LabelInput from "./LabelInput";
import DPicker from "./DPicker";
import TPicker from "./TPicker";
import Services from "./Services";
import { useState } from "react";

type EditProps = {
  onClose: ()=>void;

}

function EditOrderDialog({onClose}:EditProps){
  
  const [eclient, setEclient]= useState("");
  const [eaddress, setEaddress] = useState("");
  const [estaff, setEstaff] = useState("");
  const [edate, setEdate] = useState<Date | null>(null);
  const [etime, setEtime] = useState("");
  const [ephoto, setEphoto] = useState(false);
  const [efloor, setEfloor] = useState(false);
  const [evideo, setEvideo] = useState(false);
  const [evr, setEvr] = useState(false);
  const submitHandler = (event:React.SubmitEvent) => {
    event.preventDefault();
    console.log("edit successfully.");
  }
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className=" bg-white rounded-2xl px-9 pt-5 pb-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={onClose} className="size-6 text-gray-400 rounded ml-auto  hover:bg-gray-100 active:bg-gray-200">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

        <p className="px-1 text-sx text-left text-3xl font-bold pb-5 pt-1">Edit Order Information</p>

        <form className="flex flex-col w-200 gap-4 py-6" onSubmit={submitHandler}>
          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            }
            placeholder="Search client name/email"
            label="Client Name"
            value={eclient}
            onChange={(event)=>{
              setEclient(event.target.value)
            }}
          ></LabelInput>

          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            }
            placeholder="Input the property address"
            label="Property Address"
            value={eaddress}
            onChange={(event)=>{
              setEaddress(event.target.value)
            }}
          ></LabelInput>

          <div className="flex flex-col gap-2">
            <label className="px-1 text-sx text-left text-medium font-bold">Schedual</label>
            <div className="flex">
              <DPicker status={edate} setter={setEdate}/>
              <TPicker status={etime} setter={setEtime}/>
            </div>
          </div>

          <LabelInput
            className="w-100"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            }
            placeholder="Staff"
            label="Service Staff"
            value={estaff}
            onChange={(event)=>{
              setEstaff(event.target.value)
            }}
          ></LabelInput>

          <div className="flex flex-col gap-2">
            <p className="px-1 text-sx text-left text-medium font-bold">Service</p>
            <div className="flex gap-8">
              <Services
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                }
                service="Photography"
                status={ephoto}
                setter={setEphoto}
              />

              <Services
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>

                }
                service="Floor Plan"
                status={efloor}
                setter={setEfloor}
              />

              <Services
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>

                }
                service="Videography"
                status={evideo}
                setter={setEvideo}
              />

              <Services
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                }
                service="VR Tour"
                status={evr}
                setter={setEvr}
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button type="submit" className="mt-4 w-40">Create</Button>
          </div>
        </form>
        
        
      </div>
    </div>
  )
}

export default EditOrderDialog;