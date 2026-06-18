import { useState } from "react";
import OrderBlock from "../compoments/OrderBlock";

function AgentDashboardPage(){

  const [agent, setAgent] = useState("Justin Bieber");
  const [order, setOrder] = useState("");
  const [choice, setChoice] = useState<"all" | "scheduled" | "delivered" >("all");
  const [isNew, setIsNew] = useState(true);

  const [id, setId] = useState("#fhkjkjhkjsafblssrteyteyfq");
  const [createTime, setCreateTime] = useState("10 November 2024");
  const [address, setAddress] = useState("1-3 Therrt Street E, Randwick 2136");
  const [photo, setPhoto] = useState(true);
  const [floor, setFloor] = useState(true);
  const [video, setVideo] = useState(true);
  const [vr, setVr] = useState(true);


  return (
    <div className = "flex flex-col w-full h-screen">
      <div className="bg-black h-16 text-white flex items-center px-7 sm:hidden">
        <span>Hi, {agent}</span>
      </div>

      <div className="bg-gray-100 flex-1 sm:hidden">
        <div className="px-5 py-5 text-2xl font-bold">
          <span>My Order</span>
        </div>

        <div className="flex justify-center relative items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-11.5 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

          <input 
            placeholder="Search My Order"
            value={order}
            onChange={(event)=>setOrder(event.target.value)}
            className="w-[90%] bg-white pl-12 rounded-3xl px-3 py-3 focus:outline-none focus:placeholder:opacity-0 focus:ring-2 focus:ring-blue-500 "
          />
        </div>

        <div className ="flex px-6 justify-center w-full gap-2.5 py-6">
          <div className={`h-10 w-[32%] flex items-center justify-center rounded-lg hover:bg-gray-200 active:font-bold ${
            choice ==="all"
              ? "bg-gray-200 font-bold"
              : "bg-gray-100 font-medium"
          }`}
            onClick={()=>setChoice("all")}
          >
            <span>All</span>
          </div>

          <div className={`h-10 w-[32%] flex items-center justify-center rounded-lg hover:bg-gray-200 active:font-bold ${
            choice ==="scheduled"
              ? "bg-gray-200 font-bold"
              : "bg-gray-100 font-medium"
          }`}
            onClick={()=>setChoice("scheduled")}
          >
            <span>Scheduled</span>
          </div>

          <div className={`h-10 w-[32%] flex items-center justify-center rounded-lg hover:bg-gray-200 active:font-bold relative ${
            choice ==="delivered"
              ? "bg-gray-200 font-bold"
              : "bg-gray-100 font-medium"
          }`}
            onClick={()=>setChoice("delivered")}
          >
            <span>Delivered</span>
            <span className="bg-green-400 absolute text-[10px] text-xs px-1.5 py-0.2 rounded-lg text-white right-2">New</span>
          </div>

        </div>
        
        <div className="overflow-auto flex flex-col items-center flex-1 pl-4 pt-5 gap-5">
          <OrderBlock id={id} createTime={createTime} address={address} photo={photo} video={video} floor={floor} vr={vr} status="delivered" />
          <OrderBlock id={id} createTime={createTime} address={address} photo={photo} video={video} floor={floor} vr={vr} status="scheduled" />
        </div>
      </div>


      <div className = "hidden sm:w-full sm:bg-white sm:flex sm:flex-col sm:h-30 sm:px-35 sm:pt-7 sm:gap-2 sm:border-b sm:border-gray-200">
        <span className = "text-gray-400">Hi, {agent}</span>

        <div className="flex">
          <span className="font-bold text-3xl">My Order</span>

          <div className="w-100 ml-auto relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-3.5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

            <input 
              placeholder="Search My Order"
              value={order}
              onChange={(event)=>setOrder(event.target.value)}
              className="w-full bg-gray-100 pl-12 rounded-3xl px-3 py-2.5 focus:outline-none focus:placeholder:opacity-0 focus:ring-2 focus:ring-blue-500 "
            />
          </div>
        </div>
      </div>

      <div className="hidden sm:flex-1 sm:bg-gray-100 sm:flex">

        <div className ="flex w-[26%] flex-col pr-8 pt-5 gap-4">
          <div className={`ml-auto w-48 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 active:font-bold ${
            choice ==="all"
              ? "bg-gray-200 font-bold"
              : "bg-gray-100 font-medium"
          }`}
            onClick={()=>setChoice("all")}
          >
            <span>All</span>
          </div>

          <div className={`ml-auto w-48 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 active:font-bold ${
            choice ==="scheduled"
              ? "bg-gray-200 font-bold"
              : "bg-gray-100 font-medium"
          }`}
            onClick={()=>setChoice("scheduled")}
          >
            <span>Scheduled</span>
          </div>

          <div className={`ml-auto w-48 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 active:font-bold relative ${
            choice ==="delivered"
              ? "bg-gray-200 font-bold"
              : "bg-gray-100 font-medium"
          }`}
            onClick={()=>setChoice("delivered")}
          >
            <span>Delivered</span>
            <span className="bg-green-400 absolute text-[10px] text-xs px-1.5 py-0.2 rounded-lg text-white right-2">New</span>
          </div>

        </div>

        <div className="overflow-auto flex flex-col flex-1 pl-4 pt-5 gap-5">
          <OrderBlock id={id} createTime={createTime} address={address} photo={photo} video={video} floor={floor} vr={vr} status="delivered" />
          <OrderBlock id={id} createTime={createTime} address={address} photo={photo} video={video} floor={floor} vr={vr} status="scheduled" />
        </div>
      </div>



    </div>
  )
}

export default AgentDashboardPage;