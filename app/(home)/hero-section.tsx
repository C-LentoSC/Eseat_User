"use client";

import {SetStateAction, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Eye, EyeOff} from "lucide-react";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {loginSchema, type LoginFormData} from "@/lib/validations/auth";
import {Label} from "@/components/ui/label";
import axios from "axios";
import Modal from "@/components/model";

export function HeroSection() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    const [isModalOpen, setModalOpen] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [isloading, setIsloading] = useState(false);
    const [isloading1, setIsloading1] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);

    const [otp, setOtp] = useState<number>(0);
    const [token, setToken] = useState("");

    const [otp1, setOtp1] = useState<string>("");
    const [isModalOpen1, setModalOpen1] = useState(false);
    const [uemail, setUemail] = useState<string>("");

    const [pw, setPw] = useState("");
    const [npw, setnPw] = useState("");

    const [isNext, setNext] = useState<boolean>(false);

    const [showPassword0, setShowPassword0] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const sliderText = [
        {
            title: "Best Bus Ticket Service",
            title1: "In Sri Lanka",
            description:
                "Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus",
        },
        {
            title: "Best Bus Ticket Service",
            title1: "In Sri Lanka -2",
            description:
                "Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus -2",
        },
        {
            title: "Best Bus Ticket Service",
            title1: "In Sri Lanka -3",
            description:
                "Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus -3",
        },
    ];

    const handlePrev = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? sliderText.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === sliderText.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleIndicatorClick = (index: SetStateAction<number>) => {
        setActiveIndex(index);
    };

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginFormData) {
        // Handle login submission here

        setIsloading(true);

        const formdata = new FormData();
        formdata.append("username", data.email);
        formdata.append("password", data.password);

        try {
            const res = await axios.post(`${BASE_URL}sign-in`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res?.data?.token) {
                setIsloading(false);
                setToken(res?.data?.token);
                setModalOpen(true);

                // localStorage.setItem("token", res?.data?.token);
                // window.location.href = "/booking";
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message);
            setIsloading(false);
        }
    }

    const handleOtpLogin = async () => {

        if (!otp) {
            setIsloading1(false);
            toast.error("Please Enter OTP.");
            return;
        }

        setIsloading1(true);
        setIsloading(true);

        try {

            const res = await axios.post(`${BASE_URL}otp-check`,
                {
                    otp: otp
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });

            if (res?.data?.verified) {
                setIsloading1(false);
                setModalOpen(false);
                localStorage.setItem("token", token);
                window.location.href = "/booking";

            } else {
                localStorage.removeItem("token");
            }

        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message);
            setIsloading1(false);
            localStorage.removeItem("token");
        }

    };

    const handleOtpLogin1 = async () => {
        if (!otp1) {
            toast.error("Please Enter OTP.");
            return;
        }

        if (!pw) {
            toast.error("Please Enter New Password.");
            return;
        }

        if (!npw) {
            toast.error("Please Re-Enter New Password.");
            return;
        }

        if (npw != pw) {
            toast.error("Password Does not Matches.");
            return;
        }

        try {

            const res = await axios.post(`${BASE_URL}password-reset`,
                {
                    email: uemail,
                    otp: otp1,
                    password: pw
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

            if (res?.data?.verified) {
                setModalOpen1(false);

                setUemail("");
                setOtp1("");
                setPw("");
                setnPw("");
                setNext(false);

                toast.success("Password Changed Successfull.");
            }

        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message);
        }

    };

    const sendpwotp = async () => {

        try {

            const res = await axios.post(`${BASE_URL}password-reset-request`,
                {
                    email: uemail
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

            if (res?.data?.ok) {
                setNext(true)
            }

        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message);
        }

    };

    return (
        <>
            <section className="relative min-h-[calc(100dvh-100px)] w-full overflow-hidden flex">
                <div id="indicators-carousel" className="relative w-full">
                    {/* Carousel wrapper */}
                    <section
                        className="relative min-h-[calc(100dvh-100px)] w-full overflow-hidden bg-hero-bg bg-cover bg-center py-24 flex">
                        <div className=" grid my-container gap-8 lg:grid-cols-2 lg:gap-16 self-center">
                            {sliderText.map((item, index) => (

                                <div
                                    className={`flex flex-col justify-center ${index === activeIndex ? "block" : "hidden"
                                    }`}
                                    key={index}
                                >
                                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-myColor2 sm:text-5xl">
                                        {item?.title}
                                        <br/>
                                        {item?.title1}
                                    </h1>
                                    <p className="mb-8 max-w-lg text-gray-600">
                                        {item?.description}
                                    </p>
                                </div>

                            ))}

                            <div className="flex items-center justify-center lg:justify-end">
                                <Card className="w-full max-w-md xl:max-w-lg shadow-lg border-0 p-">
                                    <CardHeader>
                                        <CardTitle className="text-xl text-center text-myColor2">
                                            Login to your account
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Form {...form}>
                                            <form
                                                onSubmit={form.handleSubmit(onSubmit)}
                                                className="space-y-4"
                                            >
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <Label htmlFor="email" className=" text-myColor2">
                                                                Username
                                                            </Label>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Enter Your Username"
                                                                    className="py-5"
                                                                    type="text"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <div className="flex justify-between items-center">
                                                                <Label
                                                                    htmlFor="password"
                                                                    className=" text-myColor2"
                                                                >
                                                                    Password
                                                                </Label>
                                                                <Button
                                                                    variant="link"
                                                                    type="button"
                                                                    className="p-0"
                                                                    onClick={() => {
                                                                        // toast.error("Service Not Available.");
                                                                        setModalOpen1(true);
                                                                    }}
                                                                >
                                                                    Forgot?
                                                                </Button>
                                                            </div>
                                                            <div className="relative">
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Enter your password"
                                                                        className="py-5"
                                                                        type={showPassword ? "text" : "password"}
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                >
                                                                    {showPassword ? (
                                                                        <EyeOff className="h-4 w-4 text-gray-400"/>
                                                                    ) : (
                                                                        <Eye className="h-4 w-4 text-gray-400"/>
                                                                    )}
                                                                    <span className="sr-only">
                                    {showPassword
                                        ? "Hide password"
                                        : "Show password"}
                                  </span>
                                                                </Button>
                                                            </div>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                                <div className="flex items-center justify-between">
                                                    {isloading ? (
                                                        <Button disabled className="w-full py-5 mt-5">
                                                            Logging
                                                            <div
                                                                className="w-5 h-5 border-4 border-t-4 border-gray-300 border-t-blue-500 animate-spin rounded-full"></div>
                                                        </Button>
                                                    ) : (
                                                        <Button type="submit" className="w-full py-5 mt-5">
                                                            Login now
                                                        </Button>
                                                    )}
                                                </div>
                                            </form>
                                        </Form>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Slider controls */}
                    <button
                        type="button"
                        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
                        onClick={handlePrev}
                    >
            <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg
                  className="w-8 h-8 p-2 text-white bg-[#dd3170] rounded-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
              >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
                    </button>
                    <button
                        type="button"
                        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
                        onClick={handleNext}
                    >
            <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
              <svg
                  className="w-8 h-8 p-2 text-white bg-[#dd3170] rounded-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
              >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
                    </button>
                </div>
                {/* Carousel Indicators */}
                <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                    {sliderText.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-[#d91b5c]" : "bg-[#edefed]"
                            }`}
                            onClick={() => handleIndicatorClick(index)}
                        ></button>
                    ))}
                </div>
            </section>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
                <div className="flex flex-col gap-2">
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
                    <Button variant="cancel" className="py-5 mt-5" onClick={() => setModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleOtpLogin} className="py-5 mt-5 flex gap-3 items-center">
                        Login
                        {isloading1 && (
                            <div
                                className="w-5 h-5 border-4 border-t-4 border-gray-300 border-t-blue-500 animate-spin rounded-full"></div>
                        )}
                    </Button>
                </div>

            </Modal>
            <Modal isOpen={isModalOpen1} onClose={() => setModalOpen1(false)}>
                <h2 className="text-xl font-semibold mb-4">Password Recovery</h2>
                <div className="flex flex-col gap-2">
                    <Label
                        htmlFor="email"
                        className=" text-myColor2"
                    >
                        Username
                    </Label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        disabled={isNext}
                        value={uemail ?? ""}
                        className="focus:outline-none p-2 border-2 rounded-[10px] outline-none placeholder:text-base"
                        placeholder="Enter Username here.."
                        onChange={(e: any) => setUemail(e.target.value)}
                    />
                    {isNext && (
                        <>
                            <Label
                                htmlFor="otp_code"
                                className=" text-myColor2"
                            >
                                Otp
                            </Label>
                            <input
                                name="otp_code"
                                id="otp_code"
                                type="number"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={otp1 ?? ""}
                                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
             [&::-webkit-inner-spin-button]:m-0
             focus:outline-none p-2 border-2 rounded-[10px] outline-none placeholder:text-base"
                                placeholder="Enter OTP here.."
                                onChange={(e: any) => setOtp1(e.target.value)}
                            />
                            <Label
                                htmlFor="pw"
                                className=" text-myColor2"
                            >
                                New Password
                            </Label>
                            <div className="relative">
                                <input
                                    name="pw"
                                    id="pw"
                                    value={pw ?? ""}
                                    type={showPassword0 ? "text" : "password"}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="w-full focus:outline-none p-2 border-2 rounded-[10px] outline-none placeholder:text-base"
                                    placeholder="Enter Password here.."
                                    onChange={(e: any) => setPw(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword0(!showPassword0)}
                                >
                                    {showPassword0 ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                    <span className="sr-only">
                    {showPassword0 ? "Hide password" : "Show password"}
                  </span>
                                </Button>
                            </div>
                            <Label
                                htmlFor="npw"
                                className=" text-myColor2"
                            >
                                Re-Type New Password
                            </Label>
                            <div className="relative">
                                <input
                                    name="npw"
                                    id="npw"
                                    type={showPassword1 ? "text" : "password"}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={npw ?? ""}
                                    className="w-full focus:outline-none p-2 border-2 rounded-[10px] outline-none placeholder:text-base"
                                    placeholder="Re-Enter Password here.."
                                    onChange={(e: any) => setnPw(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword1(!showPassword1)}
                                >
                                    {showPassword1 ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                    <span className="sr-only">
                    {showPassword1 ? "Hide password" : "Show password"}
                  </span>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex gap-5 justify-end mt-2">
                    <Button variant="cancel" className="py-5 mt-5" onClick={() => setModalOpen1(false)}>
                        Cancel
                    </Button>
                    {isNext ? (
                        <>
                            <Button onClick={() => {
                                setUemail("");
                                setOtp1("");
                                setPw("");
                                setnPw("");
                                setNext(false);
                            }} className="py-5 mt-5">
                                Back
                            </Button>
                            <Button onClick={handleOtpLogin1} className="py-5 mt-5">
                                Reset
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => {
                                if (!uemail) {
                                    toast.error("Please Enter Email");
                                } else {
                                    sendpwotp();
                                }
                            }} className="py-5 mt-5">
                                Next
                            </Button>
                        </>
                    )}

                </div>
            </Modal>
        </>
    );
}
