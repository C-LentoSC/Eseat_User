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

export function WelcomeSection() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [date, setDate] = useState<Date>();

  const [name, setname] = useState("");
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");

  useEffect(() => {
    const toekn = localStorage.getItem("token");

    if (!toekn) {
      window.location.href = "/";
      return;
    }

    const getdata = async () => {
      try {
        const res = await axios.get(`${BASE_URL}info`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${toekn}`,
          },
        });

        // console.log(res);
        setname(res?.data?.name);
      } catch (error) {
        console.error(error);
      }
    };
    getdata();
  }, []);

  return (
    <div className="w-full bg-[#F0FBFE] py-24">
      <div className="my-container">
        <h1 className="text-2xl font-semibold text-myColor2 mb-4">
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
          <div className="flex flex-col gap-10 md:flex-row md:items-end bg-white p-8">
            <div className="flex gap-5 items-center border-e-2 border-[#a4b1bd] h-full">
              <div className="text-left">
                <label className="text-sm font-medium text-gray-500">
                  From / සිට / ஒரு
                </label>
                <Input
                  placeholder="Leaving from.."
                  className="bg-transparent border-0 shadow-none mt-0 pt-0 px-0 w-32 text-black placeholder:text-black"
                  onChange={(e) => setfrom(e.target.value)}
                />
              </div>

              <Button
                size="icon"
                className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              >
                <ArrowLeftRight className="h-4 w-4 text-white" />
              </Button>

              <div className="text-left ml-0 lg:ml-8">
                <label className="text-sm font-medium text-gray-500">
                  To / දක්වා /வரை
                </label>
                <Input
                  placeholder="Going to.."
                  className="bg-transparent border-0 shadow-none mt-0 pt-0 text-black placeholder:text-black px-0 w-32 outline-none focus:ring-0"
                  onChange={(e) => setto(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col border-e-2 border-[#a4b1bd] h-full">
              <label className="text-sm font-medium text-gray-500">
                Date / දිනය / தேதி
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full md:w-[200px] justify-start mt-0 pt-0 px-0 text-left font-normal bg-transparent border-0 shadow-none hover:bg-transparent hover:text-black",
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
            <div className="flex flex-col h-full justify-start">
              <label className="text-sm font-medium text-gray-500">
                Passengers / මගීන් /பயணிகள்
              </label>
              <select className="flex h-9 w-full bg-transparent py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                <option value="" className="bg-white hover:bg-[#dd3170]">1 Passenger</option>
                <option value="" className="bg-white hover:bg-[#dd3170]">2 Passenger</option>
              </select>
            </div>

            <Button
              className=" h-10 px-8"
              onClick={() => {
                if (from == "") {
                  alert("Please enter from location");
                } else if (to == "") {
                  alert("Please enter to location");
                } else if (date == "" || date == null) {
                  alert("Please select date");
                } else {
                  window.location.href = `/booking/listing?from=${from}&to=${to}&date=${date}`;
                }
              }}
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
