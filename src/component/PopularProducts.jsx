import { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { ProductChild } from "../component";

export default function PopularProducts() {
  const [newProducts, setNewProducts] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/products/popular`)
      .then((res) => res.json())
      .then((data) => {
        const productArray = data.products.slice(0, 9).map((product) => {
          return (
            <ProductChild
              styleOut=" lg:w-[18rem] md:w-52 w-32  shadow-xl shadow-nahida-300 dark:shadow-shogun-300"
              buttonColor="text-nahida-400"
              key={product._id}
              _id={product._id}
              name={product.name}
              image={product.image}
              description={product.description}
              price={product.price}
            />
          );
        });
        setNewProducts(productArray);
      });
  }, []);

  return newProducts ? (
    <div
      className=" bg-nahida-300 dark:bg-shogun-850 bg-blend-overlay bg-pexel1"
      id="popular"
    >
      <div className="grid place-items-center px-8">
        <div className="flex justify-center flex-col py-8">
          <h1 className="text-center lg:pt-2 font-bold lg:text-4xl text-2xl text-white text-shadow shadow-black ">
            Popular Products
          </h1>
          {/* <hr className="lg:h-3 h-1 lg:w-[30rem] w-[11rem] bg-red-900 border rounded-lg border-5" /> */}
        </div>
        <Carousel
          className="rounded-3xl overflow-hidden 2xl:w-3/4 w-full lg:h-[37rem] md:h-[30rem] h-[22rem] mb-10"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-40 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
          autoplay
        >
          <div className=" relative md:h-full h-[25rem] w-full bg-nahida-200 dark:bg-shogun-400">
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75 dark:bg-black/25 px-2 md:pt-0">
              <div className="grid md:grid-cols-3 grid-cols-2 gap-4 pb-10 place-items-center md:pt-9">
                {screenWidth > 500
                  ? newProducts.slice(0, 3)
                  : newProducts.slice(0, 2)}
              </div>
            </div>
          </div>
          <div className=" relative md:h-full h-[25rem] w-full bg-nahida-200 dark:bg-shogun-400">
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75  dark:bg-black/25 px-2 md:pt-0">
              <div className="grid md:grid-cols-3 grid-cols-2 gap-4 pb-10 place-items-center md:pt-9">
                {screenWidth > 500
                  ? newProducts.slice(3, 6)
                  : newProducts.slice(2, 4)}
              </div>
            </div>
          </div>
          <div className=" relative md:h-full h-[25rem] w-full bg-nahida-200 dark:bg-shogun-400">
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75  dark:bg-black/25 px-2 md:pt-0">
              <div className="grid md:grid-cols-3 grid-cols-2 gap-4 pb-10 place-items-center md:pt-9">
                {screenWidth > 500
                  ? newProducts.slice(6, 9)
                  : newProducts.slice(4, 6)}
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  ) : (
    <h1>No active products as of the moment</h1>
  );
}
