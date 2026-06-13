import { twMerge } from 'tailwind-merge';

type Inputprops = {
  label: string;
  label2?: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

function Input({label, label2, type, value, placeholder, onChange, className}: Inputprops){
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <label className="px-2 text-sx text-left font-bold">{label}</label>
        <label className="text-red-500">{label2}</label>
      </div>

      <input
        className={twMerge("w-100 rounded-lg border bg-white border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500", className)}
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