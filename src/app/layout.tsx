import Providers from "@/app/Provider";
import DefaultTemplate from "@/components/template/defaultTemplate/DefaultTemplate";
import "@/styles/overrideMuiStyle.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Online PithaMitha Buy and Sell",
  description: "Online PithaMitha shopping store",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <DefaultTemplate>
          <Providers>{children}</Providers>
        </DefaultTemplate>
      </body>
    </html>
  );
}
