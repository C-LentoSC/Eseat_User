"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Bus, Building2, Code } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "@/components/ui/Loading";

// interface BusRoute {
//   id: number;
//   image: string;
//   route: string;
//   code?: string;
//   datetime: string;
//   busNumber: string;
//   depot: string;
// }

// const busRoutes: BusRoute[] = [
//   {
//     id: 1,
//     image: "/assets/busimage.jpeg",
//     route: "Colombo to Jaffna",
//     code: "WS15-1800-PJ",
//     datetime: "2024-12-16 | 18:00 PM",
//     busNumber: "#89 via Mankulam",
//     depot: "Depot-Welikara",
//   },
//   {
//     id: 2,
//     image: "/assets/busimage.jpeg",
//     route: "Colombo to Jaffna",
//     code: "WS15-1800-PJ",

//     datetime: "2024-12-16 | 18:00 PM",
//     busNumber: "#89 via Mankulam",
//     depot: "Depot-Welikara",
//   },
//   {
//     id: 3,
//     image: "/assets/busimage.jpeg",
//     route: "Colombo to Jaffna",
//     code: "WS15-1800-PJ",
//     datetime: "2024-12-16 | 18:00 PM",
//     busNumber: "#89 via Mankulam",
//     depot: "Depot-Welikara",
//   },
// ];

export default function BusCarousel() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [busRoutes, setroutes] = useState<any[]>([]);

  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   window.location.href = "/";
    //   return;
    // }

    setisLoading(true);

    const getdata = async () => {
      try {
        const res = await axios.get(`${BASE_URL}get-available-buses`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(res);
        setroutes(res?.data);
        setisLoading(false);
      } catch (error) {
        console.error(error);
        setisLoading(false);
      }
    };
    getdata();
  }, []);

  return (
    <div className="w-full my-container my-28 !px-12">
      {/* <div className="flex items-center w-full justify-end mb-8">
        <Image
          src={"/assets/dots.png"}
          alt="Dots"
          width={150}
          height={100}
          className=" self-end"
        />
      </div> */}

      
      {/* <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full mx-auto"
      >
        <CarouselContent>
          {busRoutes.map((route) => (
            <CarouselItem key={route.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="shadow-none border">
                <CardContent className="p-0">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                      <Image
                        src={route.image}
                        alt={route.route}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2.5 p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className=" bg-bgMyColor7 h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                          <MapPin className="h-4 w-4 text-myColor1" />
                        </div>
                        <span className="font-medium text-myColor2">
                          {route.route}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className=" bg-bgMyColor7 h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                          <Clock className="h-4 w-4 text-myColor1" />
                        </div>
                        <span className="font-medium text-myColor2">
                          {route.datetime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className=" bg-bgMyColor7 h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                          <Code className="h-4 w-4 text-myColor1" />
                        </div>
                        <span className="text-myColor2">{route.code}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className=" bg-bgMyColor7 h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                          <Bus className="h-4 w-4 text-myColor1" />
                        </div>
                        <span className="text-myColor2">{route.busNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className=" bg-bgMyColor7 h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                          <Building2 className="h-4 w-4 text-myColor1" />
                        </div>
                        <span className="text-myColor2">{route.depot}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel> */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full mx-auto"
      >
        {isLoading ? (
          <>
            <LoadingAnimation />
          </>
        ) : (
          <>
            {busRoutes?.length > 0 ? (
              <>
                <CarouselContent>
                  {busRoutes.map((route) => (
                    <CarouselItem
                      key={route.id}
                      className="md:basis-1/2 lg:basis-1/3"
                    >
                      <Card className="shadow-none border">
                        <CardContent className="p-0">
                          <div className="space-y-4">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                              <Image
                                src={route.main_image}
                                alt={route.route}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-2.5 p-3">
                              <div className="flex items-center gap-2 text-sm">
                                <div className=" bg-bgMyColor7 h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                                  <img
                                    src="/assets/location.svg"
                                    alt="location"
                                    className="w-4 h-4"
                                  />
                                </div>
                                <span className="font-medium text-myColor2">
                                  {route.route}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <div className=" bg-bgMyColor7 h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                                  <img
                                    src="/assets/date.svg"
                                    alt="location"
                                    className="w-4 h-4"
                                  />
                                </div>
                                <span className="font-medium text-myColor2">
                                  {route.dateTime}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <div className=" bg-bgMyColor7 h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                                  <img
                                    src="/assets/shedulenumber.svg"
                                    alt="location"
                                    className="w-4 h-4"
                                  />
                                </div>
                                <span className="text-myColor2">
                                  {route.schedule_number}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <div className=" bg-bgMyColor7 h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                                  <img
                                    src="/assets/number.svg"
                                    alt="location"
                                    className="w-4 h-4"
                                  />
                                </div>
                                <span className="text-myColor2">
                                  {route.number}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <div className=" bg-bgMyColor7 h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
                                  <img
                                    src="/assets/depot.svg"
                                    alt="location"
                                    className="w-4 h-4"
                                  />
                                </div>
                                <span className="text-myColor2">
                                  {route.depot}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </>
            ) : (
              <>
                <div className="w-full text-center">No Data Found!...</div>
              </>
            )}
          </>
        )}
      </Carousel>
    </div>
  );
}
