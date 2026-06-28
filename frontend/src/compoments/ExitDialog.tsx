import Button from "./Button";

type ExitDialogProps = {
  onClose: ()=>void;
  onClick: ()=>void;
}


function ExitDialog({onClick, onClose}:ExitDialogProps){
  return (
    <div className="inset-0 fixed bg-black/40 flex justify-center items-center">
      <div className="flex flex-col bg-white pt-20 pb-14 rounded-2xl w-[40%] items-center px-10 relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={onClose} className="size-6 text-gray-400 rounded absolute right-6 top-6  hover:bg-gray-100 active:bg-gray-200">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
        <p className="font-bold text-3xl">Exit Without Completing?</p>
        <p className="text-gray-500 mt-4 mb-10">The information will be lost if you exit. Continue editing?</p>

        <div className="flex gap-8">
          <button 
            onClick= {onClick}
            className={`px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-200 active:bg-blue-400 transition-colors disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:active:bg-gray-400 w-40 h-12`}
          >
            Still Exit
          </button>
          <Button onClick={onClose} className="w-40 h-12">Continue Editing</Button>
        </div>
      </div>
    </div>
  )
}

export default ExitDialog;