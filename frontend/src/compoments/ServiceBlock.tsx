type BlockProps ={
  icon: React.ReactNode;
  tag: string;
}

function ServiceBlock({icon, tag}: BlockProps){
  return (
    <div className="w-37 h-10 flex bg-blue-200 rounded-lg justify-center items-center gap-2">
      <div className="w-4 h-4">
        {icon}
      </div>
      <span className="text-sm">{tag}</span>
    </div>
  )
}

export default ServiceBlock;