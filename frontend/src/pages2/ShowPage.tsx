import Cover from "../assets/Cover.png";
import Puppy from "../assets/Puppy.png";
import Star from "../assets/Star.png";
import Bieber from "../assets/Bieber.png";
import Micheal from "../assets/Micheal.png";
import Black from "../assets/Black.png";
import All from "../assets/All.png";
import Hi from "../assets/Hi.png";
import News from "../assets/News.png";
import Flower from "../assets/Flower.png";
import Her from "../assets/Her.png";
import InforBlock2 from "../compoments/InforBlock2";
import { BedDouble, Bath, CarFront, Grid2x2Plus } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import map from "../assets/map.png"
import MenuDialog from "../compoments/MenuDialog";
import DownloadDialog from "../compoments/DownloadDialog";
import PhotoDisplayDialog from "../compoments/PhotoDisplayDialog";
import { useNavigate } from "react-router-dom";
import TopBar2 from "../compoments/TopBar2";
import PropertyDetailDialog2 from "../compoments/PropertyDetailDialog2";
import DescriptionDialog from "../compoments/DescriptionDialog";
import SelectCoverDialog from "../compoments/SelectCoverDialog";
import SelectPhotoDialog from "../compoments/SelectPhotoDialog";
import SelectFloorDialog from "../compoments/SelectFloorDialog";
import SelectVideoDialog from "../compoments/SelectVideoDialog";
import CreateAgentDialog from "../compoments/CreateAgentDialog";
import CreateAgentDialog2 from "../compoments/CreateAgentDialog2";
import { Mail, Phone } from 'lucide-react';
import EditAgentDialog from "../compoments/EditAgentDialog";
import ContactAgentDialog from "../compoments/ContactAgentDialog";

export type Section ={
  id: string;
  visible: boolean;
}

export type Selector ={
  url: string;
  isSelected: boolean
}

export type AgentType = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  office: string;
  media: string;
  isSelected: boolean
}


