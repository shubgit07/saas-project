import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import { Analytics } from '@vercel/analytics/next';

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#fe5933'
            }
          }}
        >
          <ConditionalNavbar />
          {children}
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  );
}
