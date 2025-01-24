"use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import axios from "axios";
import { ChevronDown } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [name, setName] = useState<string>("");
  const [namest, setNamest] = useState<boolean>(false);
  const [st, setst] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setNamest(localStorage.getItem("token") ? true : false);

    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}info`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setName(res?.data?.name || "");
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <header className="w-full bg-[#f0fbfe]">
      <div className="my-container flex items-center justify-between px-4 min-h-[100px]">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logos/sltb.svg"
              alt="SLTB eSeat"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <Image
              src="/logos/sltb_logo2.svg"
              alt="SLTB eSeat"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <Image
              src="/logos/1315.svg"
              alt="SLTB eSeat"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>

        <nav className="flex items-center gap-4 md:gap-6">
          <div className="hidden gap-4 md:flex">
            <Button
              variant="link"
              size="sm"
              className="text-myColor2 font-medium text-[14px]"
            >
              Sinhala
            </Button>
            <Button
              variant="link"
              size="sm"
              className="text-myColor2 font-medium text-[14px]"
            >
              Help
            </Button>
            {namest ? (
              <>
                <Button
                  variant="link"
                  size="sm"
                  className="text-myColor2 font-medium text-[14px]"
                >
                  <img
                    src="/assets/auser.jpg"
                    alt=""
                    className="w-7 h-7 rounded-full"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[14px] bg-transparent border-none shadow-none hover:bg-transparent hover:text-gray-500 px-0"
                      >
                        {name ? name : "__"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="bg-white rounded-lg w-[150px] p-1">
                      <div className="space-y-2">
                        <div
                          className="text-sm cursor-pointer hover:bg-[#dd3170] p-1 rounded-lg hover:text-white"
                          onClick={() => {
                            localStorage.removeItem("token");
                          }}
                        >
                          Log out
                        </div>

                        {/* <div className="text-sm">Kadawatha</div>
                <div className="text-sm">Kurunegala</div> */}
                      </div>
                    </PopoverContent>
                  </Popover>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="link"
                  size="sm"
                  className="text-myColor2 font-medium text-[14px]"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                size="sm"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>KS</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">Supun Sampth</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* Mobile Menu Items */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setst(!st);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </nav>
      </div>
      {st && (
        <>
          <div className="w-full p-5 bg-white">
            <div className="gap-4 flex justify-between">
              <Button
                variant="link"
                size="sm"
                className="text-myColor2 font-medium text-[14px]"
              >
                Sinhala
              </Button>
              <Button
                variant="link"
                size="sm"
                className="text-myColor2 font-medium text-[14px]"
              >
                Help
              </Button>
              {namest ? (
                <>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-myColor2 font-medium text-[14px]"
                  >
                    <img
                      src="/assets/auser.jpg"
                      alt=""
                      className="w-7 h-7 rounded-full"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[14px] bg-transparent border-none shadow-none hover:bg-transparent hover:text-gray-500 px-0"
                        >
                          {name ? name : "__"}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="bg-white rounded-lg w-[150px] p-1">
                        <div className="space-y-2">
                          <div
                            className="text-sm cursor-pointer hover:bg-[#dd3170] p-1 rounded-lg hover:text-white"
                            onClick={() => {
                              localStorage.removeItem("token");
                            }}
                          >
                            Log out
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-myColor2 font-medium text-[14px]"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
