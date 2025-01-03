import React from "react";

const BookingTable = () => {
  const bookings = [
    {
      refNo: "3765375365356385",
      seatNo: "10",
      vCode: "Full Ticket",
      madeOfPay: "Full Ticket",
      route: "Route - Nuwaraeliya",
      seats: "42",
      bookedDate: "2024-11-20 00:17:19",
    },
    {
      refNo: "3765375365356385",
      seatNo: "10",
      vCode: "Full Ticket",
      madeOfPay: "Full Ticket",
      route: "Route - Nuwaraeliya",
      seats: "42",
      bookedDate: "2024-11-20 00:17:19",
    },
  ];

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
      {/* Desktop View */}
      <table className="w-full hidden md:table">
        <thead className="bg-bgMyColor7">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Ref No.
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Seat no
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              V-code
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Made of Pay
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Route
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Number of seats
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
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
                {booking.vCode}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {booking.madeOfPay}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {booking.route}
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                {booking.seats}
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
              <div className="text-sm font-medium text-gray-600">Ref No.</div>
              <div className="text-sm text-gray-900">{booking.refNo}</div>

              <div className="text-sm font-medium text-gray-600">Seat no</div>
              <div className="text-sm text-gray-900">{booking.seatNo}</div>

              <div className="text-sm font-medium text-gray-600">V-code</div>
              <div className="text-sm text-gray-900">{booking.vCode}</div>

              <div className="text-sm font-medium text-gray-600">
                Made of Pay
              </div>
              <div className="text-sm text-gray-900">{booking.madeOfPay}</div>

              <div className="text-sm font-medium text-gray-600">Route</div>
              <div className="text-sm text-gray-900">{booking.route}</div>

              <div className="text-sm font-medium text-gray-600">
                Number of seats
              </div>
              <div className="text-sm text-gray-900">{booking.seats}</div>

              <div className="text-sm font-medium text-gray-600">
                Booked Date
              </div>
              <div className="text-sm text-gray-900">{booking.bookedDate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingTable;
