import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const formData = await request.formData()

        // Extract the json string from form data
        const jsonString = formData.get('json')

        if (!jsonString) {
            return NextResponse.json(
                { error: 'Missing "json" field in form data' },
                { status: 400 }
            )
        }

        // Parse the JSON string
        let jsonData
        try {
            jsonData = JSON.parse(jsonString)
        } catch (parseError) {
            return NextResponse.json(
                { error: 'Failed to parse "json" field' },
                { status: 400 }
            )
        }

        // Return parsed JSON in response
        return NextResponse.json({
            received: jsonData
        })

    } catch (error) {
        console.error('Error processing form data:', error)
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        )
    }
}