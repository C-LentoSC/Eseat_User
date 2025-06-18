// app/payment-response/print/page.tsx
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {useTicketContext} from "@/lib/ticketStore";

export default function PrintTicketPage() {
    const router = useRouter();
    const { ticketData, clearTicketData } = useTicketContext();

    useEffect(() => {
        if (!ticketData) {
            alert("No ticket data found.");
            router.push("/");
            return;
        }

        generateAndPrintTicket(ticketData);
    }, [ticketData, router]);

    const generateAndPrintTicket = (ticketData: any) => {
        const iframe = document.createElement("iframe");
        iframe.style.position = "fixed";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.border = "none";
        iframe.style.zIndex = "999999";
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow?.document;

        const tailwindCDN = `<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"  rel="stylesheet">`;

        // Format date/time
        const formatDate = (dateStr: string) =>
            new Date(dateStr).toLocaleDateString();
        const formatTime = (dateStr: string) =>
            new Date(dateStr).toLocaleTimeString();

        const totalServiceCharge = () => {
            if (!ticketData.seats || !Array.isArray(ticketData.seats)) return 0;
            return ticketData.seats.reduce((total, seat) => {
                return (
                    total +
                    (parseFloat(seat.service_charge01 as any) || 0) +
                    (parseFloat(seat.service_charge02 as any) || 0)
                );
            }, 0);
        };

        const serviceChargePerSeat = () => {
            const totalSC = totalServiceCharge();
            const seatCount = ticketData.seats?.length ?? 1;
            return (totalSC / seatCount).toFixed(2);
        };

        const ticketHTML = `
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
        <body class="bg-white rounded-2xl min-w-[40%] min-h-auto flex flex-col justify-center items-center p-5">
          <div class="w-full flex flex-col justify-center items-center">
            <div class="w-full px-10 flex justify-center items-center">
              <img src="${window.location.origin}/logos/sltb.svg" alt="sltb_logo" class="w-[30%]" />
            </div>
            <div class="w-full px-10 flex justify-center items-center">
              <img src="${window.location.origin}/logos/sltb_logo2.svg" alt="sltb_logo" class="w-[15%]" />
            </div>
            <div class="w-full px-10 flex justify-center mt-1">
              <span class="text-xl font-medium gap-2 flex items-center">
                Hot Line : <img src="${window.location.origin}/logos/call.svg" alt="call" class="w-5 h-5"/> 1315
              </span>
            </div>
            <div class="w-full px-10 mt-3 flex justify-center border-t-2 pt-2 border-gray-300">
              <span class="text-xl font-normal flex gap-2">eTicket</span>
            </div>
          </div>

          <div class="w-full mt-5 flex justify-center gap-5">
            <div class="w-full text-base">
              <span class="text-gray-500">Ticket Ref</span>
              <span class="ml-4">${ticketData.ref || "N/A"}</span>
            </div>
            <div class="w-full text-base">
              <span class="text-gray-500">Seat No.</span>
              <span class="ml-4">
                ${(ticketData.seats || []).map(s => s.seat_no).join(",") || "N/A"}
              </span>
            </div>
          </div>

          <div class="w-full mt-2 flex justify-center gap-5">
            <div class="w-full text-base">
              <span class="text-gray-500">Travel Date</span>
              <span class="ml-4">${formatDate(ticketData.startDateTime || "")}</span>
            </div>
            <div class="w-full text-base">
              <span class="text-gray-500">Travel Time</span>
              <span class="ml-4">${formatTime(ticketData.startDateTime || "")}</span>
            </div>
          </div>

          <div class="w-full mt-2 flex justify-center gap-5">
            <div class="w-full text-base">
              <span class="text-gray-500">Travel From</span>
              <span class="ml-4">${(ticketData.route || "").split("-")[0] || "N/A"}</span>
            </div>
            <div class="w-full text-base">
              <span class="text-gray-500">Travel To</span>
              <span class="ml-4">${(ticketData.route || "").split("-")[1] || "N/A"}</span>
            </div>
          </div>

          <div class="w-full mt-2 flex justify-center gap-5">
            <div class="w-full text-base">
              <span class="text-gray-500">Counter</span>
              <span class="ml-4">${ticketData.agentName || "N/A"}</span>
            </div>
            <div class="w-full text-base">
              <span class="text-gray-500">Depot</span>
              <span class="ml-4">${ticketData.depot || "N/A"}</span>
            </div>
          </div>

          <div class="w-full mt-2 flex justify-center gap-5">
            <div class="w-full text-base">
              <span class="text-gray-500">NIC</span>
              <span class="ml-4">${ticketData.details?.nicOrPassport || "N/A"}</span>
            </div>
            <div class="w-full text-base">
              <span class="text-gray-500">Name</span>
              <span class="ml-4">${ticketData.details?.name || "N/A"}</span>
            </div>
          </div>

          <div class="w-full mt-2 flex flex-col justify-center gap-2 border-t-2 border-b-2 border-dashed border-black">
            <div class="mt-2 flex">
              <div class="w-48"><span>Bus Fare</span></div>
              <div class="w-full">
                Rs ${(ticketData.busFare || 0).toFixed(2)} x ${ticketData.seats?.length || 0}
              </div>
            </div>
            <div class="mb-3 flex">
              <div class="w-48"><span>Service Charges</span></div>
              <div class="w-full">
                Rs ${serviceChargePerSeat()} x ${ticketData.seats?.length || 0}
              </div>
            </div>
          </div>

          <div class="w-full flex font-medium text-lg mt-3 justify-center items-center">
            Amount : Rs.${(ticketData.total || 0).toFixed(2)}
          </div>

          <div class="w-full flex font-medium text-base mt-2 justify-center items-center">
            V-Code : ${ticketData.vCode || "N/A"}
          </div>

          <div class="w-full flex flex-col font-normal text-base mt-2 text-center justify-center items-center">
            <span>You are required to submit this and obtain a regular ticket</span>
            <span>from the conductor once you board the bus.</span>
          </div>

          <div class="w-full flex flex-col font-medium text-md mt-3 text-center justify-center items-center">
            <span>THIS RESERVATION HAS BEEN MADE</span>
            <span>SUBJECT TO THE FOLLOWING</span>
            <span>CONDITIONS</span>
          </div>

          <div class="w-full flex font-medium text-base mt-3 gap-2 justify-center items-start">
            <span>1.</span>
            <div>The full Bus fare of the route will be charged irrespective of the boarding & dropping points.</div>
          </div>
          <div class="w-full flex font-medium text-base mt-2 gap-2 justify-center items-start">
            <span>2.</span>
            <div>Tickets reserved from Depot counters cannot be cancelled changed or transferred.</div>
          </div>
          <div class="w-full flex font-medium text-base mt-2 gap-2 justify-center items-start">
            <span>3.</span>
            <div>Seats reserved should be occupied 15 minutes before the scheduled departure time.</div>
          </div>

          <div class="w-full flex flex-col font-normal text-md mt-4 text-center justify-center items-center">
            <span>Login to <span class="font-medium underline">WWW.sltb.eseat.lk</span></span>
            <span>for online ticket reservation</span>
            <span>call <span class="font-medium">1315</span> for ticket reservation through the call center</span>
          </div>

          <div class="w-full flex flex-col font-medium text-xl mt-4 text-center justify-center items-center">
            <span>Thank You & have a pleasant Journey !</span>
          </div>
        </body>
      </html>
    `;

        if (doc) {
            doc.open();
            doc.write(ticketHTML);
            doc.close();

            iframe.onload = () => {
                iframe.contentWindow?.focus();
                iframe.contentWindow?.print();

                setTimeout(() => {
                    document.body.removeChild(iframe);
                    clearTicketData(); // Clear after printing
                }, 1000);
            };
        }
    };

    return (
        <div className="p-6 text-center">
            <h1>Loading ticket for printing...</h1>
        </div>
    );
}