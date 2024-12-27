import { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "GoGo",
  icons: {
    icon: "/assets/images/gogo.svg",
  },
  description:
    "This project is a travel website built with NextJS for the Web Technology Course at UIT-VNU. The website offers a visually appealing interface, enabling users to explore travel ideas and discover popular destinations worldwide. Additionally, it provides a seamless experience for booking flights and hotels, making it easier for users to plan their trips from start to finish. With intuitive navigation and an aesthetically pleasing design, the platform is designed to inspire and assist travelers in their journey planning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} flex flex-col`}
        >
          {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
          {children}
        </body>
      </html>
  );
}
