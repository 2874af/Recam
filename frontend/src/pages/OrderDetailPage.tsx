import TopBar from "../compoments/TopBar";
import ButtonTag from "../compoments/ButtonTag";
import Button from "../compoments/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ServiceBlock from "../compoments/ServiceBlock";
import EditOrderDialog from "../compoments/EditOrderDialog";

function OrderDetailPage(){
  const navigate = useNavigate();

  const [id, setId] = useState("#fhkjkjhkjsafblssrteyteyfq");
  const [open, setOpen] = useState(false);
  const [createTime, setCreateTime] = useState("10 November 2024");
  const [client, setClient] = useState("Tom");
  const [address, setAddress] = useState("1-3 Therrt Street E, Randwick 2136");
  const [date, setDate] = useState("2024-08-05");
  const [time, setTime] = useState("9:00AM - 10AM");
  const [staff, setStaff] = useState("Jason");
  const [photo, setPhoto] = useState(true);
  const [floor, setFloor] = useState(true);
  const [video, setVideo] = useState(true);
  const [vr, setVr] = useState(true);
  const [status, setStatus] = useState<"scheduled" | "delivered">("delivered");

  return (
    <div className="flex flex-col">
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
        <span className="text-2xl pl-5 truncate w-60">{id}</span>
      </div>

      <div className="flex flex-col flex-1 px-50">
       <form className="flex flex-col pt-5">
          <div className="border border-gray-300 pb-8 rounded-3xl flex px-8 pt-8 flex-col gap-4">

            <div className="flex flex-col pb-3">
              <p className="w-full">{id}</p>
              <p className="w-full text-xs text-gray-300">{`Ordered on ${createTime}`}</p>
            </div>

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
                  <span className="text-gray-500">{date}</span>
                  <span className="text-gray-500 pl-2">{time}</span>
                </div>
              </div>

              <div className="w-[50%] flex flex-col gap-1">
                <p className="font-bold text-lg">Service Staff</p>
                <p className="text-gray-500">{staff}</p>
              </div>

            </div>

            <div className="flex">
              <div className="flex flex-col gap-2.5 w-[50%]">
                <p className="font-bold text-lg">Service Item</p>
                <div className="flex flex-wrap gap-3 pr-10">
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

              <div className="w-[50%] flex flex-col gap-1">
                <p className="font-bold text-lg">Status</p>
                <span className={`px-3 py-2 flex w-fit justify-center text-white font-medium items-center rounded-xl mt-2 ${
                  status === "scheduled" ? "bg-blue-300" : "bg-green-300"
                }`}>{status==="scheduled" ? "Scheduled" : "Delivered"}</span>
              </div>

            </div>
          </div>

          <div className="flex pt-3">
            <span className="ml-auto pr-5 underline font-bold hover:text-gray-400 active:text-gray-500" onClick={()=>setOpen(true)}>Edit Details</span>
          </div>

          <div className="justify-center flex pt-8">
            <Button type="button" onClick={()=>{navigate("/scheduleddelivery")}} className="w-40 mt-8">Delivery</Button>
          </div>
        </form>
        
        {open && <EditOrderDialog onClose={()=>setOpen(false)}/>}
      </div>
    </div>
  )
}

export default OrderDetailPage;