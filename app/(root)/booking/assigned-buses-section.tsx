"use client";

import { useEffect, useState } from "react";
import { Route, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RouteCard } from "@/components/route-card";
import axios from "axios";
import LoadingAnimation from "@/components/ui/Loading";
import Modal from "@/components/model";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

interface Region {
  id: number;
  name: string;
  rm_name: string;
  mobile: string;
  email: string;
  description: string;
  is_active: boolean;
}

interface Depot {
  id: number;
  region_id: number;
  name: string;
  ds_name: string;
  mobile: string;
  mobile2: string;
  email: string;
  description: string;
  is_active: boolean;
  region: Region;
}

interface RouteDetail {
  id: number;
  starting: string;
  end: string;
  fare: number;
}

interface Route {
  agentCounter: boolean;
  autoClose: boolean;
  auto_active_date: null | string;
  conductorNo: string;
  dateTime: string;
  dateTimeIso: string;
  depot: Depot;
  hasClosePermission: boolean;
  id: number;
  isScheduleClosed: boolean;
  is_active: boolean;
  main_image: string;
  manualClose: boolean;
  number: string;
  onlineActive: boolean;
  otherImages: any[];
  route: string;
  route_details: RouteDetail[];
  scheduleId: number;
  schedule_number: string;
  type: string;
}

