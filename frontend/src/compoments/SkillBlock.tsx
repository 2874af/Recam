
type SkillBlockProps = {
  icon: React.ReactNode;
  tag: string;
  className?: string;
  onClick: ()=>void
}

function SkillBlock({icon, tag, className, onClick}: SkillBlockProps){
  return (
    <div className={`flex flex-col items-center w-36 h-38 pb-5 pt-6 px-3 rounded-xl gap-4 hover:border-2 border-blue-400 active:border-2 active:border-blue-500 ${className}`} onClick={onClick}>
      {icon}

      <span>{tag}</span>
    </div>
  )
}

export default SkillBlock;