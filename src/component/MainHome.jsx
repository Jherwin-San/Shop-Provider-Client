import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Pexel4, background } from "../images";
import { ProductCard } from "../component";

const MainHome = () => {
  const [bigCardImg, setBigCardImg] = useState(Pexel4);
  return (
    <div className="container mx-auto sm:rounded-2xl  sm:shadow-2xl sm:shadow-black bg-white dark:bg-shogun-900 ">
      <div className="grid grid-cols-2 p-10 text-black  dark:text-white md:rounded-xl sm:my-10">
        <div className="flex justify-center items-center">
          {/* <img
            src={Pexel4}
            className="rounded-xl  md:h-full h-[16rem] w-full"
          /> */}
          <div className="relative flex-1 flex justify-center items-center bg-cover bg-center ">
            <img
              src={bigCardImg}
              className="object-cover h-[16rem] rounded-2xl relative "
            />

            <div className="flex justify-center gap-1 absolute lg:-bottom-[7%] md:-bottom-[14%] -bottom-[7%] px-6">
              {background.map((image, index) => (
                <div key={index}>
                  <ProductCard
                    index={index}
                    imgURL={image}
                    changeBigCardImage={(card) => setBigCardImg(card)}
                    bigCardImg={bigCardImg}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pl-10">
          <div>
            <div className="font-bold lg:text-4xl text-xl md:py-3">
              Welcome to our Plant Paradise!
            </div>
            <div className="font-semibold lg:text-lg text-xs py-3 lg:py-5">
              Find your green oasis at our shop.
            </div>
            <div className="font-semibold lg:text-lg text-xs pb-3 lg:pb-10">
              Explore our collection of lush plants for every space.
            </div>
            <Link to="/products">
              <Button
                ripple={true}
                className="lg:text-xl lg:p-5 rounded-full shadow-md shadow-gray-900"
                color="amber"
              >
                See Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHome;
