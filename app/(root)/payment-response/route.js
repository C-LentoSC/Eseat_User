export async function POST(req) {
    try {
        // Parse the incoming request body (assuming JSON)
        const data = await req.json();

        // Log the received payload to the console
        console.log('Received payment response:', data);

        // Send a success response back to the payment gateway
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error processing payment response:', error);
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}