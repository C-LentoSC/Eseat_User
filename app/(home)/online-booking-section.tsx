import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function OnlineBookingSection() {
  return (
    <Card className="border-none bg-bgMyColor6 py-16">
      <CardContent className=" my-container">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl text-myColor2">
                Why join Online Booking?
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground md:text-base">
                <li>Faster booking and checkout</li>
                <li>Manage and cancel your trips with ease</li>
                <li>Get access to your booking information</li>
                <li>Save up to 3 passengers to your account!</li>
              </ul>
            </div>
            <Button size="lg">Join With Us</Button>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-[400px]">
              {/* <div className="absolute inset-0 rounded-full bg-pink-100/80" /> */}
              <Image
                src="/assets/homeimage1.png"
                alt="Online Booking Illustration"
                className="relative z-10 h-full w-full"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
