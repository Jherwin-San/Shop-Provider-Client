import { useEffect, useState, useRef, useContext } from "react";
import {
  Button,
  Card,
  Accordion,
  AccordionBody,
  CardBody,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import UserContext from "../UserContext";
import {
  ActivateProduct,
  UpdateProduct,
  PaginationProd,
  PopularStatus,
  NewStatus,
} from "../component";

export default function AdminPage() {
  const { user } = useContext(UserContext);
  const inputRef = useRef();
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  function handleOnChange(event) {
    const { value } = event.target;
    setSearch(value.toLowerCase());
  }

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [productOutput, setProductOutput] = useState([]);
  const [imagePaths, setImagePaths] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = productOutput.slice(firstPostIndex, lastPostIndex);

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/products/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user.isAdmin === true) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (user.isAdmin === true) {
      const productsArr = products.filter((product) =>
        product.name.toLowerCase().includes(search)
      );
      setProductOutput(productsArr);

      // const loadImages = async () => {
      //   const paths = {};
      //   await Promise.all(
      //     productsArr.map(async (product) => {
      //       try {
      //         const image = await import(`${product.image}`);
      //         paths[product.image] = image.default;
      //       } catch (error) {
      //         // console.error(`Error loading image for ${product.name}:`, error);
      //         paths[product.name] = "https://placehold.co/60x60"; // Placeholder image
      //       }
      //     })
      //   );
      //   setImagePaths(paths);
      // };

      // loadImages();
    }
  }, [products, search]);

  return (
    <div className="w-full flex justify-center items-center  bg-nahida-650 dark:bg-shogun-300 overflow-x-hidden overflow-y-scroll">
      <div className="w-11/12 my-20 rounded-3xl md:shadow-3xl md:shadow-nahida-300  md:dark:shadow-black text-black dark:text-white  bg-white dark:bg-shogun-900 grid justify-center items-center">
        <div className="grid grid-flow-row w-full items-center py-9 lg:px-10 justify-center ">
          <div className="text-center pb-9 font-bold text-4xl w-full">
            All Products
          </div>
          <div className="mb-4 w-full grid lg:grid-flow-col grid-flow-row">
            <div className="flex justify-center items-center w-full ">
              <NavLink
                to="/createproduct"
                className="my-3 mx-2"
                style={{
                  borderRadius: "10px",
                  background: "transparent",
                  boxShadow: "-4px 4px 10px #000000",
                }}
              >
                <Button color="blue" className="py-3  md:w-[12rem]">
                  Add New Product
                </Button>
              </NavLink>
              <NavLink
                to="/products"
                className="my-3 mx-2"
                style={{
                  borderRadius: "10px",
                  background: "transparent",
                  boxShadow: "-4px 4px 10px #000000",
                }}
              >
                <Button color="amber" className="py-3  md:w-[12rem]">
                  Products Displayed
                </Button>
              </NavLink>
            </div>
            <div className="flex justify-center items-center w-full ">
              <NavLink
                to="/allorders"
                className="my-3 mx-2"
                style={{
                  borderRadius: "10px",
                  background: "transparent",
                  boxShadow: "-4px 4px 10px #000000",
                }}
              >
                <Button color="teal" className="py-3  md:w-[12rem]">
                  Show User Orders
                </Button>
              </NavLink>
              <NavLink
                to="/usertoadmin"
                className="my-3 mx-2"
                style={{
                  borderRadius: "10px",
                  background: "transparent",
                  boxShadow: "-4px 4px 10px #000000",
                }}
              >
                <Button color="red" className="py-3 md:w-[12rem]">
                  Set User As Admin
                </Button>
              </NavLink>
            </div>
          </div>
          <div className="w-full justify-center grid items-center">
            <Card className="h-full xl:w-[70rem] lg:w-[65rem]  text-black dark:text-white  bg-nahida-300 dark:bg-shogun-850 rounded-3xl md:px-10  overflow-x-hidden">
              <table
                className="w-full table-auto text-left"
                // style={{
                //   borderRadius: "50px",
                //   background: "red",
                //   boxShadow: "26px 26px 35px #4175b4, -13px -13px 35px #6fc7ff",
                // }}
              >
                <thead>
                  <tr>
                    <th>
                      <div className=" grid grid-cols-2  py-5 place-items-center  w-full">
                        <div className="pt-2 text-center">
                          {" "}
                          All Products List
                        </div>
                        <div className="grid justify-center px-5 w-[10rem]">
                          <input
                            ref={inputRef}
                            type="text"
                            value={search}
                            size="lg"
                            placeholder="Search"
                            onChange={handleOnChange}
                            className="bg-white text-green-900  dark:text-deep-purple-900  pl-9 placeholder:text-green-900 dark:placeholder:text-deep-purple-900  md:w-[15rem] w-[8rem] py-3 rounded-xl "
                            // labelProps={{
                            //   className:
                            //     "before:content-none after:content-none",
                            // }}
                            // containerProps={{
                            //   className: "w-[5rem] bg-black",
                            // }}
                          />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                {loading ? ( // Show loading spinner while data is being fetched
                  <tbody>
                    <tr>
                      <td>
                        <div className="flex justify-center my-5">
                          <Spinner />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {currentPosts.map((product) => {
                      return (
                        <tr
                          key={product._id}
                          className="grid justify-center w-full"
                        >
                          <td className="lg:w-[60rem] md:w-[40rem] w-[22rem] grid justify-center">
                            <Card
                              key={product._id}
                              className="rounded-xl lg:border-4 border-2 border-gray-900 "
                            >
                              <CardBody className="grid grid-flow-col justify-center w-full items-center">
                                <Accordion
                                  key={product._id}
                                  open={open === product._id}
                                  className=" lg:w-[60rem] md:w-[40rem] w-[18rem] grid grid-flow-row justify-center"
                                >
                                  <div className="lg:w-[60rem] md:w-[40rem] w-[18rem] grid grid-flow-col items-center justify-center">
                                    <div className="grid justify-start md:grid-flow-col grid-flow-row ">
                                      <div className="font-bold text-center">
                                        Product Name:
                                      </div>
                                      <div className="px-10 lg:w-[30rem] text-pretty w-[10rem] ">
                                        {product.name}
                                      </div>
                                    </div>
                                    <div className="grid grid-flow-col justify-end items-center ">
                                      <div className="grid md:grid-flow-col grid-flow-row justify-center">
                                        <div className="flex lg:flex-row-reverse flex-row justify-end">
                                          <UpdateProduct
                                            product={product._id}
                                            productName={product.name}
                                            fetchData={fetchData}
                                          />
                                        </div>
                                        <div className="flex justify-center">
                                          <ActivateProduct
                                            product={product._id}
                                            isActive={product.isActive}
                                            fetchData={fetchData}
                                          />
                                        </div>
                                      </div>
                                      <Button
                                        key={product._id}
                                        variant="text"
                                        color="black"
                                        onClick={() => handleOpen(product._id)}
                                        className="md:mx-3 rounded-full w-[4.5rem] "
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
                                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                          />
                                        </svg>
                                      </Button>
                                    </div>
                                  </div>

                                  <AccordionBody>
                                    <div className="grid grid-flow-col">
                                      <div className="flex justify-center items-center">
                                        <img
                                          src={product.image}
                                          className=" w-auto md:h-[10rem] h-[4.5rem]  object-cover rounded-lg"
                                        />
                                      </div>
                                      <div className="pl-5">
                                        <div className="grid grid-flow-col justify-start">
                                          <div className="font-bold w-[8rem]">
                                            Description:
                                          </div>
                                          <div className="grid grid-flow-row">
                                            <div>{product.description[0]}</div>
                                            <div>{product.description[1]}</div>
                                            <div>{product.description[2]}</div>
                                            <div>{product.description[3]}</div>
                                          </div>
                                        </div>
                                        <div className="grid grid-flow-col  justify-start">
                                          <div className="font-bold  w-[8rem]">
                                            Price:
                                          </div>
                                          <div>
                                            <span className="font-bold">
                                              {" "}
                                              &#8369;{" "}
                                            </span>
                                            {product.price}
                                          </div>
                                        </div>
                                        <div className="grid grid-flow-col  justify-start">
                                          <div className="font-bold  w-[8rem]">
                                            Inventory Stock:
                                          </div>
                                          <div>
                                            {product.isActive
                                              ? "Available"
                                              : "Not Available"}
                                          </div>
                                        </div>
                                        <div className="grid grid-flow-col  justify-start">
                                          <div className="font-bold  w-[8rem]">
                                            Popular:
                                          </div>
                                          <div>
                                            {product.isPopular
                                              ? "Popular"
                                              : "Not Popular"}
                                          </div>
                                        </div>
                                        <div className="grid grid-flow-col  justify-start">
                                          <div className="font-bold  w-[8rem]">
                                            New:
                                          </div>
                                          <div>
                                            {product.isNew ? "New" : "Not New"}
                                          </div>
                                        </div>
                                        <div className="grid grid-flow-col justify-center">
                                          <PopularStatus
                                            product={product._id}
                                            isPopular={product.isPopular}
                                            fetchData={fetchData}
                                          />
                                          <NewStatus
                                            product={product._id}
                                            isNew={product.isNew}
                                            fetchData={fetchData}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </AccordionBody>
                                </Accordion>
                              </CardBody>
                            </Card>
                          </td>
                        </tr>
                      );
                    })}

                    <tr className="flex justify-center rounded ">
                      <td className="bg-transparent rounded py-4">
                        {" "}
                        <PaginationProd
                          color="white"
                          activeColor="amber"
                          variant="outlined"
                          totalPosts={productOutput.length}
                          postPerPage={postPerPage}
                          setCurrentPage={setCurrentPage}
                          currentPage={currentPage}
                        />
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
