import "@/app/globals.css";
import React from "react";

interface FooterComponentProps {
  className: String;
};
const FooterComponent: React.FC<FooterComponentProps> = (props) => {
  return (
    <footer className={`${props.className}`}>
      <div className="flex flex-col items-start w-auto gap-8 md:flex-row md:gap-88">
        <div className="">khoa dep trai</div>
        <div className="grid flex-grow grid-cols-1 gap-6 md:grid-cols-5">
          <div className="flex flex-col min-w-24 gap-4">
            <div className="mb-4 font-semibold">Our Destinations</div>
            <div>Canada</div>
            <div>Alaska</div>
            <div>France</div>
            <div>Iceland</div>
          </div>
          <div className="flex flex-col min-w-24 gap-4">
            <div className="mb-4 font-semibold">Our Activities</div>
            <div>Northern Lights</div>
            <div>Cruising & Sailing</div>
            <div>Multi-activities</div>
            <div>Kayaking</div>
          </div>
          <div className="flex flex-col min-w-24 gap-4">
            <div className="mb-4 font-semibold">Travel Blogs</div>
            <div>Bali Travel Guide</div>
            <div>Sri Lanka Travel Guide</div>
            <div>Peru Travel Guide</div>
            <div>Singapore Travel Guide</div>
          </div>
          <div className="flex flex-col min-w-24 gap-4">
            <div className="mb-4 font-semibold">About Us</div>
            <div>Our Story</div>
            <div>Work with us</div>
          </div>
          <div className="flex flex-col min-w-24 gap-4">
            <div className="mb-4 font-semibold">Contact us</div>
            <div>gogo-contacts@gogo.com</div>
            <div>(123) 4456 4466</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent
