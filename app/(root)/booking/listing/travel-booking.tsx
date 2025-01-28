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

export default function TravelBooking({
  from1,
  to1,
  date1,
  date,
  from,
  to,
  passenger,
  setDate,
  setFrom,
  setTo,
  setPassenger,
  search,
}: any) {
  // const [date, setDate] = React.useState<Date>(new Date(date1));
  // const [from, setFrom] = React.useState(from1);
  // const [to, setTo] = React.useState(to1);

  const [isVisible, setisVisible] = React.useState(false);

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
    <div className="bg-bgMyColor6 basic_search_bg1 bg-contain lg:bg-cover w-full py-24">
      <div className="w-full my-container">
        <div className="bg-gray-700 text-white p-4 rounded-t-lg flex flex-wrap lg:flex-nowrap items-center justify-center gap-4 lg:gap-12 lg:w-max mx-auto">
          <div className="flex items-center gap-4">
            <span>{from ? from: "__"}</span>
            {/* <ArrowLeftRight className="w-4 h-4" /> */}
            <img src="/assets/search_Arrow.svg" alt="search_bar_Arrow" className="w-28"/>
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
            <div>
              <form
                onSubmit={handleSearch}
                className="flex gap-5 justify-center"
              >
                <div className="flex flex-col lg:flex-row gap-10 w-full lg:w-auto bg-white p-6 rounded-lg shadow-lg transform duration-150">
                  <div className="flex flex-col lg:flex-row gap-5 lg:items-center lg:border-e-2 border-[#a4b1bd] h-full">
                    <div className="text-left">
                      <label className="text-sm font-medium text-gray-500">
                        From / සිට / ஒரு
                      </label>
                      <Input
                        placeholder="Leaving from.."
                        className="bg-transparent border-0 shadow-none mt-0 pt-0 px-0 w-32 text-black placeholder:text-black"
                        onChange={(e) => setFrom(e.target.value)}
                        value={from}
                      />
                    </div>

                    <Button
                      size="icon"
                      className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      onClick={handleSwapLocations}
                    >
                      <ArrowLeftRight className="h-4 w-4 text-white" />
                    </Button>

                    <div className="text-left ml-0 lg:ml-8 pr-2">
                      <label className="text-sm font-medium text-gray-500">
                        To / දක්වා /வரை
                      </label>
                      <Input
                        placeholder="Going to.."
                        className="bg-transparent border-0 shadow-none mt-0 pt-0 text-black placeholder:text-black px-0 w-32 outline-none focus:ring-0"
                        onChange={(e) => setTo(e.target.value)}
                        value={to}
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
                            "w-full md:w-[200px] justify-start mt-0 pt-2 px-0 text-left font-normal bg-transparent border-0 shadow-none hover:bg-transparent hover:text-black",
                            !date && "text-black"
                          )}
                        >
                          {date ? format(date, "EEE, MMM dd") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(day) => setDate(day || new Date())}
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
                      <select
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
                      </select>
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
        )}
      </div>
    </div>
  );
}
