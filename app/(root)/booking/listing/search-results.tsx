"use client";

import { BusCard } from "@/components/bus-card";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/components/ui/Loading";
import axios from "axios";
import { format } from "date-fns";
import { Clock, Users, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

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

export function SearchResults({ alldata, isloading, from, to, date, passenger }: any) {
  const [activeSort, setActiveSort] = useState("departure");

  console.warn(Array.isArray(alldata));
  console.warn(alldata);

  return (
    <div className="w-full my-container">
      <div className="space-y-4">
        <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center border-b py-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              SELECT YOUR TRIP
            </h2>
            {(Array.isArray(alldata) ? alldata : Object.values(alldata))?.length > 0 && (
              <p className="text-sm text-gray-500">{Array.isArray(alldata) ? alldata?.length : Object.values(alldata)?.length} Results</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-3 lg:mt-0">
            <span className="text-sm text-gray-500 text-nowrap">Sort By:</span>
            <div className="flex flex-wrap gap-4">
              <select name="" id="">
                {sortOptions.map((opt, index) => (
                  <option
                    key={index}
                    onChange={() => setActiveSort(opt.id)}
                    className={`flex items-center p-3 outline-none gap-2`} value={`${opt.id}`}>{opt.icon}{opt.label}</option>
                  // <Button
                  //   key={option.id}
                  //   variant="ghost"
                  //   className={`flex items-center gap-2 ${
                  //     activeSort === option.id
                  //       ? "text-primary bg-pink-50"
                  //       : "text-gray-600 hover:text-white"
                  //   }`}
                  //   onClick={() => setActiveSort(option.id)}
                  // >
                  //   {option.icon}
                  //   {option.label}
                  // </Button>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results list will be added here when we have the data structure */}
        <div className="space-y-4 py-8">
          {isloading ? (
            <LoadingAnimation />
          ) : (
            <>
              {(Array.isArray(alldata) ? alldata : Object.values(alldata))
                ?.length > 0 ? (
                (Array.isArray(alldata) ? alldata : Object.values(alldata))
                  .sort(
                    (
                      a: {
                        scheduleData: {
                          start_time: any;
                          end_time: any;
                          price: any;
                        };
                        availableSeats: string | any[];
                      },
                      b: {
                        scheduleData: {
                          start_time: any;
                          end_time: any;
                          price: any;
                        };
                        availableSeats: string | any[];
                      }
                    ) => {
                      const formatTime = (time: string) => {
                        const defaultDate = "2025-01-01"; // Ensure valid date format
                        return new Date(`${defaultDate} ${time}`).getTime();
                      };

                      switch (activeSort) {
                        case "departure":
                          return (
                            formatTime(
                              a.scheduleData?.start_time || "00:00"
                            ) -
                            formatTime(b.scheduleData?.start_time || "00:00")
                          );
                        case "arrival":
                          return (
                            formatTime(a.scheduleData?.end_time || "00:00") -
                            formatTime(b.scheduleData?.end_time || "00:00")
                          );
                        case "seats":
                          return (
                            (b.availableSeats?.length || 0) -
                            (a.availableSeats?.length || 0)
                          );
                        case "rate":
                          return (
                            (a.scheduleData?.price || 0) -
                            (b.scheduleData?.price || 0)
                          );
                        default:
                          return 0;
                      }
                    }
                  )
                  .map((data: any) => (

                    <BusCard
                      key={data.id}
                      id={data.id}
                      image={data.main_image}
                      arrival={{
                        time: data.scheduleData?.end_time,
                        date: data.scheduleData?.endDate,
                        name: data.scheduleData?.to?.name,
                      }}
                      departure={{
                        time: data.scheduleData?.start_time,
                        name: data.scheduleData?.from?.name,
                      }}
                      booking={{
                        startDate: data.scheduleData?.startDate,
                        startTime: data.scheduleData?.start_time,
                        endTime: data.scheduleData?.end_time,
                      }}
                      busType={data.type}
                      depotName={data.depot?.name}
                      price={data.scheduleData?.price}
                      duration={data.scheduleData?.duration}
                      availableSeats={data.availableSeats?.length}
                      schedule_number={data.schedule_number}
                      fasility={data.facilities}
                      boardingDropping={data.fareBrake}
                      bookbtnst={true}
                      from={from}
                      to={to}
                      date={date}
                      passenger={passenger}
                      route_id={data.scheduleData?.route_id}
                      subImages={data.otherImages}
                    />
                  ))
              ) : (
                <span className="text-lg text-gray-500">No data available</span> // Handle the case where dataArray is empty
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
