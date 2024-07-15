import { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  Accordion,
  AccordionBody,
  CardBody,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import UserContext from "../UserContext";
import { PaginationProd } from "../component";

export default function AllOrders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = orders.slice(firstPostIndex, lastPostIndex);
  // const [imagePaths, setImagePaths] = useState({});

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/orders/all-orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (!data.orders) {
          Swal.fire({
            title: "Bad Request",
            icon: "error",
            text: "Please check your account credentials.",
          });
          return;
        }
        // console.log(data.orders);
        setOrders(data.orders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    if (user.isAdmin === true) {
      fetchData();
    }
  }, []);

  // useEffect(() => {
  //   if (user.isAdmin === true) {
  //     const loadImages = async () => {
  //       const paths = {};
  //       await Promise.all(
  //         orders.map(async (order) => {
  //           await Promise.all(
  //             order.productsOrdered.map(async ({ productName }) => {
  //               try {
  //                 const image = await import(`../images/${productName}.jpg`);
  //                 paths[productName] = image.default;
  //               } catch (error) {
  //                 // console.error(`Error loading image for ${productName}:`, error);
  //                 paths[productName] = "https://placehold.co/60x60"; // Placeholder image
  //               }
  //             })
  //           );
  //         })
  //       );
  //       setImagePaths(paths);
  //     };
  //     loadImages();
  //   }
  // }, [orders]);

  return (
    <div className="w-full flex justify-center items-center bg-nahida-650 dark:bg-shogun-300 overflow-x-hidden overflow-y-scroll">
      <div className="w-11/12 my-20 rounded-3xl md:shadow-3xl md:shadow-nahida-300  md:dark:shadow-black  text-black dark:text-white  bg-white dark:bg-shogun-900 grid justify-center items-center">
        <div className="grid grid-flow-row w-full items-center py-14 lg:px-10 justify-center">
          <div className="text-center pb-9 font-bold text-4xl w-full">
            All Users
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
                to="/adminpage"
                className="my-3 mx-2"
                style={{
                  borderRadius: "10px",
                  background: "transparent",
                  boxShadow: "-4px 4px 10px #000000",
                }}
              >
                <Button color="deep-purple" className="py-3  md:w-[12rem]">
                  Show All Products
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
            <Card className="h-full xl:w-[70rem] lg:w-[65rem]  md:px-10  overflow-x-hidden  text-black dark:text-white  bg-nahida-300 dark:bg-shogun-850 rounded-3xl ">
              <table
                className="w-full table-auto text-left "
                // style={{
                //   borderRadius: "50px",
                //   background: "red",
                //   boxShadow: "26px 26px 35px #4175b4, -13px -13px 35px #6fc7ff",
                // }}
              >
                <thead>
                  <tr>
                    <th>
                      <div className=" grid grid-cols-1  py-5 place-items-center  w-full">
                        <div className="pt-2 text-center">
                          {" "}
                          All Orders per User
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
                    {currentPosts.map((user) => {
                      return (
                        <tr
                          key={user._id}
                          className="grid justify-center w-full"
                        >
                          <td className=" lg:w-[60rem] md:w-[40rem] w-[22rem] grid justify-center">
                            <Card
                              key={user._id}
                              className="rounded-xl lg:border-4 border-2 border-gray-900 "
                            >
                              <CardBody className="grid grid-flow-col justify-center w-full items-center">
                                <Accordion
                                  key={user._id}
                                  open={open === user._id}
                                  className="lg:w-[60rem] md:w-[40rem] w-[18rem] grid grid-flow-row justify-center"
                                >
                                  <div className="lg:w-[60rem] md:w-[40rem] w-[18rem] grid grid-cols-2 items-center justify-center">
                                    <div className="grid justify-start md:grid-cols-2 grid-flow-row ">
                                      <div className="font-bold">User:</div>
                                      <div className="px-10 lg:w-[30rem] text-pretty md:w-[14rem] w-[10rem]">
                                        {user.userName}
                                      </div>
                                    </div>
                                    <div className="grid grid-flow-col justify-end items-center ">
                                      <Button
                                        key={user._id}
                                        variant="text"
                                        color="black"
                                        onClick={() => handleOpen(user._id)}
                                        className="md:mx-3 rounded-full w-[4.5rem]"
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
                                    <Card className="h-full w-full overflow-scroll">
                                      <table className="w-full min-w-max table-auto text-left">
                                        <thead>
                                          <tr>
                                            <th className="text-black dark:text-white  bg-nahida-300 dark:bg-shogun-850 p-4">
                                              <Typography
                                                variant="small"
                                                className="font-normal leading-none opacity-70"
                                              >
                                                {" "}
                                              </Typography>
                                            </th>
                                            <th className="text-black dark:text-white  bg-nahida-300 dark:bg-shogun-850 p-4 ">
                                              <Typography
                                                variant="small"
                                                className="font-normal text-pretty leading-none opacity-70 "
                                              >
                                                Product Name
                                              </Typography>
                                            </th>
                                            <th className="text-black dark:text-white  bg-nahida-300 dark:bg-shogun-850 p-4">
                                              <Typography
                                                variant="small"
                                                className="font-normal leading-none opacity-70"
                                              >
                                                Quantity
                                              </Typography>
                                            </th>
                                            <th className="text-black dark:text-white  bg-nahida-300 dark:bg-shogun-850 p-4">
                                              <Typography
                                                variant="small"
                                                className="font-normal leading-none opacity-70"
                                              >
                                                Sub Total
                                              </Typography>
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {user.productsOrdered.map(
                                            (
                                              {
                                                _id,
                                                productName,
                                                productImage,
                                                subtotal,
                                                quantity,
                                              },
                                              index
                                            ) => {
                                              const isLast =
                                                index === user.length - 1;
                                              const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                              return (
                                                <tr key={_id}>
                                                  <td
                                                    className={`flex justify-center ${classes}`}
                                                  >
                                                    <img
                                                      src={productImage}
                                                      style={{
                                                        objectFit: "cover",
                                                      }}
                                                      className="rounded-lg h-[4rem] w-auto"
                                                    />
                                                  </td>
                                                  <td className={classes}>
                                                    <Typography
                                                      variant="small"
                                                      color="blue-gray"
                                                      className="font-normal lg:w-[20rem] md:[14rem] w-[5rem]"
                                                    >
                                                      {productName}
                                                    </Typography>
                                                  </td>
                                                  <td className={classes}>
                                                    <Typography
                                                      variant="small"
                                                      color="blue-gray"
                                                      className="font-normal"
                                                    >
                                                      {quantity}
                                                    </Typography>
                                                  </td>
                                                  <td className={classes}>
                                                    <Typography
                                                      variant="small"
                                                      color="blue-gray"
                                                      className="font-normal"
                                                    >
                                                      {subtotal}
                                                    </Typography>
                                                  </td>
                                                </tr>
                                              );
                                            }
                                          )}
                                        </tbody>
                                      </table>
                                    </Card>

                                    <div className="pt-10">
                                      <div className="grid grid-flow-col justify-start">
                                        <div className="font-bold w-[8rem]">
                                          Price:
                                        </div>
                                        <div>
                                          {" "}
                                          <span className="font-bold">
                                            {" "}
                                            &#8369;{" "}
                                          </span>
                                          {user.totalPrice}
                                        </div>
                                      </div>
                                      <div className="grid grid-flow-col  justify-start">
                                        <div className="font-bold  w-[8rem]">
                                          Date:
                                        </div>
                                        <div>{user.orderedOn}</div>
                                      </div>
                                      <div className="grid grid-flow-col  justify-start">
                                        <div className="font-bold  w-[8rem]">
                                          Status:
                                        </div>
                                        <div>{user.status}</div>
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

                    <tr className="flex justify-center rounded">
                      <td className="bg-transparent rounded py-4 ">
                        {" "}
                        <PaginationProd
                          color="white"
                          activeColor="amber"
                          variant="outlined"
                          totalPosts={orders.length}
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
