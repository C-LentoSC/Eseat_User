"use client";
import React from "react";
import ScheduleSearch from "./schedule-search";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { format } from "date-fns";
import LoadingAnimation from "@/components/ui/Loading";
import toast from "react-hot-toast";

const CbReport = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [date, setDate] = React.useState<string>("");
  const [ScheduleId, setScheduleId] = React.useState<string>("");
  const [bookings, setBookings] = React.useState<any[]>([]);
  const [bookings1, setBookings1] = React.useState<any[]>([]);
  const [bookings2, setBookings2] = React.useState<any>({});

  const [noOfSeats, setNoOfSeats] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loaddata = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}report/cb${ScheduleId ? `?id=${ScheduleId}` : ""}${
          date ? `&date=${format(date, "yyyy-MM-dd")}` : ""
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res?.data);
      setBookings(res?.data?.bookings);
      setBookings1(res?.data?.summary);
      setBookings2(res?.data);

      // const totalSeats =
      //   res?.data?.summary
      //     ?.map((item: { noOfSeate: number }) => item.noOfSeate)
      //     ?.reduce((acc: number, val: number) => acc + val, 0) || 0;

      // setNoOfSeats(totalSeats);

      // const total =
      //   res?.data?.summary
      //     ?.map((item: { totalBusFare: number }) => item.totalBusFare)
      //     ?.reduce((acc: number, val: number) => acc + val, 0) || 0;

      // setTotal(total.toFixed(2));

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    const printContents = document.getElementById("printCbReport")?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  return (
    <>
      <ScheduleSearch
        date={date}
        setDate={setDate}
        scheduleId={ScheduleId}
        setScheduleId={setScheduleId}
        search={loaddata}
      />
      <div className=" min-h-[100vh]" id="printCbReport">
        <div className="w-full my-container mt-3 flex justify-between">
          <label className="text-3xl ">Bus Report</label>
          <div className="no-print">
            {bookings.length > 0 ? (
              <>
                <Button
                  // onClick={() => {
                  //   window.open(
                  //     `print/cb-report/${ScheduleId}/${format(
                  //       date,
                  //       "yyyy-MM-dd"
                  //     )}`,
                  //     "_blank"
                  //   );
                  // }}
                  onClick={handlePrint}
                >
                  Download PDF
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    toast.error("No data found");
                  }}
                >
                  Download PDF
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="w-full my-container mt-5">
          <div
            className={`w-full overflow-x-auto ${
              isLoading ? "" : "bg-white rounded-lg shadow"
            }`}
          >
            {isLoading ? (
              <>
                <LoadingAnimation />
              </>
            ) : (
              <>
                {/* Desktop View */}
                <table className="w-full hidden md:table">
                  <thead className="bg-bgMyColor7">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Referance No.
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Seat no
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        V-Code
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Booked By
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Mode of Pay
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Contact No
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        NIC No
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Route
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.length > 0 ? (
                      <>
                        {bookings?.map((booking, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.refNo}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.seatNo}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.vCode}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.bookedBy}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.modeOfPay}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.details?.mobile}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.nic}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {booking.route}
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
                          {booking.refNo}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Seat no
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.seatNo}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          V-Code
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.vCode}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Booked By
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.bookedBy}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Mode Of Pay
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.modeOfPay}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Contact No
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.details?.mobile}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          NIC No
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.nic}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Route
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.route}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {bookings.length > 0 && (
          <>
            {/* Summery Report */}
            <div className="w-full my-container mt-16 flex justify-between flex-wrap lg:flex-nowrap gap-2 lg:gap-0">
              <label className="text-3xl ">Summary Report</label>
              <label className="text-lg ">
                {bookings2.startDate} | {bookings2.scheduleNo}{" "}
                {bookings2.startPoint} - {bookings2.endPoint}
              </label>
            </div>
            <div className="w-full my-container mt-5 mb-5">
              <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
                {/* Desktop View */}
                <table className="w-full hidden md:table">
                  <thead className="bg-bgMyColor7">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Booked By
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Mode of Pay
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Route
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Bus Fare
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        No Of Seats
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Total Bus Fare
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings1.map((booking, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {booking.bookedBy}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {booking.modeOfPay}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {booking.route}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {booking.busFare}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {booking.noOfSeate}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {booking.totalBusFare}
                        </td>
                      </tr>
                    ))}
                    {/* <tr className="bg-gray-200">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        Total
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900"></td>
                      <td className="px-4 py-3 text-sm text-gray-900"></td>
                      <td className="px-4 py-3 text-sm text-gray-900"></td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {noOfSeats}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {total}
                      </td>
                    </tr> */}
                  </tbody>
                </table>

                {/* Mobile View */}
                <div className="md:hidden">
                  {bookings1.map((booking, index) => (
                    <div key={index} className="p-4 border-b">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm font-medium text-gray-600">
                          Booked By
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.bookedBy}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Mode Of Pay
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.modeOfPay}
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
                          {booking.busFare}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          No Of Seats
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.noOfSeate}
                        </div>

                        <div className="text-sm font-medium text-gray-600">
                          Total Bus Fare
                        </div>
                        <div className="text-sm text-gray-900">
                          {booking.totalBusFare}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* <div className="p-4 border-b space-y-2 bg-gray-200">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-gray-600">
                        Total Seats
                      </div>
                      <div className="text-sm text-gray-900">{noOfSeats}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-gray-600">
                        Total
                      </div>
                      <div className="text-sm text-gray-900">{total}</div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CbReport;
