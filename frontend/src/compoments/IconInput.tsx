type IconInputProps={
  icon: React.ReactNode;
  placeholder: string;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=>void;
  value: string;
}

function IconInput({icon, placeholder, className, value, onChange}:IconInputProps){
  return (
    <div className={`flex items-center relative justify-center ${className}`}>
      {icon}

      <input 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-100 pl-10 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:placeholder:opacity-0 focus:ring-2 focus:ring-blue-500 "
      ></input>
    </div>
  )
  
}

export default IconInput;