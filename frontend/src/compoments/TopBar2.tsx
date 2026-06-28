import type { Section } from "../pages2/ShowPage";

type TopBarProps ={
  choice: string;
  onClick: (id:string) => void;
  photo: boolean;
  video:boolean;
  floor: boolean;
  vr: boolean;
  sections: Section[];
  preview: boolean;
  description: boolean;
  selectedPhoto: boolean;
  selectedFloor: boolean;
  selectedVideo: boolean;
  selectedAgent: boolean;
}

function TopBar2({choice, onClick, photo, video, floor, vr, sections, preview, selectedAgent, selectedFloor, selectedPhoto, selectedVideo, description}:TopBarProps){
  return (
    <div className="hidden w-full h-15 bg-white/75 sm:flex items-center py-7 justify-center gap-2 fixed top-15 z-100 ">
      {sections.map((section, index)=>(
        <div key={index}>
          {section.id === "description" && (preview === false || (preview === true && description && 
            sections.find(s => s.id === "description")?.visible === true
          )) &&
            <div onClick={()=>onClick("description")} className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
              choice === "description"
                ? "bg-gray-300"
                : "bg-opacity"
            }`}>
              <span>Description</span>
            </div>
          }

          {photo && section.id === "photo" && (preview === false || (preview === true && selectedPhoto && 
            sections.find(s => s.id === "photo")?.visible === true
          )) &&
            <div onClick={()=>onClick("photo")} className={`w-34 flex justify-center items-center rounded-lg hover:bg-gray-200 active:bg-gray-300 py-1 ${
              choice === "photo"
                ? "bg-gray-300"
                : "bg-opacity"
            }`}>
              <span>Photography</span>
            </div>
          }

          {floor && section.id === "floor" && (preview === false || (preview === true && selectedFloor && 
              sections.find(s => s.id === "floor")?.visible === true
            )) &&
            <div onClick={()=>onClick("floor")} className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
              choice === "floor"
                ? "bg-gray-300"
                : "bg-opacity"
            }`}>
              <span>Floor Plan</span>
            </div>
          }

          {video && section.id === "video" && (preview === false || (preview === true && selectedVideo && 
              sections.find(s => s.id === "video")?.visible === true
            )) &&
            <div onClick={()=>onClick("video")} className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
              choice === "video"
                ? "bg-gray-300"
                : "bg-opacity"
            }`}>
              <span>Videography</span>
            </div>
          }

          {vr && section.id === "vr" &&
            <div onClick={()=>onClick("vr")} className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
              choice === "video"
                ? "bg-gray-300"
                : "bg-opacity"
            }`}>
              <span>VR</span>
            </div>
          }

          {section.id === "location" && (preview === false || (preview === true &&
              sections.find(s => s.id === "location")?.visible === true
            )) &&
            <div onClick={()=>onClick("location")} className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
              choice === "location"
                ? "bg-gray-300"
                : "bg-opacity"
            }`}>
              <span>Location</span>
            </div>
          }

          {section.id === "contact" && (preview === false || (preview === true && selectedAgent && 
              sections.find(s => s.id === "contact")?.visible === true
            )) &&
            <div onClick={()=>onClick("contact")} className={`w-34 flex justify-center items-center rounded-lg py-1 hover:bg-gray-200 active:bg-gray-300 ${
              choice === "contact"
                ? "bg-gray-300"
                : "bg-opacity"
            }`}>
              <span>Contact</span>
            </div>
          }
        </div>
      ))}
    </div>
  )
}

export default TopBar2;