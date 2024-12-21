import Navbar from "@/components/shared/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="
  background-light850_dark100 
  relative"
    >
      {/* NAVBAR */}
      {/* <NavbarRaw /> */}
      <Navbar />

      {/* CONTENT */}
      <div>
        <section
          className="
            flex min-h-screen flex-1 flex-col 
            px-6 pb-6 max-md:pb-14 sm:px-14"
        >
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </section>
      </div>

      {/* TOAST */}
      <div className="fixed top-10 right-10 z-50">
          <Toaster />
        </div>
    </main>
  );
};

export default Layout;
