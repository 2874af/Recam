import ServiceBlock from "./ServiceBlock";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  client: string;
  address: string;
  selectedDate: Date | null;
  confirmedTime: string;
  staff: string;
  photo: boolean;
  video: boolean;
  floor: boolean;
  vr: boolean;

};

function ConfirmedOrderDialog({ open, onClose, client, address, selectedDate, confirmedTime, staff, photo, video, floor, vr,  }: DialogProps) {
  
  const [currentTime, setCurrentTime] = useState("")
  const navigate = useNavigate();
  const submitHandler = (event:React.SubmitEvent) => {
    event.preventDefault();
    console.log("Create successfully.");
    console.log({currentTime});
    setCurrentTime(new Date().toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }));

    navigate("/orderdetail");
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="relative w-[55%] bg-white rounded-2xl px-9 pt-5 pb-12">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={onClose} className="size-6 text-gray-400 relative rounded ml-auto  hover:bg-gray-100 active:bg-gray-200">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

        <p className="px-1 text-sx text-left text-3xl font-bold pb-8 pt-1">Order Detail</p>
        
        <form className="flex flex-col" onSubmit={submitHandler}>
          <div className="border border-gray-300 pb-12 rounded-3xl flex px-8 pt-8 flex-col gap-4">
            <div className="flex">

              <div className="w-[50%] flex flex-col gap-1">
                <p className="font-bold text-lg">Client Name</p>
                <p className="text-gray-500">{client}</p>
              </div>

              <div className="w-[50%] flex flex-col gap-1">
                <p className="font-bold text-lg">Property Address</p>
                <p className="text-gray-500">{address}</p>
              </div>

            </div>

            <div className="flex">

              <div className="w-[50%] flex flex-col gap-1">
                <p className="font-bold text-lg">Time Schedual</p>
                <div>
                  <span className="text-gray-500">{selectedDate ? selectedDate.toISOString().split("T")[0] : ""}</span>
                  <span className="text-gray-500 pl-2">{confirmedTime}</span>
                </div>
              </div>

              <div className="w-[50%] flex flex-col gap-1">
                <p className="font-bold text-lg">Service Staff</p>
                <p className="text-gray-500">{staff}</p>
              </div>

            </div>

            <div className="flex flex-col gap-2.5">
              <p className="font-bold text-lg">Service Item</p>
              <div className="flex gap-2.5">
                {photo && <ServiceBlock tag="Photography" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                } />
                }

                {floor && <ServiceBlock tag="Floor Plan" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                } />
                }

                {video && <ServiceBlock tag="Videography" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                } />
                }

                {vr && <ServiceBlock tag="VR Tour" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                } />
                }
              </div>
            </div>
          </div>

          <div className="justify-center flex">
            <Button type="submit" className="w-40 mt-8">Create</Button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ConfirmedOrderDialog;
