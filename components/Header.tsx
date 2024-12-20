// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
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
              src="/logos/1315.svg"
              alt="SLTB eSeat"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
        </div>

        <nav className="flex items-center gap-4 md:gap-6">
          <div className="hidden gap-4 md:flex ">
            <Button
              variant="link"
              size="sm"
              className="text-myColor2 font-medium"
            >
              Sinhala
            </Button>
            <Button
              variant="link"
              size="sm"
              className="text-myColor2 font-medium"
            >
              Help
            </Button>
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
            <Button variant="ghost" size="icon">
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
    </header>
  );
}
