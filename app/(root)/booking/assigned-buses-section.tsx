"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RouteCard } from "@/components/route-card";

// Sample data - in a real app this would come from an API
const routes = [
  {
    id: "1",
    image: "/assets/busimage.jpeg",
    route: "Colombo to Jaffna",
    datetime: "2024-12-16 | 10:00 PM",
    code: "WS15-1800-P",
    busNumber: "#99 via Matulalum",
    depot: "Depot Wellawta",
  },
  // Duplicate the same route 5 more times for the grid
  {
    id: "2",
    image: "/assets/busimage.jpeg",
    route: "Colombo to Jaffna",
    datetime: "2024-12-16 | 10:00 PM",
    code: "WS15-1800-P",
    busNumber: "#99 via Matulalum",
    depot: "Depot Wellawta",
  },
  {
    id: "3",
    image: "/assets/busimage.jpeg",
    route: "Colombo to Jaffna",
    datetime: "2024-12-16 | 10:00 PM",
    code: "WS15-1800-P",
    busNumber: "#99 via Matulalum",
    depot: "Depot Wellawta",
  },
  {
    id: "4",
    image: "/assets/busimage.jpeg",
    route: "Colombo to Jaffna",
    datetime: "2024-12-16 | 10:00 PM",
    code: "WS15-1800-P",
    busNumber: "#99 via Matulalum",
    depot: "Depot Wellawta",
  },
  {
    id: "5",
    image: "/assets/busimage.jpeg",
    route: "Colombo to Jaffna",
    datetime: "2024-12-16 | 10:00 PM",
    code: "WS15-1800-P",
    busNumber: "#99 via Matulalum",
    depot: "Depot Wellawta",
  },
  {
    id: "6",
    image: "/assets/busimage.jpeg",
    route: "Colombo to Jaffna",
    datetime: "2024-12-16 | 10:00 PM",
    code: "WS15-1800-P",
    busNumber: "#99 via Matulalum",
    depot: "Depot Wellawta",
  },
];

export function AssignedBusesSection() {
  const [searchQuery, setSearchQuery] = useState("");

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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routes.map((route) => (
          <RouteCard key={route.id} route={route} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button>Load More</Button>
      </div>
    </section>
  );
}
