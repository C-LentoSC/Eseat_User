import { format } from "date-fns";
import { Clock, Users } from "lucide-react";

interface Traveldata {
  tripDate: string;
  startingTime: string;
  startingPlace: string;
  start_stand: string;
  endingTime: string;
  endingPlace: string;
  end_stand: string;
  hours: number;
  bustype: string;
  allSeats: string;
  bookedSeats: string;
}

const TripSelection = ({
  tripDate,
  startingTime,
  startingPlace,
  start_stand,
  endingTime,
  endingPlace,
  end_stand,
  hours,
  bustype,
  allSeats,
  bookedSeats,
}: Traveldata) => {
  return (
    <div className="max-w-md border rounded-lg p-4 bg-white mb-4">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <img src="/logos/sltb.svg" alt="SLTB" className="h-8" />
          <span className="text-sm text-blue-600">
            Outbound - {format(tripDate, "EEE, MMM dd")}
          </span>
        </div>
      </div>

      <div className="py-4">
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="min-w-[80px] text-right">
              <span className="font-semibold">{startingTime}</span>
            </div>

            <img src="/assets/bus.svg" alt="bus" className="w-5 h-5" />

            <div className="flex-1">
              <div className="font-medium">{startingPlace}</div>
              <div className="text-sm text-gray-600">{start_stand}</div>
            </div>
          </div>

          <div className="absolute left-[80px] top-0 bottom-0 ml-6 w-0.5 bg-gray-200 my-8" />

          <div className="absolute left-[80px] ml-4 mt-8 flex gap-4 items-center">
            <div className="w-4 h-4 rounded-full bg-white">
              <img src="/assets/clock.svg" alt="bus" className="w-full" />
            </div>
            <div className="bg-white ml-1">
              <div className="text-sm text-gray-600">
                {hours.toFixed(0)} Hours
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-16">
            <div className="min-w-[80px] text-right">
              <span className="font-semibold">{endingTime}</span>
            </div>
            <img
              src="/assets/location-icon.svg"
              alt="bus"
              className="w-5 h-5 mt-1"
            />

            <div className="flex-1">
              <div className="font-medium">{endingPlace}</div>
              <div className="text-sm text-gray-600">{end_stand}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 flex-wrap lg:flex-nowrap bg-blue-50 p-3 rounded-lg mt-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className="text-sm">{hours.toFixed(0)} Hours</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          <span className="text-sm">
            {allSeats}/{bookedSeats} Seats
          </span>
        </div>
        <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-600">
          {bustype}
        </span>
      </div>
    </div>
  );
};

export default TripSelection;
