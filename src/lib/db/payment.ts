import { collections, dbConnect } from "../dbConnect";

export const getPayments = async () => {
    const paymentCollection = await dbConnect(collections.PAYMENTS)
  const result = await paymentCollection.find().sort({ createdAt: -1 }).toArray();
const safePayments = result.map((p: any) => ({
  ...p,
  _id: p._id?.toString(),
  enrollmentId: p.enrollmentId?.toString?.() || String(p.enrollmentId),
  transactionId: p.transactionId,
}));
  return {
    success: true,
    data: safePayments,
  };
};