function ShowPage(){
  const agent1 = {
    firstname: "Justin",
    lastname: "Bieber",
    email: "justin@outlook.com",
    phone: "12345678",
    office: "RayWhite",
    isSelected: false,
    media: Cover,
  };

  const agent2 = {
    firstname: "Micheal",
    lastname: "Jackson",
    email: "micheal@outlook.com",
    phone: "12345678",
    office: "RayWhite",
    isSelected: false,
    media: Hi,
  }

  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [menu, setMenu] = useState(false);
  const [download, setDownload] = useState(false);
  const [choice, setChoice] = useState("");
  const [pnum, setPnum] = useState(16);
  const [wnum, setWnum] = useState(16);
  const [vnum, setVnum] = useState(1);
  const [fnum, setFnum] = useState(1);
  const [ppage, setPpage] = useState(0);
  const [popen, setPopen] = useState(false);
  const [photo, setPhoto] = useState<string[]>([Cover,Puppy,Her, Star, Bieber, Micheal, Black, Hi, News, All, Flower]);
  const [video, setVideo] = useState<string[]>([
    Cover, Bieber, All, Puppy, Hi
  ]);
  const [vopen, setVopen] = useState(false);
  const [vpage, setVpage] = useState(0);
  const [floor, setFloor] = useState<string[]>([
    Cover, News, Black, Bieber, Flower
  ]);
  const [fopen, setFopen] = useState(false);
  const [fpage, setFpage] = useState(0);
  const [vr, setVr] = useState<string[]>([]);
  const [edit, setEdit] = useState(false);
  const [detail, setDetail] = useState(false);
  const [des, setDes] = useState(false);
  const [cover, setCover] = useState("");
  const [ophoto, setOphoto] = useState<Selector[]>([]);
  const [ofloor, setOfloor] = useState<Selector[]>([]);
  const [ovideo, setOvideo] = useState<Selector[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string[]>(photo);
  const [selectedFloor, setSelectedFloor] = useState<string[]>(floor);
  const [selectedVideo, setSelectedVideo] = useState<string[]>(video);
  const [selectc, setSelectc] = useState(false);
  const [selectp, setSelectp] = useState(false);
  const [selectf, setSelectf] = useState(false);
  const [selectv, setSelectv] = useState(false);
  const [aopen, setAopen] = useState(false);
  const [editAgent, setEditAgent] = useState(false);
  const [createAgent, setCreateAgent] = useState(false);
  const [agent, setAgent] = useState<AgentType[]>([agent1, agent2, agent1, agent2, agent1, agent1, agent2, agent1]);
  const [selectedAgent, setSelectedAgent] = useState<AgentType[]>([]);

  //const [debugLine, setDebugLine] = useState(30);
  const [pstatus, setPstatus] = useState<"sale" | "auction" | "rent">("sale");
  const [type, setType] = useState<"house" | "townhouse" | "villa" | "apartment" | "others">("house");
  const [bed, setBed] = useState(2);
  const [car, setCar] = useState(2);
  const [bath, setBath] = useState(2);
  const [area, setArea] = useState(119);
  const [address, setAddress] = useState("Forsyth Street");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [post, setPost] = useState("");

  const [media, setMedia] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [office, setOffice] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [aindex, setAindex] = useState(0);

  const [preview, setPreview] = useState(false);
  const [contact, setContact] = useState(false);
  const [expand, setExpand] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const descriptionRef = useRef<HTMLDivElement | null>(null);


  const [sections, setSections] = useState<Section[]>([
    {id:"description", visible:true},
    {id:"photo", visible:true},
    {id:"floor", visible:true},
    {id:"video", visible:true},
    {id:"location", visible: true},
    {id:"contact", visible: true}
  ])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const detectLinePercent = id === "location" ? 0.5 : 0.3;
    const detectLine = window.innerHeight * detectLinePercent;

    const elementTop = element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: elementTop - detectLine + 30,
      behavior: "smooth",
    });
  };

  const moveUp = (id: string) => {
    const index = sections.findIndex(section => section.id === id);
    if (index === 0){
      return false;
    } else {
      const newSections = [...sections];
      const temp = newSections[index];
      newSections[index] = newSections[index - 1];
      newSections[index - 1] = temp;
      setSections(newSections);
      console.log(newSections);
      return true;
    }
  }

  const moveDown = (id:string) => {
    const index = sections.findIndex(section => section.id === id);
    if(index === sections.length - 1){
      return false;
    } else {
      const newSections = [...sections]
      const temp = newSections[index + 1];
      newSections[index + 1] = newSections[index];
      newSections[index] = temp;
      setSections(newSections);
      console.log(newSections);
      return true;
    }
  }


  const setVisible = (id:string) => {
    const newSections = sections.map(section => 
      section.id === id
        ? {...section, visible: !section.visible}
        : section
    )

    setSections(newSections);
    console.log(newSections);
  }

  useEffect(()=>{
    const element = descriptionRef.current;

    if (element) {
      setIsOver(element.scrollHeight > element.clientHeight);
    }
  }, [description])

  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      const distanceToBottom = pageHeight - (scrollTop + windowHeight);

      const isNearBottom = distanceToBottom < windowHeight * 0.5;

      const detectLinePercent = isNearBottom ? 70 : 30;
      //setDebugLine(detectLinePercent);

      const detectLine = windowHeight * (detectLinePercent / 100);

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();

        const isLineInsideSection =
          rect.top <= detectLine && rect.bottom > detectLine;

        if (isLineInsideSection) {
          setChoice(section.id);
          break;
        } else {
          setChoice("");
        }
      }

      const isAtBottom =
        scrollTop + windowHeight >= pageHeight - 5;

      if (isAtBottom) {
        setChoice(sections[sections.length - 1].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  useEffect(()=>{
    const allPhotos = photo.map(p => (
      {url: p, isSelected: false}
    ))

    setOphoto(allPhotos);

    const allFloors = floor.map(f => (
      {url: f, isSelected: false}
    ))

    setOfloor(allFloors);

    const allVideos = video.map(v => (
      {url: v, isSelected: false}
    ))

    setOvideo(allVideos);
  },[])


  return (
    <div className="flex flex-col items-center pb-6">
      {/* <div
        className="fixed left-0 right-0 h-0.5 bg-red-500 z-9999"
        style={{ top: `${debugLine}vh` }}
      /> */}
      <div className="bg-black h-12 flex items-center px-7 w-full z-50 sticky top-0 sm:hidden">
        <svg onClick={()=>setMenu(true)} className="w-8 h-8 text-white hover:text-gray-300 active:text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 6H19" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 12H19" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 18H19" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        {(!edit && !preview) 
          ?
          <button onClick={()=>setDownload(true)} className="bg-white text-black flex gap-2 rounded-2xl py-0.5 px-3 items-center ml-auto hover:bg-gray-300 active:bg-gray-500">
            <svg width="19" height="19" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_25_62)">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.00008 0.729126C3.5368 0.729126 0.729248 3.53667 0.729248 6.99996C0.729248 10.4633 3.5368 13.2708 7.00008 13.2708C10.4634 13.2708 13.2709 10.4633 13.2709 6.99996C13.2709 3.53667 10.4634 0.729126 7.00008 0.729126ZM7.58342 4.08329C7.58342 3.76113 7.32226 3.49996 7.00008 3.49996C6.67791 3.49996 6.41675 3.76113 6.41675 4.08329V5.83329H5.54175C5.30581 5.83329 5.09311 5.97545 5.00282 6.19338C4.91253 6.41138 4.96244 6.66227 5.12927 6.8291L6.58761 8.28743C6.8154 8.51529 7.18476 8.51529 7.41256 8.28743L8.87089 6.8291C9.03772 6.66227 9.08766 6.41138 8.99736 6.19338C8.90706 5.97545 8.69437 5.83329 8.45842 5.83329H7.58342V4.08329ZM5.24438 9.04163C4.92222 9.04163 4.66105 9.30278 4.66105 9.62496C4.66105 9.94713 4.92222 10.2083 5.24438 10.2083H8.74437C9.06654 10.2083 9.3277 9.94713 9.3277 9.62496C9.3277 9.30278 9.06654 9.04163 8.74437 9.04163H5.24438Z" fill="#001C2A"/>
              </g>
              <defs>
              <clipPath id="clip0_25_62">
              <rect width="14" height="14" fill="white"/>
              </clipPath>
              </defs>
            </svg>

            <span>Download</span>
          </button>
          :
          <div className="flex-1 flex gap-2">
            <button onClick={()=>{
              setEdit(false);
              setPreview(false);
            }} className="text-white border border-white px-3 text-sm py-0.5 rounded-2xl ml-auto">
              Exit
            </button>

            <button className="text-white border border-white px-3 text-sm py-0.5 rounded-2xl">
              Publish
            </button>
          </div>
        }
      </div>

      <div className="hidden sm:flex h-15 w-full items-center px-6 sticky top-0 bg-white z-50">
        <div className="flex gap-5 items-center flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={()=>navigate("/agentdashboard")} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-7 hover:text-gray-300 active:text-gray-500`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>

          <button onClick={()=>setDownload(true)} className={`bg-blue-500 text-white font-medium flex gap-2 rounded-3xl py-1.5 px-3 items-center hover:bg-blue-600 active:bg-blue-700 ${edit ? "hidden" : "block"}`}>
            <svg width="19" height="19" viewBox="0 0 14 14" fill="white" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_25_62)">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.00008 0.729126C3.5368 0.729126 0.729248 3.53667 0.729248 6.99996C0.729248 10.4633 3.5368 13.2708 7.00008 13.2708C10.4634 13.2708 13.2709 10.4633 13.2709 6.99996C13.2709 3.53667 10.4634 0.729126 7.00008 0.729126ZM7.58342 4.08329C7.58342 3.76113 7.32226 3.49996 7.00008 3.49996C6.67791 3.49996 6.41675 3.76113 6.41675 4.08329V5.83329H5.54175C5.30581 5.83329 5.09311 5.97545 5.00282 6.19338C4.91253 6.41138 4.96244 6.66227 5.12927 6.8291L6.58761 8.28743C6.8154 8.51529 7.18476 8.51529 7.41256 8.28743L8.87089 6.8291C9.03772 6.66227 9.08766 6.41138 8.99736 6.19338C8.90706 5.97545 8.69437 5.83329 8.45842 5.83329H7.58342V4.08329ZM5.24438 9.04163C4.92222 9.04163 4.66105 9.30278 4.66105 9.62496C4.66105 9.94713 4.92222 10.2083 5.24438 10.2083H8.74437C9.06654 10.2083 9.3277 9.94713 9.3277 9.62496C9.3277 9.30278 9.06654 9.04163 8.74437 9.04163H5.24438Z" fill="white"/>
              </g>
              <defs>
              <clipPath id="clip0_25_62">
              <rect width="14" height="14" fill="white"/>
              </clipPath>
              </defs>
            </svg>

            <span>Download Files</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={()=>{
            setEdit(false);
            setPreview(false);
          }} className={`border-2 border-black flex items-center justify-center rounded-3xl py-1.5 gap-1 w-30 text-sm hover:bg-gray-200 active:bg-gray-400 ${(edit || preview) ? "block" : "hidden"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
            <span>Exit</span>
          </button>

          <button onClick={()=>{
            setEdit(true);
            setPreview(false);
          }} className={`border-2 border-black flex items-center justify-center rounded-3xl py-1.5 gap-1 w-30 text-sm hover:bg-gray-200 active:bg-gray-400 ${edit ? "hidden" : "block"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
            <span>Edit</span>
          </button>

          <button onClick={()=>{
            setPreview(true);
            setEdit(false);
          }} className={`border-2 border-black flex items-center justify-center rounded-3xl py-1.5 gap-1 w-30 text-sm hover:bg-gray-200 active:bg-gray-400 ${preview ? "hidden" : "block"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
            </svg>
            <span>Preview</span>
          </button>

          <button className={`border-2 border-black flex items-center justify-center rounded-3xl py-1.5 gap-1 w-30 text-sm hover:bg-gray-200 active:bg-gray-400`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
            </svg>

            <span>Copy Link</span>
          </button>

          <button className="border-2 border-black flex items-center justify-center rounded-3xl py-1.5 gap-1 w-30 text-sm hover:bg-gray-200 active:bg-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
            </svg>
            <span>Publish</span>
          </button>
        </div>

      </div>

      {choice && <TopBar2 description={description !== ""} preview={preview} selectedAgent={selectedAgent.length !== 0} selectedFloor={selectedFloor.length !== 0} selectedPhoto={selectedPhoto.length !== 0} selectedVideo={selectedVideo.length !== 0}  choice={choice} onClick={scrollTo} photo={photo.length !== 0} video={video.length !== 0} vr={vr.length !== 0} floor={floor.length !== 0} sections={sections} />}

      <div className="w-full h-70 overflow-hidden relative sm:hidden">
        {edit &&
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center gap-3">
            <button onClick={()=>setSelectc(true)} className="flex bg-white px-4 py-1 rounded-lg gap-1 font-medium items-center hover:bg-gray-200 active:bg-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
              <span>Edit</span>
            </button>

            <span className="text-sm text-gray-200">Select a cover media to be displayed on the first page</span>
          </div>
        }
        <img src={cover ? cover : photo[0] } alt="cover" className="w-full"/>
      </div>

      <div className="flex flex-col items-center w-full pb-8 border border-gray-100 relative sm:hidden">
        {edit &&
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center gap-3">
              <button onClick={()=>setDetail(true)} className="flex bg-white px-4 py-1 rounded-lg gap-1 font-medium items-center hover:bg-gray-200 active:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" 
                />
              </svg>
              <span>Edit</span>
            </button>

            <span className="text-sm text-gray-200">Add property details</span>
          </div>
        }

        <div className="bg-gray-200 px-4 rounded-lg mt-8">
          <span className="text-sm text-gray-500">Apartment for rent</span>
        </div>

        <div className="flex flex-col items-center pt-10">
          <span className="text-4xl font-['Playfair_Display'] font-bold">93 Beach Road</span>
          <span className="pt-1.5 text-gray-600">North Bondi, NSW, 2026</span>
        </div>

        <div className="border-b border-black w-11 my-10"></div>

        <div className="flex gap-4 sm:hidden"> 
          <InforBlock2 icon={<BedDouble className="w-5 h-5"/>} num={1} item="Bed" />
          <InforBlock2 icon={<Bath className="w-5 h-5"/>} num={2} item="Bath" />
          <InforBlock2 icon={<CarFront className="w-5 h-5"/>} num={1} item="Garage" />
          <InforBlock2 icon={<Grid2x2Plus className="w-5 h-5" />} num={1} item="m²" />
        </div>
      </div>

      <div className="hidden sm:flex h-[68vh] w-full">
        <div className="w-[62%] h-full relative">
          {edit && 
            <div className={`absolute inset-0 bg-black/40 flex flex-col justify-center items-center gap-3 w-full ${edit ? "border-r-7 border-gray-100" : "border-0"}`}>
              <button onClick={()=>setSelectc(true)} className="flex bg-white px-4 py-1 rounded-lg gap-1 font-medium items-center hover:bg-gray-200 active:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                <span>Edit</span>
              </button>

              <span className="text-sm text-gray-200">Select a cover media to be displayed on the first page</span>
            </div>
          }
          <img src={cover ? cover : photo[0] } alt="cover page" className={`w-full h-full object-cover`} />
        </div>

        <div className="h-full flex-1 bg-amber-950 flex flex-col items-center pb-18 pt-14 relative">
          {edit && 
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center gap-3 w-full">
              <button className="flex bg-white px-4 py-1 rounded-lg gap-1 font-medium items-center hover:bg-gray-200 active:bg-gray-300" onClick={()=>setDetail(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                <span>Edit</span>
              </button>

              <span className="text-sm text-gray-200">Add property details</span>
            </div>
          }

          <div className="bg-white/20 px-4 py-0.5 rounded-lg">
            <span className="text-sm text-white">Apartment for Rent</span>
          </div>

          <div className="flex flex-col items-center pt-10">
            <span className="text-4xl font-['Playfair_Display'] font-bold text-white">93 Beach Road</span>
            <span className="pt-1.5 text-white">North Bondi, NSW, 2026</span>
          </div>

          <div className="border-b border-2 border-white w-11 mt-28"></div>

          <div className="flex gap-4 mt-auto"> 
            <InforBlock2 icon={<BedDouble className="w-5 h-5"/>} num={1} item="Bed" />
            <InforBlock2 icon={<Bath className="w-5 h-5"/>} num={2} item="Bath" />
            <InforBlock2 icon={<CarFront className="w-5 h-5"/>} num={1} item="Garage" />
            <InforBlock2 icon={<Grid2x2Plus className="w-5 h-5" />} num={1} item="m²" />
          </div>
        </div>
      </div>
      
      {sections.map((section, index)=>(
        <div key={index} className="w-full">
          {section.id === "description" && (preview === false || (preview === true && description !== "" && 
            sections.find(s => s.id === "description")?.visible === true
           )) &&
            <div id="description" className="flex relative flex-col items-center justify-center px-7 sm:px-50 pt-6 pb-8 border-t border-b border-gray-100 w-full sm:mt-0 sm:pt-12 sm:pb-10 sm:gap-3 sm:border-b-7 sm:border-t-7 ">
              {edit &&
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center gap-3">
                  <div className="flex absolute right-3 top-2 gap-1 sm:top-3 sm:right-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === 0 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`} onClick={()=>moveUp("description")}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                    </svg>

                    <svg onClick={()=>moveDown("description")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === sections.length - 1 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setVisible("description")} viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${section.id === "description" && section.visible === false ? "text-black/40 hover:text-black/30 active:text-black/20" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <button className="flex bg-white px-4 py-1 rounded-lg gap-1 font-medium items-center hover:bg-gray-200 active:bg-gray-300" onClick={()=>setDes(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    <span>Edit</span>
                  </button>

                  <span className="text-sm text-gray-200">Add property description</span>
                </div>
              }

              <span className="font-['Playfair_Display'] font-bold text-xl pb-4 sm:text-3xl">Property Description</span>
              <div ref={descriptionRef} className={`text-xs text-gray-500 font-light sm:text-sm ${!expand ? "line-clamp-3" : "" }`}>{`${description ? description : "Please add property description here" }`}</div>

              <div className="w-full flex justify-center gap-3">
                {!preview && <span onClick={()=>setDes(true)} className="underline text-xs pt-3 hover:text-gray-400 active:text-gray-500 sm:text-sm">Click to add</span>}

                {isOver && 
                  <span onClick={()=>setExpand(prev => !prev)} className="font-bold underline text-xs pt-3 hover:text-gray-400 active:text-gray-500 sm:text-sm">{expand ? "Read less" : "Read more"}</span>
                }
              </div>

              {preview && 
                <button onClick={()=>setContact(true)} className="flex absolute bottom-3 sm:bottom-8 sm:bg-blue-500 sm:hover:bg-blue-600 sm:active:bg-blue-700 sm:right-10 right-4 bg-black items-center gap-1 py-1.5 px-2.5 sm:py-2.5 sm:px-3.5 rounded-lg hover:bg-gray-700 active:bg-gray-600 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:active:bg-gray-400" disabled={selectedAgent.length === 0}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>

                  <span className="text-white text-xs">Contact</span>
                </button>
              }

            </div>
          }

          {photo.length > 0 && section.id === "photo" && (preview === false || (preview === true && selectedPhoto.length !== 0 && 
            sections.find(s => s.id === "photo")?.visible === true
          ) ) &&
            <div id="photo" className="flex flex-col items-center py-6 w-full relative sm:py-11">
              {edit && 
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center gap-3 z-30">
                  <div className="flex absolute right-3 top-2 gap-1 sm:top-3 sm:right-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === 0 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`} onClick={()=>moveUp("photo")}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>moveDown("photo")} viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === sections.length - 1 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>setVisible("photo")} viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${section.id === "photo" && section.visible === false ? "text-black/40 hover:text-black/30 active:text-black/20" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>

                  </div>
                  <button onClick={()=>setSelectp(true)} className="flex bg-white px-4 py-1 rounded-lg gap-1 font-medium items-center hover:bg-gray-200 active:bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    <span>Edit</span>
                  </button>

                  <span className="text-sm text-gray-200">Select photos you want to display here</span>
                </div>
              }

              <span className="font-['Playfair_Display'] font-bold text-xl pb-4 sm:text-3xl">Photography</span>

              {selectedPhoto.length === 1 && 
                <div className="w-full h-60 px-2 lg:px-60 sm:h-150" onClick={()=>{
                  setPpage(0);
                  setPopen(true);
                }}>
                  <img src={selectedPhoto[0]} alt="photo" className="w-full h-full object-cover" />
                </div>
              }

              {selectedPhoto.length === 2 && 
                <div className="px-2 w-full gap-2 flex lg:px-60">
                  {selectedPhoto.map((p, index) => (
                    <div className="w-full h-30 sm:h-130" key={index} onClick={()=>{
                      setPpage(index);
                      setPopen(true);
                    }}>
                      <img src={p} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              }

              {selectedPhoto.length === 3 && 
                <div className="px-2 w-full gap-2 flex flex-col lg:px-60">
                  <div className="w-full h-50 sm:h-150" onClick={()=>{
                    setPpage(0);
                    setPopen(true);
                  }}>
                    <img src={selectedPhoto[0]} alt="photo" className="w-full h-full object-cover" />
                  </div>

                  <div className="w-full h-30 grid grid-cols-2 gap-2 sm:h-80">
                    <img src={selectedPhoto[1]} alt="photo" className="w-full h-30 sm:h-80 object-cover" onClick={()=>{
                      setPpage(1);
                      setPopen(true);
                    }}/>
                    <img src={selectedPhoto[2]} alt="photo" className="w-full h-30 sm:h-80 object-cover" onClick={()=>{
                      setPpage(2);
                      setPopen(true);
                    }}/>
                  </div>
                </div>
              }

              {selectedPhoto.length === 4 && 
                <div className="px-2 w-full gap-2 grid grid-cols-2 lg:px-60">
                  {selectedPhoto.map((p, index) => (
                    <div className="w-full h-full sm:h-90" key={index} onClick={()=>{
                      setPpage(index);
                      setPopen(true);
                    }}>
                      <img src={p} alt="photo" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              }

              {selectedPhoto.length === 5 && 
                <div className="px-2 w-full gap-2 flex flex-col lg:px-60">
                  <div className="grid grid-cols-[3fr_2fr] gap-2 w-full">
                    <div className="w-full h-40 sm:h-100" onClick={()=>{
                      setPpage(0);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[0]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-40 sm:h-100" onClick={()=>{
                      setPpage(1);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[1]} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_1fr_1fr] w-full gap-2" >
                    <div className="w-full h-20 sm:h-70" onClick={()=>{
                      setPpage(2);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[2]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-20 sm:h-70" onClick={()=>{
                      setPpage(3);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[3]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-20 sm:h-70" onClick={()=>{
                      setPpage(4);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[4]} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              }

              {selectedPhoto.length === 6 && 
                <div className="px-2 w-full gap-2 flex flex-col lg:px-60">
                  <div className="grid grid-cols-[3fr_2fr] gap-2 w-full">
                    <div className="w-full h-40 sm:h-90" onClick={()=>{
                      setPpage(0);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[0]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-40 sm:h-90" onClick={()=>{
                      setPpage(1);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[1]} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_1fr_1fr] w-full gap-2">
                    <div className="w-full h-20 sm:h-70" onClick={()=>{
                      setPpage(2);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[2]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-20 sm:h-70" onClick={()=>{
                      setPpage(3);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[3]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-20 sm:h-70" onClick={()=>{
                      setPpage(4);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[4]} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="w-full h-45 sm:h-120" onClick={()=>{
                      setPpage(5);
                      setPopen(true);
                    }}>
                    <img src={selectedPhoto[5]} className="w-full h-full object-cover" />
                  </div>
                </div>
              }

              {selectedPhoto.length === 7 && 
                <div className="px-2 w-full gap-2 flex flex-col lg:px-60">
                  <div className="grid grid-cols-[3fr_2fr] gap-2 w-full">
                    <div className="w-full h-40 sm:h-90" onClick={()=>{
                      setPpage(0);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[0]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-40 sm:h-90" onClick={()=>{
                      setPpage(1);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[1]} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_1fr_1fr] w-full gap-2">
                    <div className="w-full h-20 sm:h-70" onClick={()=>{
                      setPpage(2);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[2]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-20 sm:h-70" onClick={()=>{
                      setPpage(3);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[3]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-20 sm:h-70" onClick={()=>{
                      setPpage(4);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[4]} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[2fr_3fr] gap-2 w-full">
                    <div className="w-full h-40 sm:h-80" onClick={()=>{
                      setPpage(5);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[5]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-40 sm:h-80" onClick={()=>{
                      setPpage(6);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[6]} className="w-full h-full object-cover" />
                    </div>
                  </div>

                </div>
              }

              {selectedPhoto.length === 8 && 
                <div className="px-2 w-full gap-2 flex flex-col lg:px-60">
                  <div className="grid grid-cols-[1fr_1fr_1fr] w-full gap-2">
                    <div className="w-full h-20 sm:h-60" onClick={()=>{
                      setPpage(0);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[0]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-20 sm:h-60" onClick={()=>{
                      setPpage(1);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[1]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-20 sm:h-60" onClick={()=>{
                      setPpage(2);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[2]} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[3fr_2fr] gap-2 w-full">
                    <div className="w-full h-40 sm:h-100" onClick={()=>{
                      setPpage(3);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[3]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-40 sm:h-100" onClick={()=>{
                      setPpage(4);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[4]} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_1fr_1fr] w-full gap-2">
                    <div className="w-full h-20 sm:h-60" onClick={()=>{
                      setPpage(5);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[5]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-20 sm:h-60" onClick={()=>{
                      setPpage(6);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[6]} className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-20 sm:h-60" onClick={()=>{
                      setPpage(7);
                      setPopen(true);
                    }}>
                      <img src={selectedPhoto[7]} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              }

              {selectedPhoto.length === 9 && 
                <div className="w-full flex flex-col">
                  <div className="flex flex-col w-full px-2 gap-2 lg:px-60">
                    <div className="grid grid-cols-[3fr_2fr] gap-2 w-full">
                      <div className="w-full h-40 sm:h-100" onClick={()=>{
                        setPpage(0);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[0]} className="w-full h-full object-cover" />
                      </div>

                      <div className="w-full h-40 sm:h-100" onClick={()=>{
                        setPpage(1);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[1]} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="grid grid-cols-[1fr_1fr_1fr] w-full gap-2">
                      <div className="w-full h-20 sm:h-60" onClick={()=>{
                        setPpage(2);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[2]} className="w-full h-full object-cover" />
                      </div>

                      <div className="w-full h-20 sm:h-60" onClick={()=>{
                        setPpage(3);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[3]} className="w-full h-full object-cover" />
                      </div>

                      <div className="w-full h-20 sm:h-60" onClick={()=>{
                        setPpage(4);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[4]} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <div className="flex px-2 mt-2 w-full lg:px-60">
                    <div className="grid grid-cols-3 w-full h-40 gap-2 sm:h-120">
                      <div className="w-full h-40 sm:h-120 grid grid-rows-2 gap-2">
                        <div className="w-full h-full" onClick={()=>{
                          setPpage(5);
                          setPopen(true);
                        }}>
                          <img src={selectedPhoto[5]} className="w-full h-full object-cover" />
                        </div>

                        <div className="w-full h-full" onClick={()=>{
                          setPpage(6);
                          setPopen(true);
                        }}>
                          <img src={selectedPhoto[6]} className="w-full h-full object-cover" />
                        </div>
                      </div>

                      <div className="w-full h-40 sm:h-120" onClick={()=>{
                        setPpage(7);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[7]} className="w-full h-full object-cover" />
                      </div>

                      <div className="w-full h-40 sm:h-120" onClick={()=>{
                        setPpage(8);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[8]} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              }

              {selectedPhoto.length > 9 && 
                <div className="w-full flex flex-col">
                  <div className="flex flex-col w-full px-2 gap-2 lg:px-60">
                    <div className="grid grid-cols-[3fr_2fr] gap-2 w-full">
                      <div className="w-full h-40 sm:h-100" onClick={()=>{
                        setPpage(0);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[0]} className="w-full h-full object-cover" />
                      </div>

                      <div className="w-full h-40 sm:h-100" onClick={()=>{
                        setPpage(1);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[1]} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <div className="grid grid-cols-[1fr_1fr_1fr] w-full gap-2">
                      <div className="w-full h-20 sm:h-60" onClick={()=>{
                        setPpage(2);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[2]} className="w-full h-full object-cover" />
                      </div>

                      <div className="w-full h-20 sm:h-60" onClick={()=>{
                        setPpage(3);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[3]} className="w-full h-full object-cover" />
                      </div>

                      <div className="w-full h-20 sm:h-60" onClick={()=>{
                        setPpage(4);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[4]} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <div className="flex px-2 mt-2 w-full lg:px-60">
                    <div className="grid grid-cols-3 w-full h-40 gap-2 lg:h-120">
                      <div className="w-full h-40 grid grid-rows-2 gap-2 lg:h-120">
                        <div className="w-full h-full" onClick={()=>{
                          setPpage(5);
                          setPopen(true);
                        }}>
                          <img src={selectedPhoto[5]} className="w-full h-full object-cover" />
                        </div>

                        <div className="w-full h-full" onClick={()=>{
                          setPpage(6);
                          setPopen(true);
                        }}>
                          <img src={selectedPhoto[6]} className="w-full h-full object-cover" />
                        </div>
                      </div>

                      <div className="w-full h-40 sm:h-120" onClick={()=>{
                        setPpage(7);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[7]} className="w-full h-full object-cover" />
                      </div>

                      <div className="w-full h-40 sm:h-120 relative" onClick={()=>{
                        setPpage(8);
                        setPopen(true);
                      }}>
                        <img src={selectedPhoto[8]} className="w-full h-full object-cover" />

                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/60 active:bg-black/70">
                          <span className="text-6xl text-white/80 font-bold">{`+${photo.length - 9}`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }

            </div>
          }

          {floor.length > 0 && section.id === "floor" && (preview === false || (preview === true && selectedFloor.length !== 0 && 
            sections.find(s => s.id === "floor")?.visible === true
          ) ) &&
            <div id="floor" className="flex flex-col items-center py-6 border-t relative border-b border-gray-100 w-full px-2 sm:border-b-7 sm:border-t-7 lg:px-60 sm:pb-12">
              {edit &&
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center gap-3 z-30">
                  <div className="flex absolute right-3 top-2 gap-1 sm:top-3 sm:right-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === 0 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`} onClick={()=>moveUp("floor")}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>moveDown("floor")} viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === sections.length - 1 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                    </svg>

                    <svg onClick={()=>setVisible("floor")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${section.visible === false && section.id === "floor" ? "text-black/40 hover:text-black/30 active:text-black/20" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <button onClick={()=>setSelectf(true)} className="flex bg-white px-4 py-1 rounded-lg gap-1 font-medium items-center hover:bg-gray-200 active:bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    <span>Edit</span>
                  </button>

                  <span className="text-sm text-gray-200">Select floor plans you want to display here</span>
                </div>
              }
              <span className="font-['Playfair_Display'] font-bold text-xl pb-4 sm:text-3xl sm:py-6">Floor Plans</span>
              
              {selectedFloor.length === 1 &&
                <div className="h-65 w-full sm:h-180" onClick={()=>{
                  setFopen(true);
                  setFpage(0);
                }}>
                  <img src={selectedFloor[0]} alt="photo" className="h-full w-full object-cover"/>
                </div>
              }

              {selectedFloor.length === 2 &&
                <div className="grid grid-cols-2 w-full gap-2">
                  <div className="w-full h-40 sm:h-100" onClick={()=>{
                    setFopen(true);
                    setFpage(0);
                  }}>
                    <img src={selectedFloor[0]} alt="photo" className="w-full h-full object-cover" />
                  </div>

                  <div className="w-full h-40 sm:h-100" onClick={()=>{
                    setFopen(true);
                    setFpage(1);
                  }}>
                    <img src={selectedFloor[1]} alt="photo" className="w-full h-full object-cover" />
                  </div>
                </div>
              }

              {selectedFloor.length === 3 &&
                <div className="flex flex-col w-full gap-2">
                  <div className="w-full h-50 sm:h-150" onClick={()=>{
                    setFopen(true);
                    setFpage(0);
                  }}>
                    <img src={selectedFloor[0]} alt="photo" className="w-full h-full object-cover" />
                  </div>

                  <div className="grid grid-cols-2 w-full gap-2">
                    <div className="w-full h-40 sm:h-100" onClick={()=>{
                      setFopen(true);
                      setFpage(1);
                    }}>
                      <img src={selectedFloor[1]} alt="photo" className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-40 sm:h-100" onClick={()=>{
                      setFopen(true);
                      setFpage(2);
                    }}>
                      <img src={selectedFloor[2]} alt="photo" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              }

              {selectedFloor.length > 3 &&
                <div className="flex flex-col w-full gap-2">
                  <div className="w-full h-50 sm:h-150" onClick={()=>{
                    setFopen(true);
                    setFpage(0);
                  }}>
                    <img src={selectedFloor[0]} alt="photo" className="w-full h-full object-cover" />
                  </div>

                  <div className="grid grid-cols-2 w-full gap-2">
                    <div className="w-full h-40 sm:h-100" onClick={()=>{
                      setFopen(true);
                      setFpage(1);
                    }}>
                      <img src={selectedFloor[1]} alt="photo" className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-40 sm:h-100 relative" onClick={()=>{
                      setFopen(true);
                      setFpage(2);
                    }}>
                      <img src={selectedFloor[2]} alt="photo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/60 active:bg-black/70">
                        <span className="text-6xl text-white/80 font-bold">{`+${floor.length - 3}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          }

          {video.length > 0 && section.id === "video" && (preview === false || (preview === true && selectedVideo.length !== 0 && 
            sections.find(s => s.id === "video")?.visible === true
          ) ) &&
            <div id="video" className="flex flex-col items-center py-6 relative border-b border-gray-100 w-full px-2 lg:px-60 sm:pb-13 sm:border-b-7">
              {edit && 
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center gap-3 z-30">
                  <div className="flex absolute right-3 top-2 gap-1 sm:top-3 sm:right-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === 0 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`} onClick={()=>moveUp("video")}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                    </svg>

                    <svg onClick={()=>moveDown("video")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === sections.length - 1 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                    </svg>

                    <svg onClick={()=>setVisible("video")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${section.visible === false && section.id === "video" ? "text-black/40 hover:text-black/30 active:text-black/20" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <button onClick={()=>setSelectv(true)} className="flex bg-white px-4 py-1 rounded-lg gap-1 font-medium items-center hover:bg-gray-200 active:bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    <span>Edit</span>
                  </button>

                  <span className="text-sm text-gray-200">Select videos you want to display here</span>
                </div>
              }

              <span className="font-['Playfair_Display'] font-bold text-xl pb-4 sm:text-3xl sm:py-6">Videography</span>
              
              {selectedVideo.length === 1 &&
                <div className="h-65 w-full sm:h-150" onClick={()=>{
                  setVopen(true);
                  setVpage(0);
                }}>
                  <img src={selectedVideo[0]} alt="photo" className="h-full w-full object-cover"/>
                </div>
              }

              {selectedVideo.length === 2 &&
                <div className="grid grid-cols-2 w-full gap-2">
                  <div className="w-full h-40 sm:h-100" onClick={()=>{
                    setVopen(true);
                    setVpage(0);
                  }}>
                    <img src={selectedVideo[0]} alt="photo" className="w-full h-full object-cover" />
                  </div>

                  <div className="w-full h-40 sm:h-100" onClick={()=>{
                    setVopen(true);
                    setVpage(1);
                  }}>
                    <img src={selectedVideo[1]} alt="photo" className="w-full h-full object-cover" />
                  </div>
                </div>
              }

              {selectedVideo.length === 3 &&
                <div className="flex flex-col w-full gap-2">
                  <div className="w-full h-50 sm:h-150" onClick={()=>{
                    setVopen(true);
                    setVpage(0);
                  }}>
                    <img src={selectedVideo[0]} alt="photo" className="w-full h-full object-cover" />
                  </div>

                  <div className="grid grid-cols-2 w-full gap-2">
                    <div className="w-full h-40 sm:h-100" onClick={()=>{
                      setVopen(true);
                      setVpage(1);
                    }}>
                      <img src={selectedVideo[1]} alt="photo" className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-40 sm:h-100" onClick={()=>{
                      setVopen(true);
                      setVpage(2);
                    }}>
                      <img src={selectedVideo[2]} alt="photo" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              }

              {selectedVideo.length > 3 &&
                <div className="flex flex-col w-full gap-2">
                  <div className="w-full h-50 sm:h-150" onClick={()=>{
                    setVopen(true);
                    setVpage(0);
                  }}>
                    <img src={selectedVideo[0]} alt="photo" className="w-full h-full object-cover" />
                  </div>

                  <div className="grid grid-cols-2 w-full gap-2">
                    <div className="w-full h-40 sm:h-100" onClick={()=>{
                      setVopen(true);
                      setVpage(1);
                    }}>
                      <img src={selectedVideo[1]} alt="photo" className="w-full h-full object-cover" />
                    </div>

                    <div className="w-full h-40 sm:h-100 relative" onClick={()=>{
                      setVopen(true);
                      setVpage(2);
                    }}>
                      <img src={selectedVideo[2]} alt="photo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-black/60 active:bg-black/70">
                        <span className="text-6xl text-white/80 font-bold">{`+${video.length - 3}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          }

          {vr.length > 0 &&
            <div id="vr" className="flex flex-col items-center py-6 border-b border-gray-100 w-full px-2">
              <span className="font-['Playfair_Display'] font-bold text-xl pb-4">VR</span>
              
              <div className="h-65 w-full">
                <img src={Cover} alt="photo" className="h-full w-full object-cover"/>
              </div>
            </div>
          }

          {section.id === "location" && (preview === false || (preview === true && 
            sections.find(s => s.id === "location")?.visible === true
          )) &&
            <div id="location" className="flex flex-col items-center py-6 relative border-b border-gray-100 w-full px-2 lg:px-60 sm:pb-12 sm:border-b-7">
              {edit && 
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center gap-3">
                  <div className="flex absolute right-3 top-2 gap-1 sm:top-3 sm:right-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === 0 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`} onClick={()=>moveUp("location")}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                    </svg>

                    <svg onClick={()=>moveDown("location")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === sections.length - 1 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                    </svg>

                    <svg onClick={()=>setVisible("location")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${section.visible === false && section.id === "location" ? "text-black/40 hover:text-black/30 active:text-black/20" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              }
              <span className="font-['Playfair_Display'] font-bold text-xl pb-4 sm:text-3xl sm:pb-6">Location</span>
              
              <div className="h-40 w-full sm:h-100">
                <img src={map} alt="photo" className="h-full w-full object-cover"/>
              </div>
            </div>
          }

          {section.id === "contact" && (preview === false || (preview === true && selectedAgent.length !== 0 && 
            sections.find(s => s.id === "contact")?.visible === true
          ) ) &&
            <div id="contact" className="flex flex-col relative items-center py-6 border-b border-gray-100 w-full sm:border-b-7 sm:pb-12 sm:pt-10 sm:gap-3">
              {edit && 
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center gap-3">
                  <div className="flex absolute right-3 top-2 gap-1 sm:top-3 sm:right-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === 0 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`} onClick={()=>moveUp("contact")}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                    </svg>

                    <svg onClick={()=>moveDown("contact")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${index === sections.length - 1 ? "text-black/40" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
                    </svg>

                    <svg onClick={()=>setVisible("contact")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 sm:size-10 ${section.visible === false && section.id === "contact" ? "text-black/40 hover:text-black/30 active:text-black/20" : "text-white hover:text-gray-200 active:text-gray-300 "}`}>
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <button onClick={()=>{
                    setAopen(true);
                  }} className="flex bg-white px-4 py-1 rounded-lg gap-1 font-medium items-center hover:bg-gray-200 active:bg-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    <span>Edit</span>
                  </button>

                  <span className="text-sm text-gray-200">Add agent contacts here</span>
                </div>
              }
              <span className="font-['Playfair_Display'] font-bold text-xl pb-4 sm:text-3xl">Contact</span>
              {selectedAgent.length === 0
                ?
                  <span className="text-xs text-gray-500 font-light pb-3 sm:text-sm">Please add agent contact information</span>
                :
                  <div className="flex flex-col w-full px-4 gap-3 sm:grid sm:grid-cols-3 sm:gap-7 sm:px-15">
                    {selectedAgent.map((a, index) => (
                      <div key={index} className="w-full h-33 bg-gray-100 flex items-center px-4 py-3 rounded-xl">
                        <img src={a.media} alt="media" className="rounded-full w-18 h-18 mr-4" />

                        <div className="w-full h-full border-l-2 border-gray-200 flex flex-col">
                          <div className="flex flex-col px-3 border-b-2 border-gray-200 h-[50%]">
                            <span className="font-bold text-lg">{`${a.firstname} ${a.lastname}`}</span>
                            <span className="text-sm text-gray-500">{a.office}</span>
                          </div>

                          <div className="flex-1 flex flex-col w-full px-3 pt-1.5 gap-1 h-[50%] justify-center">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-gray-500" />
                              <span className="text-sm text-gray-500">{a.email}</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-gray-500" />
                              <span className="text-sm text-gray-500">{a.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
              }
              {!preview && 
                <span onClick={()=>setAopen(true)} className="underline mt-3 text-xs hover:text-gray-400 active:text-gray-500 sm:text-sm">Click to add</span>
              }
            </div>
          }
        </div>
      ))}
      

      {menu && <MenuDialog description={description !== ""} selectedAgent={selectedAgent.length !== 0} selectedFloor={selectedFloor.length !== 0} selectedPhoto={selectedPhoto.length !== 0} selectedVideo={selectedVideo.length !== 0} setEdit={setEdit} setMenu={setMenu} choice={choice} onClick={scrollTo} photo={photo.length !== 0} video={video.length !== 0} vr={vr.length !== 0} floor={floor.length !== 0} sections={sections} edit={edit} preview={preview} setPreview={setPreview} />}
      {download && <DownloadDialog setDownload={setDownload} pnum={pnum} wnum={wnum} fnum={fnum} vnum={vnum} />}
      {popen && <PhotoDisplayDialog list={selectedPhoto} setOpen={setPopen} page={ppage} setPage={setPpage} />}
      {fopen && <PhotoDisplayDialog list={floor} setOpen={setFopen} page={fpage} setPage={setFpage} />}
      {vopen && <PhotoDisplayDialog list={video} setOpen={setVopen} page={vpage} setPage={setVpage} />}
      {detail && <PropertyDetailDialog2 pstatus={pstatus} type={type} bed={bed} car={car} area={area} bath={bath} setDetail={setDetail} setPstatus={setPstatus} setType={setType} setBed={setBed} setArea={setArea} setBath={setBath} setCar={setCar} address={address} setAddress={setAddress} location={location} setLocation={setLocation} city={city} setCity={setCity} zone={zone} setZone={setZone} post={post} setPost={setPost} />}
      {des && <DescriptionDialog description={description} setDes={setDes} setDescription={setDescription} />}
      {selectc && <SelectCoverDialog setSelectc={setSelectc} setCover={setCover} photo={photo} video={video} cover={cover} />}
      {selectp && <SelectPhotoDialog setSelectp={setSelectp} ophoto={ophoto} setOphoto={setOphoto} setSelectedPhoto={setSelectedPhoto} />}
      {selectf && <SelectFloorDialog setSelectf={setSelectf} ofloor={ofloor} setOfloor={setOfloor} setSelectedFloor={setSelectedFloor} />}
      {selectv && <SelectVideoDialog  setSelectv={setSelectv} ovideo={ovideo} setOvideo={setOvideo} setSelectedVideo={setSelectedVideo} />}
      {aopen && <CreateAgentDialog setOpen={setAopen} agent={agent} setAgent={setAgent} setCreateAgent={setCreateAgent} setSelectedAgent={setSelectedAgent} setEditAgent={setEditAgent} setEmail={setEmail} setFirstname={setFirstname} setLastname={setLastname} setMedia={setMedia} setOffice={setOffice} setPhone={setPhone} setIsSelected={setIsSelected} setAindex={setAindex} />}
      {createAgent && <CreateAgentDialog2 setCreateAgent={setCreateAgent} setAopen={setAopen} agent={agent} setAgent={setAgent} />}
      {editAgent && <EditAgentDialog setAopen={setAopen} setEditAgent={setEditAgent} agent={agent} setAgent={setAgent} initialMedia={media} initialEmail={email} initialFirstname={firstname} initialLastname={lastname} initialOffice={office} initialPhone={phone} index={aindex} initialIsSelected={isSelected} />}
      {contact && <ContactAgentDialog setContact={setContact} selectedAgent={selectedAgent}/>}
    </div>
  )
}

export default ShowPage;