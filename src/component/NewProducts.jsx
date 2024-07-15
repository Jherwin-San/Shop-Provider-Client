import { useEffect, useState } from "react";
import ProductChild from "./ProductChild.jsx";

export default function NewProducts() {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/products/new`)
      .then((res) => res.json())
      .then((data) => {
        const productArray = data.products.slice(0, 6).map((product) => {
          return (
            <ProductChild
              styleOut=" lg:w-[18rem] md:w-52 w-40 shadow-3xl shadow-nahida-500 dark:shadow-shogun-500 lg:mx-5 lg:my-5 m-2"
              buttonColor="text-nahida-400"
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
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
      className=" bg-lime-700 dark:bg-shogun-700 bg-blend-overlay bg-pexel2 w-full"
      id="new"
    >
      <div className="grid justify-center px-8">
        <div className="flex place-items-center flex-col py-8">
          <h1 className="text-center pt-2 font-bold lg:text-4xl text-2xl text-white text-shadow shadow-black">
            New Products
          </h1>
          {/* <hr className="lg:h-3 h-1 lg:w-[25rem] w-[9rem] bg-blue-900 border rounded-lg border-5" /> */}
        </div>

        {/* <Carousel autoPlay={true} showDots={true} responsive={responsive}> */}
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4 pb-10 place-items-center">
          {newProducts}
        </div>
        {/* </Carousel> */}
      </div>
    </div>
  ) : (
    <h1>No active products as of the moment</h1>
  );
}
