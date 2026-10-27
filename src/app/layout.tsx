import type { Metadata } from "next";
import { Raleway, Space_Grotesk } from "next/font/google";

import { cn } from "@/lib/utils";
import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";

const ralewayHeading = Raleway({
  subsets: ["latin"],
  variable: "--font-heading",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Electro Parts",
  description: "Electro Parts",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        spaceGrotesk.variable,
        ralewayHeading.variable,
      )}
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
