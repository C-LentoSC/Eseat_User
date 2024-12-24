export function SeatLegend() {
  return (
    <div className="flex gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-gray-300 bg-white rounded" />
        <span>Available Seats</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-yellow-500 border-2 border-yellow-600 rounded" />
        <span>Processing Seats</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-red-500 border-2 border-red-600 rounded" />
        <span>Booked Seats</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-green-500 border-2 border-green-600 rounded" />
        <span>Selected Seats</span>
      </div>
    </div>
  );
}
