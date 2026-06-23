import InforBlock3 from "./InforBlock3";
import { BedDouble, Bath, CarFront, Grid2x2Plus } from 'lucide-react';
import Button from "./Button";
import IconInput from "./IconInput";

type PropertyDetailDialogProps = {
  pstatus: string;
  type: string;
  bed: number;
  car: number;
  area: number;
  bath: number;
  address: string;
  location: string;
  city: string;
  zone: string;
  post: string;
  setDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setPstatus: React.Dispatch<React.SetStateAction<"sale" | "auction" | "rent">>;
  setType: React.Dispatch<React.SetStateAction<"house" | "townhouse" | "villa" | "apartment" | "others">>;
  setBed: React.Dispatch<React.SetStateAction<number>>;
  setArea: React.Dispatch<React.SetStateAction<number>>;
  setBath: React.Dispatch<React.SetStateAction<number>>;
  setCar: React.Dispatch<React.SetStateAction<number>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setZone: React.Dispatch<React.SetStateAction<string>>;
  setPost: React.Dispatch<React.SetStateAction<string>>;
}

function PropertyDetailDialog2({pstatus, type, bed, car, area, bath, address, location, city, zone, post, setLocation, setCity, setZone, setPost, setAddress, setDetail, setPstatus, setType, setCar, setBath, setBed, setArea}:PropertyDetailDialogProps){
  
  return (
    <div className="inset-0 fixed bg-black/40 flex items-center justify-center">
      <div className="flex flex-col bg-white w-[95%] rounded-2xl mt-13 h-[90vh] px-8 pb-4 pt-11 overflow-auto relative sm:w-160 sm:h-152">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Property detail</span>
          <span className="text-gray-500 text-[10px]">Please take a moment to review and complete property details.</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>setDetail(false)} className="size-6 text-gray-400 rounded absolute top-4 right-6  hover:bg-gray-100 active:bg-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <div className="border-t border-gray-300 h-1 my-3"></div>

        <div className="flex flex-col w-full gap-2">
          <span className="font-bold text-base">Property Address</span>
          <IconInput icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-2.5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          } placeholder="Search Address" className="w-full" onChange={(event)=>setAddress(event.target.value)} value={address} />

          {address && 
            <div className="w-full flex flex-col pt-1 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Address</label>
                <input className="border border-gray-300 h-10 rounded-sm pl-2 text-gray-500" value={location} onChange={(event)=>setLocation(event.target.value)} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">City</label>
                <input className="border border-gray-300 h-10 rounded-sm pl-2 text-gray-500"value={city} onChange={(event)=>setCity(event.target.value)} />
              </div>

              <div className="flex w-full justify-between">
                <div className="flex flex-col gap-2 w-[67%]">
                  <label className="text-sm font-bold">State</label>
                  <input className="border border-gray-300 h-10 rounded-sm pl-2 text-gray-500" value={zone} onChange={(event)=>setZone(event.target.value)} />
                </div>

                <div className="flex flex-col gap-2 w-[30%]">
                  <label className="text-sm font-bold">Post Code</label>
                  <input className="border border-gray-300 h-10 rounded-sm pl-2 text-gray-500" value={post} onChange={(event)=>setPost(event.target.value)} />
                </div>
              </div>

              <div className="flex w-full">
                <span className="font-bold underline ml-auto hover:text-gray-500 active:text-gray-400" onClick={()=>setAddress("")}>Clear all</span>
              </div>
            </div>
          }
        </div>

        <div className="border-t border-gray-300 h-1 my-3"></div>

        <div className="flex flex-col gap-2">
          <span className="font-bold text-base">Property Status</span>

          <div className="flex gap-6">
            <div className="flex gap-2 items-center">
              <input type="radio" 
                checked={pstatus==="sale"} 
                value="sale" 
                name="status" 
                onChange={(event)=>setPstatus(event.target.value as ("sale" | "auction" | "rent"))}
              />
              <label className="text-base">For Sale</label>
            </div>

            <div className="flex gap-2 items-center">
              <input type="radio" 
                checked={pstatus==="auction"} 
                value="auction" 
                name="status" 
                onChange={(event)=>setPstatus(event.target.value as ("sale" | "auction" | "rent"))}
                
              />
              <label className="text-base">Auction</label>
            </div>

            <div className="flex gap-2 items-center">
              <input type="radio" 
                checked={pstatus==="rent"} 
                value="rent" 
                name="status" 
                onChange={(event)=>setPstatus(event.target.value as ("sale" | "auction" | "rent"))}
                
              />
              <label className="text-base">For Rent</label>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-300 h-1 my-3"></div>

        <div className="flex flex-col gap-2">
          <span className="font-bold text-base">Property Type</span>

          <div className="flex gap-x-6 gap-y-2 flex-wrap">
            <div className="flex gap-2 items-center">
              <input type="radio" 
                checked={type==="house"} 
                value="house" 
                name="type" 
                onChange={(event)=>setType(event.target.value as ("house" | "townhouse" | "villa" | "apartment" | "others"))}
              />
              <label className="text-base">House</label>
            </div>

            <div className="flex gap-2 items-center">
              <input type="radio" 
                checked={type==="townhouse"} 
                value="townhouse" 
                name="type" 
                onChange={(event)=>setType(event.target.value as ("house" | "townhouse" | "villa" | "apartment" | "others"))}
              />
              <label className="text-base">Townhouse</label>
            </div>

            <div className="flex gap-2 items-center">
              <input type="radio" 
                checked={type==="villa"} 
                value="villa" 
                name="type" 
                onChange={(event)=>setType(event.target.value as ("house" | "townhouse" | "villa" | "apartment" | "others"))}
              />
              <label className="text-base">Villa</label>
            </div>

            <div className="flex gap-2 items-center">
              <input type="radio" 
                checked={type==="apartment"} 
                value="apartment" 
                name="type" 
                onChange={(event)=>setType(event.target.value as ("house" | "townhouse" | "villa" | "apartment" | "others"))}
              />
              <label className="text-base">Apartment / Unit</label>
            </div>

            <div className="flex gap-2 items-center">
              <input type="radio" 
                checked={type==="others"} 
                value="others" 
                name="type" 
                onChange={(event)=>setType(event.target.value as ("house" | "townhouse" | "villa" | "apartment" | "others"))}
              />
              <label className="text-base">Others</label>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-300 h-1 my-3"></div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-base">Basic Information</span>

          <div className="flex flex-wrap gap-2">
            <InforBlock3 tag="Bed" item={bed} setItem={setBed} icon={<BedDouble className="w-4 h-4"/>} />
            <InforBlock3 tag="Bath" item={bath} setItem={setBath} icon={<Bath className="w-4 h-4"/>} />
            <InforBlock3 tag="Car" item={car} setItem={setCar} icon={<CarFront className="w-4 h-4"/>} />
            <InforBlock3 tag="Area" item={area} setItem={setArea} icon={<Grid2x2Plus className="w-4 h-4"/>} />
          </div>

        </div>

        <div className="border-t border-gray-300 h-1 my-3"></div>
        <div className="flex gap-2 w-full">
          <button className="border-2 border-black ml-auto flex justify-center w-24 py-1 rounded-4xl font-bold hover:bg-gray-200 active:bg-gray-300">
            Cancel
          </button>

          <button className="bg-black text-white w-24 flex justify-center py-1 rounded-4xl font-bold hover:bg-gray-700 active:bg-gray-600">
            Save
          </button>
        </div>
      </div>

    </div>
  )
}

export default PropertyDetailDialog2;