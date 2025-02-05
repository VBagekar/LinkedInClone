import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import UserInformation from "@/components/UserInformation"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col bg-[#f3f2ef]"> {/* Light Gray Background */}
          {/* Header */}
          <header className="border-b sticky top-0 bg-white z-50 shadow-sm">
            <Header />
          </header>

          {/* Main Content Wrapper */}
          <div className="flex justify-center gap-4 p-4"> 
        {/* Sidebar (auto height) */}
        <aside className="w-64  p-4 rounded-lg self-start"> 
          <UserInformation />
        </aside>

            {/* Main Content */}
            <main className="flex-1 max-w-2xl p-6 rounded-lg "> 
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
