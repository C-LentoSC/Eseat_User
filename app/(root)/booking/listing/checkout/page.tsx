"use client";

import { useState } from "react";
import { TripSummary } from "@/components/trip-summary";
import { Seat } from "@/components/seat";
import { SeatLegend } from "@/components/seat-legend";
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

export default function BookingPage() {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (seatNumber: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((n) => n !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  return (
    <div className="my-container py-16 space-y-12">
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
        image="/assets/bus.png"
        arrival={{
          time: "15.00 PM",
          location: "Colombo",
        }}
        departure={{
          time: "01.00 AM",
          location: "Jaffna",
        }}
        booking={{
          startDate: "2024-12-17",
          startTime: "15:00",
          endTime: "14:00",
        }}
        busType="Normal"
        depotName="Welisara"
        price={1350.5}
        duration={10}
        availableSeats={42}
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
                  <SelectItem value="colombo">Colombo Central</SelectItem>
                  <SelectItem value="kadawatha">Kadawatha</SelectItem>
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
                  <SelectItem value="jaffna">Jaffna Bus Stand</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <SeatLegend />

          <div className="grid grid-cols-5 gap-2">
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
          </div>

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
        </div>

        <div>
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
  );
}
