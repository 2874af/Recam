type Buttonprops = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

function Button({children, onClick, type, className}: Buttonprops) {
  return (
    <button 
      onClick= {onClick}
      type={type}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:bg-blue-800 transition-colors ${className}`}
    >
      {children}
    </button>
  )
}

export default Button;