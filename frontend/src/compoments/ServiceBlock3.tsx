type BlockProps ={
  icon: React.ReactNode;
  tag: string;
}

function ServiceBlock3({icon, tag}: BlockProps){
  return (
    <div className="w-35 py-1 flex bg-gray-200 rounded-lg justify-center items-center gap-2">
      <div className="w-4 h-4">
        {icon}
      </div>
      <span className="text-sm">{tag}</span>
    </div>
  )
}

export default ServiceBlock3;