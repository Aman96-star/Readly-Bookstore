import React from 'react'

export default function Footer() {
  return (
   <>
    <div className="w-screen h-screen bg-[#172432] rounded-tl-[200px] rounded-tr-[200px] text-white font-work-sans font-work-sans-600">
      <div className="h-[50vh] w-[100vw] flex">
        <div className="min-h-full w-2/5  ">
          <div className="w-80 h-16 ml-28  ">
            <div className="text-base mt-28 text-justify  ">
              <p>
                Get exclusive tips, tricks, and hidden track updates to make
                your visit to Madhya Pradesh unforgettable
              </p>
            </div>
            <div className="pt-2 ">
            <div class="relative w-full max-w-md mx-auto bg-cream p-2 rounded-full shadow-md">
  <input
    type="text"
    placeholder="Enter your email"
    class="w-full px-4 py-2 rounded-full text-pink-600 placeholder-pink-600 focus:outline-none"
  />
  <button class="absolute inset-y-0 right-0 mr-2 px-6 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full shadow-md hover:from-orange-500 hover:to-red-600">
    Subscribe
  </button>
</div>
            </div>
          </div>
        </div>
        <div className="min-h-full w-1/5 flex flex-col justify-center items-center">
          <div className="mt-12 ">
            <h3 className="text-2xl leading-[62.15px]">Menu</h3>
          </div>
          <ul className="flex flex-col items-center gap-1 opacity-100">
            <li className="w-[65px] h-[28px]">
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li className="w-[65px] h-[28px]">
              <a href="#" className="hover:underline">
                Explore
              </a>
            </li>
            <li className="w-[65px] h-[28px]">
              <a href="#" className="hover:underline">
                Travel
              </a>
            </li>
            <li className="w-[65px] h-[28px]">
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li className="w-[65px] h-[28px]">
              <a href="#" className="hover:underline">
                Pricing
              </a>
            </li>
          </ul>
        </div>
        <div className="min-h-full w-1/5 flex flex-col justify-center  items-start ">
          <div className="mt-2 ">
            <h3 className="text-2xl leading-[62.15px]">Information</h3>

            <ul className="flex flex-col items-start gap-0 opacity-100">
              <li className=" h-[28px]">
                <a href="#" className="hover:underline">
                  Destinations
                </a>
              </li>
              <li className=" h-[28px]">
                <a href="#" className="hover:underline">
                  Supports
                </a>
              </li>
              <li className=" h-[28px] ">
                <a href="#" className="hover:underline">
                  Terms & Condition
                </a>
              </li>
              <li className=" h-[28px]">
                <a href="#" className="hover:underline">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="min-h-full w-1/5 flex flex-col justify-center items-center ">
          <div className=" mb-3">
            <h3 className="text-2xl leading-[62.15px] ">Contact Info</h3>

            <ul className="flex flex-col items-start gap-0 opacity-100">
              <li className="w-[65px] h-[28px]">
                <a href="#" className="hover:underline">
                  +number
                </a>
              </li>
              <li className="w-[65px] h-[28px]">
                <a href="#" className="hover:underline">
                  Address
                </a>
              </li>
              <li className="w-[65px] h-[28px]">
                <a href="#" className="hover:underline">
                  Address
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="min-h-full w-1/5 flex flex-col justify-center items-start">
          <div className=" mb-11">
            <h1 className="text-2xl leading-[52.15px] ">Follow Us On</h1>
            <ul className="flex space-x-4 text-[30px]">
              <li>
                <a href="#" className="hover:underline">
                  <i className="ri-facebook-circle-fill"></i>
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <i className="ri-twitter-fill"></i>
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <i className="ri-instagram-fill"></i>
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <i class="ri-linkedin-box-fill"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-8xl h-[50vh] w-[100vw] text-orange-500 font-ruslan-display flex flex-col justify-center items-center">
        <h2>Madhya Pradesh</h2>
        <p className="text-xs font-rubik-unique text-white mt-4">
          Copyright © searchMP 2024 All rights reserved
        </p>
      </div>
    </div>
   </> 

)
}
