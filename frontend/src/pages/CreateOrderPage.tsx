import TopBar from "../compoments/TopBar";
import ButtonTag from "../compoments/ButtonTag";
import { useNavigate } from "react-router-dom";
import LabelInput from "../compoments/LabelInput";
import DPicker from "../compoments/DPicker";
import TPicker from "../compoments/TPicker";
import { useState } from "react";
import Services from "../compoments/Services";
import Button from "../compoments/Button";
import ConfirmedOrderDialog from "../compoments/ConfirmedOrderDialog";



function CreateOrderPage(){
  const navigate = useNavigate();
  const [client, setClient] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [confirmedTime, setConfirmedTime] =useState("");
  const [staff, setStaff] = useState("");
  const [photo, setPhoto] = useState(false);
  const [video, setVideo] = useState(false);
  const [floor, setFloor] = useState(false);
  const [vr, setVr] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const submitHandler = (event:React.SubmitEvent) => {
    event.preventDefault();
    setConfirmation(true);
  }

  return (
    <div className="flex flex-col items-center">
      <TopBar>
        <ButtonTag className="ml-3 text-blue-300 font-bold" onClick={()=>navigate("/dashboard")}>Orders</ButtonTag>
        <ButtonTag className="text-white font-bold" onClick={()=>navigate("/clientlist")}>Clients</ButtonTag>
        <ButtonTag className="font-bold text-white" onClick={()=>navigate("/stafflist")}>Staffs</ButtonTag>
      </TopBar>

      <div className="flex h-18 items-center w-full">
        <ButtonTag className="text-gray-400 text-2xl pl-24 pr-5" onClick={()=>navigate("/dashboard")}>Order</ButtonTag>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <span className="text-2xl pl-5">Create New Order</span>
      </div>

      <div>
        <form className="flex flex-col w-200 gap-6 py-6" onSubmit={submitHandler}>
          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            }
            placeholder="Search client name/email"
            label="Client Name"
            value={client}
            onChange={(event)=>{
              setClient(event.target.value)
            }}
          ></LabelInput>

          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            }
            placeholder="Input the property address"
            label="Property Address"
            value={address}
            onChange={(event)=>{
              setAddress(event.target.value)
            }}
          ></LabelInput>

          <div className="flex flex-col gap-2">
            <label className="px-1 text-sx text-left text-medium font-bold">Schedual</label>
            <div className="flex">
              <DPicker status={selectedDate} setter={setSelectedDate}/>
              <TPicker status={confirmedTime} setter={setConfirmedTime}/>
            </div>
          </div>

          <LabelInput
            className="w-100"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            }
            placeholder="Staff"
            label="Service Staff"
            value={staff}
            onChange={(event)=>{
              setStaff(event.target.value)
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
                status={photo}
                setter={setPhoto}
              />

              <Services
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>

                }
                service="Floor Plan"
                status={floor}
                setter={setFloor}
              />

              <Services
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>

                }
                service="Videography"
                status={video}
                setter={setVideo}
              />

              <Services
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                }
                service="VR Tour"
                status={vr}
                setter={setVr}
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button type="submit" className="mt-4 w-40">Create</Button>
          </div>
        </form>

        <ConfirmedOrderDialog open={confirmation} onClose={()=>setConfirmation(false)} client={client} address={address} selectedDate={selectedDate} confirmedTime={confirmedTime} staff={staff} photo={photo} video={video} floor={floor} vr={vr} />
      </div>

    </div>
  )
}

export default CreateOrderPage;