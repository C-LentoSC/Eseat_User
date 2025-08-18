/* eslint-disable @next/next/no-img-element */
// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Clock,
//   Users,
//   Wifi,
//   Tv,
//   BatteryCharging,
//   ChevronDown,
// } from "lucide-react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import Link from "next/link";
// import { useState } from "react";

// interface Facility {
//   id: number;
//   name: string;
//   icon: string;
// }
// interface BoardingDropping {
//   id: number;
//   boarding: string;
//   dropping: string;
//   price: number;
// }

// interface BusCardProps {
//   id: number;
//   image: string;
//   arrival: {
//     time: string;
//     name: string;
//   };
//   departure: {
//     time: string;
//     name: string;
//   };
//   booking: {
//     startDate: string;
//     startTime: string;
//     endTime: string;
//   };
//   busType: string;
//   depotName: string;
//   price: number;
//   duration: number;
//   availableSeats: number;
//   fasility: Facility[];
//   boardingDropping: BoardingDropping[];
//   bookbtnst: boolean;
// }

// export function BusCard({
//   id,
//   image,
//   arrival,
//   departure,
//   booking,
//   busType,
//   depotName,
//   price,
//   duration,
//   availableSeats,
//   fasility,
//   boardingDropping,
//   bookbtnst,
// }: BusCardProps) {
//   const [bdpoint, setbdpoint] = useState("Boarding / Dropping points");

//   return (
//     <div className="flex flex-col md:flex-row bg-bgMyColor6 rounded-lg overflow-hidden border">
//       {/* Bus Image */}
//       <div className="w-full md:w-72 h-auto relative">
//         <Image src={image} alt="Bus" fill className="object-cover" />
//       </div>

//       {/* Content */}
//       <div className="flex-1 p-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Arrival Section */}
//           <div>
//             <p className="text-sm text-gray-500 mb-1">Arrival</p>
//             <p className="text-2xl font-semibold mb-1">{arrival.time}</p>
//             <p className="text-gray-600">{arrival.name}</p>
//           </div>

//           {/* Arrow Icon */}
//           <div className="hidden md:flex items-center justify-center">
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 className="text-blue-500"
//               >
//                 <path
//                   d="M4 12H20M20 12L14 6M20 12L14 18"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Departure Section */}
//           <div>
//             <p className="text-sm text-gray-500 mb-1">Departure</p>
//             <p className="text-2xl font-semibold mb-1">{departure.time}</p>
//             <p className="text-gray-600">{departure.name}</p>
//           </div>
//         </div>

//         {/* Booking Details */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
//           <div>
//             <p className="text-sm text-gray-500 mb-1">Booking Starting Time</p>
//             <p className="font-medium">{booking.startTime}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500 mb-1">Booking Closing Time</p>
//             <p className="font-medium">{booking.endTime}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500 mb-1">Depot Name</p>
//             <p className="font-medium">{depotName}</p>
//           </div>
//         </div>

//         {/* Features */}
//         <div className="flex flex-wrap gap-2 mt-6">
//           <Badge
//             variant="outline"
//             className="bg-red-50 text-red-600 border-red-200"
//           >
//             {busType}
//           </Badge>

//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100"
//               >
//                 {bdpoint}
//                 <ChevronDown className="ml-2 h-4 w-4" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent>
//               <div className="space-y-2">
//                 <div
//                   className="text-sm cursor-pointer"
//                   onClick={() => {
//                     setbdpoint(`Select`);
//                   }}
//                 >
//                   Select
//                 </div>
//                 {boardingDropping?.map((item, index) => (
//                   <div
//                     className="text-sm cursor-pointer"
//                     key={index}
//                     onClick={() => {
//                       setbdpoint(`${item?.boarding} / ${item?.dropping}`);
//                     }}
//                   >
//                     {item?.boarding} / {item?.dropping}
//                   </div>
//                 ))}

//                 {/* <div className="text-sm">Kadawatha</div>
//                 <div className="text-sm">Kurunegala</div> */}
//               </div>
//             </PopoverContent>
//           </Popover>

//           {fasility?.map((item, index) => (
//             <>
//               <Badge
//                 key={index}
//                 variant="outline"
//                 className="bg-blue-50 text-blue-600 border-blue-200"
//               >
//                 {/* <Wifi className="w-4 h-4 mr-1" /> */}
//                 <img
//                   src={item?.icon}
//                   alt={`${item?.id}${item?.name}`}
//                   className="w-3 h-3 mr-1"
//                 />
//                 {item?.name}
//               </Badge>
//             </>
//           ))}

//           {/* <Badge
//             variant="outline"
//             className="bg-blue-50 text-blue-600 border-blue-200"
//           >
//             <Tv className="w-4 h-4 mr-1" />
//             Tv
//           </Badge>

//           <Badge
//             variant="outline"
//             className="bg-blue-50 text-blue-600 border-blue-200"
//           >
//             <BatteryCharging className="w-4 h-4 mr-1" />
//             Phone Charger
//           </Badge> */}
//         </div>
//       </div>

//       {/* Price Section */}
//       <div className="md:w-64 p-6 flex flex-col justify-between border-l">
//         <div className="text-right">
//           <p className="text-3xl font-bold text-gray-900">
//             Rs {price.toFixed(2)}
//           </p>
//           <div className="flex items-center justify-end gap-2 text-sm text-gray-500 mt-2">
//             <Clock className="w-4 h-4" />
//             <span>{duration} Hours</span>
//           </div>
//           <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
//             <Users className="w-4 h-4" />
//             <span>{availableSeats} Seats Available</span>
//           </div>
//         </div>
//         {bookbtnst && (
//           <>
//             <Button className="w-full mt-4" asChild>
//               <Link href={`/booking/listing/${id}`}>Book Now</Link>
//             </Button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  Wifi,
  Tv,
  BatteryCharging,
  ChevronDown,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";

interface Facility {
  id: number;
  name: string;
  icon: string;
}
interface BoardingDropping {
  id: number;
  boarding: {
    id: number;
    name: string;
  };
  dropping: {
    id: number;
    name: string;
  };
  price: number;
}

interface BusCardProps {
  id: number;
  image: string;
  arrival: {
    time: string;
    date: string;
    name: string;
  };
  departure: {
    time: string;
    name: string;
  };
  booking: {
    startDate: string;
    startTime: string;
    endTime: string;
  };
  busType: string;
  depotName: string;
  price: number;
  duration: any;
  availableSeats: number;
  schedule_number: string;
  fasility: Facility[];
  boardingDropping: BoardingDropping[];
  bookbtnst: boolean;
  from: string;
  to: string;
  date: string;
  passenger: number;
  route_id: number;
  subImages: [];
}

