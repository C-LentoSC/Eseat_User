import { NextResponse } from "next/server";

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

  // Safely encode query parameters
  const searchParams = new URLSearchParams();
  searchParams.set("data", JSON.stringify(jsonData));

  const url = `/payment-response/print?${searchParams.toString()}`;

  return NextResponse.redirect(url, 303);
}
