import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const usersCollection = await dbConnect(collections.USERS);
    const coursesCollection = await dbConnect(collections.COURSES);
    const paymentsCollection = await dbConnect(collections.PAYMENTS); 

    const [usersCount, coursesCount, adminsCount, payments] = await Promise.all([
      usersCollection.countDocuments({}),
      coursesCollection.countDocuments({}),
      usersCollection.countDocuments({ role: "admin" }),
      paymentsCollection.find({ status: "paid" }).toArray()
    ]);
    const monthlyRevenue: { [key: string]: number } = {};
    payments.forEach(payment => {
      const date = new Date(payment.createdAt);
      const month = date.toLocaleString('default', { month: 'short' });
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (payment.amount / 100);
    });

    const chartData = Object.keys(monthlyRevenue).map(month => ({
      name: month,
      revenue: monthlyRevenue[month]
    }));

    return NextResponse.json({
      success: true,
      usersCount,
      coursesCount,
      adminsCount,
      chartData // Chart data pathano hocche
    });
  } catch (error: any) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}