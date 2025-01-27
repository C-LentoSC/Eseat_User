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

interface Facility {
  id: number;
  name: string;
  icon: string;
}
interface BoardingDropping {
  id: number;
  boarding: string;
  dropping: string;
  price: number;
}

interface BusCardProps {
  id: number;
  image: string;
  arrival: {
    time: string;
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
  duration: number;
  availableSeats: number;
  fasility: Facility[];
  boardingDropping: BoardingDropping[];
  bookbtnst: boolean;
  from: string;
  to: string;
  date: string;
  passenger: number;
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
  fasility,
  boardingDropping,
  bookbtnst,
  from,
  to,
  date,
  passenger,
}: BusCardProps) {
  const [bdpoint, setbdpoint] = useState("Boarding / Dropping points");

  return (
    <div className="flex flex-col md:flex-row bg-bgMyColor6 rounded-lg overflow-hidden border">
      {/* Bus Image */}
      <div className="w-full md:w-72 h-auto relative">
        <Image src={image} alt="Bus" fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Arrival Section */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Pickup</p>
            <p className="text-xl font-medium mb-1">Nittabuwa</p>
            <p className="text-2xl font-semibold mb-1">15:00</p>
            <p className="text-gray-600">{arrival.name}</p>

            <p className="text-gray-600 mt-8">Pickup Date</p>
            <p className="text-xl">2024-12-17</p>
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
            <p className="text-xl font-medium mb-1">Ampara</p>
            <p className="text-2xl font-semibold mb-1">01.00</p>
            <p className="text-gray-600">{departure.name}</p>

            <p className="text-gray-600 mt-8">Drop Time</p>
            <p className="text-xl">14:00</p>
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
            <p className="text-xl">Welisara</p>
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
            <p className="font-medium">Route - #15</p>
          </div>
          <div>
            <p className="font-medium">Colombo - Ampara</p>
          </div>
          <div>
            <p className="font-medium">Schedule - WS15-2030CA</p>
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
                    setbdpoint(`Select`);
                  }}
                >
                  Select
                </div>
                {boardingDropping?.map((item, index) => (
                  <div
                    className="text-sm cursor-pointer"
                    key={index}
                    onClick={() => {
                      setbdpoint(`${item?.boarding} / ${item?.dropping}`);
                    }}
                  >
                    {item?.boarding} / {item?.dropping}
                  </div>
                ))}

                {/* <div className="text-sm">Kadawatha</div>
                <div className="text-sm">Kurunegala</div> */}
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
      <div className="md:w-64 p-6 flex flex-col justify-center items-center border-l">
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900">
            Rs {price.toFixed(2)}
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
              <Link href={`/booking/listing/${id}/${from}/${to}/${date}/${passenger}`}>Book Now</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

