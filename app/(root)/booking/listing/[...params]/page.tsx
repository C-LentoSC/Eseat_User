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
import { ArrowLeft, ArrowLeftRight, Search } from "lucide-react";
import { BusSeatLayout, BusSeatLayoutSM } from "@/components/bus-seat-layout";
import axios from "axios";
import { FareSummary } from "@/components/fare-summary";
import LoadingAnimation from "@/components/ui/Loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

// Define types for data structures
interface SeatData {
  id: number;
  number: string;
  key: any;
  status: "available" | "processing" | "booked" | "selected" | "blocked";
  vat: number;
  service_charge_ctb: number;
  service_charge_hgh: number;
  service_charge01: number;
  service_charge02: number;
  bank_charges: number;
  discount: number;
}

interface BoardingAndDropping {
  id: number;
  boarding: {
    id: number;
    name: string;
  };
  dropping: {
    id: number;
    name: string;
  };
  price: number;
}

interface Seat {
  id: number;
  seat_no?: string;
  key?: any;
  isBooked?: boolean;
  isProcessing?: boolean;
  isBlocked?: boolean;
  vat: number;
  service_charge_ctb: number;
  service_charge_hgh: number;
  service_charge01: number;
  service_charge02: number;
  bank_charges: number;
  discount: number;
}

interface Alldata {
  ScheduleNo: string;
  id: number;
  bus: {
    mainImage: string;
    type: string;
    depot: { name: string };
    facilities: [];
    otherImages: [];
  };
  start_time: string;
  end_time: string;
  start_date: string;
  duration: number;
  allSeats: Seat[];
  fareBrake: BoardingAndDropping[];
  to: {
    id: number;
    name: string;
  };
  from: {
    id: number;
    name: string;
  };
  route_id: number;
  routeDetails: {
    bus_fare: number;
    id: number;
  };
}

