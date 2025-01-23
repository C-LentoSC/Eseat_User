"use client";

import { BusCard } from "@/components/bus-card";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/components/ui/Loading";
import { Clock, Users, DollarSign } from "lucide-react";
import { useState } from "react";

// Define the structure of the data you expect to receive in alldata
interface ScheduleData {
  start_time: string;
  end_time: string;
  price: number;
  duration: number;
  startDate: string;
}

interface BusData {
  id: number;
  main_image: string;
  scheduleData: ScheduleData;
  availableSeats: any[]; // You can replace 'any' with a more specific type if you know the structure
  facilities: [];
  fare_point: [];
  depot: { name: string };
  type: string;
  from: { name: string };
  to: { name: string };
}

interface SearchResultsProps {
  alldata: BusData[]; // Array of bus data
  isloading: boolean; // Whether the data is loading
}

interface SortOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const sortOptions: SortOption[] = [
  {
    id: "departure",
    label: "Departure Time",
    icon: <Clock className="w-4 h-4" />,
  },
  { id: "arrival", label: "Arrival Time", icon: <Clock className="w-4 h-4" /> },
  {
    id: "seats",
    label: "Available Seats",
    icon: <Users className="w-4 h-4" />,
  },
  { id: "rate", label: "Rate", icon: <DollarSign className="w-4 h-4" /> },
];

export function SearchResults({ alldata, isloading }: SearchResultsProps) {
  const [activeSort, setActiveSort] = useState<string>("departure");

  return (
    <div className="w-full my-container">
      <div className="space-y-4">
        <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center border-b py-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-900">SELECT YOUR TRIP</h2>
            {alldata?.length > 0 && (
              <p className="text-sm text-gray-500">{alldata.length} Results</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-3 lg:mt-0">
            <span className="text-sm text-gray-500 text-nowrap">Sort By:</span>
            <div className="flex flex-wrap gap-4">
              {sortOptions.map((option) => (
                <Button
                  key={option.id}
                  variant="ghost"
                  className={`flex items-center gap-2 ${
                    activeSort === option.id
                      ? "text-primary bg-pink-50"
                      : "text-gray-600 hover:text-white"
                  }`}
                  onClick={() => setActiveSort(option.id)}
                >
                  {option.icon}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 py-8">
          {isloading ? (
            <LoadingAnimation />
          ) : (
            <>
              {alldata?.length > 0 ? (
                <>
                  {alldata
                    .sort((a, b) => {
                      const formatTime = (time: string) => {
                        const defaultDate = "2025-01-01";
                        return new Date(`${defaultDate} ${time}`).getTime();
                      };

                      switch (activeSort) {
                        case "departure":
                          return (
                            formatTime(a.scheduleData.start_time || "00:00:00") -
                            formatTime(b.scheduleData.start_time || "00:00:00")
                          );
                        case "arrival":
                          return (
                            formatTime(a.scheduleData.end_time || "00:00:00") -
                            formatTime(b.scheduleData.end_time || "00:00:00")
                          );
                        case "seats":
                          return (
                            (b.availableSeats?.length || 0) -
                            (a.availableSeats?.length || 0)
                          );
                        case "rate":
                          return (
                            (a.scheduleData.price || 0) -
                            (b.scheduleData.price || 0)
                          );
                        default:
                          return 0;
                      }
                    })
                    .map((data) => (
                      <BusCard
                        key={data.id}
                        id={data.id}
                        image={data.main_image}
                        arrival={{
                          time: data.scheduleData.end_time,
                          name: data.to.name,
                        }}
                        departure={{
                          time: data.scheduleData.start_time,
                          name: data.from.name,
                        }}
                        booking={{
                          startDate: data.scheduleData.startDate,
                          startTime: data.scheduleData.start_time,
                          endTime: data.scheduleData.end_time,
                        }}
                        busType={data.type}
                        depotName={data.depot.name}
                        price={data.scheduleData.price}
                        duration={data.scheduleData.duration}
                        availableSeats={data.availableSeats.length}
                        fasility={data.facilities}
                        boardingDropping={data.fare_point}
                      />
                    ))}
                </>
              ) : (
                <div>
                  <h2 className="text-lg font-medium text-gray-400">No results found</h2>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
