import Navbar from "@/Components/Navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "Mo Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css" integrity="sha512-ApSLB1Pd3/bZN8fWB/RG9YhN/7bd9Hkf3AGaE2mPfebjrxagjuBtx2GcgdqIlJkUzwylBo61r9Xa9NmgBI0swA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      </head>

      <body suppressHydrationWarning={true}>
        <Navbar />
        <main className="main">
          <section className="main-section">{children}</section>
        </main>
      </body>
    </html>
  );
}
