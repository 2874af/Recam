import TopBar from "../compoments/TopBar";
import ButtonTag from "../compoments/ButtonTag";
import { useNavigate } from "react-router-dom";
import Button from "../compoments/Button";
import IconInput from "../compoments/IconInput";
import { useState } from "react";

function OrderListPage(){
  const navigate = useNavigate();
  const [order, setOrder] = useState("")

  return (
    <div className="flex flex-col items-center">
      <TopBar>
        <ButtonTag className="ml-3 text-blue-300 font-bold" onClick={()=>navigate("/dashboard")}>Orders</ButtonTag>
        <ButtonTag className="text-white font-bold" onClick={()=>navigate("/clientlist")}>Clients</ButtonTag>
        <ButtonTag className="font-bold text-white" onClick={()=>navigate("/stafflist")}>Staffs</ButtonTag>
      </TopBar>

      <p className="font-extrabold text-4xl pt-8 pb-15">Hi, Welcome!</p>

      <IconInput 
        className="w-[60%]"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-2 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        } 
        placeholder="Search Order"
        value={order}
        onChange={(event)=>{
          setOrder(event.target.value)
        }}
      >
      </IconInput>

      <div className="pt-6 w-full flex px-22 pb-6">
        <Button className="ml-auto" onClick={()=>navigate("/createorder")}>+ Create Order</Button>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden w-[80%]">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Order#</th>
              <th className="px-6 py-3 text-left">Client Name</th>
              <th className="px-6 py-3 text-left">Property Address</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-white">
              <td className="px-6 py-4">#1</td>
              <td className="px-6 py-4">Tom</td>
              <td className="px-6 py-4">17 Yuille Street, Melton, Victoria, 3337</td>
              <td className="px-6 py-4">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Created
                </span>
              </td>
              <td className="px-6 py-4">11/06/2025</td>
              <td className="px-9 py-2 text-3xl hover:text-blue-300 active:text-blue-600">···</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default OrderListPage;