"use client";

import { BusCard } from "@/components/bus-card";
import { Button } from "@/components/ui/button";
import { Clock, Users, DollarSign } from "lucide-react";
import { useState } from "react";

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

export function SearchResults() {
  const [activeSort, setActiveSort] = useState("departure");

  return (
    <div className="w-full my-container">
      <div className="space-y-4">
        <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center border-b py-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              SELECT YOUR TRIP
            </h2>
            <p className="text-sm text-gray-500">24 Results</p>
          </div>

          <div className="flex items-center gap-4 mt-3 lg:mt-0">
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

        {/* Results list will be added here when we have the data structure */}
        <div className="space-y-4 py-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <BusCard
              key={index}
              image="/assets/bus.png"
              arrival={{
                time: "15.00 PM",
                location: "Colombo",
              }}
              departure={{
                time: "01.00 AM",
                location: "Jaffna",
              }}
              booking={{
                startDate: "2024-12-17",
                startTime: "15:00",
                endTime: "14:00",
              }}
              busType="Normal"
              depotName="Welisara"
              price={1350.5}
              duration={10}
              availableSeats={42}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