export function AssignedBusesSection() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [loadMoreCount, setLoadMoreCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const [conductorMobile, setconductorMobile] = useState("");
  const [busNumber, setbusNumber] = useState("");

  const [enteredBusNumber, setenteredBusNumber] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    setIsLoading(true);

    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}get-available-buses`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const fetchedRoutes = res?.data || [];
      const storedOrder = JSON.parse(
        localStorage.getItem("busOrder") || "[]"
      );

      // if (storedOrder.length < fetchedRoutes.length) {
      //   // Add any new route IDs that aren't in storedOrder yet
      //   const fetchedIds = fetchedRoutes.map((route: Route) => route.id);
      //   const newIds = fetchedIds.filter((id: string) => !storedOrder.includes(id));
      //   const updatedOrder = [...storedOrder, ...newIds];

      //   // Save updated order to localStorage
      //   localStorage.setItem("busOrder", JSON.stringify(updatedOrder));
      // }

      const fetchedIds = fetchedRoutes.map((route: Route) => route.id);

      // 1. Add missing IDs (in fetched but not in stored)
      const idsToAdd = fetchedIds.filter((id: any) => !storedOrder.includes(id));
      const updatedOrderAfterAdd = [...storedOrder, ...idsToAdd];

      // 2. Remove obsolete IDs (in stored but not in fetched)
      const updatedOrder = updatedOrderAfterAdd.filter(id => fetchedIds.includes(id));

      // 3. Only save to localStorage if there was a change
      if (
        updatedOrder.length !== storedOrder.length ||
        updatedOrder.some((id, index) => id !== storedOrder[index])
      ) {
        localStorage.setItem("busOrder", JSON.stringify(updatedOrder));
      }


      if (storedOrder.length > 0) {
        const orderedRoutes = storedOrder
          .map((id: string) =>
            fetchedRoutes.find((route: any) => route.id === id)
          )
          .filter(Boolean);
        setRoutes(orderedRoutes);
        setFilteredRoutes(orderedRoutes);
      } else {
        setRoutes(fetchedRoutes);
        setFilteredRoutes(fetchedRoutes);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      // Reset to stored order if search query is empty
      const storedOrder = JSON.parse(localStorage.getItem("busOrder") || "[]");
      if (storedOrder.length > 0) {
        const orderedRoutes = storedOrder
          .map((id: string) => routes.find((route: any) => route.id === id))
          .filter(Boolean);
        setFilteredRoutes(orderedRoutes);
      } else {
        setFilteredRoutes(routes);
      }
    } else {
      const filtered = routes.filter((route) =>
        route.schedule_number.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRoutes(filtered);
    }
  }, [searchQuery, routes]);

  //  useEffect(() => {
  //   if (searchQuery.trim() === "") {
  //     const storedOrderRaw = localStorage.getItem("busOrder");
  //     const storedOrder: string[] = storedOrderRaw ? JSON.parse(storedOrderRaw) : [];

  //     const currentRouteIds = new Set(routes.map((route) => route.id));

  //     let updatedStoredOrder: string[] = [];

  //     if (storedOrder.length > 0) {
  //       // Remove stale IDs not in current routes
  //       updatedStoredOrder = storedOrder.filter((id) => currentRouteIds.has(id));
  //     }

  //     // Add any new route IDs not already in localStorage
  //     const newIdsToAdd = routes
  //       .filter((route) => !updatedStoredOrder.includes(route.id))
  //       .map((route) => route.id);

  //     updatedStoredOrder = [...updatedStoredOrder, ...newIdsToAdd];

  //     // Save updated order back to localStorage
  //     localStorage.setItem("busOrder", JSON.stringify(updatedStoredOrder));

  //     // Reorder routes based on updated stored order
  //     const orderedRoutes = updatedStoredOrder
  //       .map((id) => routes.find((route) => route.id === id))
  //       .filter((route): route is Route => route !== undefined); // Type guard

  //     setFilteredRoutes(orderedRoutes);
  //   } else {
  //     const filtered = routes.filter((route) =>
  //       route.schedule_number.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setFilteredRoutes(filtered);
  //   }
  // }, [searchQuery, routes]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    targetIndex: number
  ) => {
    const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (sourceIndex === targetIndex) return;

    const updatedRoutes = [...filteredRoutes];
    const [movedItem] = updatedRoutes.splice(sourceIndex, 1);
    updatedRoutes.splice(targetIndex, 0, movedItem);

    setFilteredRoutes(updatedRoutes);
    setRoutes(updatedRoutes);

    localStorage.setItem(
      "busOrder",
      JSON.stringify(updatedRoutes.map((route) => route.id))
    );
  };

  const closeBooking = async () => {
    try {
      setIsLoading1(true);

      if (busNumber == enteredBusNumber) {
        const data = await axios.post(`${BASE_URL}toggle-schedule`, {
          id: busNumber,
          conductorMobile: conductorMobile
        }
          , {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

        if (data?.data?.status == "ok") {
          getData();
          setModalOpen(false);
          setIsLoading1(false);
        } else {
          setIsLoading1(false);
          toast.error("Somthign went wrong.");
        }
      } else {
        setIsLoading1(false);
        toast.error("Bus Number doesn't Match.")
      }

    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <section className="my-container my-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-myColor2">
            Assigned Buses - {filteredRoutes?.[0]?.dateTime.split("|")?.[0]}
          </h2>
          <div className="flex gap-5">
            <div className="border-[3px] rounded-full border-myColor1 w-32"></div>
            <div className="border-[3px] rounded-full border-myColor1 w-12"></div>
          </div>
        </div>

        <div className="relative w-full sm:w-auto min-w-[240px]">
          <Input
            type="search"
            placeholder="Search Bus Schedule No."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          {filteredRoutes.length > 0 ? (
            <>
              {/* <span className="text-[#d91b5c] font-medium text-base flex gap-2 items-center">
                Drag and Drop 6 Busses
                <img
                  src="/assets/download.svg"
                  alt="download"
                  className="w-4 h-4"
                />
              </span> */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-2">
                {filteredRoutes.slice(0, loadMoreCount).map((route, index) => (
                  <div
                    key={route.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <RouteCard key={index} route={route} setModelOpen={setModalOpen} className={`cursor-move`} setconductorMobile={setconductorMobile} setbusNumber={setbusNumber} setEnterdNumber={setenteredBusNumber} />
                  </div>
                ))}
              </div>

              {filteredRoutes.length > loadMoreCount && (
                <div className="flex justify-center mt-8">
                  <Button onClick={() => setLoadMoreCount(loadMoreCount + 10)}>
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-start text-lg text-gray-400 font-medium mt-8">Data Not Found!..</div>
          )}
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Close Booking</h2>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="otp_code"
            className=" text-myColor2"
          >
            Conductor Mobile
          </Label>
          <input
            name="cmobile"
            id="cmobile"
            type="number"
            defaultValue={conductorMobile}
            // disabled
            inputMode="numeric"
            pattern="[0-9]*"
            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
             [&::-webkit-inner-spin-button]:m-0
             focus:outline-none p-2 border-2 rounded-[10px] outline-none placeholder:text-base"
            placeholder="Enter Conductor Mobile here.."
          />
          <Label
            htmlFor="otp_code"
            className=" text-myColor2 mt-2"
          >
            Bus Number
          </Label>
          <input
            name="busNumber"
            id="busNumber"
            type="text"
            value={enteredBusNumber}
            className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
             [&::-webkit-inner-spin-button]:m-0
             focus:outline-none p-2 border-2 rounded-[10px] outline-none placeholder:text-base"
            placeholder="Enter Bus Number here.."
            onChange={(e) => {
              setenteredBusNumber(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-5 justify-end mt-2">
          <Button variant="cancel" disabled={isLoading1} className="py-5 mt-5" onClick={() => {
            setModalOpen(false);
            setconductorMobile("");
            setbusNumber("");
          }}>
            Cancel
          </Button>
          <Button className="py-5 mt-5 flex gap-3 items-center" disabled={isLoading1} onClick={closeBooking}>
            {isLoading1 ? (
              <>
                Closing..
                <div
                  className="w-5 h-5 border-4 border-t-4 border-gray-300 border-t-blue-500 animate-spin rounded-full"></div>
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </div>

      </Modal>
    </section>
  );
}
