"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { useState } from "react";

export default function SearchForm() {
  const [date, setDate] = useState<Date>();

  return (
    <div className=" bg-bgMyColor6 py-14">
      <div className="w-full my-container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Selected Booked Date <span className="text-red-500">*</span>
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-transparent",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date
                    ? format(date, "yyyy/MM/dd")
                    : "2024/12/19 - 2024/12/19"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Schedule ID <span className="text-red-500">*</span>
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="schedule1">Schedule 1</SelectItem>
                <SelectItem value="schedule2">Schedule 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Select Travel Date (Optional)
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="choose point" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="point1">Point 1</SelectItem>
                <SelectItem value="point2">Point 2</SelectItem>
                <SelectItem value="point3">Point 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
