"use client";

import React, { useEffect, useState } from "react";
// import { useState } from "react";
// import { TripSummary } from "@/components/trip-summary";
// import { Seat } from "@/components/seat";
// import { SeatLegend } from "@/components/seat-legend";
import { FareSummary } from "@/components/fare-summary";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BusCard } from "@/components/bus-card";
import TripSelection from "@/components/TripSelection";
import BookingTable from "./BookingTable";
import PassengerForm from "./PassengerForm";
import { ArrowLeft } from "lucide-react";
import { BusSeatLayout } from "@/components/bus-seat-layout";
import axios from "axios";

export default function BookingPage({ params }) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  // const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const sheduleId = params?.id;

  const [alldata, setalldata] = useState<any[]>([]);

  useEffect(() => {
    const loaddata = async () => {
      const res = await axios.get(
        `${BASE_URL}schedule-details?id=${sheduleId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      setalldata(res.data);
    };

    loaddata();
  }, []);

  // const seatData = Array.from({ length: 40 }, (_, i) => ({
  //   number: i + 1,
  //   status: Math.random() > 0.7 ? "booked" : "available",
  // })) as Array<{
  //   number: number;
  //   status: "available" | "processing" | "booked" | "selected";
  // }>;

  const seatData = alldata?.allSeats?.map((seat) => ({
    number: parseInt(seat.seat_no, 10), // Convert seat_no to number
    status: seat.isBooked
      ? "booked"
      : seat.isBlocked
      ? "processing"
      : "available",
  }));

  console.log(seatData);

  // const handleSeatClick = (seatNumber: number) => {
  //   setSelectedSeats((prev) =>
  //     prev.includes(seatNumber)
  //       ? prev.filter((n) => n !== seatNumber)
  //       : [...prev, seatNumber]
  //   );
  // };

  return (
    <>
      {/*beautifull working back buttonin the top left corner */}
      <div className=" my-container py-5">
        <Button
          variant={"secondary"}
          className=" flex space-x-3"
          onClick={() => history.back()}
        >
          <ArrowLeft className="w-6 h-6" />
          Back
        </Button>
      </div>
      <div className="my-container pb-16 space-y-12">
        {/* <TripSummary
        departure="15:00 PM"
        arrival="01:00 AM"
        departureLocation="Colombo"
        arrivalLocation="Jaffna"
        bookingDate="2024-12-17"
        closingTime="14:00"
        depotName="Welisara"
        price={1350.5}
        duration={10}
        availableSeats={42}
      /> */}

        <BusCard
          key={alldata.id}
          id={alldata.id}
          image={alldata?.bus?.mainImage}
          arrival={{
            time: alldata?.end_time,
            location: alldata.to?.name,
          }}
          departure={{
            time: alldata?.start_time,
            location: alldata.from?.name,
          }}
          booking={{
            startDate: alldata?.startDate,
            startTime: alldata?.start_time,
            endTime: alldata?.end_time,
          }}
          busType={alldata?.bus?.type}
          depotName={alldata?.bus?.depot?.name}
          price={10000}
          duration={alldata?.duration}
          availableSeats={alldata.allSeats?.length}
          fasility={alldata?.bus?.facilities}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4 border p-5 rounded-lg bg-slate-50">
              <div>
                <Label>Boarding Point</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select boarding point" />
                  </SelectTrigger>
                  <SelectContent>
                    {alldata?.boardingAndDropping?.Boarding?.map(
                      (item, index) => (
                        <SelectItem value={item?.point?.name} key={index}>
                          {item?.point?.name}
                        </SelectItem>
                      )
                    )}
                    {/* <SelectItem value="colombo">Colombo Central</SelectItem>
                    <SelectItem value="kadawatha">Kadawatha</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Dropping Point</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dropping point" />
                  </SelectTrigger>
                  <SelectContent>
                    {alldata?.boardingAndDropping?.Dropping?.map(
                      (item, index) => (
                        <SelectItem value={item?.point?.name} key={index}>
                          {item?.point?.name}
                        </SelectItem>
                      )
                    )}
                    {/* <SelectItem value="jaffna">Jaffna Bus Stand</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* <SeatLegend /> */}

            {/* <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 40 }, (_, i) => (
                <Seat
                  key={i + 1}
                  number={i + 1}
                  status={
                    selectedSeats.includes(i + 1)
                      ? "selected"
                      : Math.random() > 0.7
                      ? "booked"
                      : "available"
                  }
                  onClick={() => handleSeatClick(i + 1)}
                />
              ))}
            </div> */}
            <BusSeatLayout
              seats={seatData}
              onSeatClick={(seatNumber) => {
                console.log(`Clicked seat ${seatNumber}`);
              }}
            />

            <div className="space-y-4">
              <Label>Ticket Type</Label>
              <RadioGroup defaultValue="full" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full">Full Ticket</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="half" id="half" />
                  <Label htmlFor="half">Half Ticket</Label>
                </div>
              </RadioGroup>
            </div>

            <PassengerForm />
          </div>

          <div>
            <TripSelection />
            <FareSummary
              baseFare={1350.5}
              convenienceFee={125.0}
              bankCharges={25.0}
            />
            <Button className="w-full mt-4 bg-pink-600 hover:bg-pink-700">
              Print Ticket
            </Button>
          </div>
        </div>
      </div>
      <BookingTable />
    </>
  );
}
