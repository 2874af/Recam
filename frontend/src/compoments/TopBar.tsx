import { useNavigate } from "react-router-dom";
import logo from "../assets/recam.png"
import ButtonTag from "./ButtonTag";

type TopBarProps ={
  children?: React.ReactNode;
}

function TopBar({children}: TopBarProps){
  const navigate = useNavigate();
  
  return(
    <div className="bg-[#0085c9] w-full flex items-center px-20 gap-3">
      <img src={logo} alt="logo" className="w-13 h-13"/>
      {children}
      <ButtonTag className="ml-auto text-white font-bold" onClick={()=>navigate("/")}>Exit</ButtonTag>
    </div>
  )
}

export default TopBar;