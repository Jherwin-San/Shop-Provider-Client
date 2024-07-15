import React from "react";
export default function NotFoundPage() {
  return (
    <div className="min-h-dvh vh-72 w-full flex justify-center items-center">
      <div className="w-full flex justify-center md:m-40 m-10 rounded-xl items-center shadow-2xl shadow-black lg:h-[40rem] h-[15rem] ">
        <div className="text-center">
          <h1 className="font-bold lg:text-4xl text-2xl">
            404 - Page Not Found
          </h1>
          <p className="lg:text-2xl text-lg py-5">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </div>
  );
}
