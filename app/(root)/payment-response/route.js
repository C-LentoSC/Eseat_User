import { NextResponse } from 'next/server'

export async function POST(request) {
    try {
        const formData = await request.formData()

        const data = {}
        for (const [key, value] of formData.entries()) {
            data[key] = value
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error processing form data:', error)
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        )
    }
}