type ServicesProps = {
  icon: React.ReactNode;
  service: string;
  status: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

function Services({icon, service, status, setter}:ServicesProps){
  return (
    <button 
      type="button"
      className={`w-44 h-13 flex border border-black rounded-lg justify-center items-center hover:border-2 hover:border-blue-500 active:border-2 active:border-blue-600 ${
        status
          ? " bg-blue-200"
          : " bg-white"
      }`}
      onClick={()=>{
        setter(!status)
      }}
    >
      <div className="flex gap-1 items-center">
        <div className="w-4 h-4">
          {icon}
        </div>
        <span className="text-sm">{service}</span>
      </div>
    </button>
  )
}

export default Services;