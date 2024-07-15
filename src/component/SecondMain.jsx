import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Pexel5 } from "../images";

const SecondMain = () => {
  return (
    <div className="container mx-auto sm:rounded-2xl bg-white  dark:bg-shogun-900 sm:shadow-2xl sm:shadow-black">
      <div className="grid grid-cols-2 p-10 text-black md:rounded-xl sm:my-10">
        <div className="flex justify-center items-center px-5">
          <div className="text-black  dark:text-white">
            <div className="font-bold lg:text-4xl text-xl md:py-3">
              Make nature be a part of your home.
            </div>
            <div className="font-semibold lg:text-lg text-xs py-3 lg:py-5">
              Elevate your shopping experience by ordering online today!
            </div>
            <div className="font-semibold lg:text-lg text-xs pb-3 lg:pb-5">
              Bring nature home with our hand-picked selection.
            </div>
            <div className="font-semibold lg:text-lg text-xs pb-3 lg:pb-10">
              Visit us today and let your space bloom with life!
            </div>

            <Link to="/products">
              <Button
                ripple={true}
                className="lg:text-xl lg:p-5 rounded-full shadow-md shadow-gray-900"
                color="blue"
              >
                See More
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img src={Pexel5} className="rounded-xl md:h-full h-[16rem] w-full" />
        </div>
      </div>
    </div>
  );
};

export default SecondMain;
