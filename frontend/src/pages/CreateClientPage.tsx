import TopBar from "../compoments/TopBar";
import ButtonTag from "../compoments/ButtonTag";
import { useNavigate } from "react-router-dom";
import LabelInput from "../compoments/LabelInput";
import { useState } from "react";
import ProfileUploader from "../compoments/ProfileUploader";

function CreateClientPage(){
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState("");
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
        <span className="text-2xl pl-5">Create New Client</span>
      </div>

      <form className="flex flex-col w-210 gap-6 py-6" onSubmit={submitHandler}>
        <div className="flex gap-5">
          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            }
            placeholder="Search client name/email"
            label="Client Name"
            value={firstname}
            className="w-[47%]"
            onChange={(event)=>{
              setFirstname(event.target.value)
            }}
          ></LabelInput>

          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            }
            placeholder="Search client name/email"
            label="Client Name"
            value={firstname}
            className="flex-1"
            onChange={(event)=>{
              setFirstname(event.target.value)
            }}
          ></LabelInput>
        </div>

        <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            }
            placeholder="Search client name/email"
            label="Client Name"
            value={firstname}
            onChange={(event)=>{
              setFirstname(event.target.value)
            }}
        ></LabelInput>

        <div className="flex gap-5">
          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            }
            placeholder="Search client name/email"
            label="Client Name"
            value={firstname}
            className="w-[47%]"
            onChange={(event)=>{
              setFirstname(event.target.value)
            }}
          ></LabelInput>

          <LabelInput
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            }
            placeholder="Search client name/email"
            label="Client Name"
            value={firstname}
            className="flex-1"
            onChange={(event)=>{
              setFirstname(event.target.value)
            }}
          ></LabelInput>
        </div>

        <div className="flex flex-col gap-4">
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
        
        {open && <ProfileUploader title="Upload Client Profile Image" image={image} setImage={setImage} setOpen={setOpen} />}
      </form>

    </div>
  )
}

export default CreateClientPage;