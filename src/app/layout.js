import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Notification from "@/components/Notification";
import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "Events Portal",
  description: "Учебный проект на Next.js с App Router",
  keywords: ["Next.js", "Events", "MongoDB", "Authentication"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 h-screen flex flex-col">
        <Providers>
          <Notification />
          <Navigation />
          <main className="flex-1 overflow-y-auto">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
