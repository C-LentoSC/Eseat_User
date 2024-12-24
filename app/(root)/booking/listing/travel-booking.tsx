"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeftRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function TravelBooking() {
  const [date, setDate] = React.useState<Date>(new Date());
  const [from, setFrom] = React.useState("Colombo");
  const [to, setTo] = React.useState("Jaffna");

  const handleSwapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", { from, to, date });
  };

  return (
    <div className="bg-bgMyColor6 py-24">
      <div className="w-full my-container">
        <div className="bg-gray-700 text-white p-4 rounded-t-lg flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <span>{from}</span>
            <ArrowLeftRight className="w-4 h-4" />
            <span>{to}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{format(date, "yyyy-MM-dd")}</span>
            <Button size="sm">Modify</Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Leaving from..."
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="pl-4 h-full"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 text-primary h-full hover:text-white"
                onClick={handleSwapLocations}
              >
                <ArrowLeftRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1">
              <Input
                placeholder="Going to..."
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="h-full"
              />
            </div>

            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-full",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "EEE, MMM dd") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button type="submit" className=" py-6">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
