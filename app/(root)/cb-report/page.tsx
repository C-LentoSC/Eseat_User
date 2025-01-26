import React from "react";
import ScheduleSearch from "./schedule-search";
import { Button } from "@/components/ui/button";

const CbReport = () => {
  const bookings = [
    {
      refNo: "3765375365356385",
      seatNo: "10",
      vCode: "",
      bookedBy: "Ekanayeke",
      modeOdPay: "Full Ticket",
      contactNo: "0701234567",
      nicNo: "200000000000",
      route: "Route - Nuwaraeliya",
    },
    {
      refNo: "3765375365356385",
      seatNo: "10",
      vCode: "",
      bookedBy: "Ekanayeke",
      modeOdPay: "Full Ticket",
      contactNo: "0701234567",
      nicNo: "200000000000",
      route: "Route - Nuwaraeliya",
    },
  ];

  const bookings1 = [
    {
      bookedBy: "Ekanayeke",
      modeOdPay: "Full Ticket",
      route: "Route - Nuwaraeliya",
      busFare: "975.00",
      noOfSeats: "9",
      totalBusFare: "7,875.00",
    },
    {
      bookedBy: "Ekanayeke",
      modeOdPay: "Full Ticket",
      route: "Route - Nuwaraeliya",
      busFare: "975.00",
      noOfSeats: "9",
      totalBusFare: "7,875.00",
    },
  ];

  return (
    <>
      <ScheduleSearch />
      <div className=" min-h-[100vh]">
        <div className="w-full my-container mt-3 flex justify-between">
          <label className="text-3xl ">Bus Report</label>
          <Button>Download PDF</Button>
        </div>
        <div className="w-full my-container mt-5">
          <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
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
                {bookings.map((booking, index) => (
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
                      {booking.modeOdPay}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.contactNo}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.nicNo}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.route}
                    </td>
                  </tr>
                ))}
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
                    <div className="text-sm text-gray-900">{booking.refNo}</div>

                    <div className="text-sm font-medium text-gray-600">
                      Seat no
                    </div>
                    <div className="text-sm text-gray-900">
                      {booking.seatNo}
                    </div>

                    <div className="text-sm font-medium text-gray-600">
                      V-Code
                    </div>
                    <div className="text-sm text-gray-900">{booking.vCode}</div>

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
                      {booking.modeOdPay}
                    </div>

                    <div className="text-sm font-medium text-gray-600">
                      Contact No
                    </div>
                    <div className="text-sm text-gray-900">
                      {booking.contactNo}
                    </div>

                    <div className="text-sm font-medium text-gray-600">
                      NIC No
                    </div>
                    <div className="text-sm text-gray-900">{booking.nicNo}</div>

                    <div className="text-sm font-medium text-gray-600">
                      Route
                    </div>
                    <div className="text-sm text-gray-900">{booking.route}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summery Report */}
        <div className="w-full my-container mt-16 flex justify-between flex-wrap lg:flex-nowrap gap-2 lg:gap-0">
          <label className="text-3xl ">Summary Report</label>
          <label className="text-lg ">
            2025-01-18 | KNY49-1400-PT Colombo- Trincomalee
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
                      {booking.modeOdPay}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.route}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.busFare}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.noOfSeats}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.totalBusFare}
                    </td>
                  </tr>
                ))}
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
                      {booking.modeOdPay}
                    </div>

                    <div className="text-sm font-medium text-gray-600">
                      Route
                    </div>
                    <div className="text-sm text-gray-900">{booking.route}</div>

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
                      {booking.noOfSeats}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CbReport;
