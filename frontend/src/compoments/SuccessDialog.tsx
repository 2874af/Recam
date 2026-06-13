import Button from "./Button";

type SuccessDialogProps = {
  word1: string;
  onClick: ()=>void;
  word2: string;
}

function SuccessDialog({word1, onClick, word2}:SuccessDialogProps){
  return (
    <div className="inset-0 fixed bg-black/40 flex justify-center items-center">
      <div className="flex flex-col bg-white pt-20 pb-14 rounded-2xl px-38 items-center">
        <p className="font-bold text-3xl pb-20">{word1}</p>

        <Button onClick={onClick} className="w-40 h-12">{word2}</Button>
      </div>
    </div>
  )
}

export default SuccessDialog;