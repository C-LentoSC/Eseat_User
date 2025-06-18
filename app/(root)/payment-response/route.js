const ticketStore = {};

export async function POST(request) {
    try {
        const formData = await request.formData();
        const jsonString = formData.get('json');

        if (!jsonString) {
            return NextResponse.json(
                { error: 'Missing "json" field in form data' },
                { status: 400 }
            );
        }

        let jsonData;
        try {
            jsonData = JSON.parse(jsonString);
        } catch (parseError) {
            return NextResponse.json(
                { error: 'Failed to parse "json" field' },
                { status: 400 }
            );
        }

        const id = Math.random().toString(36).substring(2, 15); // Simple ID
        ticketStore[id] = jsonData;

        return NextResponse.redirect(`/payment-response/print?id=${id}`, 303);

    } catch (error) {
        console.error('Error processing form data:', error);
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}