"use client";
import React, { useEffect } from "react";
import SearchForm from "./Latest search-form";
import axios from "axios";
import LoadingAnimation from "@/components/ui/Loading";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface CounterReportProps {
  ref: string;
  seatNo: string;
  scheduleId: string;
  madeOdPay: string;
  customerDetails: {
    mobile: string;
    nicOrPassport: string;
  };
  nicNo: string;
  route: string;
  total: string;
  service: string;
  travelDate: string;
  bookedDate: string;
}

const CounterReport = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [bookings, setBookings] = React.useState<CounterReportProps[]>([]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [date, setDate] = React.useState<string>("");
  const [scheduleId, setScheduleId] = React.useState<string>("");
  const [travelDate, setTravelDate] = React.useState<string>("");

  const search = async () => {

    if (!date && !scheduleId) {
      toast.error("Select Booked Date And Schedule ID");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}report/counter?bookedDate=${
          date ? format(date, "yyyy-MM-dd") : ""
        }${scheduleId ? `&id=${scheduleId}` : ""}${
          travelDate ? `&travelDate=${format(travelDate, "yyyy-MM-dd")}` : ""
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBookings(res?.data);

      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchForm
        date={date}
        setDate={setDate}
        scheduleId={scheduleId}
        setScheduleId={setScheduleId}
        travelDate={travelDate}
        setTravelDate={setTravelDate}
        search={search}
      />
      <div className="min-h-[100vh]">
        <div className="w-full my-container mt-3">
          <label className="text-3xl ">Counter Report</label>
        </div>
        <div className="w-full my-container mt-5">
          {isLoading ? (
            <>
              <LoadingAnimation />
            </>
          ) : (
            <>
              <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
                {/* Desktop View */}
                <table className="w-full hidden md:table">
                  <thead className="bg-bgMyColor7">
                    <tr>
                      <th className="px-4 py-3 w-[150px] text-left text-sm font-medium text-gray-600">
                        Referance No.
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Seat no
                      </th>
                      <th className="px-4 py-3 w-[150px] text-left text-sm font-medium text-gray-600">
                        Schedule ID
                      </th>
                      <th className="px-4 w-[100px] py-3 text-left text-sm font-medium text-gray-600">
                        Mode of Pay
                      </th>
                      <th className="px-4 py-3 w-[100px] text-left text-sm font-medium text-gray-600">
                        Contact No
                      </th>
                      <th className="px-4 py-3 w-[100px] text-left text-sm font-medium text-gray-600">
                        NIC No
                      </th>
                      <th className="px-4 py-3 w-[160px] text-left text-sm font-medium text-gray-600">
                        Route
                      </th>
                      <th className="px-4 py-3 w-[80px] text-left text-sm font-medium text-gray-600">
                        Bus Fare
                      </th>
                      <th className="px-4 py-3 w-[80px] text-left text-sm font-medium text-gray-600">
                        Service Charge
                      </th>
                      <th className="px-4 py-3 w-[110px] text-left text-sm font-medium text-gray-600">
                        Travel Date
                      </th>
                      <th className="px-4 py-3 w-[120px] text-left text-sm font-medium text-gray-600">
                        Booked Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.length > 0 ? (
                      <>
                        {bookings.map((booking, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.ref}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.seatNo}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.scheduleId}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.madeOdPay}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.customerDetails.mobile}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.customerDetails.nicOrPassport}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.route}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.total}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.service}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.travelDate}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.bookedDate}
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

                {/* Mobile View */}
                <div className="md:hidden">
                  {bookings.map((booking, index) => (
                    <div key={index} className="p-4 border-b">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-600">
                          Ref No.
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.ref}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Seat no
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.seatNo}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Schedule ID
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.scheduleId}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Mode of Pay
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.madeOdPay}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Contact No
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.customerDetails.mobile}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          NIC No
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.customerDetails.nicOrPassport}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Route
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.route}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Bus Fare
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.total}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Service Charge
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.service}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Travel Date
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.travelDate}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Booked Date
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.bookedDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CounterReport;
