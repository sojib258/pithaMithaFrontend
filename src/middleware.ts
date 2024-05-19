import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
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
    "/sales-dashboard/product/product-details",
    "/sales-dashboard/product/add-product",
  ],
};
