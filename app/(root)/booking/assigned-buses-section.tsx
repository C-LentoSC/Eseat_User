"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RouteCard } from "@/components/route-card";
// import { get } from "http";
import axios from "axios";
import LoadingAnimation from "@/components/ui/Loading";

// const routes = [
//   {
//     id: "1",
//     image: "/assets/busimage.jpeg",
//     route: "Colombo to Jaffna",
//     datetime: "2024-12-16 | 10:00 PM",
//     code: "WS15-1800-P",
//     busNumber: "#99 via Matulalum",
//     depot: "Depot Wellawta",
//   },
// ];

interface Route {
  id: string;
  schedule_number: string;
  route: string;
  datetime: string;
  code: string;
  number: string;
  depot: string;
  main_image: string;
}

export function AssignedBusesSection() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [searchQuery, setSearchQuery] = useState("");

  const [routes, setroutes] = useState<Route[]>([]);
  const [loadmorecount, setloadmorecount] = useState(9);

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    setisLoading(true);

    const getdata = async () => {
      try {
        const res = await axios.get(`${BASE_URL}get-available-buses`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setroutes(res?.data);
        setisLoading(false);
      } catch (error) {
        console.error(error);
        setisLoading(false);
      }
    };
    getdata();
  }, []);

  console.log(routes);

  return (
    <section className="my-container my-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className=" flex flex-col gap-3">
          <h2 className="text-2xl font-semibold text-myColor2">
            Assigned Busses
          </h2>
          <div className=" flex gap-5">
            <div className="border-[3px] rounded-full border-myColor1 w-32"></div>
            <div className="border-[3px] rounded-full border-myColor1 w-12"></div>
          </div>
        </div>

        <div className="relative w-full sm:w-auto min-w-[240px]">
          <Input
            type="search"
            placeholder="Search Bus Schedule"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {isLoading ? (
        <>
          <LoadingAnimation />
        </>
      ) : (
        <>
          {routes.length > 0 ? (
            <>
              <span className="text-[#d91b5c] font-medium text-base flex gap-2 items-center">Drag and Drop 6 Busses <img src="/assets/download.svg" alt="download" className="w-4 h-4" /></span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                {routes
                  ?.slice(0, loadmorecount)
                  ?.filter((route) =>
                    searchQuery
                      ? route?.schedule_number
                          ?.toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      : true
                  ).length > 0 ? (
                  routes
                    ?.slice(0, loadmorecount)
                    ?.filter((route) =>
                      searchQuery
                        ? route?.schedule_number
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        : true
                    )
                    ?.map((route) => (
                      <RouteCard key={route?.id} route={route} />
                    ))
                ) : (
                  <div className="grid grid-cols-1">Data Not Found!..</div>
                )}
              </div>

              {routes?.length > loadmorecount && (
                <>
                  <div className="flex justify-center mt-8">
                    <Button onClick={() => setloadmorecount(loadmorecount + 9)}>
                      Load More
                    </Button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex justify-center mt-8">Data Not Found!..</div>
          )}
        </>
      )}
    </section>
  );
}
