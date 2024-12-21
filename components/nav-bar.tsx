"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  Bus,
  FileBarChart,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navItems: NavItem[] = [
  {
    title: "Booking",
    href: "/booking",
    icon: BookOpen,
  },
  {
    title: "Counter Report",
    href: "/counter-report",
    icon: ClipboardList,
  },
  {
    title: "Bus Report",
    href: "/bus-report",
    icon: Bus,
  },
  {
    title: "CB Report",
    href: "/cb-report",
    icon: FileBarChart,
  },
  {
    title: "Cancel Tickets",
    href: "/cancel-tickets",
    icon: XCircle,
  },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#F8FAFB] w-full">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-center gap-4 px-4 py-3 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center min-w-[80px] gap-2 group"
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full transition-colors",
                    isActive
                      ? "bg-[#FF4A6C]"
                      : "bg-white border-2 border-gray-200 group-hover:border-[#FF4A6C]"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-[#FF4A6C]"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium whitespace-nowrap",
                    isActive
                      ? "text-[#FF4A6C]"
                      : "text-gray-500 group-hover:text-[#FF4A6C]"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
