import { useNavigate } from "react-router-dom";
import Button from "../compoments/Button";
import logo from "../assets/recam.png"


function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#0085c9] w-full flex items-center">
        <img src={logo} alt="logo" className="w-13 h-13 ml-8"/>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-5">
        <h1>Welcome!</h1>
        <div className="flex gap-3 justify-center">
          <Button onClick={()=>navigate("/login")}>Sign In</Button>
          <Button onClick={()=>navigate("/register")}>Sign Up</Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage;