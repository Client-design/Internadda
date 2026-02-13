import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Hamesha check karein ki SERVICE_ROLE_KEY use ho raha hai, ANON key nahi
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, testId, userId, customerEmail, customerName } = body;

    // Debugging ke liye: console.log("Received ID:", userId);

    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProduction 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders';

    const cfResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_amount: parseFloat(amount),
        order_currency: "INR",
        customer_details: {
          customer_id: userId,
          customer_name: customerName || "Student",
          customer_email: customerEmail,
          customer_phone: "9999999999"
        },
        order_meta: {
          return_url: `${req.headers.get('origin')}/test/${testId}`
        }
      })
    });

    const data = await cfResponse.json();
    if (!cfResponse.ok) return NextResponse.json({ error: 'Cashfree Error' }, { status: 400 });

    // DATABASE INSERT SECTION
    const { error: dbError } = await supabase.from('orders').insert({
      cf_order_id: data.order_id,
      user_id: userId, // Ye UUID hona chahiye
      test_id: String(testId),
      amount: parseFloat(amount),
      payment_session_id: data.payment_session_id,
      status: 'PENDING'
    });

    if (dbError) {
      console.error('Supabase Error:', dbError); // Isse terminal mein exact error dikhega
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ payment_session_id: data.payment_session_id });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
