import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Newsletter sign up",
  description: "Sign up for the newsletter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`} as="style">
      <body>{children}</body>
    </html>
  );
}
