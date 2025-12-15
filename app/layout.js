import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/next"
import AppLoader from "./Components/AppLoader";


export const metadata = {
  title: "Nothing Real",
  description: "We turn your NOTHING complexity vision into REAL revolutionary ideas feels inevitable",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body>
          <Navbar />
          <AppLoader/>
          {children}
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
