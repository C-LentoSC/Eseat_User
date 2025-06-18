type TicketData = {
    ref?: string;
    seats?: Array<{ seat_no: number | string }>;
    startDateTime?: string;
    route?: string;
    agentName?: string;
    depot?: string;
    details?: {
        nicOrPassport?: string;
        name?: string;
    };
    scheduleId?: string;
    busFare?: number;
    total?: number;
    vCode?: string;
};

const ticketStore: Record<string, { data: TicketData; expiresAt: number }> = {};

export function storeTicketData(data: TicketData): string {
    const id = Math.random().toString(36).substring(2, 10); // short ID
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    ticketStore[id] = { data, expiresAt };

    // Optional cleanup job
    setTimeout(() => {
        delete ticketStore[id];
    }, 10 * 60 * 1000);

    return id;
}

export function getTicketData(id: string): TicketData | null {
    const entry = ticketStore[id];

    if (!entry || entry.expiresAt < Date.now()) {
        return null;
    }

    return entry.data;
}