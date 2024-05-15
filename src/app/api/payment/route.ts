// pages/api/payment/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqRes = await req.json();

    const tran_id = Math.floor(100000 + Math.random() * 900000).toString();
    const init_url = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

    const { address, totalPrice, products } = reqRes.data;
    console.log("ReqResssssssssssssssssssss", reqRes);
    const fullName = address.fullName;
    console.log("FUllNameeeeeeeeeeeeeeee", fullName);
    const formData = new FormData();
    formData.append(
      "store_id",
      `${process.env.NEXT_PUBLIC_SSL_COMMERZ_STORE_ID}`
    );
    formData.append(
      "store_passwd",
      `${process.env.NEXT_PUBLIC_SSL_COMMERZ_SECRET_KEY}`
    );
    formData.append("total_amount", `${totalPrice}`);
    formData.append("currency", "BDT");
    formData.append("tran_id", tran_id);
    formData.append(
      "success_url",
      `http://localhost:3000/api/payment/success/${tran_id}`
    );
    formData.append("fail_url", "http://localhost:3000/api/payment/fail");
    formData.append("cancel_url", "http://localhost:3000/api/payment/cancel");
    formData.append(
      "ipn_url",
      `http://localhost:3000/api/payment/ipn?id=${tran_id}`
    );
    formData.append("cus_name", `${address.fullName}`);
    formData.append("cus_email", "xyz@gmail.com");
    formData.append("cus_add1", `${address.address}`);
    formData.append("cus_add2", "");
    formData.append("cus_city", `${address.city}`);
    formData.append("cus_state", `${address.division}`);
    formData.append("cus_postcode", "1207");
    formData.append("cus_country", "Bangladesh");
    formData.append("cus_phone", `${address.number}`);
    formData.append("cus_fax", `${address.number}`);
    formData.append("shipping_method", "YES");
    formData.append("ship_name", `${address.fullName}`);
    formData.append("ship_add1", `${address.address}`);
    formData.append("ship_add2", "");
    formData.append("ship_city", `${address.city}`);
    formData.append("ship_state", `${address.division}`);
    formData.append("ship_country", "Bangladesh");
    formData.append("ship_postcode", "1207");
    formData.append("product_name", "product_name");
    formData.append("product_category", "category");
    formData.append("product_profile", "profile");
    formData.append("product_amount", "3");

    const requestOptions = { method: "POST", body: formData };
    const SSLRes = await fetch(init_url, requestOptions);
    const SSLResJSON = await SSLRes.json();

    return NextResponse.json({ data: SSLResJSON });
  } catch (error) {
    console.log("Error handling payment:", error);
    return NextResponse.json({ error: "Internal server errordfdfa" });
  }
}
