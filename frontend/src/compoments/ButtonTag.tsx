type ButtonTagProps ={
  children: React.ReactNode;
  onClick: ()=>void;
  className?: string
}

function ButtonTag({children, onClick, className}: ButtonTagProps){
  return (
    <button 
      className={`  hover:text-gray-200 active:text-gray-300 px-2 py-1 rounded ${className}`}
      onClick={onClick}
      
    >
      {children}
    </button>
  )
}

export default ButtonTag;