type LabelInputProps={
  icon: React.ReactNode;
  placeholder: string;
  className?: string;
  label: string;
  value:string;
  onChange: (event:React.ChangeEvent<HTMLInputElement>)=>void
}

function LabelInput({icon, placeholder, className, label, value, onChange}:LabelInputProps){
  return (
    <div className={`flex flex-col gap-2 relative ${className}`}>
      <label className="px-1 text-sx text-left text-medium font-bold">{label}</label>
      
      <span className="absolute left-3 top-11 text-gray-500">
        {icon}
      </span>

      <input 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-12 bg-gray-100 pl-11 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:placeholder:opacity-0 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 "
      ></input>
    </div>
  )
  
}

export default LabelInput;