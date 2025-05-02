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
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import toast from "react-hot-toast";
import { Popper } from "@mui/material";
import LoadingAnimation from "@/components/ui/Loading";

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

export default function TravelBooking({
  from1,
  to1,
  date1,
  date,
  from,
  to,
  passenger,
  endCities,
  setDate,
  setFrom,
  setTo,
  setPassenger,
  search,
}: any) {
  // const [date, setDate] = React.useState<Date>(new Date(date1));
  // const [from, setFrom] = React.useState(from1);
  // const [to, setTo] = React.useState(to1);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [isVisible, setisVisible] = React.useState(false);

  const [citises, setCities] = React.useState<any[]>([]);
  const [endcitises, setEndCities] = React.useState<any[]>([]);

  const [open, setOpen] = React.useState(false);
  const [openload, setOpenLoad] = React.useState(false);

  React.useEffect(() => {
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
        setOpenLoad(true);

      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const handleSwapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", { from, to, date });
  };

  const defaultProps = {
    options: citises,
    getOptionLabel: (option: FilmOptionType) => option.name,
  };

  const defaultProps1 = {
    options: endcitises.length > 0 ? endcitises : endCities,
    getOptionLabel: (option: FilmOptionType) => option.name,
  };


  return (
    <div className="bg-bgMyColor6 basic_search_bg1 bg-contain lg:bg-cover w-full py-24">
      <div className="w-full my-container">
        <div className="bg-gray-700 text-white p-4 rounded-t-lg flex flex-wrap lg:flex-nowrap items-center justify-center gap-4 lg:gap-12 lg:w-max mx-auto">
          <div className="flex items-center gap-4 flex-wrap justify-center lg:flex-nowrap">
            <span>{from ? from : "__"}</span>
            {/* <ArrowLeftRight className="w-4 h-4" /> */}
            <img
              src="/assets/search_Arrow.svg"
              alt="search_bar_Arrow"
              className="w-28"
            />
            <span>{to ? to : "__"}</span>
          </div>
          <div className="flex items-center gap-10">
            <span>{format(date, "yyyy-MM-dd")}</span>
            {isVisible ? (
              <>
                <Button
                  size="sm"
                  className="px-6"
                  onClick={() => {
                    setisVisible(false);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  className="px-6"
                  onClick={() => {
                    setisVisible(true);
                  }}
                >
                  Modify
                </Button>
              </>
            )}
          </div>
        </div>

        {isVisible && (
          <>
            {openload ? (
              <>
                <div>
                  <form
                    onSubmit={handleSearch}
                    className="flex justify-center"
                  >
                    <div className="flex flex-col lg:flex-row gap-10 w-full lg:w-auto justify-center bg-white p-6 rounded-lg shadow-lg">
                      <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:border-e-2 border-[#a4b1bd] h-full">
                        <div className="text-left w-full lg:w-40">
                          <label className="text-sm font-medium text-gray-500">
                            From / සිට / ஒரு
                          </label>
                          {/* <Input
                        placeholder="Leaving from.."
                        className="bg-transparent border-0 shadow-none mt-0 pt-0 px-0 w-32 text-black placeholder:text-black"
                        onChange={(e) => setFrom(e.target.value)}
                        value={from}
                      /> */}
                          {/* <Autocomplete
                        {...defaultProps}
                        id="disable-close-on-select"
                        disableCloseOnSelect
                        value={citises.find((city) => city.name === from)}
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
                      /> */}
                          <Autocomplete
                            {...defaultProps}
                            id="disable-close-on-select"
                            disableCloseOnSelect
                            PopperComponent={(props) => (
                              <Popper
                                {...props}
                                modifiers={[
                                  {
                                    name: "preventOverflow",
                                    options: {
                                      boundary: "window",
                                    },
                                  },
                                ]}
                                sx={{
                                  "& .MuiAutocomplete-listbox": {
                                    scrollbarWidth: "none", // Firefox
                                    "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
                                  },
                                }}
                              />
                            )}
                            // value={citises.find((city) => city.name === from)}
                            value={citises.find((city) => city.name === from)}
                            onChange={(_: any, value: any) => {
                              setFrom(value?.name || "");
                              setEndCities(value?.ends || []);
                            }}
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
                          onClick={handleSwapLocations}
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
                        value={to}
                      /> */}
                          {/* <Autocomplete
                        {...defaultProps}
                        id="disable-close-on-select"
                        disableCloseOnSelect
                        value={citises.find((city) => city.name === to)}
                        onChange={(_, value) => setTo(value?.name || "")}
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
                      /> */}
                          <Autocomplete
                            {...defaultProps1}
                            id="disable-close-on-select"
                            disableCloseOnSelect
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
                            value={citises.find((city) => city.name === to)}
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
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full md:w-[200px] justify-start mt-0 pt-2 px-0 text-left bg-transparent border-0 shadow-none font-normal text-md hover:bg-transparent hover:text-black",
                                !date && "text-gray-400"
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
                                  setOpen(false);
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
                          <option
                            key={i + 1}
                            value={i + 1}
                            className="bg-white"
                          >
                            {i + 1} Passenger
                          </option>
                        ))}
                      </select> */}

                          {/* <Autocomplete
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
                      /> */}
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

                      <Button
                        type="submit"
                        className="py-6"
                        onClick={() => {
                          search();
                          setisVisible(false);
                        }}
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-3 w-full justify-center items-center bg-white p-6 rounded-lg shadow-lg">
                  <span className="font-bold text-gray-500">Loading Cities..</span>
                  <div className="animate-spin h-5 w-5 border-4 border-gray-300 rounded-full border-t-[#dd3170]" role="status" aria-label="loading" aria-describedby="loading-spi"></div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
