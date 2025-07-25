"use client";

import React, {useRef, useEffect, useState} from "react";
import html2canvas from "html2canvas";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {BusCard} from "@/components/bus-card";
import TripSelection from "@/components/TripSelection";
import BookingTable from "./BookingTable";
import PassengerForm from "./PassengerForm";
import {ArrowLeft, ArrowLeftRight, Search} from "lucide-react";
import {BusSeatLayout, BusSeatLayoutSM} from "@/components/bus-seat-layout";
import axios from "axios";
import {FareSummary} from "@/components/fare-summary";
import LoadingAnimation from "@/components/ui/Loading";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import {Input} from "@/components/ui/input";
import {format, set} from "date-fns";
import {cn} from "@/lib/utils";
import toast from "react-hot-toast";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {Popper} from "@mui/material";
import {useAppStore} from "@/util/store";
import Modal from "@/components/model";
import copy from "clipboard-copy";
import {PrintIframeManager} from "@/components/PrintIframeManager";

interface FilmOptionType {
    name: string;
}

interface OptionType {
    name: string;
    value: number;
}

const passengerOptions: OptionType[] = Array.from({length: 54}, (_, i) => ({
    name: `${i + 1} Passenger`,
    value: i + 1,
}));

// Define types for data structures
interface SeatData {
    id: number;
    number: string;
    key: any;
    status: "available" | "processing" | "booked" | "selected" | "blocked";
    vat: number;
    service_charge_ctb: number;
    service_charge_hgh: number;
    service_charge01: number;
    service_charge02: number;
    bank_charges: number;
    discount: number;
}

interface BoardingAndDropping {
    id: number;
    boarding: {
        id: number;
        name: string;
    };
    dropping: {
        id: number;
        name: string;
    };
    price: number;
}

interface Seat {
    id: number;
    seat_no?: string;
    key?: any;
    isBooked?: boolean;
    isProcessing?: boolean;
    isBlocked?: boolean;
    vat: number;
    service_charge_ctb: number;
    service_charge_hgh: number;
    service_charge01: number;
    service_charge02: number;
    bank_charges: number;
    discount: number;
}

interface Alldata {
    ScheduleNo: string;
    id: number;
    bus: {
        mainImage: string;
        type: string;
        depot: { name: string };
        facilities: [];
        otherImages: [];
    };
    start_time: string;
    end_time: string;
    start_date: string;
    end_date: string;
    duration: number;
    allSeats: Seat[];
    fareBrake: BoardingAndDropping[];
    to: {
        id: number;
        name: string;
    };
    from: {
        id: number;
        name: string;
    };
    route_id: number;
    routeDetails: {
        bus_fare: number;
        id: number;
    };
}

