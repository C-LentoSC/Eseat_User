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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface FilmOptionType {
  id: string;
  scheduleNo: string;
}

export default function SearchForm({
  date,
  setDate,
  scheduleId,
  setScheduleId,
  travelDate,
  setTravelDate,
  search,
}: any) {
  // const [date, setDate] = useState<Date>();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [scheduleIdadata, setScheduleIddata] = useState<FilmOptionType[]>([]);

  useEffect(() => {
    const loaddata = async () => {
      try {
        const res = await axios.get(`${BASE_URL}report/schedule`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // if (date) {

        //   // Filter the data for today's date
        //   const todayItems = res.data.filter(
        //     (item: { date: string }) => item.date === format(new Date(date), "yyyy-MM-dd")
        //   );

        //   // Set the filtered data
        //   setScheduleIddata(todayItems);
        // } else {
        setScheduleIddata(res.data);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    loaddata();
  }, [date]);

  const defaultProps = {
    options: scheduleIdadata,
    getOptionLabel: (option: FilmOptionType) => option.scheduleNo,
  };

  return (
    <div className=" bg-bgMyColor6 report_bg py-14">
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
            {/* <Select onValueChange={setScheduleId} value={scheduleId}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {Array.isArray(scheduleIdadata) &&
                  scheduleIdadata.map((item: any, index) => (
                    <SelectItem key={index} value={item?.id}>
                      {item?.scheduleNo}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select> */}
            <Autocomplete
              {...defaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              onChange={(_, value) => setScheduleId(value?.id || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="All"
                  variant="standard"
                  className="bg-transparent border-gray-300 shadow-none text-black placeholder:text-black px-0 w-full outline-none focus:ring-0"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    className: "bg-transparent border-[1.5px] border-gray-200 shadow-none px-2 py-1 rounded-lg h-full text-black placeholder:text-black px-0 w-full outline-none focus:ring-0",
                  }}
                />
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Select Travel Date (Optional)
            </label>
            {/* <Select>
              <SelectTrigger>
                <SelectValue placeholder="choose point" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="point1">Point 1</SelectItem>
                <SelectItem value="point2">Point 2</SelectItem>
                <SelectItem value="point3">Point 3</SelectItem>
              </SelectContent>
            </Select> */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-transparent",
                    !travelDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {travelDate ? format(travelDate, "yyyy/MM/dd") : "2024/12/19"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={travelDate}
                  onSelect={setTravelDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
