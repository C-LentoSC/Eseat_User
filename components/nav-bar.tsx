"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardList,
  Bus,
  FileBarChart,
  XCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/util/store";

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
    title: "History",
    href: "/history",
    icon: FileBarChart,
  },
  // {
  //   title: "CB Report",
  //   href: "/cb-report",
  //   icon: FileBarChart,
  // },
  {
    title: "Send Tickets",
    href: "/send-ticket",
    icon: LogOut,
  },
  {
    title: "Cancel Tickets",
    href: "/cancel-tickets",
    icon: XCircle,
  },
];

export function NavBar() {
  const pathname = usePathname();

  const { getMode } = useAppStore();

  return (
    <nav className="bg-[#F0FBFE] w-full border-b">
      <div className="my-container">
        <div className="flex flex-wrap items-center justify-end gap-10 py-3 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname.includes(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("flex items-center min-w-[80px] gap-2 group",
                  getMode() === "Private" ? item.title === "Counter Report" ? "hidden" : "" : "flex",
                  getMode() === "Private" ? item.title === "Bus Report" ? "hidden" : "" : "flex",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                    isActive
                      ? "bg-primary"
                      : "bg-white border-2 border-gray-200 group-hover:border-primary"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-3 w-3",
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-primary"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-[13px] font-medium whitespace-nowrap",
                    isActive
                      ? "text-primary"
                      : "text-[#434A50] group-hover:text-primary"
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
