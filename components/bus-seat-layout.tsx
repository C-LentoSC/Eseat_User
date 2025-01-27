"use client";

import { cn } from "@/lib/utils";

interface SeatProps {
  number: string | number;
  status?: "available" | "processing" | "booked" | "selected";
  onClick?: () => void;
  className?: string;
}

interface BusSeatLayoutProps {
  seats: Array<{
    number: string | number;
    status: "available" | "processing" | "booked" | "selected";
  }>;
  onSeatClick?: (seatNumber: string | number) => void;
  className?: string;
}

function SeatIcon({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      <svg
        viewBox="0 0 100 100"
        className={cn(
          "w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-colors duration-200",
          isVisible ? "visible" : "invisible"
        )}
      >
        <g transform="translate(50,50) rotate(-90) translate(-50,-50)">
          <path
            d="M90.443,34.848c-2.548,0-4.613,2.065-4.613,4.614v31.534c-0.284,0.098-0.57,0.179-0.846,0.313c-0.081,0.037-4.414,2.11-11.406,4.046c-2.226-1.561-5.054-2.257-7.933-1.7c-10.579,2.052-20.845,2.078-31.411,0.065c-2.85-0.537-5.646,0.146-7.857,1.68c-6.969-1.933-11.286-4.014-11.414-4.076c-0.259-0.128-0.526-0.205-0.792-0.297V39.46c0-2.547-2.065-4.614-4.614-4.614c-2.548,0-4.613,2.066-4.613,4.614v37.678c0,0.222,0.034,0.431,0.064,0.644c0.096,2.447,1.456,4.772,3.804,5.939c0.398,0.196,5.779,2.828,14.367,5.164c1.438,2.634,3.997,4.626,7.174,5.233c6.498,1.235,13.021,1.863,19.394,1.863c6.521,0,13.2-0.655,19.851-1.944c3.143-0.607,5.675-2.575,7.109-5.173c8.575-2.324,13.97-4.931,14.369-5.127c2.187-1.073,3.54-3.146,3.805-5.396c0.104-0.385,0.179-0.784,0.179-1.202V39.46C95.059,36.913,92.992,34.848,90.443,34.848z M20.733,37.154l-0.001,29.092c0.918,0.355,2.034,0.771,3.371,1.215c3.577-1.812,7.759-2.428,11.756-1.672c9.628,1.837,18.689,1.814,28.359-0.063c4.035-0.78,8.207-0.165,11.794,1.641c1.23-0.411,2.274-0.793,3.151-1.132l0.017-29.083c0-5.198,3.85-9.475,8.843-10.226V12.861c0-2.548-1.927-3.75-4.613-4.615c0,0-14.627-4.23-33.165-4.23c-18.543,0-33.739,4.23-33.739,4.23c-2.619,0.814-4.614,2.065-4.614,4.615v14.066C16.883,27.678,20.733,31.956,20.733,37.154z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
}

function Seat({ number, status = "available", onClick, className }: SeatProps) {
  return (
    <div
      className={cn(
        "relative m-0.5 md:m-1 cursor-pointer transition-all",
        status === "available" && "text-gray-500 hover:text-gray-700",
        status === "processing" && "text-yellow-500",
        status === "booked" && "text-red-500",
        status === "selected" && "text-green-500",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Seat ${number} - ${status}`}
    >
      <SeatIcon />
      <span className="absolute left-1/3 bottom-2 md:bottom-4 -translate-x-1/2 text-[10px] md:text-xs font-medium text-white">
        {number}
      </span>
    </div>
  );
}

export function BusSeatLayout({ seats, onSeatClick }: BusSeatLayoutProps) {
  const seatLayout = [
    "-1",
    "5",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "48",
    "54",
    "0",
    "4",
    "9",
    "14",
    "19",
    "24",
    "29",
    "34",
    "39",
    "44",
    "47",
    "53",
    "0",
    "3",
    "8",
    "13",
    "18",
    "23",
    "28",
    "33",
    "38",
    "43",
    "46",
    "52",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "51",
    "0",
    "02",
    "7",
    "12",
    "17",
    "22",
    "27",
    "32",
    "37",
    "42",
    "0",
    "50",
    "0",
    "01",
    "6",
    "11",
    "16",
    "21",
    "26",
    "31",
    "36",
    "41",
    "0",
    "49",
  ];

  return (
    <>
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm">
        <div className="flex items-center gap-1 md:gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-500 rounded" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-500 rounded" />
          <span>Processing</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded" />
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded" />
          <span>Selected</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-12">
          {seatLayout.map((seatNo, index) => {
            if (seatNo == "-1") {
              return (
                <>
                  <div
                    className="col-span-1 p-1 flex items-center justify-center"
                    key={index}
                  >
                    <img
                      src="/assets/stering.svg"
                      alt="stering_wheel"
                      className="p-1 -rotate-90"
                    />
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="col-span-1 p-1" key={index}>
                    <Seat
                      className={`${seatNo == "0" ? "hidden" : ""} ${
                        seats.find((s) => s.number === Number(seatNo))
                          ? ""
                          : "hidden"
                      }`}
                      number={seatNo}
                      status={
                        seats.find((s) => s.number === Number(seatNo))?.status
                      }
                      onClick={() => onSeatClick?.(seatNo)}
                    />
                  </div>
                </>
              );
            }
          })}

          {/* <div className="col-span-1 p-2">
            <Seat
              number={5}
              // status={seat.status}
              onClick={() => onSeatClick?.(1)}
            />
          </div> */}
        </div>

        {/* {seatLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((seatNumber, colIndex) => {
              const seat = seats.find((s) => s.number === Number(seatNumber));
              if (seat) {
                return (
                  <Seat
                    key={colIndex}
                    number={seat.number}
                    status={seat.status}
                    onClick={() => onSeatClick?.(seat.number)}
                  />
                );
              }
              return <div key={colIndex} className="m-1" />;
            })}
          </div>
        ))} */}
      </div>
    </>
  );
}

export function BusSeatLayoutSM({ seats, onSeatClick }: BusSeatLayoutProps) {
  const seatLayout = [
    "0",
    "0",
    "0",
    "0",
    "0",
    "-1",
    "01",
    "2",
    "0",
    "3",
    "4",
    "5",
    "06",
    "07",
    "0",
    "8",
    "9",
    "10",
    "11",
    "12",
    "0",
    "13",
    "14",
    "15",
    "16",
    "17",
    "0",
    "18",
    "19",
    "20",
    "21",
    "22",
    "0",
    "23",
    "24",
    "25",
    "26",
    "27",
    "0",
    "28",
    "29",
    "30",
    "31",
    "32",
    "0",
    "33",
    "34",
    "35",
    "36",
    "37",
    "0",
    "38",
    "39",
    "40",
    "41",
    "42",
    "0",
    "43",
    "44",
    "45",
    "0",
    "0",
    "0",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
  ];

  return (
    <div className="w-full flex flex-col  justify-center items-center ">
      {/* Legend */}
      <div className="flex w-full flex-row justify-between items-center gap-2 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm bg-[#e9f5ff] p-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-500 rounded" />
            <span>Available Seats</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded" />
            <span>Processing Seats</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-500 rounded" />
            <span>Counter Seats</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded" />
            <span>Booked Seats</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 w-full flex flex-col justify-center items-center">
        <div className="grid grid-cols-6">
          {seatLayout.map((seatNo, index) => {
            if (seatNo == "-1") {
              return (
                <>
                  <div
                    className="col-span-1 p-1 flex items-center justify-center"
                    key={index}
                  >
                    <img
                      src="/assets/stering.svg"
                      alt="stering_wheel"
                      className="p-1"
                    />
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="col-span-1 p-1" key={index}>
                    <Seat
                      className={`${seatNo == "0" ? "hidden" : ""} ${
                        seats.find((s) => s.number === Number(seatNo))
                          ? ""
                          : "hidden"
                      }`}
                      number={seatNo}
                      status={
                        seats.find((s) => s.number === Number(seatNo))?.status
                      }
                      onClick={() => onSeatClick?.(seatNo)}
                    />
                  </div>
                </>
              );
            }
          })}

          {/* <div className="col-span-1 p-2">
            <Seat
              number={5}
              // status={seat.status}
              onClick={() => onSeatClick?.(1)}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
