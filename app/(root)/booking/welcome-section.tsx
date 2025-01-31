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
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface FilmOptionType {
  name: string;
}

interface OptionType {
  name: string;
  value: number;
}

const passengerOptions: OptionType[] = Array.from({ length: 54 }, (_, i) => ({
  name: `${i + 1} Passenger`,
  value: i + 1,
}));

export function WelcomeSection() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [date, setDate] = useState<Date | undefined>(undefined);

  const [citises, setCities] = useState<any[]>([]);

  const [name, setName] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [passenger, setPassenger] = useState<string>("1");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}all-cities`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setCities(res?.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const defaultProps = {
    options: citises,
    getOptionLabel: (option: FilmOptionType) => option.name,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}info`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setName(res?.data?.name || "");
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleSearch = () => {
    if (!from) {
      toast.error("Please enter from location");
    } else if (!to) {
      toast.error("Please enter to location");
    } else if (!date) {
      toast.error("Please select date");
    } else {
      window.location.href = `/booking/listing?from=${from}&to=${to}&date=${format(
        date,
        "yyyy-MM-dd"
      )}&passenger=${passenger}`;
    }
  };

  return (
    <div className="w-full bg-[#F0FBFE] basic_search_bg py-24">
      <div className="my-container">
        <h1 className="text-3xl font-medium text-myColor2 mb-4">
          Hi, {name ? name : "__"}
        </h1>
        <p className="text-myColor2 mb-8 max-w-3xl">
          Welcome to the Admin Panel - your central hub for managing bus
          operations efficiently. Assign buses to routes, update schedules,
          monitor bookings, and oversee all key details with ease. Designed for
          simplicity and control, the Admin Panel helps you keep everything
          running smoothly.
        </p>

        <div className="flex flex-col md:flex-row md:items-end justify-center">
          <div className="flex flex-col gap-10 md:flex-row md:items-end lg:items-center bg-white p-8 rounded-[9px]">
            <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:border-e-2 border-[#a4b1bd] h-full">
              <div className="text-left w-full lg:w-40">
                <label className="text-sm font-medium text-gray-500">
                  From / සිට / ஒரு
                </label>
                {/* <Input
                  placeholder="Leaving from.."
                  className="bg-transparent border-0 shadow-none mt-0 pt-0 px-0 lg:w-32 text-black placeholder:text-black"
                  onChange={(e) => setFrom(e.target.value)}
                /> */}
                <Autocomplete
                  {...defaultProps}
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  onChange={(_, value) => setFrom(value?.name || "")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Leaving from.."
                      variant="standard"
                      className="bg-transparent border-0 shadow-none text-black placeholder:text-black px-0 w-full lg:w-40 outline-none focus:ring-0"
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                    />
                  )}
                />
              </div>

              <Button
                size="icon"
                className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              >
                <ArrowLeftRight className="h-4 w-4 text-white" />
              </Button>

              <div className="text-left ml-0 pr-2 w-full lg:w-40">
                <label className="text-sm font-medium text-gray-500">
                  To / දක්වා /வரை
                </label>
                {/* <Input
                  placeholder="Going to.."
                  className="bg-transparent border-0 shadow-none mt-0 pt-0 text-black placeholder:text-black px-0 w-32 outline-none focus:ring-0"
                  onChange={(e) => setTo(e.target.value)}
                /> */}
                <Autocomplete
                  {...defaultProps}
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  onChange={(_, value) => setTo(value?.name || "")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Going to.."
                      variant="standard"
                      className="bg-transparent border-0 shadow-none text-black placeholder-current:text-black px-0 w-full lg:w-40 outline-none focus:ring-0"
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col lg:border-e-2 border-[#a4b1bd] h-full">
              <label className="text-sm font-medium text-gray-500">
                Date / දිනය / தேதி
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full md:w-[200px] justify-start mt-0 pt-2 px-0 text-left font-normal bg-transparent border-0 shadow-none hover:bg-transparent hover:text-gray-400",
                      !date && "text-gray-400 text-md font-normal"
                    )}
                  >
                    {date ? format(date, "EEE, MMM dd") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      if (
                        selectedDate &&
                        format(selectedDate, "yyyy-MM-dd") <
                          format(new Date(), "yyyy-MM-dd")
                      ) {
                        toast.error("You can't Select Previous Date");
                      } else {
                        setDate(selectedDate);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-5 items-center h-full">
              <div className="text-left">
                <label className="text-sm font-medium text-gray-500">
                  Passengers / මගීන් /பயணிகள்
                </label>
                {/* <select
                  className="flex w-full p-2 px-0 bg-transparent text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  onChange={(e) => setPassenger(e.target.value)}
                  value={passenger}
                >
                  {Array.from({ length: 54 }, (_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-white">
                      {i + 1} Passenger
                    </option>
                  ))}
                </select> */}
                <Autocomplete
                  id="disable-close-on-select"
                  disableCloseOnSelect
                  options={passengerOptions}
                  getOptionLabel={(option) => option.name}
                  value={
                    passengerOptions.find(
                      (opt) => opt.value === parseInt(passenger)
                    ) || null
                  }
                  onChange={(_, value) =>
                    setPassenger((value?.value || 1).toString())
                  }
                  className="w-40"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select Passenger"
                      variant="standard"
                      className="bg-transparent border-0 shadow-none text-black placeholder-current:text-black px-0 w-full outline-none focus:ring-0"
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <Button className=" h-10 px-8" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
