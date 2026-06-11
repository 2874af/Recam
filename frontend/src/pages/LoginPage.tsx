import { useState } from "react";
import Input from "../compoments/Input";
import Button from "../compoments/Button";
import TopBar from "../compoments/TopBar";
import { useNavigate } from "react-router-dom";
import Error from "../compoments/Error";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submitHandler = (event: React.SubmitEvent) => {
    event.preventDefault();
    if (!email) {
      setError("Please fill in email.");
    } else if (!password) {
      setError("Please fill in password.");
    } else {
      console.log("Sign in successfully.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <TopBar />
      
      {error && <Error content={error} onClose={()=>setError("")}/>}

      <p className="text-2xl font-extrabold text-black pt-20">Sign in to your account</p>

      <div className="flex justify-center pt-2 pb-13">
        <span className="pr-2">Don't have an account?</span>
        <span className="text-blue-600 hover:bg-blue-300 active:bg-blue-700" onClick={()=>navigate("/register")}>Register</span>
      </div>

      <div className="flex items-center justify-center bg-gray-100 w-120 py-10 rounded-2xl">
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <Input 
            label="Email"
            value = {email}
            onChange = {(event)=>{setEmail(event.target.value)}}
          ></Input>

          <Input 
            label="Password" 
            type="password"
            value = {password}
            onChange = {(event)=>{setPassword(event.target.value)}}
          ></Input>

          <div className="flex items-center p-2">
            <input type="checkbox" className="w-4 h-4 ml-2" id="remember" />
            <label className="text-xs ml-2">Remember me</label>

            <span className="text-blue-600 hover:bg-blue-300 active:bg-blue-700 text-xs ml-33" onClick={()=>navigate("/find")}>Forget your password?</span>
          </div>

          <Button type="submit">Submit</Button>
          
        </form>
      </div>
    </div>
  )
}

export default LoginPage;