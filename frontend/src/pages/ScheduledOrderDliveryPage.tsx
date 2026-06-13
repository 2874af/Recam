import { useNavigate } from "react-router-dom";
import Button from "../compoments/Button";
import ButtonTag from "../compoments/ButtonTag";
import TopBar from "../compoments/TopBar";
import { useState } from "react";
import OrderDetailDialog from "../compoments/OrderDetailDialog";
import ServiceBlock2 from "../compoments/ServiceBlock2";
import PropertyDetailDialog from "../compoments/PropertyDetailDialog";
import PhotoWDialog from "../compoments/PhotoWDialog";
import PhotoPDialog from "../compoments/PhotoPDialog";
import SuccessDialog from "../compoments/SuccessDialog";
import FloorPlanDialog from "../compoments/FloorPlanDialog";
import Input from "../compoments/Input";
import ConfirmEmailDialog from "../compoments/ConfirmEmailDialog";

function ScheduledOrderDliveryPage(){
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
  const [video, setVideo] = useState(false);
  const [vr, setVr] = useState(false);
  const [status, setStatus] = useState<"scheduled" | "delivered">("scheduled");
  const [deliveredTime, setDeliveredTime] = useState("10:25AM, 02-01-2025");
  const [detail, setDetail] = useState(false);
  const [pstatus, setPstatus] = useState<"sale" | "auction" | "rent">("sale");
  const [type, setType] = useState<"house" | "townhouse" | "villa" | "apartment" | "others">("house");
  const [bed, setBed] = useState(0);
  const [bath, setBath] = useState(0);
  const [car, setCar] = useState(0);
  const [area, setArea] = useState(0);
  const [pw, setPw] = useState<File[]>([]);
  const [pwopen, setPwopen] = useState(false);
  const [pwsuccess, setPwsuccess] = useState(false);
  const [pp, setPp] = useState<File[]>([]);
  const [ppopen, setPpopen] = useState(false);
  const [ppsuccess, setPpsuccess] = useState(false);
  const [fp, setFp] = useState<File[]>([]);
  const [fpopen, setFpopen] = useState(false);
  const [fpsuccess, setFpsuccess] = useState(false);
  const [wlink, setWlink] = useState("");
  const [dlink, setDlink] = useState("");
  const [save, setSave] = useState(false);
  const [cemail, setCemail] = useState(false);



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

      <div className="flex flex-col flex-1 items-center">
       <div className="flex flex-col pt-5 w-[65%]">
          <div className="border border-gray-300 relative pb-4 rounded-2xl flex px-8 pt-4 flex-col gap-2">
            
            <div className={`absolute right-0 top-0 flex justify-center font-bold items-center rounded-tr-2xl rounded-bl-2xl px-6 ${
              status === "scheduled"
                ? "bg-blue-300 text-white py-3"
                : "bg-gray-200 text-green-500 py-2 gap-2"
            }`}>
              {status === "delivered" && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
              )}
              <span>{status === "scheduled" ? "Scheduled" : `Deliveried successfy ${deliveredTime}`}</span>
            </div>

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
              <span className="ml-auto pr-5 underline font-medium text-sm hover:text-gray-400 active:text-gray-500" onClick={()=>setOpen(true)}>More Details</span>
            </div>

          </div>


          <div className="flex pt-8 justify-between w-full gap-3 overflow-x-auto px-2.5">
            {photo
              ?
              <ServiceBlock2 tag="Photography-W" onClick={()=>setPwopen(true)} num={pw.length} classNameDiv="bg-blue-100 hover:border-2 hover:border-blue-400 active:border-2 active:border-blue-500" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-blue-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              } />
              :
              <ServiceBlock2 tag="Photography-W" classNameDiv="bg-gray-100" className="text-gray-400" num={0} icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              } />
            }

            {photo
              ?
              <ServiceBlock2 tag="Photography-P" onClick={()=>setPpopen(true)} num={pp.length} classNameDiv="bg-blue-100 hover:border-2 hover:border-blue-400 active:border-2 active:border-blue-500" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-orange-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              } />
              :
              <ServiceBlock2 tag="Photography-P" classNameDiv="bg-gray-100" className="text-gray-400" num={0} icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              } />
            }

            {floor
              ?
              <ServiceBlock2 tag="Floor Plan" onClick={()=>setFpopen(true)} num={fp.length} classNameDiv="bg-blue-100 hover:border-2 hover:border-blue-400 active:border-2 active:border-blue-500" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              } />
              :
              <ServiceBlock2 tag="Floor Plan" classNameDiv="bg-gray-100" className="text-gray-400" num={0} icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              } />
            }

            {video
              ?
              <ServiceBlock2 tag="Videography" num={0} classNameDiv="bg-blue-100 hover:border-2 hover:border-blue-400 active:border-2 active:border-blue-500" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              } />
              :
              <ServiceBlock2 tag="Videography" classNameDiv="bg-gray-100" className="text-gray-400" num={0} icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              } />
            }

            {vr
              ?
              <ServiceBlock2 tag="VR Tour" num={0} classNameDiv="bg-blue-100 hover:border-2 hover:border-blue-400 active:border-2 active:border-blue-500" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-cyan-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              } />
              :
               <ServiceBlock2 tag="VR Tour" classNameDiv="bg-gray-100" className="text-gray-400" num={0} icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              } />
            }

            <ServiceBlock2 tag="Property Detail" num={0} save={save} classNameDiv="bg-blue-100 hover:border-2 hover:border-blue-400 active:border-2 active:border-blue-500" onClick={()=>setDetail(true)} icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-violet-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>

            } />
          </div>
          
          <div className="h-46 w-full pt-13">
            {pw.length > 0 &&
              <div className="flex gap-3 justify-between h-full w-full">
                <div className = "flex flex-col w-[49%]">
                  <Input label="Property Website Link" label2="*" value={wlink} onChange={(event)=>setWlink(event.target.value)} placeholder="Input the property website link" className="w-full bg-gray-100 focus:placeholder:opacity-0" />
                  <span className="underline font-medium text-xs ml-auto pt-2 text-gray-600 hover:text-gray-400 active:text-gray-500" onClick={()=>window.open(wlink, "_blank")}>Preview the link</span>
                </div>

                <div className = "flex flex-col w-[49%]">
                  <Input label="Drop Box Link" label2="*" value={dlink} onChange={(event)=>setDlink(event.target.value)} placeholder="Input the property website link" className="w-full bg-gray-100 focus:placeholder:opacity-0" />
                  <span className="underline font-medium text-xs ml-auto pt-2 text-gray-600 hover:text-gray-400 active:text-gray-500" onClick={()=>window.open(dlink, "_blank")}>Preview the link</span>
                </div>
              </div>
            }
          </div>

            <div className="justify-center flex mt-2.5 gap-8">
              <Button className="w-60" onClick={()=>setCemail(true)}>Edit Confirmation Email</Button>
              <Button type="button" onClick={()=>{
                navigate("/scheduleddelivery");
              }} className="w-60">Delivery</Button>
            </div>
        </div>
        
        {open && <OrderDetailDialog onClose={()=>setOpen(false)} id={id} setOpen={setOpen} createTime={createTime} client={client} address={address} date={date} time={time} staff={staff} photo={photo} floor={floor} video={video} vr={vr} status={status} />}
        {detail && <PropertyDetailDialog setDetail={setDetail} setSave={setSave} pstatus={pstatus} type={type} bath={bath} area={area} bed={bed} car={car} setBath={setBath} setArea={setArea} setCar={setCar} setBed={setBed} setType={setType} setPstatus={setPstatus} / >}
        {pwopen && <PhotoWDialog pw={pw} setPw={setPw} setPwopen={setPwopen} setPwsuccess={setPwsuccess}/>}
        {pwsuccess && <SuccessDialog word1="Upload Successfully!" word2="Confirm" onClick={()=>setPwsuccess(false)} />}
        {ppopen && <PhotoPDialog pp={pp} setPp={setPp} setPpopen={setPpopen} setPpsuccess={setPpsuccess}/>}
        {ppsuccess && <SuccessDialog word1="Upload Successfully!" word2="Confirm" onClick={()=>setPpsuccess(false)} />}
        {fpopen && <FloorPlanDialog fp={fp} setFp={setFp} setFpopen={setFpopen} setFpsuccess={setFpsuccess}/>}
        {fpsuccess && <SuccessDialog word1="Upload Successfully!" word2="Confirm" onClick={()=>setFpsuccess(false)} />}
        {cemail && <ConfirmEmailDialog setCemail={setCemail} />}
      </div>
    </div>
  )
}

export default ScheduledOrderDliveryPage;