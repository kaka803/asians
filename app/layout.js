import { Geist, Geist_Mono, Jersey_25 } from "next/font/google";
import { ProjectsProvider } from "./context/GlobalContext";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const Jersey25 = Jersey_25({
  variable: "--font-jersey-25",
  subsets: ["latin"],
  weight: "400",
});


export const metadata = {
  title: "Asians Technologies",
  description: "Asians Technologies is a professional software house providing modern web development, mobile apps, and digital solutions tailored for businesses worldwide. We build scalable, innovative, and high-performance software to help companies grow in the digital era.",
  icons: {
    icon: "/logo.svg", // 👈 make sure favicon.ico is in your /public folder
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${Jersey25.variable} antialiased`}
      >
         <ProjectsProvider><SmoothScroll/>{children}<Toaster 
          position="top-right"
          toastOptions={{
            style: {
             marginTop: '70px'
            },
          }}
        /></ProjectsProvider>
      </body>
    </html>
  );
}
