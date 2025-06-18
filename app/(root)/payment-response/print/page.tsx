// app/payment-response/print/page.tsx or pages/payment-response/print.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PrintTicketPage() {
    const router = useRouter();

    useEffect(() => {
        const { ticket } = router.query;

        if (ticket) {
            const decodedTicket = decodeURIComponent(ticket as string);
            const ticketData = JSON.parse(decodedTicket);

            // Now generate printable iframe or trigger print
            generateAndPrintTicket(ticketData);
        }
    }, [router.query]);

    const generateAndPrintTicket = (ticketData) => {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.border = 'none';
        iframe.style.zIndex = '999999';
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow?.document;
        const tailwindCDN = `<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"  rel="stylesheet">`;

        const ticketHTML = `
      <html>
        <head>
          <title>Print Ticket</title>
          ${tailwindCDN}
          <style>
            @page {
              size: A4;
              margin: 0mm;
            }
            body {
              font-family: 'Inter', sans-serif;
              padding: 20px;
            }
          </style>
        </head>
        <body class="bg-white rounded-2xl min-w-[40%] min-h-auto flex flex-col justify-center items-center p-5">
          <!-- Paste your full ticket layout from uploaded file -->
          <div class="w-full flex flex-col justify-center items-center">
            <div class="w-full px-10 flex justify-center items-center">
              <img src="/logos/sltb.svg" alt="sltb_logo"
                   class="w-[30%] object-cover object-center"/>
            </div>
            <div class="w-full px-10 flex justify-center items-center">
              <img
                  src="/logos/sltb_logo2.svg"
                  alt="sltb_logo"
                  class="w-[15%]"
              />
            </div>
            <div className="w-full px-10 flex justify-center mt-1">
              <span className="text-xl font-medium gap-2 flex items-center">
                Hot Line : <img src="/logos/call.svg" alt="call" className="w-5 h-5"/> 1315
              </span>
            </div>
            <div className="w-full px-10 mt-3 flex justify-center border-t-2 pt-2 border-gray-300">
              <span className="text-xl font-normal flex gap-2">eTicket</span>
            </div>
          </div>

          <div className="w-full mt-5 flex justify-center gap-5">
            <div className="w-full text-base">
              <span className="text-gray-500">Ticket Ref</span>
              <span className="ml-4">{ticketData.ref || 'N/A'}</span>
            </div>
            <div className="w-full text-base">
              <span className="text-gray-500">Seat No.</span>
              <span className="ml-4">
                ${(ticketData.seats || []).map(s => s.seat_no).join(",") || 'N/A'}
              </span>
            </div>
          </div>
          {/* Add more fields as needed from your layout */}
          <div className="w-full flex font-medium text-lg mt-3 justify-center items-center">
            Amount : Rs.${Number(ticketData.total || 0).toFixed(2)}
          </div>
        </body>
      </html>
    `;

        if (doc) {
            doc.open();
            doc.write(ticketHTML);
            doc.close();

            iframe.onload = () => {
                iframe.contentWindow?.focus();
                iframe.contentWindow?.print();

                setTimeout(() => {
                    document.body.removeChild(iframe);
                }, 1000);
            };
        }
    };

    return (
        <div className="p-6 text-center">
            <h1>Loading ticket for printing...</h1>
        </div>
    );
}