export default function BookingPage({
  params,
}: {
  params: Record<string, string | undefined>;
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const sheduleId = params?.params?.[0] || "";

  const [alldata, setAlldata] = useState<Alldata | null>(null);

  const [seatcount, setseatcount] = useState<number>(0);

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [selectedSeats1, setSelectedSeats1] = useState<number[]>([]);

  const [isLoading, setisLoading] = useState<boolean>(false);

  const [pname, setpname] = useState<string>("");
  const [pmobile, setpmobile] = useState<string>("");
  const [pnic, setpnic] = useState<string>("");
  const [pemail, setpemail] = useState<string>("");
  const [boarding, setboarding] = useState<string>("");
  const [dropping, setdropping] = useState<string>("");

  // const [bpoint, setbpoint] = useState<string>("");
  // const [bdoint, setdpoint] = useState<string>("");

  const [halfticket, sethalfticket] = useState<boolean>(false);

  const [date, setDate] = React.useState<Date>(new Date());
  const [from, setFrom] = React.useState<string>("");
  const [to, setTo] = React.useState<string>("");
  const [passenger, setPassenger] = useState<string>("");

  const [isVisible, setisVisible] = React.useState(false);

  const [baseFare, setbaseFare] = useState<number>(0);
  const [fareBrakeId, setFareBrakeId] = useState<number>(0);
  const [convenienceFee, setconvenienceFee] = useState<number>(0);
  const [bankCharges, setbankCharges] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [price1, setPrice1] = useState<number>(0);
  const [sfrom, setsfrom] = useState<string>("");
  const [sto, setsto] = useState<string>("");

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
          setAlldata(res.data);
          setseatcount(res?.data?.allSeats?.length);

          setsfrom(res?.data?.from?.name);
          setsto(res?.data?.to?.name);
          setPrice(res?.data?.routeDetails?.bus_fare);
          setPrice1(res?.data?.routeDetails?.bus_fare);

          // console.log(res?.data?.allSeats?.length);
          // console.log(res?.data?.allSeats);

          setFrom(String(params?.params?.[1]));
          setTo(String(params?.params?.[2]));

          const originalDate = new Date(
            String(params?.params?.[3]).split("T")[0]
          );
          const incrementedDate = new Date(originalDate);
          incrementedDate.setDate(originalDate.getDate() + 1);
          setDate(incrementedDate);

          setPassenger(String(params?.params?.[4]));

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
          id: seat?.id ?? 0,
          number: seat?.seat_no ?? "00",
          key: seat?.key,
          vat: seat?.vat ?? 0,
          service_charge_ctb: seat?.service_charge_ctb ?? 0,
          service_charge_hgh: seat?.service_charge_hgh ?? 0,
          service_charge01: seat?.service_charge01 ?? 0,
          service_charge02: seat?.service_charge02 ?? 0,
          bank_charges: seat?.bank_charges ?? 0,
          discount: seat?.discount ?? 0,
          status: seat?.isBooked
            ? "booked"
            : seat?.isProcessing
            ? "processing"
            : seat?.isBlocked
            ? "blocked"
            : "available",
        };
      })
  );

  useEffect(() => {
    setSeats(
      Array(seatcount)
        // Array(54)
        .fill(null)
        .map((_, index) => {
          const seat = alldata?.allSeats?.[index];
          return {
            id: seat?.id ?? 0,
            number: seat?.seat_no ?? "00",
            key: seat?.key,
            vat: seat?.vat ?? 0,
            service_charge_ctb: seat?.service_charge_ctb ?? 0,
            service_charge_hgh: seat?.service_charge_hgh ?? 0,
            service_charge01: seat?.service_charge01 ?? 0,
            service_charge02: seat?.service_charge02 ?? 0,
            bank_charges: seat?.bank_charges ?? 0,
            discount: seat?.discount ?? 0,
            status: seat?.isBooked
              ? "booked"
              : seat?.isProcessing
              ? "processing"
              : seat?.isBlocked
              ? "blocked"
              : "available",
          };
        })
    );
  }, [seatcount]);

  // console.log(seats);

  let st = true;
  let st1 = true;

  const handleSeatClick = (
    id: number,
    seatNumber: number | string,
    key: string,
    vat: number,
    discount: number,
    service_charge_ctb: number,
    service_charge_hgh: number,
    service_charge01: number,
    service_charge02: number,
    bank_charges: number
  ): any => {
    const parsedSeatNumber =
      typeof seatNumber === "string" ? parseInt(seatNumber, 10) : seatNumber;

    console.log(vat);
    console.log(discount);
    console.log(service_charge_ctb);
    console.log(service_charge_hgh);
    console.log(service_charge01);
    console.log(service_charge02);
    console.log(bank_charges);

    const updateSelectedSeats = (
      id: number,
      key: string,
      vat: number,
      discount: number,
      service_charge_ctb: number,
      service_charge_hgh: number,
      service_charge01: number,
      service_charge02: number,
      bank_charges: number
    ) => {
      setSelectedSeats1((prevState: any) => {
        // Check if the key already exists in the array
        if (prevState.some((item: any) => item.key === key)) {
          // If the key exists, remove it
          const updatedSeats = prevState.filter(
            (item: any) => item.key !== key
          );
          return updatedSeats;
        } else {
          // If the key doesn't exist, add it
          return [
            ...prevState,
            {
              id,
              key,
              vat,
              discount,
              service_charge_ctb,
              service_charge_hgh,
              service_charge01,
              service_charge02,
              bank_charges,
            },
          ];
        }
      });
    };

    // Call the function to update the array
    updateSelectedSeats(
      id,
      key,
      vat,
      discount,
      service_charge_ctb,
      service_charge_hgh,
      service_charge01,
      service_charge02,
      bank_charges
    );

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(parsedSeatNumber)) {
        // Remove the seat and log the removal

        if (st) {
          console.log(`Removed Key number: ${key}`);
          removeSelectedSeats(key, parsedSeatNumber);
          st = false;
        }
        return prevSelectedSeats.filter((seat) => seat !== parsedSeatNumber);
      } else {
        // Add the seat and log the addition

        if (st1) {
          console.log(`Added Keyt number: ${key}`);
          addSelectedSeats(key, parsedSeatNumber);
          st1 = false;
        }
        return [...prevSelectedSeats, parsedSeatNumber];
      }
    });
  };

  const removeSelectedSeats = async (key: string, parsedSeatNumber: number) => {
    try {
      const form = new FormData();
      form.append("id", sheduleId);
      form.append("key", key);

      const res = await axios.post(`${BASE_URL}remove-processing`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.number === parsedSeatNumber.toString()
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
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
      return false;
    }
  };

  // console.log(selectedSeats1);

  const addSelectedSeats = async (key: string, parsedSeatNumber: number) => {
    try {
      const form = new FormData();
      form.append("id", sheduleId);
      form.append("key", key);

      const res = await axios.post(`${BASE_URL}add-processing`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.number === parsedSeatNumber.toString()
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
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const calTotal = () => {
      // If selectedSeats is not valid, return null
      if (
        !selectedSeats1 ||
        !Array.isArray(selectedSeats1) ||
        selectedSeats1.length === 0
      ) {
        return null;
      }

      // Assuming transferDetails.boardingPoint is defined, use it to calculate busFare
      // const busFare = 0;
      const busFare = Number(price) || 0;

      if (busFare === 0) return 0;

      let totalCost = 0;

      // Loop through all selected seats and calculate their total cost
      selectedSeats1.forEach((seat: any) => {
        const ctbCharge = seat.service_charge_ctb || 0;
        const hghCharge = seat.service_charge_hgh || 0;
        const discountRate = seat.discount || 0;
        const vatRate = seat.vat || 0;
        const bankChargeRate = seat.bank_charges || 0;
        const serviceCharge1 = seat.service_charge01 || 0;
        const serviceCharge2 = seat.service_charge02 || 0;

        // 01 - Calculate total before discount for the current seat
        const totalBeforeDiscount = busFare + ctbCharge + hghCharge;

        // 02 - Calculate discount
        const discount = (totalBeforeDiscount * discountRate) / 100;
        const afterDiscountPrice = totalBeforeDiscount - discount;

        // 03 - Calculate VAT
        const vat = (afterDiscountPrice * vatRate) / 100;
        const afterVatPrice = afterDiscountPrice + vat;

        // 04 - Calculate bank charges
        const bankCharge = (afterVatPrice * bankChargeRate) / 100;
        const afterBankChargePrice = afterVatPrice + bankCharge;

        // Final Total for the current seat
        const finalTotal =
          afterBankChargePrice + serviceCharge1 + serviceCharge2;
        totalCost += finalTotal; // Accumulate the total cost for all selected seats
      });

      // Return the total cost for all seats
      return totalCost.toFixed(2);
    };

    const totalCost = calTotal();
    // console.log(totalCost);
    setconvenienceFee(Number(totalCost));
  }, [selectedSeats1]);

  const printTicket = async () => {
    console.log("id : ", sheduleId);
    console.log("name : ", pname);
    console.log("mobile", pmobile);
    console.log("NIC", pnic);
    console.log("email", pemail);
    console.log("half", halfticket);

    try {
      const res = await axios.post(
        `${BASE_URL}book-new-seat`,
        {
          id: Number(sheduleId),
          name: pname,
          email: pemail,
          mobile: pmobile,
          nicOrPassport: pnic,
          isHalf: halfticket,
          seatId: selectedSeats1.map((seat: any) => ({
            id: Number(seat.id),
            is_half: false,
          })),
          fareBrakeId: Number(fareBrakeId),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  const handleSwapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", { from, to, date });
  };

  const setboardingdata = (e: any) => {
    if (e == "Select boarding point") {
      setsfrom(from);
      setsto(to);
      setPrice(price1);

      setFareBrakeId(0);

      // If selectedSeats is not valid, return null
      if (
        !selectedSeats1 ||
        !Array.isArray(selectedSeats1) ||
        selectedSeats1.length === 0
      ) {
        return null;
      }

      // Assuming transferDetails.boardingPoint is defined, use it to calculate busFare
      const busFare = Number(price1) || 0;

      if (busFare === 0) return 0;

      let totalCost = 0;

      // Loop through all selected seats and calculate their total cost
      selectedSeats1.forEach((seat: any) => {
        const ctbCharge = seat.service_charge_ctb || 0;
        const hghCharge = seat.service_charge_hgh || 0;
        const discountRate = seat.discount || 0;
        const vatRate = seat.vat || 0;
        const bankChargeRate = seat.bank_charges || 0;
        const serviceCharge1 = seat.service_charge01 || 0;
        const serviceCharge2 = seat.service_charge02 || 0;

        // 01 - Calculate total before discount for the current seat
        const totalBeforeDiscount = busFare + ctbCharge + hghCharge;

        // 02 - Calculate discount
        const discount = (totalBeforeDiscount * discountRate) / 100;
        const afterDiscountPrice = totalBeforeDiscount - discount;

        // 03 - Calculate VAT
        const vat = (afterDiscountPrice * vatRate) / 100;
        const afterVatPrice = afterDiscountPrice + vat;

        // 04 - Calculate bank charges
        const bankCharge = (afterVatPrice * bankChargeRate) / 100;
        const afterBankChargePrice = afterVatPrice + bankCharge;

        // Final Total for the current seat
        const finalTotal =
          afterBankChargePrice + serviceCharge1 + serviceCharge2;
        totalCost += finalTotal; // Accumulate the total cost for all selected seats
      });

      // console.log(totalCost);
      setconvenienceFee(totalCost);
    } else {
      const data = e.split("|");

      setPrice(data[0]);
      setsfrom(data[1]);
      setsto(data[2]);

      setFareBrakeId(Number(data[3]));

      // If selectedSeats is not valid, return null
      if (
        !selectedSeats1 ||
        !Array.isArray(selectedSeats1) ||
        selectedSeats1.length === 0
      ) {
        return null;
      }

      // Assuming transferDetails.boardingPoint is defined, use it to calculate busFare
      const busFare = Number(data[0]) || 0;

      if (busFare === 0) return 0;

      let totalCost = 0;

      // Loop through all selected seats and calculate their total cost
      selectedSeats1.forEach((seat: any) => {
        const ctbCharge = seat.service_charge_ctb || 0;
        const hghCharge = seat.service_charge_hgh || 0;
        const discountRate = seat.discount || 0;
        const vatRate = seat.vat || 0;
        const bankChargeRate = seat.bank_charges || 0;
        const serviceCharge1 = seat.service_charge01 || 0;
        const serviceCharge2 = seat.service_charge02 || 0;

        // 01 - Calculate total before discount for the current seat
        const totalBeforeDiscount = busFare + ctbCharge + hghCharge;

        // 02 - Calculate discount
        const discount = (totalBeforeDiscount * discountRate) / 100;
        const afterDiscountPrice = totalBeforeDiscount - discount;

        // 03 - Calculate VAT
        const vat = (afterDiscountPrice * vatRate) / 100;
        const afterVatPrice = afterDiscountPrice + vat;

        // 04 - Calculate bank charges
        const bankCharge = (afterVatPrice * bankChargeRate) / 100;
        const afterBankChargePrice = afterVatPrice + bankCharge;

        // Final Total for the current seat
        const finalTotal =
          afterBankChargePrice + serviceCharge1 + serviceCharge2;
        totalCost += finalTotal; // Accumulate the total cost for all selected seats
      });

      // console.log(totalCost);
      setconvenienceFee(totalCost);
    }
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
      <div className="w-full mb-10 py-20 bg-bgMyColor6 basic_search_bg1 bg-contain lg:bg-cover">
        <div className="w-full my-container">
          <div className="bg-gray-700 text-white p-4 rounded-t-lg flex flex-wrap lg:flex-nowrap items-center justify-center gap-4 lg:gap-12 lg:w-max mx-auto">
            <div className="flex items-center gap-4">
              <span>{from}</span>
              {/* <ArrowLeftRight className="w-4 h-4" /> */}
              <img
                src="/assets/search_Arrow.svg"
                alt="search_bar_Arrow"
                className="w-28"
              />
              <span>{to}</span>
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
                        window.location.href = `/booking/listing?from=${from}&to=${to}&date=${date.toISOString()}&passenger=${passenger}`;
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
            key={alldata.id}
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
              startDate: alldata?.start_date,
              startTime: alldata?.start_time,
              endTime: alldata?.end_time,
            }}
            busType={alldata?.bus?.type}
            depotName={alldata?.bus?.depot?.name}
            price={alldata?.routeDetails?.bus_fare}
            duration={alldata?.duration.toFixed(0)}
            availableSeats={alldata.allSeats?.length}
            fasility={alldata?.bus?.facilities}
            boardingDropping={alldata?.fareBrake}
            bookbtnst={false}
            from={""}
            to={""}
            date={""}
            passenger={0}
            schedule_number={alldata?.ScheduleNo}
            route_id={alldata?.routeDetails?.id}
            subImages={alldata?.bus?.otherImages}
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
              </div>
              <div>
                <Label>Boarding / Dropping Points</Label>
                <Select onValueChange={(e) => setboardingdata(e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select boarding point" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Select boarding point">
                      Select boarding point
                    </SelectItem>
                    {alldata?.fareBrake?.map((item, index) => (
                      <SelectItem
                        value={`${item?.price} | ${item?.boarding?.name} | ${item?.dropping?.name} | ${item?.id}`}
                        key={index}
                      >
                        {item?.boarding?.name} / {item?.dropping?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div>
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
              </div> */}
            </div>
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border p-5 rounded-lg bg-slate-50">
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
            </div> */}

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
            <TripSelection
              tripDate={
                alldata?.start_date
                  ? alldata?.start_date
                  : new Date().toISOString()
              }
              startingTime={alldata?.start_time || ""}
              startingPlace={alldata?.from?.name || ""}
              start_stand={""}
              endingTime={alldata?.end_time || ""}
              endingPlace={alldata?.to?.name || ""}
              end_stand={""}
              hours={alldata?.duration || 0}
              bustype={alldata?.bus?.type || ""}
            />
            <FareSummary
              from={sfrom}
              to={sto}
              price={price}
              baseFare={baseFare}
              convenienceFee={convenienceFee}
              bankCharges={bankCharges}
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
