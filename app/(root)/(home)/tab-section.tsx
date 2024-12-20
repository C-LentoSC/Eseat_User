import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import HomeTabContent from "@/components/home-tab-content";

const TebSection = () => {
  return (
    <div className=" w-full my-container my-24">
      <Tabs defaultValue="most-popular-bus-routes" className=" w-full border-2">
        <ScrollArea className="w-full">
          <TabsList className="flex flex-wrap lg:flex-nowrap gap-3 pb-3 md:pb-0">
            <TabsTrigger
              value="most-popular-bus-routes"
              className="min-w-fit border border-myColor3 text-myColor3 rounded-full px-8 py-2 data-[state=active]:bg-myColor4 data-[state=active]:text-myColor3 text-nowrap shrink-0"
            >
              Most popular bus routes
            </TabsTrigger>
            <TabsTrigger
              value="bus-time-table"
              className="min-w-fit border border-myColor3 text-myColor3 rounded-full px-8 py-2 data-[state=active]:bg-myColor4 data-[state=active]:text-myColor3 text-nowrap shrink-0"
            >
              Bus Time table
            </TabsTrigger>
            <TabsTrigger
              value="top-travelled-bus-destinations"
              className="min-w-fit border border-myColor3 text-myColor3 rounded-full px-8 py-2 data-[state=active]:bg-myColor4 data-[state=active]:text-myColor3 text-nowrap shrink-0"
            >
              Top travelled bus destinations
            </TabsTrigger>
            <TabsTrigger
              value="price-information"
              className="min-w-fit border border-myColor3 text-myColor3 rounded-full px-8 py-2 data-[state=active]:bg-myColor4 data-[state=active]:text-myColor3 text-nowrap shrink-0"
            >
              Price information
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className="hidden md:block" />
        </ScrollArea>
        <TabsContent value="most-popular-bus-routes">
          <HomeTabContent
            title="Most Popular Bus"
            span="Routes"
            p="Plan your travel with ease by exploring Sri Lanka's top bus
              routes, including Colombo to Kandy and Galle to Jaffna. Find all
              the details you need, such as travel times, ticket prices, and bus
              types, all in one place. Select your route and book your trip
              effortlessly!"
          />
        </TabsContent>
        <TabsContent value="bus-time-table">
          <HomeTabContent
            title="Bus Time table"
            span="Information"
            p="Find all the information you need about bus schedules, including departure and arrival times, bus types, and ticket prices. Plan your journey in advance by checking the bus timetable for your route and make your booking with ease."
          />
        </TabsContent>
        <TabsContent value="top-travelled-bus-destinations">
          <HomeTabContent
            title="Top Travelled Bus"
            span="Destinations"
            p="Discover the most popular bus destinations in Sri Lanka, including Colombo, Kandy, Galle, and Jaffna. Explore the top attractions in each city and plan your trip with ease. Book your bus tickets to your favorite destination today!"
          />
        </TabsContent>
        <TabsContent value="price-information">
          <HomeTabContent
            title="Top Travelled Bus"
            span="Destinations"
            p="Discover the most popular bus destinations in Sri Lanka, including Colombo, Kandy, Galle, and Jaffna. Explore the top attractions in each city and plan your trip with ease. Book your bus tickets to your favorite destination today!"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TebSection;
