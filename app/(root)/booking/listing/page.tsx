"use client";
import React, { useEffect, useState } from "react";
import TravelBooking from "./travel-booking";
import { SearchResults } from "./search-results";
import axios from "axios";
import { format } from "date-fns";

const BookingListing = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [isloading, setisLoading] = useState(false);
  const [alldata, setalldata] = useState<any[]>([]);

  const [date, setDate] = React.useState<Date>(new Date());
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [passenger, setpassenger] = useState("");

  const currentUrl = window.location.href; // Get the current URL
  const url = new URL(currentUrl); // Create a URL object
  const searchParams = url.searchParams; // Get query parameters

  // Extract query parameters
  const fromParam = searchParams.get("from") || "";
  const toParam = searchParams.get("to") || "";
  const dateParam = searchParams.get("date") || "";
  const passengerParam = searchParams.get("passenger") || "";

  // console.log("from", fromParam, "to", toParam, "date", dateParam);

  useEffect(() => {
    setisLoading(true);
    const loaddata = async () => {
      const form = new FormData();
      form.append("from", fromParam);
      form.append("to", toParam);
      form.append("start_date", format(dateParam, "yyyy-MM-dd"));

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
  }, []);

  const search = async () => {
    // console.log(from ? from : fromParam);
    // console.log(to ? to : toParam);
    // console.log(date ? date : dateParam);
    try {
      setisLoading(true);
      const form = new FormData();
      form.append("from", from ? from : fromParam);
      form.append("to", to ? to : toParam);
      form.append("start_date", format(date ? date : dateParam, "yyyy-MM-dd"));

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
        from1={fromParam}
        to1={toParam}
        date1={dateParam}
        from={from ? from : fromParam}
        to={to ? to : toParam}
        passenger={passenger ? passenger : passengerParam}
        date={date ? date : dateParam}
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
