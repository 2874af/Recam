import { useState } from "react";
import Input from "../compoments/Input";
import Button from "../compoments/Button";
import Error from "../compoments/Error";
import TopBar from "../compoments/TopBar";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const [conditions, setConditions] = useState(false);
  const submitHandler = (event: React.SubmitEvent) => {
    event.preventDefault();
    
    if (!email || !password || !cpassword || !lastname || !firstname){
      setError("Please fill in all the boxes.");
    } else if (password !== cpassword){
      setError("Please confirm your password again.")
    } else if (!conditions) {
      setError("Please read Terms and Conditions.")
    } else {
      console.log("Sign up successfully!")
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center">

      <TopBar />

      {error && <Error content={error} onClose={()=>setError("")}/>}

      <p className="text-2xl font-extrabold text-black pt-10">Sign up to be an Agent</p>

      <div className="flex justify-center pt-2 pb-13">
        <span className="pr-2">Already have an account?</span>
        <span className="text-blue-600 hover:bg-blue-300 active:bg-blue-700" onClick={()=>navigate("/login")}>Log in</span>
      </div>

      <div className="flex justify-center bg-gray-100 w-120 py-10 rounded-2xl mb-20">
        <form className="flex flex-col gap-4" onSubmit = {submitHandler}>

          <div className="flex flex-col gap-2">
            <label htmlFor="agency" className="px-2 text-sx text-left font-bold">Company Name</label>

            <select id="agency" className="w-100 bg-white h-11 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="realestate">Real Estate</option>
              <option value="domain">Domain</option>
              <option value="rich&oliva">Rich & Oliva</option>
              <option value="raywhite">Ray White</option>
              <option value="bellaproperty">Bella Property</option>
              <option value="laing+simmons">Laing+Simmons</option>
            </select>
          </div>

          <Input label="Email" value={email} onChange={(event)=>setEmail(event.target.value)}></Input>
          <Input label="First Name" value={firstname} onChange={(event)=>setFirstname(event.target.value)}></Input>
          <Input label="Last Name" value={lastname} onChange={(event)=>setLastname(event.target.value)}></Input>
          <Input label="Password" type="password" value={password} onChange={(event)=>setPassword(event.target.value)}></Input>
          <Input label="Confirm Password" type="password" value={cpassword} onChange={(event)=>setCpassword(event.target.value)}></Input>

          <div className="flex items-center p-2">
            <input type="checkbox" className="w-4 h-4 ml-2" checked={conditions===true} id="remember" onChange={(event)=>{setConditions(event.target.checked)}}/>
            <span className="text-xs ml-2">I agree to the <span className="text-blue-600 hover:bg-blue-300 active:bg-blue-700 text-xs" onClick={()=>navigate("/conditions")}>Term and Conditions</span></span>

          </div>

          <Button type="submit">Submit</Button>

        </form>
      </div>
    </div>
  )
}

export default RegisterPage;