export function BusCard({
  id,
  image,
  arrival,
  departure,
  booking,
  busType,
  depotName,
  price,
  duration,
  availableSeats,
  schedule_number,
  fasility,
  boardingDropping,
  bookbtnst,
  from,
  to,
  date,
  passenger,
  route_id,
  subImages,
}: BusCardProps) {
  const [bdpoint, setbdpoint] = useState("Boarding / Dropping points");

  const [selectedBusImage, setSelectedBusImage] = useState<string>(image);

  return (
    <div className="flex flex-col md:flex-col lg:flex-row bg-bgMyColor6 rounded-lg overflow-hidden border">
      {/* Bus Image */}
      <div className="w-full lg:w-56  h-[50vh] lg:h-auto relative">
        <div className="w-full absolute top-0 flex justify-end items-center z-40 p-1">
          <img
            src="/assets/fullicon.svg"
            alt="full_Screen"
            className="w-5 cursor-pointer bg-black/40 rounded p-1"
            onClick={() => {
              window.open(selectedBusImage, "_blank");
            }}
          />
        </div>
        <Image
          src={selectedBusImage ? selectedBusImage : image}
          alt="Bus"
          fill
          className="object-cover md:object-contain lg:object-cover md:object-center object-left lg:object-left"
        />
        <div className="p-2 absolute bottom-0 justify-center items-end right-1 flex gap-2 left-1">
          {subImages?.length > 0 && (
            <>
              <div
                className={`w-[20%] border border-gray-500 ${
                  selectedBusImage == image ? "h-16" : ""
                }`}
              >
                <img
                  src={image}
                  alt="bus1"
                  className="w-full object-cover h-full"
                  onClick={() => {
                    setSelectedBusImage(image);
                  }}
                />
              </div>
            </>
          )}
          {subImages &&
            Array.isArray(subImages) &&
            subImages.map((item, index) => (
              <div
                key={index}
                className={`w-[20%] border border-gray-500 ${
                  selectedBusImage === item ? "h-16" : ""
                }`}
              >
                <img
                  src={item}
                  alt="bus1"
                  className="w-full object-cover h-full"
                  onClick={() => setSelectedBusImage(item)}
                />
              </div>
            ))}
          {/* <div
            className={`w-[20%] border border-gray-500 ${
              selectedBusImage == image[2] ? "h-16" : ""
            }`}
          >
            <img
              src={image}
              alt="bus1"
              className="w-full object-cover h-full"
              onClick={() => {
                setSelectedBusImage(image);
              }}
            />
          </div>
          <div
            className={`w-[20%] border border-gray-500 ${
              selectedBusImage == image[3] ? "h-16" : ""
            }`}
          >
            <img
              src={image}
              alt="bus1"
              className="w-full object-cover h-full"
              onClick={() => {
                setSelectedBusImage(image);
              }}
            />
          </div>
          <div
            className={`w-[20%] border border-gray-500 ${
              selectedBusImage == image[3] ? "h-16" : ""
            }`}
          >
            <img
              src={image}
              alt="bus1"
              className="w-full object-cover h-full"
              onClick={() => {
                setSelectedBusImage(image);
              }}
            />
          </div> */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-8">
          {/* Arrival Section */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Pickup</p>
            <p className="text-xl font-medium mb-1">{departure.name}</p>
            <p className="text-2xl font-semibold mb-1">{departure.time}</p>
            {/* <p className="text-gray-600">{arrival.name}</p> */}

            <p className="text-gray-600 mt-8">Pickup Date</p>
            <p className="text-xl">{format(booking.startDate, "yyyy-MM-dd")}</p>
          </div>

          {/* Arrow Icon */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-blue-500"
              >
                <path
                  d="M4 12H20M20 12L14 6M20 12L14 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Departure Section */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Drop</p>
            <p className="text-xl font-medium mb-1">{arrival.name}</p>
            <p className="text-2xl font-semibold mb-1">{arrival.time}</p>
            {/* <p className="text-gray-600">{departure.name}</p> */}

            <p className="text-gray-600 mt-8">Drop Date</p>
            <p className="text-xl">{arrival.date}</p>
          </div>
          {/* Departure Section */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Bus Type</p>
            <Badge
              variant="outline"
              className="bg-red-50 text-red-600 py-2 border-red-200"
            >
              {busType}
            </Badge>

            <p className="text-gray-600 lg:mt-14 mt-10 pt-2">Depot Name</p>
            <p className="text-xl">{depotName}</p>
          </div>
          <div className="p-2 flex flex-col hidden md:block lg:hidden justify-center items-center border-l">
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">
                Rs {price ? price : "N/A"}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
                <Clock className="w-4 h-4" />
                <span>{duration} Hours</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{availableSeats} Seats Available</span>
              </div>
            </div>
            {bookbtnst && (
                <>
                  <Button className="w-full mt-4" asChild>
                    <Link
                        href={`/booking/listing/${id}/${from}/${to}/${date}/${passenger}`}
                    >
                      Book Now
                    </Link>
                  </Button>
                </>
            )}
          </div>
        </div>

        {/* Booking Details
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Booking Starting Time</p>
            <p className="font-medium">{booking.startTime}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Booking Closing Time</p>
            <p className="font-medium">{booking.endTime}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Depot Name</p>
            <p className="font-medium">{depotName}</p>
          </div>
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <p className="font-medium">Route - #{route_id}</p>
          </div>
          <div>
            <p className="font-medium">{`${departure.name} - ${arrival.name}`}</p>
          </div>
          <div>
            <p className="font-medium">Schedule - {schedule_number}</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mt-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100"
              >
                {bdpoint}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <div
                  className="text-sm cursor-pointer"
                  onClick={() => {
                    setbdpoint(`Boarding / Dropping points`);
                  }}
                >
                  Select
                </div>
                {boardingDropping?.map((item, index) => (
                  <div
                    className="text-sm cursor-pointer"
                    key={index}
                    onClick={() => {
                      setbdpoint(
                        `${item?.boarding?.name} / ${item?.dropping?.name}`
                      );
                    }}
                  >
                    {item?.boarding?.name} / {item?.dropping?.name}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {fasility?.map((item, index) => (
            <>
              <Badge
                key={index}
                variant="outline"
                className="bg-blue-50 text-blue-600 border-blue-200"
              >
                {/* <Wifi className="w-4 h-4 mr-1" /> */}
                <img
                  src={item?.icon}
                  alt={`${item?.id}${item?.name}`}
                  className="w-3 h-3 mr-1"
                />
                {item?.name}
              </Badge>
            </>
          ))}

          {/* <Badge
            variant="outline"
            className="bg-blue-50 text-blue-600 border-blue-200"
          >
            <Tv className="w-4 h-4 mr-1" />
            Tv
          </Badge>

          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-600 border-blue-200"
          >
            <BatteryCharging className="w-4 h-4 mr-1" />
            Phone Charger
          </Badge> */}
        </div>
      </div>

      {/* Price Section */}
      <div className="lg:w-64 p-6 flex flex-col justify-center items-center border-l">
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900">
            Rs {price ? price : "N/A"}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
            <Clock className="w-4 h-4" />
            <span>{duration} Hours</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{availableSeats} Seats Available</span>
          </div>
        </div>
        {bookbtnst && (
          <>
            <Button className="w-full mt-4" asChild>
              <Link
                href={`/booking/listing/${id}/${from}/${to}/${date}/${passenger}`}
              >
                Book Now
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
