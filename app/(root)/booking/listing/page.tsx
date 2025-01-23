"use client";
import React, { useEffect, useState } from "react";
import TravelBooking from "./travel-booking";
import { SearchResults } from "./search-results";
import axios from "axios";
import { format } from "date-fns";

const BookingListing = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [params, setParams] = useState<{ [key: string]: string }>({});

  const [isloading, setisLoading] = useState(false);
  const [alldata, setalldata] = useState<unknown[]>([]);

  const [date, setDate] = React.useState<Date>(new Date());
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [passenger, setpassenger] = useState("");

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        const from = searchParams.get("from") || "";
        const to = searchParams.get("to") || "";
        const date = searchParams.get("date") || "";
        const passenger = searchParams.get("passenger") || "";

        setParams({ from, to, date, passenger });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const currentUrl = window.location.href; // Get the current URL
  // const url = new URL(currentUrl); // Create a URL object
  // const searchParams = url.searchParams; // Get query parameters

  // // Extract query parameters
  // const fromParam = searchParams.get("from") || "";
  // const toParam = searchParams.get("to") || "";
  // const dateParam = searchParams.get("date") || "";
  // const passengerParam = searchParams.get("passenger") || "";

  console.log("from", params.from, "to", params.to, "date", params.date);

  useEffect(() => {
    if (
      params.date &&
      params.date !== "undefined" &&
      params.from &&
      params.to
    ) {
      setisLoading(true);
      const loaddata = async () => {
        const form = new FormData();
        form.append("from", params.from);
        form.append("to", params.to);
        form.append("start_date", format(params.date, "yyyy-MM-dd"));

        try {
          const res = await axios.post(`${BASE_URL}basic-search`, form, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          console.log(res);
          setalldata(res?.data);
          setisLoading(false);
        } catch (error) {
          console.error(error);
          setisLoading(false);
        }
      };
      loaddata();
    }
  }, []);

  const search = async () => {
    // console.log(from ? from : fromParam);
    // console.log(to ? to : toParam);
    // console.log(date ? date : dateParam);
    try {
      setisLoading(true);
      const form = new FormData();
      form.append("from", from ? from : params.from);
      form.append("to", to ? to : params.to);
      form.append(
        "start_date",
        format(date ? date : params.date, "yyyy-MM-dd")
      );

      try {
        const res = await axios.post(`${BASE_URL}basic-search`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(res);
        setalldata(res?.data);
        setisLoading(false);
      } catch (error) {
        console.error(error);
        setisLoading(false);
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
        from={from ? from : params.from}
        to={to ? to : params.to}
        passenger={passenger ? passenger : params.passenger}
        date={date ? date : params.date}
        setDate={setDate}
        setFrom={setFrom}
        setTo={setTo}
        setpassenger={setpassenger}
        search={search}
      />
      <SearchResults alldata={alldata} isloading={isloading} />
    </>
  );
};

export default BookingListing;
