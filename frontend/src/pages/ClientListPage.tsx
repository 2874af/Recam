import TopBar from "../compoments/TopBar";
import ButtonTag from "../compoments/ButtonTag";
import Button from "../compoments/Button";
import { useNavigate } from "react-router-dom";
import IconInput from "../compoments/IconInput";
import { useState } from "react";


function ClientListPage(){
  const navigate = useNavigate();
  const [client, setClient] = useState("");

  return(
    <div className="flex flex-col items-center">
      <TopBar>
        <ButtonTag className="ml-3 font-bold text-white" onClick={()=>navigate("/dashboard")}>Orders</ButtonTag>
        <ButtonTag className="font-bold text-blue-300" onClick={()=>navigate("/clientlist")}>Clients</ButtonTag>
        <ButtonTag className="font-bold text-white" onClick={()=>navigate("/stafflist")}>Staffs</ButtonTag>
      </TopBar>

      <p className="font-extrabold text-4xl pt-8 pb-15">Hi, Welcome!</p>

      <IconInput
        icon={
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-2 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        }
        placeholder="Search Client"
        className="w-[60%]"
        value={client}
        onChange={(event)=>{
          setClient(event.target.value)
        }}
      ></IconInput>

      <div className="pt-6 w-full flex px-22 pb-6">
        <Button onClick={()=>navigate("/createclient")} className="ml-auto">+ Create Client</Button>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden w-[80%]">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Client Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">number</th>
              <th className="px-6 py-3 text-left">bill address</th>
              <th className="px-6 py-3 text-left">detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-white">
              <td className="px-6 py-4">Jay</td>
              <td className="px-6 py-4">123@outlook.com</td>
              <td className="px-6 py-4">123456</td>
              <td className="px-6 py-4">17 Yuille Street, Melton, Victoria, 3337</td>
              <td className="px-9 py-2 text-3xl hover:text-blue-300 active:text-blue-600">···</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ClientListPage;