export default function BookingPage({
                                        params,
                                    }: {
    params: Record<string, string | undefined>;
}) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const sheduleId = params?.params?.[0] || "";

    const {getMode} = useAppStore();

    const [alldata, setAlldata] = useState<Alldata | null>(null);
    const [ticketData, setTicketData] = useState<any>({});

    const [seatcount, setseatcount] = useState<number>(0);

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [selectedSeats1, setSelectedSeats1] = useState<number[]>([]);

    const [bookedSeatTable, setBookedSeatTable] = useState<any[]>([]);

    const [isLoading, setisLoading] = useState<boolean>(false);
    const [isLoading1, setisLoading1] = useState<boolean>(false);

    const [pname, setpname] = useState<string>("");
    const [pmobile, setpmobile] = useState<string>("");
    const [pnic, setpnic] = useState<string>("");
    const [pemail, setpemail] = useState<string>("");
    const [boarding, setboarding] = useState<string>("");
    const [dropping, setdropping] = useState<string>("");

    const [allSeats, setAllSeats] = useState<string>("");
    const [bookedSeats, setBookedSeats] = useState<string>("");

    // const [bpoint, setbpoint] = useState<string>("");
    // const [bdoint, setdpoint] = useState<string>("");

    const [halfticket, sethalfticket] = useState<boolean>(false);

    const [date, setDate] = React.useState<Date>(new Date());
    const [from, setFrom] = React.useState<string>("");
    const [to, setTo] = React.useState<string>("");
    const [passenger, setPassenger] = useState<string>("");

    const [isVisible, setisVisible] = React.useState(false);

    const [baseFare, setbaseFare] = useState<number>(0);
    const [fareBrakeId, setFareBrakeId] = useState<number>(0);
    const [convenienceFee, setconvenienceFee] = useState<number>(0);
    const [bankCharges, setbankCharges] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [price1, setPrice1] = useState<number>(0);
    const [sfrom, setsfrom] = useState<string>("");
    const [sto, setsto] = useState<string>("");

    const [citises, setCities] = React.useState<any[]>([]);
    const [allcityend, setAllcityend] = useState<any[]>([]);
    const [openload, setOpenLoad] = React.useState(false);

    const [endcitises, setEndCities] = React.useState<any[]>([]);

    const [open, setOpen] = React.useState(false);

    const [isModalOpen, setModalOpen] = useState(false);

    const [open1, setOpen1] = useState<boolean>(false);
    const [open2, setOpen2] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/";
            return;
        }

        const getData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}all-cities`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCities(res?.data);
                setOpenLoad(true);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);

    useEffect(() => {
        loadPageData();
    }, [sheduleId]);

    const loadPageData = async () => {
        setisLoading(true);

        if (!isNaN(Number(sheduleId))) {
            const loaddata = async () => {
                try {
                    const res = await axios.get(
                        `${BASE_URL}schedule-details?id=${sheduleId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    );

                    setAlldata(res.data);
                    setseatcount(res?.data?.allSeats?.length);

                    setsfrom(res?.data?.from?.name);
                    setsto(res?.data?.to?.name);
                    setPrice(res?.data?.routeDetails?.bus_fare);
                    setPrice1(res?.data?.routeDetails?.bus_fare);

                    // console.log(res?.data?.allSeats?.length);
                    // console.log(res?.data?.allSeats);

                    setFrom(decodeURIComponent(String(params?.params?.[1])));

                    setTo(decodeURIComponent(String(params?.params?.[2])));

                    // const originalDate = new Date(
                    //   String(params?.params?.[3]).split("T")[0]
                    // );
                    // const incrementedDate = new Date(originalDate);
                    // incrementedDate.setDate(originalDate.getDate() + 1);
                    setDate(new Date(String(params?.params?.[3])));

                    setPassenger(String(params?.params?.[4]));

                    setAllSeats(res?.data?.allSeats?.length);
                    setBookedSeats(
                        res?.data?.allSeats?.filter((seat: any) => seat?.isBooked)?.length
                    );

                    console.log(res?.data?.bookedSeats);
                    setBookedSeatTable(res?.data?.bookedSeats);

                    const res1 = await axios.get(`${BASE_URL}all-cities-end?from=${String(params?.params?.[1])}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    setAllcityend(res1?.data?.ends);

                    setisLoading(false);
                } catch (error: any) {
                    console.error(error);
                    setisLoading(false);
                }
            };


            loaddata();
        } else {
            window.history.back();
        }
    };

    const [seats, setSeats] = useState<SeatData[]>(
        Array(seatcount)
            .fill(null)
            .map((_, index) => {
                const seat = alldata?.allSeats?.[index];

                return {
                    id: seat?.id ?? 0,
                    number: seat?.seat_no ?? "00",
                    key: seat?.key,
                    vat: seat?.vat ?? 0,
                    service_charge_ctb: seat?.service_charge_ctb ?? 0,
                    service_charge_hgh: seat?.service_charge_hgh ?? 0,
                    service_charge01: seat?.service_charge01 ?? 0,
                    service_charge02: seat?.service_charge02 ?? 0,
                    bank_charges: seat?.bank_charges ?? 0,
                    discount: seat?.discount ?? 0,
                    status: seat?.isBooked
                        ? "booked"
                        : seat?.isProcessing
                            ? "processing"
                            : seat?.isBlocked
                                ? "blocked"
                                : "available",
                };
            })
    );

    useEffect(() => {
        loadSeat();
    }, [seatcount]);

    const loadSeat = async () => {
        setSeats(
            Array(seatcount)
                // Array(54)
                .fill(null)
                .map((_, index) => {
                    const seat = alldata?.allSeats?.[index];
                    return {
                        id: seat?.id ?? 0,
                        number: seat?.seat_no ?? "00",
                        key: seat?.key,
                        vat: seat?.vat ?? 0,
                        service_charge_ctb: seat?.service_charge_ctb ?? 0,
                        service_charge_hgh: seat?.service_charge_hgh ?? 0,
                        service_charge01: seat?.service_charge01 ?? 0,
                        service_charge02: seat?.service_charge02 ?? 0,
                        bank_charges: seat?.bank_charges ?? 0,
                        discount: seat?.discount ?? 0,
                        status: seat?.isBooked
                            ? "booked"
                            : seat?.isProcessing
                                ? "processing"
                                : seat?.isBlocked
                                    ? "blocked"
                                    : "available",
                    };
                })
        );
    };

    // console.log(seats);

    let st = true;
    let st1 = true;

    const handleSeatClick = (
        id: number,
        seatNumber: number | string,
        key: string,
        vat: number,
        discount: number,
        service_charge_ctb: number,
        service_charge_hgh: number,
        service_charge01: number,
        service_charge02: number,
        bank_charges: number
    ): any => {
        const parsedSeatNumber =
            typeof seatNumber === "string" ? parseInt(seatNumber, 10) : seatNumber;

        const updateSelectedSeats = (
            id: number,
            key: string,
            vat: number,
            discount: number,
            service_charge_ctb: number,
            service_charge_hgh: number,
            service_charge01: number,
            service_charge02: number,
            bank_charges: number
        ) => {
            setSelectedSeats1((prevState: any) => {
                // Check if the key already exists in the array
                if (prevState.some((item: any) => item.key === key)) {
                    // If the key exists, remove it
                    const updatedSeats = prevState.filter(
                        (item: any) => item.key !== key
                    );
                    return updatedSeats;
                } else {
                    // If the key doesn't exist, add it
                    return [
                        ...prevState,
                        {
                            id,
                            key,
                            vat,
                            discount,
                            service_charge_ctb,
                            service_charge_hgh,
                            service_charge01,
                            service_charge02,
                            bank_charges,
                        },
                    ];
                }
            });
        };

        // Call the function to update the array
        updateSelectedSeats(
            id,
            key,
            vat,
            discount,
            service_charge_ctb,
            service_charge_hgh,
            service_charge01,
            service_charge02,
            bank_charges
        );

        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(parsedSeatNumber)) {
                // Remove the seat and log the removal

                if (st) {
                    // console.log(`Removed Key number: ${key}`);
                    removeSelectedSeats(key, parsedSeatNumber);
                    st = false;
                }
                return prevSelectedSeats.filter((seat) => seat !== parsedSeatNumber);
            } else {
                // Add the seat and log the addition

                if (st1) {
                    // console.log(`Added Keyt number: ${key}`);
                    addSelectedSeats(key, parsedSeatNumber);
                    st1 = false;
                }
                return [...prevSelectedSeats, parsedSeatNumber];
            }
        });
    };

    const removeSelectedSeats = async (key: string, parsedSeatNumber: number) => {
        try {
            // const form = new FormData();
            // form.append("id", sheduleId);
            // form.append("key", key);

            // const res = await axios.post(`${BASE_URL}remove-processing`, form, {
            //   headers: {
            //     "Content-Type": "multipart/form-data",
            //     Authorization: `Bearer ${localStorage.getItem("token")}`,
            //   },
            // });

            setSeats((prevSeats) =>
                prevSeats.map((seat) =>
                    seat.number === parsedSeatNumber.toString().padStart(2, "0")
                        ? {
                            ...seat,
                            status:
                                seat.status === "available"
                                    ? "selected"
                                    : seat.status === "selected"
                                        ? "available"
                                        : seat.status,
                        }
                        : seat
                )
            );
        } catch (error: any) {
            console.error(error);
            toast.error(error.response.data.message);
            return false;
        }
    };

    const addSelectedSeats = async (key: string, parsedSeatNumber: number) => {
        try {
            // const form = new FormData();
            // form.append("id", sheduleId);
            // form.append("key", key);

            // const res = await axios.post(`${BASE_URL}add-processing`, form, {
            //   headers: {
            //     "Content-Type": "multipart/form-data",
            //     Authorization: `Bearer ${localStorage.getItem("token")}`,
            //   },
            // });

            // console.warn(parsedSeatNumber.toString().padStart(2, "0"));

            setSeats((prevSeats) =>
                prevSeats.map((seat) =>
                    seat.number === parsedSeatNumber.toString().padStart(2, "0")
                        ? {
                            ...seat,
                            status:
                                seat.status === "available"
                                    ? "selected"
                                    : seat.status === "selected"
                                        ? "available"
                                        : seat.status,
                        }
                        : seat
                )
            );
        } catch (error: any) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const calTotal = () => {
            // If selectedSeats is not valid, return null
            if (
                !selectedSeats1 ||
                !Array.isArray(selectedSeats1) ||
                selectedSeats1.length === 0
            ) {
                return null;
            }

            // Assuming transferDetails.boardingPoint is defined, use it to calculate busFare
            // const busFare = 0;
            let busFare = Number(price) || 0;

            if (halfticket) {
                busFare = busFare / 2;
            }

            if (busFare === 0) return 0;

            let totalCost = 0;

            // Loop through all selected seats and calculate their total cost
            selectedSeats1.forEach((seat: any) => {
                const ctbCharge = seat.service_charge_ctb || 0;
                const hghCharge = seat.service_charge_hgh || 0;
                const discountRate = seat.discount || 0;
                const vatRate = seat.vat || 0;
                const bankChargeRate = seat.bank_charges || 0;
                const serviceCharge1 = seat.service_charge01 || 0;
                const serviceCharge2 = seat.service_charge02 || 0;

                // 01 - Calculate total before discount for the current seat
                const totalBeforeDiscount = busFare + ctbCharge + hghCharge;

                // 02 - Calculate discount
                const discount = (totalBeforeDiscount * discountRate) / 100;
                const afterDiscountPrice = totalBeforeDiscount - discount;

                // 03 - Calculate VAT
                const vat = (afterDiscountPrice * vatRate) / 100;
                const afterVatPrice = afterDiscountPrice + vat;

                // 04 - Calculate bank charges
                const bankCharge = (afterVatPrice * bankChargeRate) / 100;
                const afterBankChargePrice = afterVatPrice + bankCharge;

                // Final Total for the current seat
                const finalTotal =
                    afterBankChargePrice + serviceCharge1 + serviceCharge2;
                totalCost += finalTotal; // Accumulate the total cost for all selected seats
            });

            // Return the total cost for all seats
            return totalCost.toFixed(2);
        };

        const totalCost = calTotal();
        // console.log(totalCost);
        setconvenienceFee(Number(totalCost));
    }, [selectedSeats1, halfticket]);


    const printTicket = async () => {
        setisLoading1(true);
        try {
            const res = await axios.post(
                `${BASE_URL}book-new-seat`,
                {
                    id: Number(sheduleId),
                    name: pname,
                    email: pemail,
                    mobile: pmobile,
                    nicOrPassport: pnic,
                    isHalf: halfticket,
                    seatId: selectedSeats1.map((seat: any) => ({
                        id: Number(seat.id),
                        is_half: false,
                    })),
                    fareBrakeId: fareBrakeId ? Number(fareBrakeId) : null,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (res.data?.status === "ok") {
                setTicketData(res.data);

                if (getMode() == "HGH") {
                    setisLoading1(false);
                    if (res?.data?.paymentUrl) {
                        // navigator.clipboard.writeText(res?.data?.paymentUrl)
                        //   .then(() => {
                        //     toast.success('Payment Url Copy to Clipboard!');
                        //   })
                        //   .catch((err) => {
                        //     toast.error('Copy failed');
                        //     console.error(err);
                        //   });
                        await copy(res?.data?.paymentUrl);
                        toast.success('Payment Url Copy to Clipboard!');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);

                    } else {
                        toast.error("Somthing went wrong.");
                    }
                } else if (getMode() == "CTB") {

                    setTimeout(() => {
                        // const ticketElement = document.getElementById("user-ticket");
                        // if (ticketElement) {
                        //   html2canvas(ticketElement)
                        //     .then((canvas) => {
                        //       const dataUrl = canvas.toDataURL("image/png");
                        //       const link = document.createElement("a");
                        //       link.href = dataUrl;
                        //       link.download = "ticket.png";
                        //       document.body.appendChild(link);
                        //       link.click();
                        //       document.body.removeChild(link);
                        //     })
                        //     .catch((error) => {
                        //       console.error("Error generating image:", error);
                        //       toast.error("Error generating image.");
                        //     });
                        // }
                        const ticketElement = document.getElementById("user-ticket");

                        if (ticketElement) {
                            const printContents = ticketElement.innerHTML;

                            const tailwindCDN = `<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">`;

                            // Create an invisible iframe
                            const iframe = document.createElement("iframe");
                            iframe.style.position = "fixed";
                            iframe.style.right = "0";
                            iframe.style.bottom = "0";
                            iframe.style.width = "0";
                            iframe.style.height = "0";
                            iframe.style.border = "none";


                            document.body.appendChild(iframe);

                            const doc = iframe.contentWindow?.document;

                            if (doc) {
                                doc.open();
                                doc.write(`
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
    `);
                                doc.close();

                                const win = iframe.contentWindow;

                                if (win) {
                                    win.focus(); // required for some browsers

                                    // Detect print end using matchMedia
                                    const mediaQueryList = win.matchMedia("print");

                                    const handleMatchChange = (mql: MediaQueryListEvent) => {
                                        if (!mql.matches) {
                                            // Print dialog was closed
                                            setTimeout(() => {
                                                document.body.removeChild(iframe);
                                                window.location.reload();
                                            }, 500); // small delay to allow cleanup
                                        }
                                    };

                                    mediaQueryList.addEventListener("change", handleMatchChange);

                                    // Trigger print
                                    win.print();
                                }

                            }

                        }


                        setisLoading1(false);
                        // setTimeout(() => {
                        //     window.location.reload();
                        // }, 1000);
                    }, 1000);

                } else {
                    setisLoading1(false);
                    if (res?.data?.paymentUrl) {
                        window.location.replace(res?.data?.paymentUrl);
                    } else {
                        toast.error("Somthing went wrong.");
                    }
                }

            }
        } catch (error: any) {
            setisLoading1(false);
            console.error(error);
            toast.error(
                error.response.data.message.charAt(0).toUpperCase() +
                error.response.data.message.slice(1)
            );
        }
    };

    const handleSwapLocations = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", {from, to, date});
    };

    const setboardingdata = (e: any) => {
        if (e == "") {
            setsfrom(from);
            setsto(to);
            setPrice(price1);

            setFareBrakeId(0);

            // If selectedSeats is not valid, return null
            if (
                !selectedSeats1 ||
                !Array.isArray(selectedSeats1) ||
                selectedSeats1.length === 0
            ) {
                return null;
            }

            // Assuming transferDetails.boardingPoint is defined, use it to calculate busFare
            const busFare = Number(price1) || 0;

            if (busFare === 0) return 0;

            let totalCost = 0;

            // Loop through all selected seats and calculate their total cost
            selectedSeats1.forEach((seat: any) => {
                const ctbCharge = seat.service_charge_ctb || 0;
                const hghCharge = seat.service_charge_hgh || 0;
                const discountRate = seat.discount || 0;
                const vatRate = seat.vat || 0;
                const bankChargeRate = seat.bank_charges || 0;
                const serviceCharge1 = seat.service_charge01 || 0;
                const serviceCharge2 = seat.service_charge02 || 0;

                // 01 - Calculate total before discount for the current seat
                const totalBeforeDiscount = busFare + ctbCharge + hghCharge;

                // 02 - Calculate discount
                const discount = (totalBeforeDiscount * discountRate) / 100;
                const afterDiscountPrice = totalBeforeDiscount - discount;

                // 03 - Calculate VAT
                const vat = (afterDiscountPrice * vatRate) / 100;
                const afterVatPrice = afterDiscountPrice + vat;

                // 04 - Calculate bank charges
                const bankCharge = (afterVatPrice * bankChargeRate) / 100;
                const afterBankChargePrice = afterVatPrice + bankCharge;

                // Final Total for the current seat
                const finalTotal =
                    afterBankChargePrice + serviceCharge1 + serviceCharge2;
                totalCost += finalTotal; // Accumulate the total cost for all selected seats
            });

            // console.log(totalCost);
            setconvenienceFee(totalCost);
        } else {
            const data = e.split("|");

            setPrice(data[0]);
            setsfrom(data[1]);
            setsto(data[2]);

            setFareBrakeId(Number(data[3]));

            // If selectedSeats is not valid, return null
            if (
                !selectedSeats1 ||
                !Array.isArray(selectedSeats1) ||
                selectedSeats1.length === 0
            ) {
                return null;
            }

            // Assuming transferDetails.boardingPoint is defined, use it to calculate busFare
            const busFare = Number(data[0]) || 0;

            if (busFare === 0) return 0;

            let totalCost = 0;

            // Loop through all selected seats and calculate their total cost
            selectedSeats1.forEach((seat: any) => {
                const ctbCharge = seat.service_charge_ctb || 0;
                const hghCharge = seat.service_charge_hgh || 0;
                const discountRate = seat.discount || 0;
                const vatRate = seat.vat || 0;
                const bankChargeRate = seat.bank_charges || 0;
                const serviceCharge1 = seat.service_charge01 || 0;
                const serviceCharge2 = seat.service_charge02 || 0;

                // 01 - Calculate total before discount for the current seat
                const totalBeforeDiscount = busFare + ctbCharge + hghCharge;

                // 02 - Calculate discount
                const discount = (totalBeforeDiscount * discountRate) / 100;
                const afterDiscountPrice = totalBeforeDiscount - discount;

                // 03 - Calculate VAT
                const vat = (afterDiscountPrice * vatRate) / 100;
                const afterVatPrice = afterDiscountPrice + vat;

                // 04 - Calculate bank charges
                const bankCharge = (afterVatPrice * bankChargeRate) / 100;
                const afterBankChargePrice = afterVatPrice + bankCharge;

                // Final Total for the current seat
                const finalTotal =
                    afterBankChargePrice + serviceCharge1 + serviceCharge2;
                totalCost += finalTotal; // Accumulate the total cost for all selected seats
            });

            // console.log(totalCost);
            setconvenienceFee(totalCost);
        }
    };

    if (isLoading) {
        return (
            <>
                <div className="h-[85vh] flex justify-center items-center">
                    <LoadingAnimation/>
                </div>
            </>
        );
    }

    const defaultProps = {
        options: citises,
        getOptionLabel: (option: FilmOptionType) => option.name,
    };
    const defaultProps1 = {
        options: endcitises?.length > 0 ? endcitises : Array.isArray(allcityend) ? allcityend : Object.values(allcityend),
        getOptionLabel: (option: FilmOptionType) => option.name,
    };

    return (
        <>
            {isLoading1 && (
                <>
                    <>
                        <div
                            className="h-full top-0 z-50 w-full flex-col bg-black/70 fixed flex justify-center items-center">
                            <LoadingAnimation/>
                        </div>
                    </>
                </>
            )}
            <>
                <div
                    className="absolute top-[-9999999px] left-[-9999999px] flex justify-center items-center bg-black/50 bg-contain h-full w-full z-50">
                    <div
                        id="user-ticket"
                        className="bg-white rounded-2xl min-w-[40%] min-h-auto flex flex-col justify-center items-center p-5"
                    >
                        {/* <div className="flex w-full flex-row px-5 h-full items-start gap-2">
              <div className="p-2 min-w-[270px] lg:min-w-max flex h-full flex-col space-y-5">
                <img
                  src="/logos/sltb_logo2.svg"
                  alt="Sri Lanka Transport Board"
                  className="w-40"
                />
                <div className="flex flex-col mt-3 space-y-1">
                  <span className="font-extralight uppercase text-md">
                    PASSENGER NAME
                  </span>
                  <span className="font-semibold text-lg">
                    {ticketData?.details?.name
                      ? ticketData?.details?.name
                      : "--"}
                  </span>
                </div>
                <div className="flex flex-col mt-3 space-y-1">
                  <span className="font-extralight uppercase text-md">nic</span>
                  <span className="font-semibold text-lg">
                    {ticketData?.details?.nicOrPassport
                      ? ticketData?.details?.nicOrPassport
                      : "--"}
                  </span>
                </div>
                <div className="flex flex-col mt-3 space-y-1">
                  <span className="font-extralight text-md">Booked Date</span>
                  <span className="font-semibold text-lg">
                    {ticketData?.bookedDateTime
                      ? new Date(
                        ticketData?.bookedDateTime
                      ).toLocaleDateString()
                      : "--/--/--"}
                  </span>
                </div>
                <div className="flex items-center mt-5 gap-3">
                  <div className="flex flex-col font-extralight text-md">
                    <span>Bus Fare</span>
                    <span>Service Chargers</span>
                  </div>
                  <div className="flex flex-col font-normal text-md">
                    <span>
                      Rs {ticketData?.busFare ? ticketData?.busFare : 0.0} x{" "}
                      {ticketData?.seats?.length}
                    </span>
                    <span>
                      Rs{" "}
                      {ticketData?.seats
                        ? ticketData.seats.reduce(
                          (total: any, seat: any) =>
                            total +
                            (seat.service_charge01
                              ? seat.service_charge01
                              : 0) +
                            (seat.service_charge02
                              ? seat.service_charge02
                              : 0),
                          0
                        )
                        : 0}{" "}
                      x {ticketData?.seats?.length ?? 0}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col mt-3 font-medium text-lg">
                  <span>
                    Total :{" "}
                    {ticketData.total ? ticketData.total.toFixed(2) : 0.0}
                  </span>
                </div>
              </div>

              <div className="flex flex-col min-w-[750px] lg:min-w-max h-[450px] gap-5">
                <div className="w-full flex flex-row gap-5">
                  <div className="h-auto">
                    <img
                      src="/assets/sltb-eseat.svg"
                      alt="Sri Lanka Transport Board"
                      className="object-cover h-full min-w-[45px] lg:w-full"
                    />
                  </div>
                  <div className="h-full w-full flex flex-col pt-5 space-y-3 gap-5">
                    <div className="flex flex-row w-full justify-between gap-5">
                      <div className="flex flex-col w-max">
                        <span className="font-extralight text-md">Pickup</span>
                        <span className="font-medium text-lg">
                          {ticketData?.route?.split("-")[0]}
                        </span>
                      </div>
                      <div className="flex gap-2 w-max items-center justify-center">
                        <img
                          src="/assets/bus-dot.svg"
                          alt="bus_dot"
                          className="w-5"
                        />
                        <img
                          src="/assets/bus-dot.svg"
                          alt="bus_dot"
                          className="w-5"
                        />
                        <img
                          src="/assets/bus-dot.svg"
                          alt="bus_dot"
                          className="w-5"
                        />
                        <img
                          src="/assets/bus-dot.svg"
                          alt="bus_dot"
                          className="w-5"
                        />
                        <img
                          src="/assets/bus-icon.svg"
                          alt="Bus"
                          className="w-9"
                        />
                        <img
                          src="/assets/bus-dot.svg"
                          alt="bus_dot"
                          className="w-5"
                        />
                        <img
                          src="/assets/bus-dot.svg"
                          alt="bus_dot"
                          className="w-5"
                        />
                        <img
                          src="/assets/bus-dot.svg"
                          alt="bus_dot"
                          className="w-5"
                        />
                        <img
                          src="/assets/bus-dot.svg"
                          alt="bus_dot"
                          className="w-5"
                        />
                      </div>
                      <div className="flex flex-col w-max">
                        <span className="font-extralight text-md">Drop</span>
                        <span className="font-medium text-lg">
                          {ticketData?.route?.split("-")[1]}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-between">
                      <div className="flex flex-col">
                        <span className="font-extralight text-md">
                          Pickup Date / Time
                        </span>
                        <span className="font-medium text-lg">
                          {ticketData?.startDateTime
                            ? new Date(
                              ticketData?.startDateTime
                            ).toLocaleDateString()
                            : "--/--/--"}
                        </span>
                        <span className="font-medium text-lg">
                          {ticketData?.startDateTime
                            ? new Date(
                              ticketData?.startDateTime
                            ).toLocaleTimeString()
                            : "--:--"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-extralight text-md">
                          Drop Date / Time
                        </span>
                        <span className="font-medium text-lg">
                          {ticketData?.endDateTime
                            ? new Date(
                              ticketData?.endDateTime
                            ).toLocaleDateString()
                            : "--/--/--"}
                        </span>
                        <span className="font-medium text-lg">
                          {ticketData?.endDateTime
                            ? new Date(
                              ticketData?.endDateTime
                            ).toLocaleTimeString()
                            : "--:--"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-start px-10 h-full">
                  <div className="flex flex-row items-center h-full justify-center gap-14">
                    <div className="flex flex-col space-y-10">
                      <div className="flex flex-col space-y-2">
                        <span className="font-extralight text-sm">
                          Ticket Ref No.
                        </span>
                        <span className="text-md font-medium">
                          {ticketData.ref ? ticketData.ref : "--"}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className="font-extralight text-sm">Depot</span>
                        <span className="text-md font-medium">
                          {ticketData?.depot ? ticketData?.depot : "--"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-10">
                      <div className="flex flex-col space-y-2">
                        <span className="font-extralight text-sm">V-Code</span>
                        <span className="text-md font-medium">
                          {ticketData?.vCode ? ticketData?.vCode : "--"}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className="font-extralight text-sm">
                          Bus Model
                        </span>
                        <span className="text-md font-medium">
                          {ticketData?.bus_model ? ticketData?.bus_model : "--"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-10">
                      <div className="flex flex-col space-y-2">
                        <span className="font-extralight text-sm">Seat No</span>
                        <span className="text-md font-medium">
                          {ticketData?.seats
                            ? ticketData?.seats
                              .map((item: any) => item.seat_no)
                              .join(",")
                            : "--"}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className="font-extralight text-sm">
                          Schedule ID
                        </span>
                        <span className="text-md font-medium">
                          {ticketData?.scheduleId
                            ? ticketData?.scheduleId
                            : "--"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-10">
                      <div className="flex flex-col space-y-2">
                        <span className="font-extralight text-sm">
                          No.of Seats
                        </span>
                        <span className="text-md font-medium">
                          {ticketData?.seats ? ticketData?.seats.length : "--"}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className="font-extralight text-sm">Route</span>
                        <span className="text-md font-medium">
                          {ticketData?.routeId ? ticketData?.routeId : "--"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
                        <div className="w-full flex flex-col justify-center items-center">
                            <div className="w-full px-10 flex justify-center items-center">
                                <img src="/logos/sltb.svg" alt="sltb_logo"
                                     className="w-[30%] object-cover object-center"/>
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
                  Hot Line : <img src="/logos/call.svg" alt="call" className="w-5 h-5"/> 1315
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
                            {/*<div className="mt-2  flex">*/}
                            {/*  <div className="w-48">*/}
                            {/*    <span>Bus Fare</span>*/}
                            {/*  </div>*/}
                            {/*  <div className="w-full">*/}
                            {/*    <span>*/}
                            {/*      Rs {ticketData?.busFare ? ticketData?.busFare : 0.0} x{" "}*/}
                            {/*      {ticketData?.seats?.length}*/}
                            {/*    </span>*/}
                            {/*  </div>*/}
                            {/*</div>*/}
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
                            <div className="mt-2 w-full flex">
                                <div className="w-48">
                                    <span className="text-gray-500">Bank Charges</span>
                                </div>
                                <div className="w-full">
                  <span>
                    Rs{" "}
                      {(() => {
                          return (
                              ticketData?.seats?.reduce((sum: any, seat: {
                                  bank_charges: any;
                              }) => sum + (seat.bank_charges || 0), 0) ||
                              0
                          );
                      })().toFixed(2)}
                  </span>
                                </div>
                            </div>
                            {/*<div className="mb-3 flex">*/}
                            {/*  <div className="w-48">*/}
                            {/*    <span>Service Chargers</span>*/}
                            {/*  </div>*/}
                            {/*  <div className="w-full">*/}
                            {/*    <span>*/}
                            {/*      Rs{" "}*/}
                            {/*      {(() => {*/}
                            {/*        const tot = ticketData?.total;*/}
                            {/*        const busfare = ticketData?.busFare;*/}
                            {/*        const length = ticketData?.seats?.length;*/}

                            {/*        console.log(tot)*/}
                            {/*        console.log(busfare)*/}
                            {/*        console.log(length)*/}

                            {/*        if (!length || !tot || !busfare) return "0.00";*/}

                            {/*        const finaltot = (tot - (busfare * length)) / length;*/}
                            {/*        console.log(finaltot)*/}
                            {/*        return finaltot.toFixed(0); // Always show two decimal places*/}
                            {/*      })()}*/}
                            {/*      {" x "} {ticketData?.seats?.length ?? 0}*/}
                            {/*    </span>*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="w-full flex font-medium text-lg mt-3 justify-center items-center">
                            <span>Amount : </span>
                            <span className="ml-2">
                {" "}
                                Rs.{ticketData.total ? ticketData.total.toFixed(2) : 0.0}
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
            </>

            <div className="w-full mb-10 py-20 bg-bgMyColor6 basic_search_bg1 bg-contain lg:bg-cover">
                <div className="w-full my-container">
                    <div
                        className="bg-gray-700 text-white p-4 rounded-t-lg flex flex-wrap lg:flex-nowrap items-center justify-center gap-4 lg:gap-12 lg:w-max mx-auto">
                        <div className="flex items-center flex-wrap justify-center lg:flex-nowrap gap-4">
                            <span>{from}</span>
                            {/* <ArrowLeftRight className="w-4 h-4" /> */}
                            <img
                                src="/assets/search_Arrow.svg"
                                alt="search_bar_Arrow"
                                className="w-28"
                            />
                            <span>{to}</span>
                        </div>
                        <div className="flex items-center gap-10">
                            <span>{format(date, "yyyy-MM-dd")}</span>
                            {isVisible ? (
                                <>
                                    <Button
                                        size="sm"
                                        className="px-6"
                                        onClick={() => {
                                            setisVisible(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        size="sm"
                                        className="px-6"
                                        onClick={() => {
                                            setisVisible(true);
                                        }}
                                    >
                                        Modify
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {isVisible && (
                        <>
                            {openload ? (
                                <>
                                    <div>
                                        <form
                                            onSubmit={handleSearch}
                                            className="flex gap-5 justify-center"
                                        >
                                            <div
                                                className="flex flex-col lg:flex-row gap-10 w-full lg:w-auto bg-white p-6 rounded-lg shadow-lg transform duration-150">
                                                <div
                                                    className="flex flex-col lg:flex-row gap-5 lg:items-center lg:border-e-2 border-[#a4b1bd] h-full">
                                                    <div className="text-left w-full lg:w-40">
                                                        <label className="text-sm font-medium text-gray-500">
                                                            From / සිට / ஒரு
                                                        </label>
                                                        {/* <Input
                          placeholder="Leaving from.."
                          className="bg-transparent border-0 shadow-none mt-0 pt-0 px-0 w-32 text-black placeholder:text-black"
                          onChange={(e) => setFrom(e.target.value)}
                          value={from}
                        /> */}
                                                        {/* <Autocomplete
                          {...defaultProps}
                          id="disable-close-on-select"
                          disableCloseOnSelect
                          value={citises.find((city) => city.name === from)}
                          onChange={(_, value) => setFrom(value?.name || "")}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Leaving from.."
                              variant="standard"
                              className="bg-transparent border-0 shadow-none text-black placeholder:text-black px-0 w-full lg:w-40 outline-none focus:ring-0"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        /> */}
                                                        <Autocomplete
                                                            {...defaultProps}
                                                            id="disable-close-on-select"
                                                            disableCloseOnSelect
                                                            open={open1}
                                                            onOpen={() => setOpen1(true)}
                                                            onClose={() => setOpen1(false)}
                                                            PopperComponent={(props) => (
                                                                <Popper
                                                                    {...props}
                                                                    modifiers={[
                                                                        {
                                                                            name: "preventOverflow",
                                                                            options: {
                                                                                boundary: "window",
                                                                            },
                                                                        },
                                                                    ]}
                                                                    sx={{
                                                                        "& .MuiAutocomplete-listbox": {
                                                                            scrollbarWidth: "none", // Firefox
                                                                            "&::-webkit-scrollbar": {display: "none"}, // Chrome, Safari
                                                                        },
                                                                    }}
                                                                />
                                                            )}
                                                            value={citises.find((city) => city.name === from)}
                                                            onChange={(_: any, value: any) => {
                                                                setFrom(value?.name || "");
                                                                setEndCities(value?.ends || []);
                                                                setOpen1(false);
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    placeholder="Leaving from.."
                                                                    variant="standard"
                                                                    className="bg-transparent border-0 shadow-none text-black placeholder:text-black px-0 w-full lg:w-40 outline-none focus:ring-0"
                                                                    InputProps={{
                                                                        ...params.InputProps,
                                                                        disableUnderline: true,
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </div>

                                                    <Button
                                                        size="icon"
                                                        className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                                                        onClick={handleSwapLocations}
                                                    >
                                                        <ArrowLeftRight className="h-4 w-4 text-white"/>
                                                    </Button>

                                                    <div className="text-left ml-0 w-full lg:w-40 pr-2">
                                                        <label className="text-sm font-medium text-gray-500">
                                                            To / දක්වා /வரை
                                                        </label>
                                                        {/* <Input
                          placeholder="Going to.."
                          className="bg-transparent border-0 shadow-none mt-0 pt-0 text-black placeholder:text-black px-0 w-32 outline-none focus:ring-0"
                          onChange={(e) => setTo(e.target.value)}
                          value={to}
                        /> */}

                                                        {/* <Autocomplete
                          {...defaultProps}
                          id="disable-close-on-select"
                          disableCloseOnSelect
                          value={citises.find((city) => city.name === to)}
                          onChange={(_, value) => setTo(value?.name || "")}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Leaving from.."
                              variant="standard"
                              className="bg-transparent border-0 shadow-none text-black placeholder:text-black px-0 w-full lg:w-40 outline-none focus:ring-0"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        /> */}

                                                        <Autocomplete
                                                            {...defaultProps1}
                                                            id="disable-close-on-select"
                                                            disableCloseOnSelect
                                                            open={open2}
                                                            onOpen={() => setOpen2(true)}
                                                            onClose={() => setOpen2(false)}
                                                            PopperComponent={(props) => (
                                                                <Popper
                                                                    {...props}
                                                                    sx={{
                                                                        "& .MuiAutocomplete-listbox": {
                                                                            scrollbarWidth: "none", // Firefox
                                                                            "&::-webkit-scrollbar": {display: "none"}, // Chrome, Safari
                                                                        },
                                                                    }}
                                                                />
                                                            )}
                                                            value={citises.find((city) => city.name === to)}
                                                            onChange={(_, value) => {
                                                                setTo(value?.name || "");
                                                                setOpen2(false)
                                                            }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    placeholder="Going to.."
                                                                    variant="standard"
                                                                    className="bg-transparent border-0 shadow-none text-black placeholder-current:text-black px-0 w-full lg:w-40 outline-none focus:ring-0"
                                                                    InputProps={{
                                                                        ...params.InputProps,
                                                                        disableUnderline: true,
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex flex-col lg:border-e-2 border-[#a4b1bd] h-full">
                                                    <label className="text-sm font-medium text-gray-500">
                                                        Date / දිනය / தேதி
                                                    </label>
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full md:w-[200px] justify-start mt-0 pt-2 px-0 text-left font-normal bg-transparent border-0 shadow-none hover:bg-transparent text-md hover:text-black",
                                                                    !date && "text-black"
                                                                )}
                                                            >
                                                                {date ? format(date, "EEE, MMM dd") : "Select date"}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <Calendar
                                                                mode="single"
                                                                selected={date}
                                                                // onSelect={(day) => setDate(day || new Date())}
                                                                onSelect={(selectedDate) => {
                                                                    if (
                                                                        selectedDate &&
                                                                        format(selectedDate, "yyyy-MM-dd") <
                                                                        format(new Date(), "yyyy-MM-dd")
                                                                    ) {
                                                                        toast.error("You can't Select Previous Date");
                                                                    } else {
                                                                        setDate(selectedDate || new Date());
                                                                        setOpen(false);
                                                                    }
                                                                }}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <div className="flex gap-5 items-center h-full">
                                                    <div className="text-left">
                                                        <label className="text-sm font-medium text-gray-500">
                                                            Passengers / මගීන් /பயணிகள்
                                                        </label>
                                                        {/* <select
                          className="flex w-full p-2 px-0 bg-transparent text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          onChange={(e) => setPassenger(e.target.value)}
                          value={passenger}
                        >
                          {Array.from({ length: 54 }, (_, i) => (
                            <option
                              key={i + 1}
                              value={i + 1}
                              className="bg-white"
                            >
                              {i + 1} Passenger
                            </option>
                          ))}
                        </select> */}
                                                        {/* <Autocomplete
                          id="disable-close-on-select"
                          disableCloseOnSelect
                          options={passengerOptions}
                          getOptionLabel={(option) => option.name}
                          value={
                            passengerOptions.find(
                              (opt) => opt.value === parseInt(passenger)
                            ) || null
                          }
                          onChange={(_, value) =>
                            setPassenger((value?.value || 1).toString())
                          }
                          className="w-40"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Passenger"
                              variant="standard"
                              className="bg-transparent border-0 shadow-none text-black placeholder-current:text-black px-0 w-full outline-none focus:ring-0"
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        /> */}
                                                        <Autocomplete
                                                            id="disable-close-on-select"
                                                            disableCloseOnSelect
                                                            options={passengerOptions}
                                                            getOptionLabel={(option) => option.name}
                                                            value={
                                                                passengerOptions.find(
                                                                    (opt) => opt.value === parseInt(passenger)
                                                                ) || null
                                                            }
                                                            onChange={(_, value) =>
                                                                setPassenger((value?.value || 1).toString())
                                                            }
                                                            PopperComponent={(props) => (
                                                                <Popper
                                                                    {...props}
                                                                    sx={{
                                                                        "& .MuiAutocomplete-listbox": {
                                                                            scrollbarWidth: "none", // Firefox
                                                                            "&::-webkit-scrollbar": {display: "none"}, // Chrome, Safari
                                                                        },
                                                                    }}
                                                                />
                                                            )}
                                                            className="w-40"
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    placeholder="Select Passenger"
                                                                    variant="standard"
                                                                    className="bg-transparent border-0 shadow-none text-black placeholder-current:text-black px-0 w-full outline-none focus:ring-0"
                                                                    InputProps={{
                                                                        ...params.InputProps,
                                                                        disableUnderline: true,
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                <Button
                                                    type="submit"
                                                    className="py-6"
                                                    onClick={() => {
                                                        window.location.href = `/booking/listing?from=${from}&to=${to}&date=${format(
                                                            date,
                                                            "yyyy-MM-dd"
                                                        )}&passenger=${passenger}`;
                                                    }}
                                                >
                                                    <Search className="w-4 h-4 mr-2"/>
                                                    Search
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className="flex gap-3 w-full justify-center items-center bg-white p-6 rounded-lg shadow-lg">
                                        <span className="font-bold text-gray-500">Loading Cities..</span>
                                        <div
                                            className="animate-spin h-5 w-5 border-4 border-gray-300 rounded-full border-t-[#dd3170]"
                                            role="status" aria-label="loading" aria-describedby="loading-spi"></div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="my-container py-5">
                <Button
                    variant={"secondary"}
                    className="flex space-x-3"
                    onClick={() => history.back()}
                >
                    <ArrowLeft className="w-6 h-6"/>
                    Back
                </Button>
            </div>
            <div className="my-container pb-16 space-y-12">
                {alldata && (
                    <BusCard
                        key={alldata.id}
                        id={alldata.id}
                        image={alldata?.bus?.mainImage}
                        arrival={{
                            time: alldata?.end_time,
                            name: alldata.to?.name,
                            date: format(alldata?.end_date, "yyyy-MM-dd"),
                        }}
                        departure={{
                            time: alldata?.start_time,
                            name: alldata?.from?.name,
                        }}
                        booking={{
                            startDate: alldata?.start_date,
                            startTime: alldata?.start_time,
                            endTime: alldata?.end_time,
                        }}
                        busType={alldata?.bus?.type}
                        depotName={alldata?.bus?.depot?.name}
                        price={alldata?.routeDetails?.bus_fare}
                        duration={alldata?.duration}
                        availableSeats={alldata.allSeats?.length}
                        fasility={alldata?.bus?.facilities}
                        boardingDropping={alldata?.fareBrake}
                        bookbtnst={false}
                        from={""}
                        to={""}
                        date={""}
                        passenger={0}
                        schedule_number={alldata?.ScheduleNo}
                        route_id={alldata?.routeDetails?.id}
                        subImages={alldata?.bus?.otherImages}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6 p-10">
                        <div className="hidden lg:block">
                            <BusSeatLayout seats={seats} onSeatClick={handleSeatClick}/>
                        </div>
                        <div className="block md:block lg:hidden">
                            <BusSeatLayoutSM seats={seats} onSeatClick={handleSeatClick}/>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border p-5 rounded-lg bg-slate-50">
                            <div>
                                <div className="space-y-4">
                                    <Label>Ticket Type</Label>
                                    <RadioGroup defaultValue="full" className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="full"
                                                id="full"
                                                onClick={() => sethalfticket(false)}
                                                // onChange={() => sethalfticket(false)}
                                            />
                                            <Label>Full Ticket</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value="half"
                                                id="half"
                                                onClick={() => sethalfticket(true)}
                                                // onChange={() => sethalfticket(true)}
                                            />
                                            <Label>Half Ticket</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                            <div>
                                <Label>Boarding / Dropping Points</Label>
                                {/* <Select onValueChange={(e) => setboardingdata(e)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select boarding point" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Select boarding point">
                      Select boarding point
                    </SelectItem>
                    {alldata?.fareBrake?.map((item, index) => (
                      <SelectItem
                        value={`${item?.price} | ${item?.boarding?.name} | ${item?.dropping?.name} | ${item?.id}`}
                        key={index}
                      >
                        {item?.boarding?.name} / {item?.dropping?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
                                {/* <Autocomplete
                  options={alldata?.fareBrake || []}
                  getOptionLabel={(option) =>
                    `${option?.boarding?.name} / ${option?.dropping?.name}`
                  }
                  onChange={(_, value) =>
                    setboardingdata(
                      value
                        ? `${value?.price} | ${value?.boarding?.name} | ${value?.dropping?.name} | ${value?.id}`
                        : ""
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select boarding point"
                      variant="standard"
                      className="bg-transparent border-gray-300 shadow-none text-black placeholder:text-black px-0 w-full outline-none focus:ring-0"
                      InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                        className:
                          "bg-transparent border-[1.5px] border-gray-200 shadow-none px-2 py-1 rounded-lg h-full text-black placeholder:text-black px-0 w-full outline-none focus:ring-0",
                      }}
                    />
                  )}
                /> */}
                                <Autocomplete
                                    options={alldata?.fareBrake || []}
                                    getOptionLabel={(option) =>
                                        `${option?.boarding?.name} / ${option?.dropping?.name}`
                                    }
                                    onChange={(_, value) =>
                                        setboardingdata(
                                            value
                                                ? `${value?.price} | ${value?.boarding?.name} | ${value?.dropping?.name} | ${value?.id}`
                                                : ""
                                        )
                                    }
                                    PopperComponent={(props) => (
                                        <Popper
                                            {...props}
                                            sx={{
                                                "& .MuiAutocomplete-listbox": {
                                                    scrollbarWidth: "none", // Firefox
                                                    "&::-webkit-scrollbar": {display: "none"}, // Chrome, Safari
                                                },
                                            }}
                                        />
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder={`${alldata?.from?.name} - ${alldata?.to?.name}`}
                                            variant="standard"
                                            className="bg-transparent border-gray-300 shadow-none text-black placeholder:text-black px-0 w-full outline-none focus:ring-0"
                                            InputProps={{
                                                ...params.InputProps,
                                                disableUnderline: true,
                                                className:
                                                    "bg-transparent border-[1.5px] border-gray-200 shadow-none px-2 py-1 rounded-lg h-full text-black placeholder:text-black w-full outline-none focus:ring-0",
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            {/* <div>
                <Label>Dropping Point</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dropping point" />
                  </SelectTrigger>
                  <SelectContent>
                    {alldata?.boardingAndDropping?.Dropping?.map(
                      (item, index) => (
                        <SelectItem value={item?.point?.name} key={index}>
                          {item?.point?.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div> */}
                        </div>
                        {/* <div className="grid grid-cols-1 gap-4 border p-5 rounded-lg bg-slate-50">
              <div className="space-y-4">
                <Label>Additional Type</Label>
                <RadioGroup defaultValue="full" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="full"
                      id="full"
                      onChange={() => sethalfticket(false)}
                    />
                    <Label htmlFor="full">Full Ticket</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="half"
                      id="half"
                      onChange={() => sethalfticket(true)}
                    />
                    <Label htmlFor="half">Half Ticket</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="half"
                      id="half"
                      onChange={() => sethalfticket(true)}
                    />
                    <Label htmlFor="half">Half Ticket</Label>
                  </div>
                </RadioGroup>
              </div>
            </div> */}
                        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border p-5 rounded-lg bg-slate-50">
              <div className="space-y-4">
                <Label>Ticket Type</Label>
                <RadioGroup defaultValue="full" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="full"
                      id="full"
                      onChange={() => sethalfticket(false)}
                    />
                    <Label htmlFor="full">Full Ticket</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="half"
                      id="half"
                      onChange={() => sethalfticket(true)}
                    />
                    <Label htmlFor="half">Half Ticket</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-1">
                <Label>
                  Price Catergory <span className="text-red-500">*</span>{" "}
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Price Catergory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"Normal"}>Normal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div> */}

                        <PassengerForm
                            name={pname}
                            mobile={pmobile}
                            nic={pnic}
                            email={pemail}
                            setName={setpname}
                            setMobile={setpmobile}
                            setNic={setpnic}
                            setEmail={setpemail}
                        />
                    </div>

                    <div>
                        <TripSelection
                            tripDate={
                                alldata?.start_date
                                    ? alldata?.start_date
                                    : new Date().toISOString()
                            }
                            startingTime={alldata?.start_time || ""}
                            startingPlace={alldata?.from?.name || ""}
                            start_stand={""}
                            endingTime={alldata?.end_time || ""}
                            endingPlace={alldata?.to?.name || ""}
                            end_stand={""}
                            hours={alldata?.duration || 0}
                            bustype={alldata?.bus?.type || ""}
                            allSeats={allSeats}
                            bookedSeats={bookedSeats}
                        />
                        <FareSummary
                            from={sfrom}
                            to={sto}
                            price={price}
                            baseFare={baseFare}
                            convenienceFee={convenienceFee}
                            bankCharges={bankCharges}
                        />
                        <Button
                            className="w-full mt-4 bg-pink-600 hover:bg-pink-700"
                            // onClick={handleDownload}
                            onClick={printTicket}
                        >
                            {getMode() === "HGH" ? `Send IPG link` : getMode() === "CTB" ? `Print Ticket` : `Buy Ticket`}
                        </Button>
                    </div>
                </div>
            </div>
            {bookedSeatTable.length > 0 && (
                <>
                    <BookingTable bookings={bookedSeatTable}/>
                </>
            )}
        </>
    );
}
