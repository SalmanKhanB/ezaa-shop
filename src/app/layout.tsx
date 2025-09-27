import Providers from "@/app/providers";
import AuthWrapper from "@/components/auth-wrapper";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import "react-photo-view/dist/react-photo-view.css";
import TopLoader from "@/components/top-loader";
import { Inter } from "next/font/google";
import StoreProvider from "@/lib/store/StoreProvider";
import { ThemeProvider } from "@/components/theme-provider";
import ReferralHandler from "@/components/referral-handler";
import ReferralNotification from "@/components/referral-notification";
import { Suspense } from "react";
import Loader from "@/components/loader";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ezaa Shop",
  description: "Ezaa Shop - Shop anything you need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Facebook Meta Pixel Code */}
        <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1372559050525308');
fbq('track', 'PageView');` }} />
        {/* End Facebook Meta Pixel Code */}
      </head>
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <TopLoader />
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense    fallback={<Loader />}>
            <ReferralHandler />

          </Suspense>

            <ReferralNotification />
            <Providers>
              <AuthWrapper>
                <Toaster />
                <div className="flex-1">{children}</div>
              </AuthWrapper>
            </Providers>
          </ThemeProvider>
        </StoreProvider>
        {/* Facebook Pixel NoScript */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }} 
            src="https://www.facebook.com/tr?id=1372559050525308&ev=PageView&noscript=1" 
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
