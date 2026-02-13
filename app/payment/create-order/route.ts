import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, customerId, customerName, customerEmail } = body;

    // 1. Determine Environment and Base URL
    // Ensure NEXT_PUBLIC_CASHFREE_ENV is set to 'PRODUCTION' in Vercel for live payments
    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProduction 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders';

    // 2. Validate essential environment variables
    if (!process.env.NEXT_PUBLIC_CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
      console.error("Missing Cashfree Credentials in Environment Variables");
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.NEXT_PUBLIC_CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          // Cashfree requires a valid customer_id
          customer_id: customerId || `cust_${Date.now()}`, 
          customer_name: customerName || "Student",
          customer_email: customerEmail,
          customer_phone: "9999999999" // Replace with actual user phone if collected
        },
        order_meta: {
          // Dynamically setting return_url ensures it works on local and production
          return_url: `${req.headers.get('origin')}/apply/success?order_id={order_id}`
        }
      })
    });

    const data = await response.json();

    // 3. Handle Cashfree-specific errors
    if (!response.ok) {
      console.error("Cashfree API Error Response:", data);
      return NextResponse.json({ 
        error: data.message || 'Cashfree Order Creation Failed',
        code: data.code 
      }, { status: response.status });
    }

    return NextResponse.json({ payment_session_id: data.payment_session_id });
  } catch (error) {
    console.error("Internal Server Error during order creation:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
