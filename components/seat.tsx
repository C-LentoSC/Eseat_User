interface SeatProps {
  number: number;
  status: "available" | "booked" | "selected" | "processing";
  onClick?: () => void;
}

export function Seat({ number, status, onClick }: SeatProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "available":
        return "bg-white border-gray-300 hover:border-blue-500 cursor-pointer";
      case "booked":
        return "bg-red-500 border-red-600 text-white cursor-not-allowed";
      case "selected":
        return "bg-green-500 border-green-600 text-white";
      case "processing":
        return "bg-yellow-500 border-yellow-600 text-white";
      default:
        return "bg-white border-gray-300";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={status === "booked"}
      className={`w-10 h-10 border-2 rounded flex items-center justify-center text-sm font-medium ${getStatusStyles()}`}
    >
      {number}
    </button>
  );
}
