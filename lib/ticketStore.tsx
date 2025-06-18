"use client";

import React, {createContext, useState, useContext, ReactNode} from "react";

// Define Ticket Type based on your layout
export type Seat = {
    seat_no: number | string;
    service_charge01?: number;
    service_charge02?: number;
};

export type TicketData = {
    ref?: string;
    seats?: Seat[];
    startDateTime?: string;
    endDateTime?: string;
    bookedDateTime?: string;
    route?: string;
    agentName?: string;
    depot?: string;
    bus_model?: string;
    scheduleId?: string;
    routeId?: string;
    details?: {
        nicOrPassport?: string;
        name?: string;
    };
    busFare?: number;
    total?: number;
    vCode?: string;
};

interface TicketContextType {
    ticketData: TicketData | null;
    setTicketData: (data: TicketData) => void;
    clearTicketData: () => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider = ({children}: { children: ReactNode }) => {
    const [ticketData, setTicketData] = useState<TicketData | null>(null);

    const clearTicketData = () => setTicketData(null);

    return (
        <TicketContext.Provider value={{ticketData, setTicketData, clearTicketData}}>
            {children}
        </TicketContext.Provider>
    );
};

export const useTicketContext = () => {
    const context = useContext(TicketContext);
    if (!context) throw new Error("useTicketContext must be used within TicketProvider");
    return context;
};