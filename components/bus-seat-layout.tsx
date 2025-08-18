"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SeatProps {
  number: string | number;
  status?: "available" | "processing" | "booked" | "selected" | "blocked";
  onClick?: () => void;
  className?: string;
  isVisible: boolean;
}

interface SeatData {
  id: number;
  number: string;
  status: "available" | "processing" | "booked" | "selected" | "blocked";
  key: string;
  vat: number;
  service_charge_ctb: number;
  service_charge_hgh: number;
  service_charge01: number;
  service_charge02: number;
  bank_charges: number;
  discount: number;
}

interface BusSeatLayoutProps {
  seats: SeatData[];
  onSeatClick?: (
    id: number,
    seatNumber: string | number,
    key: string,
    vat: number,
    discount: number,
    service_charge_ctb: number,
    service_charge_hgh: number,
    service_charge01: number,
    service_charge02: number,
    bank_charges: number
  ) => void;
  className?: string;
}

function SeatIcon({ isVisible }: { isVisible?: boolean }) {
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

function Seat({
  number,
  status = "available",
  onClick,
  className,
  isVisible,
}: SeatProps) {
  return (
    <div
      className={cn(
        "relative m-0.5 md:m-1 transition-all",
        parseFloat(String(number)) ? "cursor-pointer" : "cursor-default",
        status === "available" && "text-gray-500 hover:text-gray-700",
        status === "processing" && "text-yellow-500",
        status === "booked" && "text-red-500",
        status === "selected" && "text-green-500",
        status === "blocked" && "text-gray-300",
        className
      )}
      onClick={status !== "blocked" ? onClick : undefined}
      role="button"
      tabIndex={0}
      aria-label={`Seat ${number} - ${status}`}
    >
      <SeatIcon isVisible={isVisible} />
      <span className="absolute left-2/4 lg:left-1/3 bottom-2 md:bottom-4 -translate-x-2/3 lg:-translate-x-1/2 text-[10px] md:text-xs font-medium text-white">
        {parseFloat(String(number)) ? number : ""}
      </span>
    </div>
  );
}

export function BusSeatLayout({ seats, onSeatClick }: BusSeatLayoutProps) {
  const [rows, setRows] = useState<number>(0);
  const [column, setColumn] = useState<number>(0);

  useEffect(() => {
    const getMaxRowAndColumn = (seats: any[]) => {
      let maxRow = 0;
      let maxColumn = 0;

      seats.forEach((seat) => {
        const match = seat.key.match(/seat-(\d+)-(\d+)/);
        if (match) {
          const row = parseInt(match[1], 10);
          const column = parseInt(match[2], 10);

          if (row > maxRow) maxRow = row;
          if (column > maxColumn) maxColumn = column;
        }
      });

      return { maxRow, maxColumn };
    };

    // Usage:
    const { maxRow, maxColumn } = getMaxRowAndColumn(seats);
    setRows(maxRow);
    setColumn(maxColumn);

    // console.log("Max Row:", maxRow);
    // console.log("Max Column:", maxColumn);
  }, [seats]);

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

      <div className="flex justify-center">
        <div className="grid h-full py-2">
          <div className="w-full flex items-center justify-center">
            <img
              src="/assets/stering.svg"
              alt="stering_wheel"
              className="p-1 -rotate-90 w-14"
            />
          </div>
        </div>
        <div className={`grid grid-flow-row-dense h-full p-2`}>
          {/* top seats bar */}
          <div className="grid grid-flow-col-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-0-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-0-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-0-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          {/* second seats bar */}
          <div className="grid grid-flow-col-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-1-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-1-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-1-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          {/* third seats bar */}
          <div className="grid grid-flow-col-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-2-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-2-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-2-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          {/* fifth seats bar */}
          <div className="grid grid-flow-col-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-3-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-3-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-3-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          {/* fifth seats bar */}
          <div className="grid grid-flow-col-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-4-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-4-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-4-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          {/* fifth seats bar */}
          <div className="grid grid-flow-col-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-5-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-5-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-5-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function BusSeatLayoutSM({ seats, onSeatClick }: BusSeatLayoutProps) {
  const [rows, setRows] = useState<number>(0);
  const [column, setColumn] = useState<number>(0);

  useEffect(() => {
    const getMaxRowAndColumn = (seats: any[]) => {
      let maxRow = 0;
      let maxColumn = 0;

      seats.forEach((seat) => {
        const match = seat.key.match(/seat-(\d+)-(\d+)/);
        if (match) {
          const row = parseInt(match[1], 10);
          const column = parseInt(match[2], 10);

          if (row > maxRow) maxRow = row;
          if (column > maxColumn) maxColumn = column;
        }
      });

      return { maxRow, maxColumn };
    };

    // Usage:
    const { maxRow, maxColumn } = getMaxRowAndColumn(seats);
    setRows(maxRow);
    setColumn(maxColumn);
  }, [seats]);

  return (
    <>
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-start pl-8 gap-10 md:gap-4 mb-4 md:mb-6 text-xs md:text-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-gray-500 rounded" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-500 rounded" />
            <span>Processing</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded" />
            <span>Selected</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center md:w-[55%]">
        <div className="grid h-full p-2">
          <div className="w-full flex items-center justify-end">
            <img
              src="/assets/stering.svg"
              alt="stering_wheel"
              className="p-1 w-12"
            />
          </div>
        </div>
        <div className={`grid grid-flow-col-dense h-full p-2`}>
          {/* top seats bar */}
          <div className="grid grid-flow-row-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-5-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-5-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-5-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-5-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          {/* second seats bar */}
          <div className="grid grid-flow-row-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-4-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-4-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-4-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-4-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          {/* third seats bar */}
          <div className="grid grid-flow-row-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-3-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-3-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-3-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-3-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          {/* fifth seats bar */}
          <div className="grid grid-flow-row-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-2-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-2-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-2-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-2-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          {/* fifth seats bar */}
          <div className="grid grid-flow-row-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-1-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-1-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-1-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-1-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          {/* fifth seats bar */}
          <div className="grid grid-flow-row-dense">
            {Array.from({ length: column + 1 }, (_, index) => (
              <div className="col-span-1" key={index}>
                <Seat
                  // className={`${seatNo == "0" ? "hidden" : ""}`}
                  number={String(
                    seats.find(
                      (s) => String(s.key) === String(`seat-0-${index}`)
                    )?.number
                  )}
                  isVisible={
                    seats.find((s) => s.key === `seat-0-${index}`)?.number !==
                    undefined
                  }
                  status={
                    seats.find(
                      (s) => String(s.key) === String(`seat-0-${index}`)
                    )?.status
                  }
                  onClick={() =>
                    onSeatClick?.(
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.id
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.number
                      ),
                      String(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.key
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.vat
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.discount
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.service_charge_ctb
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.service_charge_hgh
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.service_charge01
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.service_charge02
                      ),
                      Number(
                        seats.find(
                          (s) => String(s.key) === String(`seat-0-${index}`)
                        )?.bank_charges
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
