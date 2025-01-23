"use client";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CancelTickets = () => {
  const [value, setValue] = React.useState("mTicket");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("Please agree to terms and Conditions.");
      return;
    }
  };

  return (
    <div className="h-full w-full bg-hero-bg bg-contain flex flex-col py-10">
      {/* Main Container */}
      <div className="flex justify-center items-center w-full z-10 text-center my-container">
        <div className="flex flex-row w-full items-start justify-center gap-5">
          <div className="flex flex-col w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-lg p-8 w-[100%]  border border-gray-200"
            >
              <h2 className="text-xl font-medium font-sans text-left text-[#434a50] mb-4">
                Cancel ticket
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
                    className="block w-full px-10 py-3 text-sm font-medium font-sans border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-[#a4b1bd] bg-[#eff1f3]"
                  />
                </div>
                <p className="text-sm font-medium font-sans text-[#a4b1bd] mt-1">
                  Eseat requires your mobile number to notify you of any
                  schedule changes.
                </p>
              </div>

              <div className="flex w-full flex-col items-start mb-6">
                <label className="block text-sm font-medium font-sans text-[#434a50] mb-2">
                  Bank Details
                </label>
                <div className="w-full p-1 flex bg-[#eef1f3] rounded-xl px-2 items-center">
                  <img src="/assets/bank.svg" alt="bank" className="w-6 h-6" />
                  <div className="w-full border-s text-[15px] px-2 flex flex-col border-gray-400 ml-2 space-y-2 py-3 text-[#A4B1BD]">
                    <div className="w-full flex">
                      Bank Name :{" "}
                      <input
                        type="text"
                        className="bg-transparent outline-none"
                        placeholder=""
                      />
                    </div>
                    <div className="w-full flex">
                      Account Number :{" "}
                      <input
                        type="text"
                        className="bg-transparent outline-none"
                        placeholder=""
                      />
                    </div>
                    <div className="w-full flex">
                      Account Name :{" "}
                      <input
                        type="text"
                        className="bg-transparent outline-none"
                        placeholder=""
                      />
                    </div>
                    <div className="w-full flex">
                      Branch :{" "}
                      <input
                        type="text"
                        className="bg-transparent outline-none"
                        placeholder=""
                      />
                    </div>
                    <div className="w-full flex">
                      Phone Number :{" "}
                      <input
                        type="text"
                        className="bg-transparent outline-none"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium font-sans text-[#a4b1bd] mt-1">
                  Eseat requires you to fill these to cancel ticket.
                </p>
              </div>
              <div className="flex w-full flex-col items-start mb-6">
                <label className="block text-sm font-medium font-sans text-[#434a50] mb-2">
                  Candidate Note
                </label>
                <div className="w-full p-1 flex bg-[#eef1f3] rounded-xl px-2 items-center">
                  <img src="/assets/note.svg" alt="bank" className="w-6 h-6" />
                  <div className="w-full border-s px-2 flex flex-col border-gray-400 ml-2 space-y-2 py-3 text-[#A4B1BD]">
                    <textarea className="h-36 bg-transparent outline-none"></textarea>
                  </div>
                </div>
                <p className="text-sm font-medium font-sans text-[#a4b1bd] mt-1">
                  Eseat requires you to fill these to cancel ticket.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className=" bg-[#d91b5c] w-full text-white text-sm py-2 px-4 rounded-lg hover:bg-pink-600 transition mt-2"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 w-[55%]  border border-gray-200">
            <h2 className="text-xl font-medium font-sans text-left text-[#434a50] mb-4">
              Cancellation Policy
            </h2>

            {/* Reference Number Input */}
            <div className="mb-6 text-start mt-5">
              <ul className="space-y-4 text-base">
                <li className="flex flex-row gap-2">
                  1.
                  <div>
                    Tickets need to cancelled 24 hours prior to the starting of
                    the journey.
                  </div>
                </li>
                <li className="flex flex-row gap-2">
                  2.
                  <div>
                    Only the bus fare will be refunded and the convenience fee
                    of Rs 80.50 will be forfeited along with any bank charges
                    charged at the time of the booking.
                  </div>
                </li>
                <li className="flex flex-row gap-2">
                  3.
                  <div>
                    When you cancel your entire booking all the seats booked
                    under that booking will be cancelled.
                  </div>
                </li>
                <li className="flex flex-row gap-2">
                  4.
                  <div>
                    The bus fare will be deposited to your stated bank account
                    within 14 working days.
                  </div>
                </li>
                <li className="flex flex-row gap-2">
                  5.
                  <div>
                    Tickets purchased via SLTB ticket counters cannot be
                    cancelled.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelTickets;
