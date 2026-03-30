// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16", // ba apnar active version
// });

// export async function GET() {
//   try {
//     // Stripe theke shob payment intents niye asa
//     const payments = await stripe.paymentIntents.list({
//       limit: 20,
//     });

//     // Data-ke UI er format e sajano
//     const formattedData = payments.data.map((txn) => ({
//       id: txn.id,
//       customerEmail: txn.receipt_email || "No Email",
//       customerName: txn.shipping?.name || "Customer",
//       courseTitle: txn.metadata?.course_name || "Course Purchase", // Metadata te course name thakle
//       amount: txn.amount,
//       status: txn.status,
//       date: new Date(txn.created * 1000).toLocaleDateString(),
//     }));

//     return NextResponse.json({ success: true, data: formattedData });
//   } catch (error: any) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const paymentCollection = await dbConnect(collections.PAYMENTS);
    
    // Shob payments ana hocche, latest gulo upore thakbe
    const payments = await paymentCollection.find({}).sort({ createdAt: -1 }).toArray();

    const formattedData = payments.map((txn: any) => ({
      id: txn.transactionId,
      customerEmail: txn.email || "No Email",
      customerName: txn.customerName || "Student", 
      courseTitle: txn.courseName || "Course Purchase", 
      // Stripe amount-ke decimal-e convert korlam (5000 -> 50.00)
      amount: (txn.amount / 100).toFixed(2), 
      currency: txn.currency.toUpperCase(),
      status: txn.status === "paid" || txn.status === "complete" ? "succeeded" : "pending",
      date: new Date(txn.createdAt).toLocaleDateString('en-GB'), // DD/MM/YYYY format
    }));

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}