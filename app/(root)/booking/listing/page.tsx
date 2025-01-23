"use client";

import React, { useEffect, useState } from "react";
import TravelBooking from "./travel-booking";
import { SearchResults } from "./search-results";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface BusData {
  id: number;
  main_image: string;
  scheduleData: {
    start_time: string;
    end_time: string;
    price: number;
    duration: number;
    startDate: string;
  };
  availableSeats: any[];
  facilities: [];
  fare_point: [];
  depot: { name: string };
  type: string;
  from: { name: string };
  to: { name: string };
}

interface Params {
  from?: string;
  to?: string;
  date?: string;
  passenger?: string;
}

const BookingListing = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [params, setParams] = useState<Params>({});
  const [isloading, setIsLoading] = useState<boolean>(false);
  const [alldata, setAlldata] = useState<BusData[]>([]);

  const [date, setDate] = React.useState<Date>(new Date());
  const [from, setFrom] = React.useState<string>("");
  const [to, setTo] = React.useState<string>("");
  const [passenger, setPassenger] = useState<string>("");

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        const from = searchParams.get("from") || "";
        const to = searchParams.get("to") || "";
        const date = searchParams.get("date") || "";
        const passenger = searchParams.get("passenger") || "";

        if(from && to && date && passenger){
          setParams({ from, to, date, passenger });
        }else{
          toast.error("Somthing Went Wrong.");
          window.location.href = "/booking"
        }

        
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (
      params.date &&
      params.date !== "undefined" &&
      params.from &&
      params.to
    ) {
      setIsLoading(true);
      const loaddata = async () => {
        const form = new FormData();
        form.append("from", params.from || "");
        form.append("to", params.to || "");
        form.append("start_date", format(new Date(params.date || ""), "yyyy-MM-dd"));

        try {
          const res = await axios.post(`${BASE_URL}basic-search`, form, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          console.log(res);
          setAlldata(res?.data || []);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };
      loaddata();
    }
  }, [params]);

  const search = async () => {
    try {
      setIsLoading(true);
      const form = new FormData();
      form.append("from", from || params.from || "");
      form.append("to", to || params.to || "");
      form.append("start_date", format(date || new Date(params.date || ""), "yyyy-MM-dd"));

      try {
        const res = await axios.post(`${BASE_URL}basic-search`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(res);
        setAlldata(res?.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TravelBooking
        from1={params.from}
        to1={params.to}
        date1={params.date}
        from={from || params.from || ""}
        to={to || params.to || ""}
        passenger={passenger || params.passenger || ""}
        date={date || new Date(params.date || "")}
        setDate={setDate}
        setFrom={setFrom}
        setTo={setTo}
        setPassenger={setPassenger}
        search={search}
      />
      <SearchResults alldata={alldata} isloading={isloading} />
    </>
  );
};

export default BookingListing;
