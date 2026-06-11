type Message = {
  content: string;
  onClose: ()=>void;
}

function Error({content, onClose}: Message){
  return(
    <div className=" bg-gray-200 text-gray-500 font-medium fixed flex items-center h-8 w-full px-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-red-500 mr-2 font-bold">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>

      {content}

      <button 
        className="ml-auto flex justify-center items-center border w-4 h-4 text-xs border-gray-300 bg-gray-500 text-white rounded hover:bg-gray-700 active:bg-gray-800 transition-colors"
        onClick={onClose}
      >X</button>
    </div>
  )
}

export default Error;

