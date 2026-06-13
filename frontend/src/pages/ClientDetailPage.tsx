import TopBar from "../compoments/TopBar";
import ButtonTag from "../compoments/ButtonTag";
import { useNavigate } from "react-router-dom";
import LabelInput from "../compoments/LabelInput";
import Button from "../compoments/Button";
import { useState } from "react";
import ProfileUploader from "../compoments/ProfileUploader";
import SuccessDialog from "../compoments/SuccessDialog";

function ClientDetailPage(){
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("Justin");
  const [lastname, setLastname] = useState("Bieber");
  const [email, setEmail] = useState("justin@outlook.com");
  const [phone, setPhone] = useState("0425843412");
  const [company, setCompany] = useState("Bieber Studio");
  const [image, setImage] = useState("https://picsum.photos/200/200");
  const [open, setOpen] = useState(false);
  const [create, setCreate] = useState(false);


  const submitHandler = () => {
    console.log("create successfully.");
  }


  return (
    <div className="flex flex-col items-center">
      <TopBar>
        <ButtonTag className="ml-3 font-bold text-white" onClick={()=>navigate("/dashboard")}>Orders</ButtonTag>
        <ButtonTag className="font-bold text-blue-300" onClick={()=>navigate("/clientlist")}>Clients</ButtonTag>
        <ButtonTag className="font-bold text-white" onClick={()=>navigate("/stafflist")}>Staffs</ButtonTag>
      </TopBar>

      <div className="flex h-18 items-center w-full">
        <ButtonTag className="text-gray-400 text-2xl pl-24 pr-5" onClick={()=>navigate("/clientlist")}>Client</ButtonTag>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <span className="text-2xl pl-5">{`${firstname} ${lastname}`}</span>
      </div>

      <form className="flex flex-col w-210 gap-6 py-6" onSubmit={submitHandler}>
        <div className="flex gap-5">
          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

            }
            placeholder="Client First Name"
            label="First Name"
            value={firstname}
            className="w-[47%]"
            onChange={(event)=>{
              setFirstname(event.target.value)
            }}
          ></LabelInput>

          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

            }
            placeholder="Client Last Name"
            label="Last Name"
            value={lastname}
            className="flex-1"
            onChange={(event)=>{
              setLastname(event.target.value)
            }}
          ></LabelInput>
        </div>

        <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>


            }
            placeholder="Client Email Address"
            label="Email Address"
            value={email}
            onChange={(event)=>{
              setEmail(event.target.value)
            }}
        ></LabelInput>

        <div className="flex gap-5">
          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>

            }
            placeholder="Client Phone Number"
            label="Phone Number"
            value={phone}
            className="w-[47%]"
            onChange={(event)=>{
              setPhone(event.target.value)
            }}
          ></LabelInput>

          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
              </svg>

            }
            placeholder="Client Company Name"
            label="Company"
            value={company}
            className="flex-1"
            onChange={(event)=>{
              setCompany(event.target.value)
            }}
          ></LabelInput>
        </div>

        <div className="flex flex-col gap-4 pb-10">
          <label className="px-1 text-sx text-left text-medium font-bold">Company Logo</label>

          {image ? 
            <img src={image}
              alt="logo"
              className="w-30 h-30 object-cover rounded-2xl hover:border-2 hover:border-blue-500 active:border-2 active:border-blue-700"
              onClick={() => {setOpen(true)}}
            />
            :
            <div onClick={() => {setOpen(true)}} className="w-30 h-30 bg-gray-100 rounded-2xl flex justify-center items-center hover:border-2 hover:border-blue-500 active:border-2 active:border-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          }

        </div>
        
        {open && <ProfileUploader title="Upload Client Profile Image" setImage={setImage} setOpen={setOpen} image={image} />}
      </form>
      
      <Button className="w-40" onClick={()=>setCreate(true)}>Save</Button>
      {create && <SuccessDialog word1="Save Successfully" word2="Confirm" onClick={()=>setCreate(false)} />}
    </div>
  )
}

export default ClientDetailPage;