import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-webhook-signature');
  const timestamp = req.headers.get('x-webhook-timestamp');

  // Verify Signature
  const computePayload = timestamp + rawBody;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.CASHFREE_WEBHOOK_SECRET!)
    .update(computePayload)
    .digest('base64');

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: 'Invalid Signature' }, { status: 401 });
  }

  const { data: eventData } = JSON.parse(rawBody);
  const orderId = eventData.order.order_id;
  const paymentStatus = eventData.payment.payment_status;

  if (paymentStatus === 'SUCCESS') {
    await supabase
      .from('orders')
      .update({ status: 'PAID', updated_at: new Date() })
      .eq('cf_order_id', orderId);
  }

  return NextResponse.json({ received: true });
}
