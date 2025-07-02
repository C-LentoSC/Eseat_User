import {NextResponse} from "next/server";

export async function POST(request) {
    // try {

    // } catch (error) {
    //     console.error('Error processing form data:', error);
    //     return NextResponse.json(
    //         { error: 'Internal server error' },
    //         { status: 500 }
    //     );
    // }
    const formData = await request.formData();
    const jsonString = formData.get("json");

    if (!jsonString) {
        return NextResponse.json(
            {error: 'Missing "json" field in form data'},
            {status: 400}
        );
    }

    let jsonData;
    try {
        jsonData = JSON.parse(jsonString);
    } catch (parseError) {
        return NextResponse.json(
            {error: 'Failed to parse "json" field'},
            {status: 400}
        );
    }

    // Generate key once for encryption
    const key = await generateKey();
    const keyB64 = await exportKey(key);

    // Encrypt the data
    const { ciphertext, iv } = await encrypt(jsonData, key);

    // Redirect to appropriate page with encrypted data and IV
    if (jsonData?.bookingStatus?.name === "Paid") {
        const url = new URL("/payment-response/print", request.url);
        url.searchParams.set("id", encodeURIComponent(keyB64));
        url.searchParams.set("data", encodeURIComponent(ciphertext));
        url.searchParams.set("iv", encodeURIComponent(JSON.stringify(iv)));
        return NextResponse.redirect(url, 303);
    } else {
        const url = new URL("/payment-response/error", request.url);
        url.searchParams.set("id", encodeURIComponent(keyB64));
        url.searchParams.set("data", encodeURIComponent(ciphertext));
        url.searchParams.set("iv", encodeURIComponent(JSON.stringify(iv)));
        return NextResponse.redirect(url, 303);
    }
}

function encodeText(text) {
    return new TextEncoder().encode(text);
}

async function generateKey() {
    return crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt"]
    );
}

async function exportKey(key) {
    const exported = await crypto.subtle.exportKey("raw", key);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
}

async function encrypt(data, key) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = encodeText(JSON.stringify(data));

    const ciphertextBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encoded
    );

    const ciphertext = btoa(String.fromCharCode(...new Uint8Array(ciphertextBuffer)));

    return {
        ciphertext,
        iv: Array.from(iv),
    };
}