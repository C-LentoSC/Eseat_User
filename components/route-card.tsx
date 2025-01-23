import Image from "next/image";
import {
  MapPin,
  //  Clock,
  Code,
  Bus,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import { Route } from "@/types/route";
import { cn } from "@/lib/utils";

interface RouteInfoItemProps {
  icon: React.ReactNode;
  text: string;
}

const RouteInfoItem = ({ icon, text }: RouteInfoItemProps) => (
  <div className="flex items-center gap-2 text-sm">
    <div className="bg-bgMyColor7 h-8 w-8 flex items-center justify-center rounded-full overflow-hidden">
      {icon}
    </div>
    <span className="font-medium text-myColor2">{text}</span>
  </div>
);

export interface Route {
  id: string;
  schedule_number: string;
  route: string;
  datetime: string;
  code: string;
  number: string;
  depot: string;
  main_image: string;
}

interface RouteCardProps {
  route: Route;
  className?: string;
}

export function RouteCard({ route, className }: RouteCardProps) {
  const routeInfo = [
    {
      icon: (
        <img src="/assets/location.svg" alt="location" className="w-4 h-4" />
      ),
      text: route?.route,
    },
    // { icon: <Clock className="h-4 w-4 text-myColor1" />, text: route.datetime },
    {
      icon: (
        <img
          src="/assets/shedulenumber.svg"
          alt="location"
          className="w-4 h-4"
        />
      ),
      text: route?.schedule_number,
    },
    {
      icon: <img src="/assets/number.svg" alt="location" className="w-4 h-4" />,
      text: route?.number,
    },
    {
      icon: <img src="/assets/depot.svg" alt="location" className="w-4 h-4" />,
      text: route.depot,
    },
  ];

  // console.log(route);

  return (
    <Card className={cn("shadow-none border", className)}>
      <CardContent className="p-0">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
            <Image
              src={route?.main_image}
              alt={route.route}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div>
          <div className="space-y-2.5 p-3">
            {routeInfo.map((info, index) => (
              <RouteInfoItem key={index} icon={info.icon} text={info.text} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
