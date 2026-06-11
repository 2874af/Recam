type Inputprops = {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

function Input({label, type, value, placeholder, onChange}: Inputprops){
  return (
    <div className="flex flex-col gap-2">
      <label className="px-3 text-sx text-left font-medium">{label}</label>

      <input
        className="w-100 rounded-lg border bg-white border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      >
      </input>
    </div>
  )
}

export default Input;