"use client";
import Modal from '@/components/model';
import { PrintIframeManager } from '@/components/PrintIframeManager';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/util/store';
import { get } from 'http';
import React, { Suspense, use, useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { boolean } from 'zod';

// Base64 string to ArrayBuffer utility
function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Decrypt function
async function decrypt(ciphertextBase64: string, ivArray: number[], keyBuffer: ArrayBuffer) {
    const iv = new Uint8Array(ivArray);
    const ciphertext = Uint8Array.from(atob(ciphertextBase64), c => c.charCodeAt(0));

    const key = await crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
    );

    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        ciphertext
    );

    const decryptedString = new TextDecoder().decode(decrypted);
    return JSON.parse(decryptedString);
}


function PrintPage({ searchParams }: any) {
    const ticketData = JSON.parse(searchParams.data || '{}');
    // const [ticketData, setTicketData] = useState<any>(null);
    const [convenienceFee, setconvenienceFee] = useState(0);

    const [isModalOpen, setModalOpen] = useState(false);

    const [withfee, setwithfee] = useState(false);
    const [withoutfee, setwithoutfee] = useState(false);

    const [withfee1, setwithfee1] = useState(false);
    const [withoutfee1, setwithoutfee1] = useState(false);

    const [isPrivate, setisPrivate] = useState(true);

    // Perform decryption once on load
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const id = decodeURIComponent(searchParams.id);
    //             const data = decodeURIComponent(searchParams.data);
    //             const ivArray = JSON.parse(decodeURIComponent(decodeURIComponent(searchParams.iv)));
    //
    //             const keyBuffer = base64ToArrayBuffer(id);
    //             const decryptedData = await decrypt(data, ivArray, keyBuffer);
    //             console.log("data : ", decryptedData);
    //             setTicketData(decryptedData);
    //         } catch (error) {
    //             console.error('Decryption failed:', error);
    //             toast.error("Failed to load ticket.");
    //         }
    //     };
    //
    //     fetchData();
    // }, [searchParams]);

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
            if (withfee && withoutfee) {
                window.location.replace('/booking');
            }
        });
    };

    const printTicket1 = () => {

        const ticketElement = document.getElementById('agent-ticket');

        if (!ticketElement) {
            console.error("Element #agent-ticket not found");
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
            if (withfee && withoutfee) {
                window.location.replace('/booking');
            }
        });
    };

    // Detect print open/close
    useEffect((): any => {
        if (typeof window === 'undefined' || !window.matchMedia) return;

        const mediaQueryList = window.matchMedia('print');

        // const handleMatchChange = (mql: MediaQueryListEvent) => {
        //     if (mql.matches) {
        //         console.log('Printing started');
        //     } else {
        //         console.log('Printing finished or canceled');
        //
        //         if (manager.isRemoved()) {
        //             console.log("Iframe was already cleaned up");
        //         } else {
        //             console.warn("Iframe may still be in DOM");
        //         }
        //     }
        // };
        //
        // mediaQueryList.addEventListener('change', handleMatchChange);
        //
        // return () => {
        //     mediaQueryList.removeEventListener('change', handleMatchChange);
        // };



    }, [ticketData]);

    // Auto-trigger print after ticket loads
    useEffect(() => {
        if (!ticketData) return;

        const timer = setTimeout(() => {
            if (ticketData?.paymentStatus?.name === "Paid") {

                if (ticketData?.agentType == "Private") {
                    setModalOpen(true);
                    setisPrivate(true);
                } else {
                    printTicket();
                }

            } else {
                toast.error("Something went wrong.");
                setTimeout(() => {
                    window.location.replace('/payment-response/error');
                }, 500);
            }
        }, 1000); // Delay ensures DOM is ready

        return () => clearTimeout(timer);
    }, [ticketData]);

    useEffect(() => {

        if (withfee1) {
            printTicket1();
        } else if (withoutfee1) {
            printTicket();
        }

    }, [withfee1, withoutfee1]);


    return (
        <>
            {withfee1 ? (
                <>
                    <div
                        className="flex justify-center py-20 items-cente bg-contain h-full w-full z-50">
                        <div
                            id="agent-ticket"
                            className={`bg-white rounded-2xl min-w-[40%] min-h-auto flex flex-col justify-center items-center p-5`}
                        >
                            <div className="w-full flex flex-col justify-center items-center">
                                <div className="w-full px-10 flex justify-center items-center">
                                    <span className='text-2xl font-bold'>ABC Communications</span>
                                </div>
                                <div className="w-full px-10 flex justify-center items-center">
                                    <span className='text-lg'>No.125/5, Nawala Road, Narahenpita</span>
                                </div>
                                <div className="w-full px-10 flex justify-center items-center">
                                    <span className='text-lg'>Tel: 071-1234567 | Email: abc@gmail.com |Agent Reg. No:015</span>
                                </div>
                                <div className="w-full px-10 flex justify-center items-center border-b-2 pb-3 border-gray-300">
                                    <span className='text-lg'>(Authorized Agent for SLTB Seat Reservations)</span>
                                </div>
                            </div>
                            <div className="w-full mt-5 flex justify-center gap-5">
                                <div className="w-full text-base">
                                    <span className="text-gray-500">Ticket Ref</span>
                                    <span className="ml-4">
                                        {ticketData?.ref ? ticketData.ref : "N/A"}
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
                                    <span className="text-gray-500">Route</span>
                                    <span className="ml-4">{ticketData?.route}</span>
                                </div>
                            </div>
                            <div className="w-full flex font-medium text-xl mt-3 justify-start items-center">
                                <span>Agent Fee : </span>
                                <span className="ml-2">
                                    {" "}
                                    Rs.{ticketData?.booking_fee ? parseFloat(ticketData.booking_fee) : 0.0}
                                </span>
                            </div>
                            <div
                                className="w-full flex flex-col font-normal text-base mt-2 text-center justify-center items-start">
                                <span>
                                    A separate bus ticket will be issued and should be presented to the bus conductor.
                                </span>
                            </div>
                            <div className="w-full flex font-medium text-base mt-3 gap-2 justify-start items-start">
                                <div>
                                    <span>
                                        Note: All refunds should be collected from the issuing agent.
                                    </span>
                                </div>
                            </div>
                            <div
                                className="w-full flex flex-col font-normal text-md mt-20 text-start justify-start items-start">
                                <span className='border-t-2 px-2 py-1 border-dotted border-black'>
                                    Authorized Agent
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div
                        className="flex justify-center py-20 items-cente bg-contain h-full w-full z-50">
                        <div
                            id="user-ticket"
                            className={`bg-white rounded-2xl min-w-[40%] min-h-auto flex flex-col justify-center items-center p-5`}
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
                                        {ticketData?.ref ? ticketData.ref : "N/A"}
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
                            {/* <div className={`w-full mt-2 flex flex-col justify-center gap-2 border-t-2 border-b-2 border-dashed border-black`}>
                    <div className="mt-2 w-full flex">
                        <div className="w-48">
                            <span className="text-gray-500">Convenience Fee</span>
                        </div>
                        <div className="w-full">
                            <span>
                                Rs {convenienceFee ? convenienceFee : 0.0}
                            </span>
                        </div>
                    </div>
                    <div className="mb-2 w-full flex">
                        <div className="w-48">
                            <span className="text-gray-500">Bank Charges</span>
                        </div>
                        <div className="w-full">
                            <span>
                                Rs{" "}
                                {(() => {
                                    return (
                                        ticketData?.seats?.reduce((sum: any, seat: any) => sum + (seat.bank_charges || 0), 0) ||
                                        0
                                    );
                                })().toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div> */}
                            <div
                                className="w-full mt-2 flex flex-col justify-center gap-2 border-t-2 border-b-2 border-dashed border-black pb-3">
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
                                <div className="flex">
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

                                                if (!length || !tot || !busfare) return "0.00";
                                                const finaltot = (tot - (busfare * length)) / length;
                                                console.log(finaltot)
                                                return finaltot.toFixed(0); // Always show two decimal places
                                            })()}
                                            {" x "} {ticketData?.seats?.length ?? 0}
                                        </span>
                                    </div>
                                </div>
                                {isPrivate && (
                                    <>
                                        {withfee1 && (
                                            <>
                                                <div className="flex">
                                                    <div className="w-48">
                                                        <span>Booking Fee</span>
                                                    </div>
                                                    <div className="w-full">
                                                        <span>
                                                            Rs{" "}{ticketData?.booking_fee ?? 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="w-full flex font-medium text-lg mt-3 justify-center items-center">
                                <span>Amount : </span>
                                <span className="ml-2">
                                    {" "}
                                    Rs.{ticketData?.total ? parseFloat(ticketData.total) + parseFloat(withfee1 ? ticketData?.booking_fee ?? 0 : 0) : 0.0}
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
                                    <a className="font-medium text-md underline" href="https://www.sltb.eseat.lk" target="_blank" rel="noopener noreferrer">www.sltb.eseat.lk</a>
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
                </>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold mb-4">Private Agent Ticket Print</h2>
                    <span className="cursor-pointer bg-red-400 p-1 rounded-full px-3 text-white font-semibold" onClick={() => {
                        if (window.confirm("Are you sure to close this? you will lose your Print ticket Popup.")) {
                            setModalOpen(false);
                        }
                    }}>X</span>
                </div>
                <div className="flex gap-5 w-full justify-center mt-2">
                    <Button
                        disabled={withfee}
                        className="py-5 mt-5 w-full flex gap-3 items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                            setwithfee(true);
                            setwithfee1(true);
                            setwithoutfee1(false);
                            setModalOpen(false);
                        }}
                    >
                        With Fee
                    </Button>
                    <Button
                        disabled={withoutfee}
                        className="py-5 mt-5 w-full flex gap-3 items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                            setwithoutfee(true);
                            setwithfee1(false);
                            setwithoutfee1(true);
                            setModalOpen(false);
                        }}
                    >
                        Without Fee
                    </Button>
                </div>

            </Modal>
        </>

    );
}

export default function Page({ searchParams }: any) {
    return (
        <Suspense fallback="Loading...">
            <PrintPage searchParams={searchParams} />
        </Suspense>
    );
}