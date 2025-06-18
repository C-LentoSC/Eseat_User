import { NextResponse } from 'next/server'

export async function POST(request) {
    try {

        // process the payment response...
        return NextResponse.json({ name: 'ede' }, { status: 200 })
    } catch (error) {
        console.error('Error processing payment response:', error)
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}