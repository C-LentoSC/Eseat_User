"use client";

import { useEffect, useState } from "react";
import { Route, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RouteCard } from "@/components/route-card";
import axios from "axios";
import LoadingAnimation from "@/components/ui/Loading";

interface Route {
  id: string;
  schedule_number: string;
  route: string;
  dateTime: string;
  code: string;
  number: string;
  depot: string;
  main_image: string;
}

export function AssignedBusesSection() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [loadMoreCount, setLoadMoreCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    setIsLoading(true);
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

        if (storedOrder.length < fetchedRoutes.length) {
          // Add any new route IDs that aren't in storedOrder yet
          const fetchedIds = fetchedRoutes.map((route: Route) => route.id);
          const newIds = fetchedIds.filter((id: string) => !storedOrder.includes(id));
          const updatedOrder = [...storedOrder, ...newIds];

          // Save updated order to localStorage
          localStorage.setItem("busOrder", JSON.stringify(updatedOrder));
        }

        if (storedOrder.length > 0) {
          const orderedRoutes = storedOrder
            .map((id: string) =>
              fetchedRoutes.find((route: Route) => route.id === id)
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
    getData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      // Reset to stored order if search query is empty
      const storedOrder = JSON.parse(localStorage.getItem("busOrder") || "[]");
      if (storedOrder.length > 0) {
        const orderedRoutes = storedOrder
          .map((id: string) => routes.find((route: Route) => route.id === id))
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
    setRoutes(updatedRoutes); // ✅ Keep `routes` updated for localStorage persistence

    localStorage.setItem(
      "busOrder",
      JSON.stringify(updatedRoutes.map((route) => route.id))
    );
  };

  return (
    <section className="my-container my-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-myColor2">
            Assigned Buses
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
              <span className="text-[#d91b5c] font-medium text-base flex gap-2 items-center">
                Drag and Drop 6 Busses
                <img
                  src="/assets/download.svg"
                  alt="download"
                  className="w-4 h-4"
                />
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                {filteredRoutes.slice(0, loadMoreCount).map((route, index) => (
                  <div
                    key={route.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <RouteCard key={index} route={route} className="cursor-pointer" />
                  </div>
                ))}
              </div>

              {filteredRoutes.length > loadMoreCount && (
                <div className="flex justify-center mt-8">
                  <Button onClick={() => setLoadMoreCount(loadMoreCount + 9)}>
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
    </section>
  );
}
