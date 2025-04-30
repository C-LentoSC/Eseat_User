import React from "react";

const BookingTable = ({ bookings }: any) => {
  return (
    <div className="w-full overflow-auto max-h-[25vh] mb-1 bg-white rounded-lg shadow">
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
        {bookings?.length > 0 ? (
          <>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking : any, index: React.Key | null | undefined) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {booking.ref}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {booking.seats}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {booking.vCode}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {booking.paymentType}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {booking.route}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {booking.seatsCount}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <>
            <tbody>
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-3 text-md font-medium text-gray-400"
                >
                  No Bookings Found
                </td>
              </tr>
            </tbody>
          </>
        )}
      </table>

      {/* Mobile View */}
      <div className="md:hidden">
        {bookings?.length > 0 ? (
          <>
            {bookings.map((booking :any, index: React.Key | null | undefined) => (
              <div key={index} className="p-4 border-b">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium text-gray-600">
                    Ref No.
                  </div>
                  <div className="text-sm text-gray-900">{booking.ref}</div>

                  <div className="text-sm font-medium text-gray-600">
                    Seat no
                  </div>
                  <div className="text-sm text-gray-900">{booking.seatNo}</div>

                  <div className="text-sm font-medium text-gray-600">
                    V-code
                  </div>
                  <div className="text-sm text-gray-900">{booking.vCode}</div>

                  <div className="text-sm font-medium text-gray-600">
                    Made of Pay
                  </div>
                  <div className="text-sm text-gray-900">
                    {booking.paymentType}
                  </div>

                  <div className="text-sm font-medium text-gray-600">Route</div>
                  <div className="text-sm text-gray-900">{booking.route}</div>

                  <div className="text-sm font-medium text-gray-600">
                    Number of seats
                  </div>
                  <div className="text-sm text-gray-900">
                    {booking.seatsCount}
                  </div>

                  <div className="text-sm font-medium text-gray-600">
                    Booked Date
                  </div>
                  <div className="text-sm text-gray-900">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="p-4 border-t">
              <div className="text-sm font-medium text-gray-600">
                No Bookings Found
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingTable;
