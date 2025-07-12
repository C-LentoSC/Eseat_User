import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
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

export function RouteCard({ route, className, setModelOpen, setconductorMobile, setbusNumber }: any) {
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
      text: route?.depot?.nam ? route?.depot?.name : "N/A",
    },
  ];


  return (
    <>
      <Card className={cn("shadow-none border", className)}>
        <CardContent className="p-0">
          <div className="relative group">
            {/* <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
            <Image
              src={route?.main_image}
              alt={route.route}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </div> */}
            <div className="space-y-2.5 p-3">
              {routeInfo.map((info, index) => (
                <RouteInfoItem key={index} icon={info.icon} text={info.text} />
              ))}
            </div>
            <div className="w-full px-10 flex-col gap-3 pb-2 absolute top-0 h-full bg-black/25 rounded-lg flex justify-center items-center opacity-0 group-hover:opacity-100 duration-200">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => {
                // toast.error("Service Not Available. Bus Id : " + route?.id);

                if (!route?.dateTimeIso) {
                  toast?.error("No Available Shedules.");
                } else {
                  window.location.href = `/booking/listing/${route?.scheduleId}/${route?.route_details[0]?.starting}/${route?.route_details?.[0]?.end}/${new Date(route?.dateTimeIso)?.toLocaleDateString().replace(/\//g, '-')}/1`;
                }
              }}>
                Book Seats
              </Button>
              {route?.hasClosePermission && (
                <>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={async () => {
                    setconductorMobile(route.conductorNo);
                    setbusNumber(route.scheduleId);
                    setModelOpen(true);
                  }}>
                    {route?.isScheduleClosed ? (
                      <span className="gap-3 flex items-center">
                        Open Shedule
                      </span>
                    ) : (
                      <span className="gap-3 flex items-center">
                        Close Shedule
                      </span>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>

        </CardContent>
      </Card>

    </>
  );
}
