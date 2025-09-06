"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "@/components/ui/Loading";
import toast from "react-hot-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { CalendarIcon, X } from "lucide-react";
import axios from "axios";

type Booking = {                       // NEW – minimal typing
  id: number;
  ref: string;
  totalCost: number;
  created_at: string;                 // 2025-07-12T21:39:42.000000Z
  details?: { name?: string; mobile?: string };
  schedule?: { number_plate?: string; start_date?: string }; // start_date 2025-07-20
  refundRequest?: { is_complete?: boolean } | null;
};

const BusReport = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  /* ---------- state ---------- */
  const [rawBookings, setRawBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // schedule.start_date filter
  const [date, setDate] = useState<Date | undefined>(undefined); // NEW – keep as Date object

  // created_at filter
  const [quickFilter, setQuickFilter] = useState<"week" | "month" | "year" | "">(""); // NEW
  const [open, setOpen] = useState(false);

  /* ---------- data ---------- */
  useEffect(() => {
    loaddata();
  }, []);

  const loaddata = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get<Booking[]>(`${BASE_URL}report/private-history`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRawBookings(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Could not load history");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- filtering ---------- */
  const filtered = useMemo(() => {
    let list = [...rawBookings];

    // 1. schedule.start_date (exact day)
    if (date) {
      // build UTC date string for the picked day
      const target = formatInTimeZone(date, "UTC", "yyyy-MM-dd");
      list = list.filter(b =>
        b.schedule?.start_date &&
        formatInTimeZone(parseISO(b.schedule.start_date), "UTC", "yyyy-MM-dd") === target
      );
    }

    // 2. created_at (week / month / year)
    if (quickFilter) {
      const now = new Date();
      let start: Date, end: Date;
      if (quickFilter === "week") {
        start = startOfWeek(now, { weekStartsOn: 1 });
        end = endOfWeek(now, { weekStartsOn: 1 });
      } else if (quickFilter === "month") {
        start = startOfMonth(now);
        end = endOfMonth(now);
      } else {
        start = startOfYear(now);
        end = endOfYear(now);
      }
      list = list.filter((b) => {
        if (!b.created_at) return false;
        const d = parseISO(b.created_at);
        return isWithinInterval(d, { start, end });
      });
    }

    return list;
  }, [rawBookings, date, quickFilter]);

  /* ---------- ui helpers ---------- */
  const handlePrint = () => {
    const printContents = document.getElementById("printBusReport")?.innerHTML;
    if (!printContents) return;
    const original = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = original;
    window.location.reload();
  };

  const clearFilters = () => {
    setDate(undefined);
    setQuickFilter("");
  };

  return (
    <>
      {/* -------------------- filters -------------------- */}
      <div className="bg-bgMyColor6 report_bg py-14">
        <div className="w-full my-container">
          <div className="flex gap-4 items-end ">
            {/* schedule.start_date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Filter by schedule date
              </label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-transparent",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "yyyy/MM/dd") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      setOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* created_at quick filter */}
            <div className="space-y-2">
              <div className="flex gap-2">
                {(["week", "month", "year"] as const).map((key) => (
                  <Button
                    key={key}
                    size="sm"
                    className="p-3 py-[17px]"
                    variant={quickFilter === key ? "default" : "outline"}
                    onClick={() => setQuickFilter(key)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* search / clear */}
            <div className="flex items-end gap-2">
              {(date || quickFilter) && (
                <Button className="border" variant="ghost" size="icon" onClick={clearFilters}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- table -------------------- */}
      <div className="min-h-[100vh]" id="printBusReport">
        <div className="w-full my-container mt-3 flex justify-between">
          <label className="text-3xl">History</label>
          <div className="no-print">
            <Button
              onClick={filtered.length ? handlePrint : () => toast.error("No data found")}
              className="no-print"
            >
              Download PDF
            </Button>
          </div>
        </div>

        <div className="w-full my-container mt-5">
          <div
            className={`w-full overflow-x-auto ${isLoading ? "" : "bg-white rounded-lg shadow mb-3"}`}
          >
            {isLoading ? (
              <LoadingAnimation />
            ) : (
              <>
                {/* Desktop View */}
                <table className="w-full hidden md:table">
                  <thead className="bg-bgMyColor7">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Mobile
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Ref.No
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Bus Number Plate
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Booked Date & Time
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Refund Request
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filtered.length > 0 ? (
                      <>
                        {filtered?.map((booking, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.details?.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.details?.mobile}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.ref}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking?.schedule?.number_plate}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              Rs.{booking.totalCost}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.created_at ? format(parseISO(booking.created_at), "yyyy/MM/dd hh:mm a") : "-"}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking?.refundRequest ? booking?.refundRequest?.is_complete ? <span className="text-green-500">Approved</span> : <span className="text-yellow-500">Pending</span> : "-"}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <>
                        <tr>
                          <td className="px-4 py-3 text-md font-medium text-gray-400">
                            No Data Found
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>

                {/* Mobile */}
                <div className="md:hidden">
                  {filtered.length ? (
                    filtered.map((b, index) => (
                      <div key={b.id} className="p-4 border-b grid grid-cols-2 gap-2 text-sm">
                        <span className="font-medium text-gray-600">#</span>
                        <span>{index + 1}</span>

                        <span className="font-medium text-gray-600">Name</span>
                        <span>{b.details?.name || "-"}</span>

                        <span className="font-medium text-gray-600">Mobile</span>
                        <span>{b.details?.mobile || "-"}</span>

                        <span className="font-medium text-gray-600">Ref.No</span>
                        <span>{b.ref}</span>

                        <span className="font-medium text-gray-600">Bus Number Plate</span>
                        <span>{b.schedule?.number_plate || "-"}</span>

                        <span className="font-medium text-gray-600">Total</span>
                        <span>Rs.{b.totalCost}</span>

                        <span className="font-medium text-gray-600">Booked Date & Time</span>
                        <span>{b.created_at ? format(parseISO(b.created_at), "yyyy/MM/dd hh:mm a") : "-"}</span>

                        <span className="font-medium text-gray-600">Refund Request</span>
                        <span>
                          {!b.refundRequest ? "-" : b.refundRequest.is_complete ? (
                            <span className="text-green-600">Approved</span>
                          ) : (
                            <span className="text-yellow-600">Pending</span>
                          )}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-400">No Data Found</div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusReport;