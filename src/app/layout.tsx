import type { Metadata } from "next";
import { Raleway, Space_Grotesk } from "next/font/google";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppProviders } from "@/providers/AppProviders";
import "@stereopt/data-table/styles.css";
import "./globals.css";
import { cn } from "@/lib/utils";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
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
        <AppProviders>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        </AppProviders>
      </body>
    </html>
  );
}
