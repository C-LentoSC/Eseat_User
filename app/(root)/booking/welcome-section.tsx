"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftRight, Search } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function WelcomeSection() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="w-full bg-[#F0FBFE] py-24">
      <div className="my-container">
        <h1 className="text-2xl font-semibold text-myColor2 mb-4">Hi, Supun</h1>
        <p className="text-myColor2 mb-8 max-w-3xl">
          Welcome to the Admin Panel - your central hub for managing bus
          operations efficiently. Assign buses to routes, update schedules,
          monitor bookings, and oversee all key details with ease. Designed for
          simplicity and control, the Admin Panel helps you keep everything
          running smoothly.
        </p>

        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-2 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">From</label>
              <Input
                placeholder="Leaving from.."
                className="bg-white border-gray-200"
              />
            </div>

            <Button
              size="icon"
              className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            >
              <ArrowLeftRight className="h-4 w-4 text-white" />
            </Button>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">To</label>
              <Input
                placeholder="Going to.."
                className="bg-white border-gray-200"
              />
            </div>
          </div>

          <div className="space-y-2 flex flex-col">
            <label className="text-sm font-medium text-gray-500">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full md:w-[200px] justify-start text-left font-normal bg-white border-gray-200",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "EEE, MMM dd") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button className=" h-10 px-8">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
