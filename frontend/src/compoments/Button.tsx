type Buttonprops = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

function Button({children, onClick, type, className, disabled}: Buttonprops) {
  return (
    <button 
      onClick= {onClick}
      type={type}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  )
}

export default Button;