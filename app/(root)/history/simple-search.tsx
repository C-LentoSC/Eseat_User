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
import { Popper } from "@mui/material";

interface FilmOptionType {
  id: string;
  scheduleNo: string;
}

export default function SimpleSearch({
  date,
  setDate,
  scheduleId,
  setScheduleId,
  search,
}: any) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [scheduleIdadata, setScheduleIddata] = useState<FilmOptionType[]>([]);

  const [open, setOpen] = useState(false);

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
        //     (item: { date: string }) =>
        //       item.date === format(new Date(date), "yyyy-MM-dd")
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
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end max-w-4xl mx-auto">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Select Date <span className="text-red-500">*</span>
            </label>
            <Popover open={open} onOpenChange={setOpen}>
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
                    : format(new Date(), "yyyy/MM/dd")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date)=>{
                    setDate(date);
                    setOpen(false);
                  }}
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
                <SelectValue placeholder="Select Schedule ID" />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(scheduleIdadata) &&
                  scheduleIdadata.map((item: any, index) => (
                    <SelectItem key={index} value={item?.id}>
                      {item?.scheduleNo}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select> */}
            {/* <Autocomplete
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
                    className:
                      "bg-transparent border-[1.5px] border-gray-200 shadow-none px-2 py-1 rounded-lg h-full text-black placeholder:text-black px-0 w-full outline-none focus:ring-0",
                  }}
                />
              )}
            /> */}
            <Autocomplete
              {...defaultProps}
              id="disable-close-on-select"
              disableCloseOnSelect
              onChange={(_, value) => setScheduleId(value?.id || "")}
              PopperComponent={(props) => (
                <Popper
                  {...props}
                  sx={{
                    "& .MuiAutocomplete-listbox": {
                      scrollbarWidth: "none", // Firefox
                      "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
                    },
                  }}
                />
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="All"
                  variant="standard"
                  className="bg-transparent border-gray-300 shadow-none text-black placeholder:text-black px-0 w-full outline-none focus:ring-0"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    className:
                      "bg-transparent border-[1.5px] border-gray-200 shadow-none px-2 py-1 rounded-lg h-full text-black placeholder:text-black w-full outline-none focus:ring-0",
                  }}
                />
              )}
            />
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
