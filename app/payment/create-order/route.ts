import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // body se internshipId nikalna zaroori hai redirect ke liye
    const { amount, customerId, customerName, customerEmail, internshipId } = body;

    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProduction 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders';

    // --- BYPASS TOKEN GENERATION ---
    // Middleware Layer 1 isi format ka wait kar raha hai
    const timestamp = Math.floor(Date.now() / 1000);
    const randomString = Math.random().toString(36).substring(7);
    const secureToken = `${timestamp}_${randomString}`;

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: customerId || `cust_${Date.now()}`,
          customer_name: customerName || "Student",
          customer_email: customerEmail,
          customer_phone: "9999999999" 
        },
        order_meta: {
          // Return URL ko update kiya taaki directly test page par jaye with token
          return_url: `${req.headers.get('origin')}/test/${internshipId || '1'}?token=${secureToken}`
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Order Creation Failed' }, { status: response.status });
    }

    return NextResponse.json({ payment_session_id: data.payment_session_id });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
