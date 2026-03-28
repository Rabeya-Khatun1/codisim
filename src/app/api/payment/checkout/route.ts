import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { enrollmentId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Course Payment",
          },
          unit_amount: 5000,
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payment/payment-success?enrollmentId=${enrollmentId}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payment/payment-error`,
  });

  return NextResponse.json({ url: session.url });
}
