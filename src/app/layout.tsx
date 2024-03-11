import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: "Auth System",
  description: "This will be a basis session based auth system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <section className="flex flex-col min-h-screen">
          <Header />
          {children}
        </section>
      </body>
    </html>
  );
}
