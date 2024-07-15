import React, { useEffect, useRef, useState, useReducer } from "react";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { ProductChild, PaginationProd } from "../component";

const priceReducer = (state, action) => {
  switch (action.type) {
    case "SET_MIN_PRICE":
      return { ...state, minPrice: action.payload };
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload };
    default:
      return state;
  }
};
export default function ViewActiveProducts({ darkMode }) {
  const inputRef = useRef();

  const [activeProducts, setActiveProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(900);
  const [currentPage, setCurrentPage] = useState(1);

  const postPerPage = 12;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = activeProducts.slice(firstPostIndex, lastPostIndex);

  function handleOnChange(event) {
    const { value } = event.target;
    setSearch(value.toLowerCase());
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const [priceState, dispatch] = useReducer(priceReducer, {
    minPrice: 0,
    maxPrice: 900,
  });

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === "min") {
      setValue1(value.toString());
      dispatch({ type: "SET_MIN_PRICE", payload: value });
    } else if (type === "max") {
      setValue2(value.toString());
      dispatch({ type: "SET_MAX_PRICE", payload: value });
    }
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/products/active`)
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = new Set();
        data.products.forEach((product) => {
          uniqueCategories.add(product.category);
        });

        // Convert the Set to an array if needed
        const uniqueCategoriesArray = Array.from(uniqueCategories);

        // Now you have an array of unique categories
        // console.log(uniqueCategoriesArray);
        setCategory(uniqueCategoriesArray);

        const filteredProducts = data.products.filter((product) => {
          let matchCategory = true;
          if (select && select !== "" && product.category !== select) {
            matchCategory = false;
          }
          switch (true) {
            case !product.name.toLowerCase().includes(search.toLowerCase()):
              return false;
            case product.price < priceState.minPrice ||
              product.price > priceState.maxPrice:
              return false;
            case !matchCategory:
              return false;
            default:
              return true;
          }
        });
        const productArray = filteredProducts.map((product) => {
          return (
            <ProductChild
              key={product._id}
              styleOut="2xl:w-[16rem] md:w-[13rem] w-[11rem] shadow-3xl shadow-nahida-500 dark:shadow-shogun-900 mt-8 "
              buttonColor="text-nahida-400"
              _id={product._id}
              name={product.name}
              image={product.image}
              description={product.description}
              price={product.price}
            />
          );
        });
        setActiveProducts(productArray);
      });
  }, [search, priceState, select]);

  return (
    <>
      <div className="w-full overflow-x-hidden ">
        <div className="grid grid-flow-row ">
          <div className="w-full bg-pexel1 dark:bg-pexel2 object-cover bg-gray-600 dark:bg-gray-800 bg-blend-overlay ">
            <div className="flex items-center justify-center h-[12rem] backdrop-opacity-5">
              <h1 className="text-center py-10 font-bold lg:text-4xl text-2xl text-white  text-shadow-lg shadow-black">
                Available Products
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full bg-gray-900  dark:bg-shogun-850 px-10">
            <div></div>
            <div className="flex justify-end py-2">
              <Button
                variant="outlined"
                color="white"
                ripple={true}
                onClick={handleShow}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 place-items-center">
            {activeProducts.length > 0 ? (
              // activeProducts
              <>{currentPosts}</>
            ) : (
              <div
                className="mx-auto w-screen mt-5 text-black grid justify-center items-center"
                style={{ height: "40rem" }}
              >
                <div className="text-center text-4xl lg:p-56 p-24 rounded-lg shadow-2xl shadow-black outline-black bg-white-400">
                  <h1 className="font-bold">Result not found</h1>
                </div>
              </div>
            )}
          </div>
          <div className="grid mt-14 h-16 w-full bg-gray-900 dark:bg-shogun-850 place-items-center">
            <div>
              <PaginationProd
                color="white"
                activeColor="amber"
                variant="outlined"
                totalPosts={activeProducts.length}
                postPerPage={postPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Card Container --> */}
      <div
        className={`top-0 left-0 z-[999] fixed bg-white-400 border-4 border-green-900  dark:border-deep-purple-900 w-[22rem] h-dvh ${
          show === false ? "-translate-x-full" : "-translate-x-0"
        } ease-in-out duration-300`}
      >
        <div className="grid grid-flow-row ">
          <div className="grid grid-flow-col py-5 ">
            <div className="font-bold text-xl pt-3 px-10">Filter</div>
            <div className="flex justify-end">
              <Button variant="text" onClick={handleClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-green-900 dark:text-deep-purple-900"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <hr className="h-2 mx-6 bg-green-900 border border-5 dark:bg-deep-purple-900" />
          <div className="grid grid-flow-col py-5">
            <div className="grid grid-flow-row px-16">
              <div id="search" className="pt-5">
                <div className="relative flex w-full gap-2">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={search}
                    placeholder="Search"
                    onChange={handleOnChange}
                    containerProps={{
                      className: "w-full",
                    }}
                    className="bg-white !border-t-green-900 pl-9 placeholder:text-green-900 focus:!border-green-900 
                   dark:!border-t-deep-purple-900 dark:placeholder:text-deep-purple-900 dark:focus:!border-deep-purple-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <div className="!absolute left-3 top-[13px]">
                    <svg
                      width="13"
                      height="14"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z" />
                      <path
                        d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                        className=" stroke-green-900 dark:stroke-deep-purple-700"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div id="min" className="py-8">
                <Input
                  color={!darkMode ? "light-green" : "purple"}
                  value={value1}
                  type="number"
                  onChange={(e) => handlePriceChange(e, "min")}
                  label={"Min Price"}
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                    background: "white",
                  }}
                />

                <div className="relative flex items-center pt-3">
                  <input
                    id="medium-range"
                    min="0"
                    max="50"
                    step="10"
                    value={value1}
                    onChange={(e) => handlePriceChange(e, "min")}
                    type="range"
                    className="range pr-6 accent-light-green-700 dark:accent-purple-700"
                  />
                </div>
              </div>

              <div id="max">
                <Input
                  color={!darkMode ? "green" : "deep-purple"}
                  value={value2}
                  type="number"
                  onChange={(e) => handlePriceChange(e, "max")}
                  label={"Max Price"}
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                    background: "white",
                  }}
                />
                <div className="relative flex items-center pt-3">
                  <input
                    id="medium-range"
                    min="50"
                    max="1000"
                    step="10"
                    value={value2}
                    onChange={(e) => handlePriceChange(e, "max")}
                    type="range"
                    className=" range pr-6 accent-green-900 dark:accent-deep-purple-900"
                  />
                </div>
              </div>

              <div id="select" className="py-4">
                <Select
                  variant="standard"
                  color={!darkMode ? "green" : "deep-purple"}
                  label="Select Category"
                  value={select}
                  size="lg"
                  onChange={(val) => {
                    console.log("Selected value:", val);
                    setSelect(val);
                  }}
                >
                  {category.map((data, index) => (
                    <Option key={data} value={data}>
                      {data}
                    </Option>
                  ))}
                  <Option value="">Show All</Option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
