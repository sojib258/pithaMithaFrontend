import { NextRequest, NextResponse } from "next/server";

interface SuccessParams {
  tran_id: string;
  totalPrice: number;
}
export async function POST(
  req: NextRequest,
  { params }: { params: SuccessParams }
) {
  console.log("first", params);
  console.log("ccccccccccccc", params.tran_id);

  return NextResponse.redirect(new URL(`/payment/order-success`, req.url), 303);
}
