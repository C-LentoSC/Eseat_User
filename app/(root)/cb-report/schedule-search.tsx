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
import { useEffect, useState } from "react";
import axios from "axios";

export default function ScheduleSearch({
  date,
  setDate,
  scheduleId,
  setScheduleId,
  search,
}: any) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [scheduleIdadata, setScheduleIddata] = useState<string[]>([]);

  useEffect(() => {
    const loaddata = async () => {
      try {
        const res = await axios.get(`${BASE_URL}report/schedule`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (date) {
          // Filter the data for today's date
          const todayItems = res.data.filter(
            (item: { date: string }) =>
              item.date === format(new Date(date), "yyyy-MM-dd")
          );

          // Set the filtered data
          setScheduleIddata(todayItems);
        } else {
          setScheduleIddata(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loaddata();
  }, [date]);

  return (
    <div className=" bg-bgMyColor6 report_bg py-14">
      <div className="w-full my-container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end max-w-4xl mx-auto">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Select Date <span className="text-red-500">*</span>
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
                  {date ? format(date, "yyyy/MM/dd") : "2024/12/19"}
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
            <Select onValueChange={setScheduleId} value={scheduleId}>
              <SelectTrigger className="bg-transparent">
                <SelectValue placeholder="Select Schedule ID" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(scheduleIdadata) &&
                  scheduleIdadata.map((item: any, index) => (
                    <SelectItem key={index} value={item?.id}>
                      {item?.scheduleNo}
                    </SelectItem>
                  ))}
                {/* <SelectItem value="ht18">
                  HT18-1930-CD44-Colombo- Sri Lanka
                </SelectItem>
                <SelectItem value="schedule2">Schedule 2</SelectItem>
                <SelectItem value="schedule3">Schedule 3</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={search}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
