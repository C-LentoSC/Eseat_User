import {NextResponse} from 'next/server'
import {storeTicketData} from '@/lib/ticketStore';

export async function POST(request) {
    try {
        const formData = await request.formData()
        // Extract the json string from form data
        const jsonString = formData.get('json')

        if (!jsonString) {
            return NextResponse.json(
                {error: 'Missing "json" field in form data'},
                {status: 400}
            )
        }

        // Parse the JSON string
        let jsonData
        try {
            jsonData = JSON.parse(jsonString)
        } catch (parseError) {
            return NextResponse.json(
                {error: 'Failed to parse "json" field'},
                {status: 400}
            )
        }

        const ticketId = storeTicketData(jsonData);
        console.log("heee",ticketId);
        // Return redirect response
        return NextResponse.redirect(`/payment-response/print?id=${ticketId}`, 303);
        // return NextResponse.json(jsonData)

    } catch (error) {
        console.error('Error processing form data:', error)
        return NextResponse.json(
            {error: 'Invalid request'},
            {status: 400}
        )
    }
}