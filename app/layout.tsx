import { ReactNode } from "react";
import NavBar from "../components/NavBar";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="da">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
