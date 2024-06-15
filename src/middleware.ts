import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest, res: NextResponse) {
  const token = request.cookies.get("myAppAuthToken")?.value || "";
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/order-history",
    "/settings",
    "/shopping-cart",
    "/shopping-cart/checkout",
    "/wishlist",
    "/order-success",
    "/order-cancel",
    "/order-failed",
    "/sales-dashboard",
    "/sales-dashboard/product",
    "/sales-dashboard/product/product-details/:dynamicValue*", //here dynamice value
    "/sales-dashboard/product/product-details",
    "/sales-dashboard/product/add-product",
    "/sales-dashboard/orders",
    "/sales-dashboard/orders/completed-orders",
    "/sales-dashboard/orders/pending-orders",
    "/sales-dashboard/revenue",
  ],
};
