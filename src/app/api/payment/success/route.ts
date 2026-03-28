import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      enrollmentId,
      transactionId,
      amount,
      currency,
      paymentMethod,
      email,
    } = body;

    // collections connect
    const enrollmentCollection = await dbConnect(collections.ENROLLMENTS);
    const paymentCollection = await dbConnect(collections.PAYMENTS);

    const session = await stripe.checkout.sessions.retrieve(transactionId);

 const paymentData = {
      enrollmentId: new ObjectId(enrollmentId),
      transactionId,
      amount: session.amount_total,
      currency: session.currency,
      paymentMethod: "stripe",
      email: session.customer_email,
      status: session.payment_status,
      createdAt: new Date(),
    };

    await paymentCollection.insertOne(paymentData);

    // 2️⃣ Update enrollment status
    await enrollmentCollection.updateOne(
      { _id: new ObjectId(enrollmentId) },
      {
        $set: {
          paymentStatus: "paid",
          transactionId: transactionId,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Payment stored & enrollment updated",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
// export async function POST(req: Request) {
//   const { sessionId } = await req.json();

//   // Stripe session fetch
//   const res = await fetch(
//     `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
//       },
//     }
//   );

//   const session = await res.json();

//   const enrollmentId = session.metadata?.enrollmentId;

//   const enrollmentCollection = await dbConnect(collections.ENROLLMENTS)
//   const paymentCollection = await dbConnect(collections.PAYMENTS)

//   // 1️⃣ update enrollment
//   await enrollmentCollection.updateOne(
//     { _id: new ObjectId(enrollmentId) },
//     { $set: { paymentStatus: "paid" } }
//   );

//   // 2️⃣ insert into payments collection
//   await paymentCollection.insertOne({
//     enrollmentId: new ObjectId(enrollmentId),
//     courseName: session.metadata?.courseName,
//     amount: session.amount_total / 100,
//     currency: session.currency,
//     stripeSessionId: session.id,
//     paymentStatus: "paid",
//     createdAt: new Date(),
//   });

//   return Response.json({ success: true });
// }