import ButtonTag from "../compoments/ButtonTag";
import TopBar from "../compoments/TopBar";
import IconInput from "../compoments/IconInput";
import Button from "../compoments/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function StaffListPage() {
  const navigate = useNavigate();
  const [client, setClient] = useState("");
  const [page, setPage] = useState<"all" | "photographer" | "videographer" | "vr">("all");

  return(
    <div className="flex flex-col items-center">
      <TopBar>
        <ButtonTag className="ml-3 font-bold text-white" onClick={()=>navigate("/dashboard")}>Orders</ButtonTag>
        <ButtonTag className="font-bold text-white" onClick={()=>navigate("/clientlist")}>Clients</ButtonTag>
        <ButtonTag className="font-bold text-blue-300" onClick={()=>navigate("/stafflist")}>Staffs</ButtonTag>
      </TopBar>

      <p className="font-extrabold text-4xl pt-8 pb-15">Hi, Welcome!</p>

      <IconInput
        icon={
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-2 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        }
        placeholder="Search Staff"
        className="w-[60%]"
        value={client}
        onChange={(event)=>{
          setClient(event.target.value)
        }}
      ></IconInput>

      <div className="pt-6 w-full flex px-22 pb-6 items-center justify-center relative gap-6">
        <button onClick={()=>setPage("all")} className={`w-45 py-2 rounded-lg text-xl ${
          page == "all"
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-200 active:bg-gray-300"
        }`}>All</button>
        <button onClick={()=>setPage("photographer")} className={`w-45 py-2 rounded-lg text-xl ${
          page == "photographer"
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-200 active:bg-gray-300"
        }`}>Photopgrapher</button>
        <button onClick={()=>setPage("videographer")} className={`w-45 py-2 rounded-lg text-xl ${
          page == "videographer"
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-200 active:bg-gray-300"
        }`}>Videographer</button>
        <button onClick={()=>setPage("vr")} className={`w-45 py-2 rounded-lg text-xl ${
          page == "vr"
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-200 active:bg-gray-300"
        }`}>VR maker</button>
        <Button onClick={()=>navigate("/createstaff")} className="absolute right-22 w-44 h-12">+ Add New Staff</Button>
      </div>
    </div>
  )
}

export default StaffListPage;