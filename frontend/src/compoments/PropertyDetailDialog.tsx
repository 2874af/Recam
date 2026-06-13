import InforBlock from "./InforBlock";
import { BedDouble, Bath, CarFront, Grid2x2Plus } from 'lucide-react';
import Button from "./Button";

type PropertyDetailDialogProps = {
  pstatus: string;
  type: string;
  bed: number;
  car: number;
  area: number;
  bath: number;
  setDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setSave: React.Dispatch<React.SetStateAction<boolean>>;
  setPstatus: React.Dispatch<React.SetStateAction<"sale" | "auction" | "rent">>;
  setType: React.Dispatch<React.SetStateAction<"house" | "townhouse" | "villa" | "apartment" | "others">>;
  setBed: React.Dispatch<React.SetStateAction<number>>;
  setArea: React.Dispatch<React.SetStateAction<number>>;
  setBath: React.Dispatch<React.SetStateAction<number>>;
  setCar: React.Dispatch<React.SetStateAction<number>>;
}

function PropertyDetailDialog({pstatus, type, bed, car, area, bath, setDetail, setSave, setPstatus, setType, setCar, setBath, setBed, setArea}:PropertyDetailDialogProps){
  
  return (
    <div className="inset-0 fixed bg-black/40 flex items-center justify-center">
      <div className="flex flex-col bg-white w-[60%] rounded-2xl px-8 py-6">
        <div className="flex">
          <span className="text-2xl font-bold">Property detail</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>setDetail(false)} className="size-6 text-gray-400 rounded ml-auto  hover:bg-gray-100 active:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="border-t border-gray-300 h-1 my-7"></div>

        <div className="flex flex-col gap-3">
          <span className="font-bold text-xl">Property Status</span>

          <div className="flex gap-14">
            <div className="flex gap-4 items-center">
              <input type="radio" 
                checked={pstatus==="sale"} 
                value="sale" 
                name="status" 
                onChange={(event)=>setPstatus(event.target.value as ("sale" | "auction" | "rent"))}
              />
              <label className="text-lg">For Sale</label>
            </div>

            <div className="flex gap-4 items-center">
              <input type="radio" 
                checked={pstatus==="auction"} 
                value="auction" 
                name="status" 
                onChange={(event)=>setPstatus(event.target.value as ("sale" | "auction" | "rent"))}
                
              />
              <label className="text-lg">Auction</label>
            </div>

            <div className="flex gap-4 items-center">
              <input type="radio" 
                checked={pstatus==="rent"} 
                value="rent" 
                name="status" 
                onChange={(event)=>setPstatus(event.target.value as ("sale" | "auction" | "rent"))}
                
              />
              <label className="text-lg">For Rent</label>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-300 h-1 my-7"></div>

        <div className="flex flex-col gap-3">
          <span className="font-bold text-xl">Property Type</span>

          <div className="flex gap-14">
            <div className="flex gap-4 items-center">
              <input type="radio" 
                checked={type==="house"} 
                value="house" 
                name="type" 
                onChange={(event)=>setType(event.target.value as ("house" | "townhouse" | "villa" | "apartment" | "others"))}
              />
              <label className="text-lg">House</label>
            </div>

            <div className="flex gap-4 items-center">
              <input type="radio" 
                checked={type==="townhouse"} 
                value="townhouse" 
                name="type" 
                onChange={(event)=>setType(event.target.value as ("house" | "townhouse" | "villa" | "apartment" | "others"))}
              />
              <label className="text-lg">Townhouse</label>
            </div>

            <div className="flex gap-4 items-center">
              <input type="radio" 
                checked={type==="villa"} 
                value="villa" 
                name="type" 
                onChange={(event)=>setType(event.target.value as ("house" | "townhouse" | "villa" | "apartment" | "others"))}
              />
              <label className="text-lg">Villa</label>
            </div>

            <div className="flex gap-4 items-center">
              <input type="radio" 
                checked={type==="apartment"} 
                value="apartment" 
                name="type" 
                onChange={(event)=>setType(event.target.value as ("house" | "townhouse" | "villa" | "apartment" | "others"))}
              />
              <label className="text-lg">Apartment / Unit</label>
            </div>

            <div className="flex gap-4 items-center">
              <input type="radio" 
                checked={type==="others"} 
                value="others" 
                name="type" 
                onChange={(event)=>setType(event.target.value as ("house" | "townhouse" | "villa" | "apartment" | "others"))}
              />
              <label className="text-lg">Others</label>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-300 h-1 my-7"></div>
        <div className="flex flex-col gap-5">
          <span className="font-bold text-xl">Basic Information</span>

          <div className="flex flex-wrap gap-4">
            <InforBlock tag="Bed" item={bed} setItem={setBed} icon={<BedDouble />} />
            <InforBlock tag="Bath" item={bath} setItem={setBath} icon={<Bath />} />
            <InforBlock tag="Car" item={car} setItem={setCar} icon={<CarFront />} />
            <InforBlock tag="Area" item={area} setItem={setArea} icon={<Grid2x2Plus />} />
          </div>

        </div>

        <div className="border-t border-gray-300 h-1 my-7"></div>
        <div className="flex justify-center">
          <Button className="w-34" onClick={()=>{
            setDetail(false);
            setSave(true);
          }}>Save</Button>
        </div>
      </div>

    </div>
  )
}

export default PropertyDetailDialog;