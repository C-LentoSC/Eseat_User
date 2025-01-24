"use client";

import React, { useEffect, useState } from "react";
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
import { BusSeatLayout, BusSeatLayoutSM } from "@/components/bus-seat-layout";
import axios from "axios";
import { FareSummary } from "@/components/fare-summary";
import LoadingAnimation from "@/components/ui/Loading";

// Define types for data structures
interface SeatData {
  number: number;
  status: "available" | "processing" | "booked" | "selected";
}

interface BoardingAndDropping {
  Boarding: { point: { name: string } }[];
  Dropping: { point: { name: string } }[];
}

interface Alldata {
  id: number;
  bus: {
    mainImage: string;
    type: string;
    depot: { name: string };
    facilities: [];
  };
  start_time: string;
  end_time: string;
  startDate: string;
  duration: number;
  allSeats: { seat_no: string; isBooked: boolean; isBlocked: boolean }[];
  boardingAndDropping: BoardingAndDropping;
  to: {
    id: number;
    name: string;
  };
  from: {
    id: number;
    name: string;
  };
}

export default function BookingPage({
  params,
}: {
  params: Record<string, string | undefined>;
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const sheduleId = params?.id;

  const [alldata, setAlldata] = useState<Alldata | null>(null);

  const [seatcount, setseatcount] = useState<number>(0);

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const [isLoading, setisLoading] = useState<boolean>(false);

  const [pname, setpname] = useState<string>("");
  const [pmobile, setpmobile] = useState<string>("");
  const [pnic, setpnic] = useState<string>("");
  const [pemail, setpemail] = useState<string>("");

  const [bpoint, setbpoint] = useState<string>("");
  const [bdoint, setdpoint] = useState<string>("");

  const [halfticket, sethalfticket] = useState<boolean>(false);

  useEffect(() => {
    setisLoading(true);

    if (!isNaN(Number(sheduleId))) {
      const loaddata = async () => {
        try {
          const res = await axios.get(
            `${BASE_URL}schedule-details?id=${sheduleId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log(res);
          setAlldata(res.data);
          setseatcount(res?.data?.allSeats?.length);
          setisLoading(false);
        } catch (error: any) {
          console.error(error);
          setisLoading(false);
        }
      };

      loaddata();
    } else {
      window.history.back();
    }
  }, [sheduleId]);

  const [seats, setSeats] = useState<SeatData[]>(
    Array(seatcount)
      .fill(null)
      .map((_, index) => {
        const seat = alldata?.allSeats?.[index];
        return {
          number: parseInt(seat?.seat_no || (index + 1).toString(), 10),
          status: seat?.isBooked
            ? "booked"
            : seat?.isBlocked
            ? "processing"
            : "available",
        };
      })
  );

  useEffect(() => {
    setSeats(
      // Array(seatcount)
      Array(54)
        .fill(null)
        .map((_, index) => {
          const seat = alldata?.allSeats?.[index];
          return {
            number: parseInt(seat?.seat_no || (index + 1).toString(), 10),
            status: seat?.isBooked
              ? "booked"
              : seat?.isBlocked
              ? "processing"
              : "available",
          };
        })
    );
  }, [seatcount]);

  // console.log(seats);

  const handleSeatClick = (seatNumber: number | string): void => {
    const parsedSeatNumber =
      typeof seatNumber === "string" ? parseInt(seatNumber, 10) : seatNumber;

    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.number === parsedSeatNumber
          ? {
              ...seat,
              status:
                seat.status === "available"
                  ? "selected"
                  : seat.status === "selected"
                  ? "available"
                  : seat.status,
            }
          : seat
      )
    );

    setSelectedSeats(
      (prevSelectedSeats) =>
        prevSelectedSeats.includes(parsedSeatNumber)
          ? prevSelectedSeats.filter((seat) => seat !== parsedSeatNumber) // Remove if it exists
          : [...prevSelectedSeats, parsedSeatNumber] // Add if it doesn't exist
    );
  };

  const printTicket = () => {
    console.log("id : ", sheduleId);
    console.log("name : ", pname);
    console.log("mobile", pmobile);
    console.log("NIC", pnic);
    console.log("email", pemail);
  };

  if (isLoading) {
    return (
      <>
        <div className="h-[85vh] flex justify-center items-center">
          <LoadingAnimation />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="my-container py-5">
        <Button
          variant={"secondary"}
          className="flex space-x-3"
          onClick={() => history.back()}
        >
          <ArrowLeft className="w-6 h-6" />
          Back
        </Button>
      </div>
      <div className="my-container pb-16 space-y-12">
        {alldata && (
          <BusCard
            // key={alldata.id}
            id={alldata.id}
            image={alldata?.bus?.mainImage}
            arrival={{
              time: alldata?.end_time,
              name: alldata.to?.name,
            }}
            departure={{
              time: alldata?.start_time,
              name: alldata.from?.name,
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
            boardingDropping={[]}
            bookbtnst={false}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6 p-10">
            <div className="hidden lg:block">
              <BusSeatLayout seats={seats} onSeatClick={handleSeatClick} />
            </div>
            <div className="block md:block lg:hidden">
              <BusSeatLayoutSM seats={seats} onSeatClick={handleSeatClick} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border p-5 rounded-lg bg-slate-50">
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
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border p-5 rounded-lg bg-slate-50">
              <div className="space-y-4">
                <Label>Ticket Type</Label>
                <RadioGroup defaultValue="full" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="full"
                      id="full"
                      onChange={() => sethalfticket(false)}
                    />
                    <Label htmlFor="full">Full Ticket</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="half"
                      id="half"
                      onChange={() => sethalfticket(true)}
                    />
                    <Label htmlFor="half">Half Ticket</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-1">
                <Label>
                  Price Catergory <span className="text-red-500">*</span>{" "}
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Price Catergory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"Normal"}>Normal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <PassengerForm
              name={pname}
              mobile={pmobile}
              nic={pnic}
              email={pemail}
              setName={setpname}
              setMobile={setpmobile}
              setNic={setpnic}
              setEmail={setpemail}
            />
          </div>

          <div>
            <TripSelection />
            <FareSummary
              baseFare={1350.5}
              convenienceFee={125.0}
              bankCharges={25.0}
            />
            <Button
              className="w-full mt-4 bg-pink-600 hover:bg-pink-700"
              onClick={printTicket}
            >
              Send IPG link
            </Button>
          </div>
        </div>
      </div>
      <BookingTable />
    </>
  );
}
