"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingAnimation from "@/components/ui/Loading";

const SendTicket: React.FC = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [refNo, setrefNo] = React.useState<string>("");
  const [mobile, setMobile] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [loading , setLoading]=useState<boolean>(false)

  const [value, setValue] = React.useState<string>("mTicket");
  const [valuest, setValueSt] = React.useState<boolean>(true);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!termsAccepted) {
      setLoading(false);
      toast.error("Please agree to terms and conditions.");
      return;
    } else {
      try {
        const res = await axios.post(
          `${BASE_URL}send-ticket`,
          {
            ref: refNo,
            type: value,
            mobile: mobile,
            email: email,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res?.data?.status == "ok") {
          setLoading(false);
          toast.success("Ticket sent successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  useEffect(() => {
    if (value == "mTicket") {
      setValueSt(true);
    } else {
      setValueSt(false);
    }
  }, [value]);

  return (
    <div className="w-full snd_bg bg-contain lg:bg-cover bg-no-repeat flex flex-col justify-between">

      {loading && (
          <div className={`top-0 bottom-0 left-0 right-0 flex justify-center items-center fixed w-full z-50 bg-black/60`}>
            <LoadingAnimation/>
          </div>
      )}

      {/* Main Container */}
      <div className=" flex flex-col justify-center items-center w-full h-screen z-10 text-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 lg:w-1/2 md:w-[90%]  sm:w-[90%]   border border-gray-200"
        >
          <h2 className="text-xl font-medium font-sans text-left text-[#434a50] mb-4">
            Send ticket
          </h2>
          <hr className="mb-6 border" />

          {/* Reference Number Input */}
          <div className="mb-6 text-start">
            <label
              htmlFor="referenceNumber"
              className="block text-sm font-medium font-sans text-[#434a50] mb-2"
            >
              Ticket Reference Number
            </label>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm  border-r-2 border-[#a4b1bd] p-1 h-5 mt-3">
                №
              </span>
              <input
                type="text"
                id="referenceNumber"
                placeholder="Enter ref. no."
                value={refNo}
                onChange={(e) => setrefNo(e.target.value)}
                className="block w-full px-10 py-3 text-sm font-medium font-sans border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-[#a4b1bd] bg-[#eff1f3]"
              />
            </div>
            <p className="text-sm font-medium font-sans text-[#a4b1bd] mt-1">
              Eseat requires your mobile number to notify you of any schedule
              changes.
            </p>
          </div>

          {valuest ? (
            <>
              {/* Mobile Number Input */}
              <div className="mb-6 text-start">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium font-sans text-[#434a50] mb-2"
                >
                  Mobile Number
                </label>
                <div className="relative mt-2">
                  {/*<span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500 text-sm  border-r-2 border-[#a4b1bd] p-1 h-5 mt-3">*/}
                  {/*  +94*/}
                  {/*</span>*/}
                  <input
                    type="text"
                    id="mobile"
                    placeholder="Enter Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="block w-full px-10 py-3 text-sm font-medium font-sans border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-[#a4b1bd] bg-[#eff1f3]"
                  />
                </div>
                <p className="text-sm font-medium font-sans text-[#a4b1bd] mt-1">
                  Eseat requires your mobile number to send ticket.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Email Address Input */}
              <div className="mb-6 text-start">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium font-sans text-[#434a50] mb-2"
                >
                  Email Address
                </label>
                <div className="relative mt-2">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-5 py-3 text-sm font-medium font-sans border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-[#a4b1bd] bg-[#eff1f3]"
                  />
                </div>
                <p className="text-sm font-medium font-sans text-[#a4b1bd] mt-1">
                  Eseat requires your Email Address to send ticket.
                </p>
              </div>
            </>
          )}

          {/* Ticket Type Selection */}
          <div className="mb-6">
            <RadioGroup
              value={value}
              onValueChange={setValue}
              className="flex items-center gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="mTicket"
                  id="mTicket"
                  className="border-gray-400 focus:ring-blue-500"
                />
                <label
                  htmlFor="mTicket"
                  className="text-sm font-mediumfont-sans text-[#434a50]"
                >
                  mTicket
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="eTicket"
                  id="eTicket"
                  className="border-gray-400 focus:ring-blue-500"
                />
                <label
                  htmlFor="eTicket"
                  className="text-sm font-medium font-sans text-[#434a50]"
                >
                  eTicket
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="form-checkbox border-[#a4b1bd] text-myColor8 focus:ring-myColor8 p-2"
              />
              <span className="text-sm text-[#a4b1bd]">
                I Agree to all Terms & Conditions.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className=" bg-[#d91b5c] text-white text-sm py-2 px-4 rounded-lg hover:bg-pink-600 transition mt-2"
          >
            Send ticket
          </button>
        </form>
        {/* Footer Note */}
        <p className="text-sm text-center mt-4">
          For any further assistance please call - Hotline: 1315
        </p>
      </div>
    </div>
  );
};

export default SendTicket;
