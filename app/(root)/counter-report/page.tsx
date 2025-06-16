"use client";
import React, {useEffect, useState} from "react";
import SearchForm from "./Latest search-form";
import axios from "axios";
import LoadingAnimation from "@/components/ui/Loading";
import {format} from "date-fns";
import toast from "react-hot-toast";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Eye, EyeOff} from "lucide-react";
import Modal from "@/components/model";
import {useAppStore} from "@/util/store";

interface CounterReportProps {
    id: number;
    ref: string;
    seatNo: string;
    scheduleId: string;
    madeOdPay: string;
    customerDetails: {
        mobile: string;
        nicOrPassport: string;
    };
    nicNo: string;
    route: string;
    total: string;
    service: string;
    travelDate: string;
    bookedDate: string;
}

const CounterReport = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const {mobile} = useAppStore();

    const [bookings, setBookings] = React.useState<CounterReportProps[]>([]);

    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [date, setDate] = React.useState<string>("");
    const [scheduleId, setScheduleId] = React.useState<string>("");
    const [travelDate, setTravelDate] = React.useState<string>("");

    const [isModalOpen, setModalOpen] = useState(false);
    const [otp, setOtp] = useState<number>(0);
    const [isloading1, setIsloading1] = useState(false);

    const [bookingId, setBookingid] = useState(0);

    const search = async () => {

        if (!date && !scheduleId) {
            toast.error("Select Booked Date And Schedule ID");
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.get(
                `${BASE_URL}report/counter?bookedDate=${
                    date ? format(date, "yyyy-MM-dd") : ""
                }${scheduleId ? `&id=${scheduleId}` : ""}${
                    travelDate ? `&travelDate=${format(travelDate, "yyyy-MM-dd")}` : ""
                }`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setBookings([]);
            setBookings(res?.data);

            setIsLoading(false);
        } catch (error: any) {
            console.error(error);
            setBookings([]);
            toast.error(error?.response?.data?.message);
            setIsLoading(false);
        }
    };

    const sendOtpRequest = async (id: number) => {
        try {
            setBookingid(id);
            setModalOpen(true);

            const isSend = await axios.post(`${BASE_URL}report/booking-cancel-request`, {
                    id: id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (isSend?.data?.status == "ok") {
                toast.success("OTP Sended.");
            }

        } catch (e: any) {
            toast.error(e?.response?.data?.message);
        }
    }

    const handleOtpLogin = async () => {
        setIsloading1(true);
        try {
            const isSend = await axios.post(`${BASE_URL}report/booking-cancel`, {
                    id: bookingId,
                    code: otp
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (isSend?.data?.status == "ok") {
                setModalOpen(false);
                setIsloading1(false);
                toast.error("Booking Canceled.")
                setOtp(0);
                setBookingid(0);
                search();
            }

        } catch (e: any) {
            console.log(e);
            toast.error(e?.response?.data?.message);
            setIsloading1(false);
        }
    }

    return (
        <>
            <SearchForm
                date={date}
                setDate={setDate}
                scheduleId={scheduleId}
                setScheduleId={setScheduleId}
                travelDate={travelDate}
                setTravelDate={setTravelDate}
                search={search}
            />
            <div className="min-h-[100vh]">
                <div className="w-full my-container mt-3">
                    <label className="text-3xl ">Counter Report</label>
                </div>
                <div className="w-full my-container mt-5">
                    {isLoading ? (
                        <>
                            <LoadingAnimation/>
                        </>
                    ) : (
                        <>
                            <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
                                {/* Desktop View */}
                                <table className="w-full hidden md:table">
                                    <thead className="bg-bgMyColor7">
                                    <tr>
                                        <th className="px-4 py-3 w-[150px] text-left text-sm font-medium text-gray-600">
                                            Referance No.
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                                            Seat no
                                        </th>
                                        <th className="px-4 py-3 w-[150px] text-left text-sm font-medium text-gray-600">
                                            Schedule ID
                                        </th>
                                        <th className="px-4 w-[100px] py-3 text-left text-sm font-medium text-gray-600">
                                            Mode of Pay
                                        </th>
                                        <th className="px-4 py-3 w-[100px] text-left text-sm font-medium text-gray-600">
                                            Contact No
                                        </th>
                                        <th className="px-4 py-3 w-[100px] text-left text-sm font-medium text-gray-600">
                                            NIC No
                                        </th>
                                        <th className="px-4 py-3 w-[160px] text-left text-sm font-medium text-gray-600">
                                            Route
                                        </th>
                                        <th className="px-4 py-3 w-[80px] text-left text-sm font-medium text-gray-600">
                                            Bus Fare
                                        </th>
                                        <th className="px-4 py-3 w-[80px] text-left text-sm font-medium text-gray-600">
                                            Service Charge
                                        </th>
                                        <th className="px-4 py-3 w-[110px] text-left text-sm font-medium text-gray-600">
                                            Travel Date
                                        </th>
                                        <th className="px-4 py-3 w-[120px] text-left text-sm font-medium text-gray-600">
                                            Booked Date
                                        </th>
                                        <th className="px-4 py-3 w-[120px] text-left text-sm font-medium text-gray-600">
                                            Action
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {bookings.length > 0 ? (
                                        <>
                                            {bookings.map((booking, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {booking.ref}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {booking.seatNo}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {booking.scheduleId}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {booking.madeOdPay}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {booking.customerDetails.mobile}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {booking.customerDetails.nicOrPassport}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {booking.route}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {booking.total}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {booking.service}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {booking.travelDate}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {booking.bookedDate}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        <Button
                                                            onClick={() => sendOtpRequest(booking.id)}>Cancel</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <tr>
                                                <td className="px-4 col py-3  text-md font-medium text-gray-400"
                                                    colSpan={12}>
                                                    No Data Found
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                    </tbody>
                                </table>

                                {/* Mobile View */}
                                <div className="md:hidden">
                                    {bookings.map((booking, index) => (
                                        <div key={index} className="p-4 border-b">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="text-sm font-medium text-gray-600">
                                                    Ref No.
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.ref}
                                                </div>

                                                <div className="text-sm font-medium text-gray-600">
                                                    Seat no
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.seatNo}
                                                </div>

                                                <div className="text-sm font-medium text-gray-600">
                                                    Schedule ID
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.scheduleId}
                                                </div>

                                                <div className="text-sm font-medium text-gray-600">
                                                    Mode of Pay
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.madeOdPay}
                                                </div>

                                                <div className="text-sm font-medium text-gray-600">
                                                    Contact No
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.customerDetails.mobile}
                                                </div>

                                                <div className="text-sm font-medium text-gray-600">
                                                    NIC No
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.customerDetails.nicOrPassport}
                                                </div>

                                                <div className="text-sm font-medium text-gray-600">
                                                    Route
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.route}
                                                </div>

                                                <div className="text-sm font-medium text-gray-600">
                                                    Bus Fare
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.total}
                                                </div>

                                                <div className="text-sm font-medium text-gray-600">
                                                    Service Charge
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.service}
                                                </div>

                                                <div className="text-sm font-medium text-gray-600">
                                                    Travel Date
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.travelDate}
                                                </div>

                                                <div className="text-sm font-medium text-gray-600">
                                                    Booked Date
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    {booking.bookedDate}
                                                </div>
                                                <div className="text-sm font-medium text-gray-600">
                                                    Action
                                                </div>
                                                <div className="text-sm text-gray-900">
                                                    <Button onClick={() => sendOtpRequest(booking.id)}>Cancel</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                                    <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
                                    <div
                                        className={`bg-green-200 border-2 border-green-500 p-3 text-center rounded-lg`}>
                                        <span>OTP Code sent to {mobile}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-3">
                                        <Label
                                            htmlFor="otp_code"
                                            className=" text-myColor2"
                                        >
                                            OTP
                                        </Label>
                                        <input
                                            name="otp_code"
                                            id="otp_code"
                                            type="number"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
             [&::-webkit-inner-spin-button]:m-0
             focus:outline-none p-2 border-2 rounded-[10px] outline-none placeholder:text-base"
                                            placeholder="Enter OTP here.."
                                            onChange={(e: any) => setOtp(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex gap-5 justify-end mt-2">
                                        <Button variant="cancel" className="py-5 mt-5"
                                                onClick={() => setModalOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={handleOtpLogin} className="py-5 mt-5 flex gap-3 items-center">
                                            Cancel Booking
                                            {isloading1 && (
                                                <div
                                                    className="w-5 h-5 border-4 border-t-4 border-gray-300 border-t-blue-500 animate-spin rounded-full"></div>
                                            )}
                                        </Button>
                                    </div>

                                </Modal>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CounterReport;
