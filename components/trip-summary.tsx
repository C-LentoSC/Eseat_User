import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";

interface TripSummaryProps {
  departure: string;
  arrival: string;
  departureLocation: string;
  arrivalLocation: string;
  bookingDate: string;
  closingTime: string;
  depotName: string;
  price: number;
  duration: number;
  availableSeats: number;
}

export function TripSummary({
  //   departure,
  //   arrival,
  //   departureLocation,
  //   arrivalLocation,
  bookingDate,
  closingTime,
  depotName,
  price,
  duration,
  availableSeats,
}: TripSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 flex gap-4 items-center">
      <Image
        src="/placeholder.svg?height=100&width=150"
        alt="Bus"
        width={150}
        height={100}
        className="rounded-lg"
      />
      <div className="flex-1">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Booking Starting Time</p>
            <p className="font-medium">{bookingDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Booking Closing Time</p>
            <p className="font-medium">{closingTime}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Depot Name</p>
            <p className="font-medium">{depotName}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">Rs {price.toFixed(2)}</p>
            <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{duration} Hours</span>
              <Users className="w-4 h-4 ml-2" />
              <span>{availableSeats} Seats</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
