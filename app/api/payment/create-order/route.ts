// app/api/payment/create-order/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Ensure this env var is set
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, customerId, customerName, customerEmail, internshipId } = body;

    // 1. Validate required data
    if (!customerId || !internshipId) {
      return NextResponse.json({ error: 'Missing User ID or Internship ID' }, { status: 400 });
    }

    const isProduction = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProduction 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders';

    // 2. Create Order in Cashfree
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
          customer_id: customerId, // Use the actual Supabase User UUID
          customer_name: customerName || "Student",
          customer_email: customerEmail,
          customer_phone: "9999999999" 
        },
        order_meta: {
          return_url: `${req.headers.get('origin')}/test/${internshipId}`
        }
      })
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data.message || 'Cashfree Order Failed' }, { status: response.status });

    // 3. CRITICAL: Initialize record in Supabase
    // Make sure column names match exactly: cf_order_id, user_id, test_id, amount, status
    const { error: dbError } = await supabase.from('orders').insert({
      cf_order_id: data.order_id,
      user_id: customerId, // Must be the UUID from auth.users
      test_id: String(internshipId),
      amount: parseFloat(amount),
      status: 'PENDING'
    });

    if (dbError) {
      console.error('Supabase Insert Error:', dbError);
      return NextResponse.json({ error: `Database Error: ${dbError.message}` }, { status: 500 });
    }

    return NextResponse.json({ payment_session_id: data.payment_session_id });
  } catch (error) {
    console.error('Order Route Crash:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
