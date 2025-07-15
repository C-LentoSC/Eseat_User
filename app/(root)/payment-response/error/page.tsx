import React from 'react';
import RetryButton from './Component/RetryButton';

async function decrypt(ciphertextBase64: string, ivArray: number[], keyBuffer: ArrayBuffer) {
    const iv = new Uint8Array(ivArray);
    const ciphertext = Uint8Array.from(atob(ciphertextBase64), c => c.charCodeAt(0));

    const key = await crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
    );

    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        ciphertext
    );

    const decryptedString = new TextDecoder().decode(decrypted);
    return JSON.parse(decryptedString);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export default async function Page({ searchParams }: { searchParams: Record<string, string> }) {
    try {
        const ticketData = JSON.parse(searchParams.data || '{}');

        // const id = decodeURIComponent(searchParams.id);
        // const data = decodeURIComponent(searchParams.data);
        // const ivArray = JSON.parse(decodeURIComponent(decodeURIComponent(searchParams.iv)));
        //
        // const keyBuffer = base64ToArrayBuffer(id);
        // const ticketData = await decrypt(data, ivArray, keyBuffer);

        return (
            <div className="w-full bg-[#F0FBFE] flex justify-center items-center p-10 flex-col py-32 gap-5">
                <div className="w-36 h-36 rounded-full bg-primary flex justify-center items-center">
                    <span className="text-[100px] text-white">!</span>
                </div>
                <span className="text-[30px] font-medium">Payment Unsuccessful.</span>
                <RetryButton link={ticketData?.paymentUrl}/>
            </div>
        );
    } catch (error) {
        console.error('Decryption error:', error);
        return (
            <div className="p-10">
                <h1 className="text-red-500 text-2xl">Error decrypting data</h1>
                {/* <pre>{JSON.stringify(error, null, 2)}</pre> */}
            </div>
        );
    }
}