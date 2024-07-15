import React from "react";
export default function ThankYou() {
  return (
    <div className="min-h-dvh w-full flex justify-center items-center bg-nahida-650 dark:bg-shogun-300">
      <div className="w-11/12 h-[45rem] lg:my-10 my-5 flex flex-col justify-center items-center shadow-3xl rounded-3xl shadow-nahida-200 dark:shadow-black dark:bg-shogun-900 bg-white  text-black dark:text-white">
        <div className="text-center">
          <h1 className="font-bold lg:text-4xl text-2xl">
            Thank you for your order!
          </h1>
          <p className="lg:text-2xl text-lg py-5">
            Your order has been successfully placed.
          </p>
        </div>
      </div>
    </div>
  );
}
