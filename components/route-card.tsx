import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
// import { Route } from "@/types/route";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

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

// export interface Route {
//   id: string;
//   scheduleId: number;
//   schedule_number: string;
//   route: string;
//   dateTime: string;
//   dateTimeIso: string;
//   code: string;
//   number: string;
//   depot: string;
//   main_image: string;
//   route_details: any[];
// }

// interface RouteCardProps {
//   route: Route;
//   className?: string;
// }

export function RouteCard({ route, className }: any) {
  const routeInfo = [
    {
      icon: (
        <img src="/assets/location.svg" alt="location" className="w-4 h-4" />
      ),
      text: route?.route ? route?.route : "N/A",
    },
    {
      icon: <img src="/assets/date.svg" alt="location" className="w-4 h-4" />,
      text: route.dateTime ? route.dateTime : "N/A",
    },
    {
      icon: (
        <img
          src="/assets/shedulenumber.svg"
          alt="location"
          className="w-4 h-4"
        />
      ),
      text: route?.schedule_number ? route?.schedule_number : "N/A",
    },
    {
      icon: <img src="/assets/number.svg" alt="location" className="w-4 h-4" />,
      text: route?.number ? route?.number : "N/A",
    },
    {
      icon: <img src="/assets/depot.svg" alt="location" className="w-4 h-4" />,
      text: route.depot ? route.depot : "N/A",
    },
  ];

  // console.log(route);

  return (
    <Card className={cn("shadow-none border", className)} onClick={() => {
      // toast.error("Service Not Available. Bus Id : " + route?.id);

      if (!route?.dateTimeIso) {
        toast?.error("No Available Shedules.");
      } else {
        window.location.href = `/booking/listing/${route?.scheduleId}/${route?.route_details[0]?.starting}/${route?.route_details?.[0]?.end}/${new Date(route?.dateTimeIso)?.toLocaleDateString()}/1`;
      }

    }}>
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
