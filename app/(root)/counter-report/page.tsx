import React from "react";
import SearchForm from "./Latest search-form";

const CounterReport = () => {
  const bookings = [
    {
      refNo: "3765375365356385",
      seatNo: "10",
      scheduleId: "MN04-2000-CM50",
      madeOfPay: "Full Ticket",
      contactNo: "0701234567",
      nicNo: "200000000000",
      route: "Route - Nuwaraeliya",
      busFare: "1,177.00",
      serviceCharge: "110.00",
      travelDate: "2024-11-20",
      bookedDate: "2024-11-20 00:17:19",
    },
    {
      refNo: "3765375365356385",
      seatNo: "11",
      scheduleId: "MN04-2000-CM50",
      madeOfPay: "Full Ticket",
      contactNo: "0701234567",
      nicNo: "200000000000",
      route: "Route - Nuwaraeliya",
      busFare: "1,177.00",
      serviceCharge: "110.00",
      travelDate: "2024-11-20",
      bookedDate: "2024-11-20 00:17:19",
    },
  ];

  return (
    <>
      <SearchForm />
      <div className="min-h-[100vh]">
        <div className="w-full my-container mt-3">
          <label className="text-3xl ">Counter Report</label>
        </div>
        <div className="w-full my-container mt-5">
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
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.refNo}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.seatNo}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.scheduleId}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.madeOfPay}
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
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.busFare}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.serviceCharge}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.travelDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {booking.bookedDate}
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
                      Schedule ID
                    </div>
                    <div className="text-sm text-gray-900">
                      {booking.scheduleId}
                    </div>

                    <div className="text-sm font-medium text-gray-600">
                      Mode of Pay
                    </div>
                    <div className="text-sm text-gray-900">
                      {booking.madeOfPay}
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

                    <div className="text-sm font-medium text-gray-600">
                      Bus Fare
                    </div>
                    <div className="text-sm text-gray-900">
                      {booking.busFare}
                    </div>

                    <div className="text-sm font-medium text-gray-600">
                      Service Charge
                    </div>
                    <div className="text-sm text-gray-900">
                      {booking.serviceCharge}
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
        </div>
      </div>
    </>
  );
};

export default CounterReport;
