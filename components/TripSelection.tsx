import { Clock, Users } from "lucide-react";

const TripSelection = () => {
  return (
    <div className="max-w-md border rounded-lg p-4 bg-white mb-4">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <img src="/logos/sltb.svg" alt="SLTB" className="h-8" />
          <span className="text-sm text-blue-600">Outbound - Wed, Dec 18</span>
        </div>
      </div>

      <div className="py-4">
        <div className="relative">
          <div className="flex items-start gap-4">
            <div className="min-w-[80px] text-right">
              <span className="font-semibold">15.00 PM</span>
            </div>
            <div className="flex-1">
              <div className="font-medium">Colombo</div>
              <div className="text-sm text-gray-600">Pettah Bus Stand</div>
            </div>
          </div>

          <div className="absolute left-[80px] top-0 bottom-0 ml-8 w-0.5 bg-gray-200 my-8" />

          <div className="absolute left-[80px] ml-6 mt-8">
            <div className="w-4 h-4 rounded-full border-2 border-gray-200 bg-white" />
          </div>

          <div className="flex items-start gap-4 mt-16">
            <div className="min-w-[80px] text-right">
              <span className="font-semibold">01.00 AM</span>
            </div>
            <div className="flex-1">
              <div className="font-medium">Jaffna</div>
              <div className="text-sm text-gray-600">Jaffna Bus Stand</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 bg-blue-50 p-3 rounded-lg mt-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span className="text-sm">10 Hours</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-600" />
          <span className="text-sm">42/35 Seats</span>
        </div>
        <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-600">
          Normal
        </span>
      </div>
    </div>
  );
};

export default TripSelection;
