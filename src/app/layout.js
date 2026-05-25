import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
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
      <body className="layout">
        <Providers>
          <Notification />
          <Navigation />
          <main className="content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
