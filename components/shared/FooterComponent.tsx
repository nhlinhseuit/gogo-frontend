import "@/app/globals.css";
import React from "react";

const FooterComponent = () => {
  return (
    <footer className="px-24 bg-primary-100 mt-48 pb-16">
      <div className="relative -top-20 h-auto w-full p-6 pb-0 bg-primary-500 rounded-[20px] -mt-24">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col justify-around">
            <div className="text-5xl font-bold">Subscribe<br/>Newsletter</div>
            <div className="opacity-80">The Travel</div>
            <div className="opacity-80">
              Get inspired! Received travel discounts, tips and behind the scenes stories.
            </div>
            <div className="flex flex-row justify-between gap-4 pb-4">
              <input
                type="text"
                placeholder="Your email address"
                className="flex-grow rounded-md border-none bg-white p-4 px-4 py-5 outline-none"
              />
              <button className="rounded-md bg-black px-4 py-5 text-white">
                Subscribe
              </button>
            </div>
          </div>

          <img src="/assets/icons/mailbox.svg" alt="Mailbox" className="" />
        </div>
      </div>
      <div className="flex w-auto flex-col items-start gap-8 md:flex-row md:gap-56">
        <div className="flex flex-col items-center gap-8">
          <img src="/assets/icons/footer-logo.svg" alt="Logo" className="w-full" />
          <div className="flex flex-row gap-3">
            <img src="/assets/icons/facebook.svg" alt="Facebook" className="w-6" />
            <img src="/assets/icons/twitter.svg" alt="Twitter" className="w-6" />
            <img src="/assets/icons/youtube.svg" alt="Youtube" className="w-6" />
            <img src="/assets/icons/instagram.svg" alt="Instagram" className="w-6" />
          </div>
        </div>
        <div className="grid flex-grow grid-cols-1 gap-8 md:grid-cols-5">
          <div className="flex flex-col gap-4 min-w-24">
            <div className="mb-4 font-semibold">Our Destinations</div>
            <a href="" className="opacity-70">Canada</a>
            <a href="" className="opacity-70">Alaska</a>
            <a href="" className="opacity-70">France</a>
            <a href="" className="opacity-70">Iceland</a>
          </div>
          <div className="flex flex-col gap-4 min-w-24">
            <div className="mb-4 font-semibold">Our Activities</div>
            <a href="" className="opacity-70">Northern Lights</a>
            <a href="" className="opacity-70">Cruising & Sailing</a>
            <a href="" className="opacity-70">Multi-activities</a>
            <a href="" className="opacity-70">Kayaking</a>
          </div>
          <div className="flex flex-col gap-4 min-w-24">
            <div className="mb-4 font-semibold">Travel Blogs</div>
            <a href="" className="opacity-70">Bali Travel Guide</a>
            <a href="" className="opacity-70">Sri Lanka Travel Guide</a>
            <a href="" className="opacity-70">Peru Travel Guide</a>
            <a href="" className="opacity-70">Singapore Travel Guide</a>
          </div>
          <div className="flex flex-col gap-4 min-w-24">
            <a href="" className="mb-4 font-semibold">About Us</a>
            <a href="" className="opacity-70">Our Story</a>
            <a href="" className="opacity-70">Work with us</a>
          </div>
          <div className="flex flex-col gap-4 min-w-24">
            <div className="mb-4 font-semibold">Contact us</div>
            <a href="" className="opacity-70">gogo-contacts@gogo.com</a>
            <a href="" className="opacity-70">(123) 4456 4466</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent
