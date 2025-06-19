"use client";
import { PrintIframeManager } from '@/components/PrintIframeManager';
import { Suspense, useEffect } from 'react';

function PrintPage({ searchParams }: any) {
  const ticketData = JSON.parse(searchParams.data || '{}');

  const manager = new PrintIframeManager();

  const printTicket = () => {
    const ticketElement = document.getElementById('user-ticket');

    if (!ticketElement) {
      console.error("Element #user-ticket not found");
      return;
    }

    const tailwindCDN = `<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"  rel="stylesheet">`;
    const printContents = ticketElement.innerHTML;

    manager.createIframe();

    const htmlContent = `
      <html>
        <head>
          <title>Print Ticket</title>
          ${tailwindCDN}
          <style>
            @page {
              size: A4;
              margin: 0mm;
            }
            body {
              font-family: 'Inter', sans-serif;
              padding: 20px;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `;

    manager.writeContent(htmlContent);
    manager.triggerPrint(() => {
      console.log("Print job completed or canceled.");
      window.location.replace('/booking');
    });
  };

  // Detect print open/close
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQueryList = window.matchMedia('print');

    const handleMatchChange = (mql: MediaQueryListEvent) => {
      if (mql.matches) {
        console.log('Printing started');
      } else {
        console.log('Printing finished or canceled');

        if (manager.isRemoved()) {
          console.log("Iframe was already cleaned up");
        } else {
          console.warn("Iframe may still be in DOM");
        }
      }
    };

    mediaQueryList.addEventListener('change', handleMatchChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleMatchChange);
    };
  }, []);

  // Auto-trigger print on load
  useEffect(() => {
    const timer = setTimeout(() => {
      printTicket();
    }, 1000); // Delay ensures DOM is ready

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex justify-center py-20 items-cente bg-contain h-full w-full z-50">
      <div
        id="user-ticket"
        className="bg-white rounded-2xl min-w-[40%] min-h-auto flex flex-col justify-center items-center p-5"
      >
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full px-10 flex justify-center items-center">
            <img src="/logos/sltb.svg" alt="sltb_logo"
              className="w-[30%] object-cover object-center" />
          </div>
          <div className="w-full px-10 flex justify-center items-center">
            <img
              src="/logos/sltb_logo2.svg"
              alt="sltb_logo"
              className="w-[15%] object-cover object-cover"
            />
          </div>
          <div className="w-full px-10 flex justify-center mt-1">
            <span className="text-xl font-medium gap-2 flex items-center">
              Hot Line : <img src="/logos/call.svg" alt="call" className="w-5 h-5" /> 1315
            </span>
          </div>
          <div className="w-full px-10 mt-3 flex justify-center  border-t-2 pt-2 border-gray-300">
            <span className="text-xl font-normal flex gap-2">eTicket</span>
          </div>
        </div>
        <div className="w-full mt-5 flex justify-center gap-5">
          <div className="w-full text-base">
            <span className="text-gray-500">Ticket Ref</span>
            <span className="ml-4">
              {ticketData.ref ? ticketData.ref : "N/A"}
            </span>
          </div>
          <div className="w-full text-base">
            <span className="text-gray-500">Seat No.</span>
            <span className="ml-4">
              {ticketData?.seats
                ? ticketData?.seats
                  .map((item: any) => item.seat_no)
                  .join(",")
                : "N/A"}
            </span>
          </div>
        </div>
        <div className="w-full mt-2 flex justify-center gap-5">
          <div className="w-full text-base">
            <span className="text-gray-500">Travel Date</span>
            <span className="ml-4">
              {ticketData?.startDateTime
                ? new Date(ticketData?.startDateTime).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="w-full text-base">
            <span className="text-gray-500">Travel Time</span>
            <span className="ml-4">
              {ticketData?.startDateTime
                ? new Date(ticketData?.startDateTime).toLocaleTimeString()
                : "N/A"}
            </span>
          </div>
        </div>
        <div className="w-full mt-2 flex justify-center gap-5">
          <div className="w-full text-base">
            <span className="text-gray-500">Travel From</span>
            <span className="ml-4">{ticketData?.route?.split("-")[0]}</span>
          </div>
          <div className="w-full text-base">
            <span className="text-gray-500">Travel To</span>
            <span className="ml-4">{ticketData?.route?.split("-")[1]}</span>
          </div>
        </div>
        <div className="w-full mt-2 flex justify-center gap-5">
          <div className="w-full text-base">
            <span className="text-gray-500">Counter</span>
            <span className="ml-4">{ticketData?.agentName ? ticketData?.agentName : "N/A"}</span>
          </div>
          <div className="w-full text-base">
            <span className="text-gray-500">Depot</span>
            <span className="ml-4">
              {ticketData?.depot ? ticketData?.depot : "N/A"}
            </span>
          </div>
        </div>
        <div className="w-full mt-2 flex justify-center gap-5">
          <div className="w-full text-base">
            <span className="text-gray-500">Payment Type</span>
            <span className="ml-4">Cash</span>
          </div>
          <div className="w-full text-base">
            <span className="text-gray-500">Route</span>
            <span className="ml-4">{ticketData?.route}</span>
          </div>
        </div>
        <div className="w-full mt-2 flex justify-center gap-5">
          <div className="w-full text-base">
            <span className="text-gray-500">NIC</span>
            <span className="ml-4">
              {ticketData?.details?.nicOrPassport
                ? ticketData?.details?.nicOrPassport
                : "N/A"}
            </span>
          </div>
          <div className="w-full text-base">
            <span className="text-gray-500">Name</span>
            <span className="ml-4">
              {ticketData?.details?.name ? ticketData?.details?.name : "N/A"}
            </span>
          </div>
        </div>
        <div className="w-full mt-2 flex justify-center gap-5">
          <div className="w-full text-base">
            <span className="text-gray-500">Bus Schedule ID</span>
            <span className="ml-4">
              {ticketData?.scheduleId ? ticketData?.scheduleId : "N/A"}
            </span>
          </div>
        </div>
        <div
          className="w-full mt-2 flex flex-col justify-center gap-2 border-t-2 border-b-2 border-dashed border-black">
          <div className="mt-2  flex">
            <div className="w-48">
              <span>Bus Fare</span>
            </div>
            <div className="w-full">
              <span>
                Rs {ticketData?.busFare ? ticketData?.busFare : 0.0} x{" "}
                {ticketData?.seats?.length}
              </span>
            </div>
          </div>
          <div className="mb-3 flex">
            <div className="w-48">
              <span>Service Chargers</span>
            </div>
            <div className="w-full">
              <span>
                Rs{" "}
                {(() => {
                  const tot = ticketData?.total;
                  const busfare = ticketData?.busFare;
                  const length = ticketData?.seats?.length;

                  console.log(tot)
                  console.log(busfare)
                  console.log(length)

                  if (!length || !tot || !busfare) return "0.00";

                  const finaltot = (tot - (busfare * length)) / length;
                  console.log(finaltot)
                  return finaltot.toFixed(0); // Always show two decimal places
                })()}
                {" x "} {ticketData?.seats?.length ?? 0}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex font-medium text-lg mt-3 justify-center items-center">
          <span>Amount : </span>
          <span className="ml-2">
            {" "}
            Rs.{ticketData.total ? ticketData.total : 0.0}
          </span>
        </div>
        <div className="w-full flex font-medium text-base mt-2 justify-center items-center">
          <span>V-Code : </span>
          <span className="ml-2">
            {ticketData?.vCode ? ticketData?.vCode : "N/A"}
          </span>
        </div>
        <div
          className="w-full flex flex-col font-normal text-base mt-2 text-center justify-center items-center">
          <span>
            You are required to submit this and obtain a regular ticket
          </span>
          <span>from the conductor once you you board the bus.</span>
        </div>
        <div
          className="w-full flex flex-col font-medium text-md mt-3 text-center justify-center items-center">
          <span>THIS RESERVATION HAS BEEN MADE</span>
          <span>SUBJECT TO THE FOLLOWING</span>
          <span>CONDITIONS</span>
        </div>
        <div className="w-full flex font-medium text-base mt-3 gap-2 justify-center items-start">
          <span>1.</span>
          <div>
            <span>
              The full Bus fare of the route will be charged irrespective of
              the boarding & dropping points.
            </span>
          </div>
        </div>
        <div className="w-full flex font-medium text-base mt-2 gap-2 justify-center items-start">
          <span>2.</span>
          <div>
            <span>
              Tickets reserved from Depot counters cannot be cancelled
              changed or transferred.
            </span>
          </div>
        </div>
        <div className="w-full flex font-medium text-base mt-2 gap-2 justify-center items-start">
          <span>3.</span>
          <div>
            <span>
              Seats reserved should be occupied 15 minutes before the
              scheduled departure time.
            </span>
          </div>
        </div>
        <div
          className="w-full flex flex-col font-normal text-md mt-4 text-center justify-center items-center">
          <span>
            Login to{" "}
            <span className="font-medium text-md underline">WWW. sltb.eseat.lk</span>
          </span>
          <span>for online ticket reservation</span>
          <span>
            call <span className="font-medium text-md">1315</span>
          </span>
          <span>for ticket reservation through the call center</span>
        </div>
        <div
          className="w-full flex flex-col font-medium text-xl mt-4 text-center justify-center items-center">
          <span>Thank You & have a pleasant Journey !</span>
        </div>
      </div>
    </div>
  );
}

export default function Page({ searchParams }: any) {
  return (
    <Suspense fallback="Loading...">
      <PrintPage searchParams={searchParams} />
    </Suspense>
  );
}