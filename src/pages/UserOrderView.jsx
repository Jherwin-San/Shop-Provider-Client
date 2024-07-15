import React, { useEffect, useState, useContext } from "react";
import { PaginationProd } from "../component";
import {
  Card,
  CardBody,
  CardHeader,
  Accordion,
  AccordionBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import UserContext from "../UserContext";

export default function UserOrderView() {
  const [open, setOpen] = useState(0);
  const { user } = useContext(UserContext);
  const [myOrders, setMyOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const postPerPage = 4;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const TABLE_HEAD = [" ", "Product Name", "Quantity", "Sub Total"];

  useEffect(() => {
    // if (user.isAdmin === false) {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/orders/my-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyOrders(data.orders);
      })
      .catch((error) => {
        // console.error("Error fetching orders:", error);
      });
    // }
  }, []);

  useEffect(() => {
    if (myOrders && myOrders.length > 0) {
      const postsToShow = myOrders.slice(firstPostIndex, lastPostIndex);
      setCurrentPosts(postsToShow);
    }
  }, [myOrders, currentPage, postPerPage]);
  return (
    <div className="min-h-dvh w-full flex justify-center items-center  bg-nahida-650 dark:bg-shogun-300 overflow-x-hidden">
      {currentPosts.length === 0 ? (
        <div className="min-h-dvh vh-72 w-full flex justify-center items-center">
          <div className="w-full flex justify-center md:m-40 m-10 rounded-xl items-center shadow-2xl shadow-nahida-200 dark:shadow-black bg-white dark:bg-shogun-900 lg:h-[40rem] h-[15rem] ">
            <div className="text-center">
              <h1 className="font-bold lg:text-4xl text-2xl  text-black dark:text-white">
                {user.isAdmin == true
                  ? "Admins are not allowed to make an order."
                  : "You have no orders in process yet..."}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-11/12 rounded-3xl lg:my-10 my-9 shadow-3xl  shadow-nahida-200 dark:shadow-black bg-white dark:bg-shogun-900">
            <div className="grid grid-flow-row items-center md:px-20 w-full py-9 justify-center">
              <div className="text-center pb-9 font-bold text-4xl w-full text-black dark:text-white pt-5">
                My Orders
              </div>
              <div className="grid grid-flow-row place-items-center">
                <Card
                  className="mb-2 w-full grid grid-flow-row justify-center items-center bg-transparent "
                  shadow={false}
                >
                  <CardHeader className="font-bold text-center">
                    {""}
                  </CardHeader>
                  <CardBody>
                    <div
                      style={{ height: "25rem", overflow: "scroll" }}
                      className="bg-gray-500 rounded-xl border-4 border-gray-900  dark:border-amber-500 md:w-full w-[25rem] "
                    >
                      <div className="overflow-y-scroll">
                        {currentPosts.map((myShoppingHaul) => {
                          const TABLE_ROWS = myShoppingHaul.productsOrdered;

                          return (
                            <Accordion
                              key={myShoppingHaul._id}
                              open={open === myShoppingHaul._id}
                            >
                              <div className="pt-3 bg-white rounded-lg border-2 border-gray-400 grid grid-flow-col grid-cols-2 justify-center items-center">
                                <div className="flex justify-start mx-9 w-full md:text-lg text-xs">
                                  <div className="grid md:grid-flow-col grid-flow-row">
                                    <div className="grid grid-flow-col ">
                                      <div className="grid grid-flow-row">
                                        <h3 className="font-bold">Status:</h3>
                                        <h3 className="font-bold py-3">
                                          {" "}
                                          Ordered On:
                                        </h3>
                                      </div>
                                      <div className="grid grid-flow-row px-10">
                                        <div className="">
                                          {myShoppingHaul.status}
                                        </div>
                                        <div className="py-3">
                                          {new Date(
                                            myShoppingHaul.orderedOn
                                          ).toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="grid grid-flow-col py-3">
                                      <div className="grid grid-flow-row">
                                        <h3 className="font-bold">
                                          Total Price:
                                        </h3>
                                      </div>
                                      <div className="grid grid-flow-row px-10">
                                        <div className="">
                                          <span className="font-bold">
                                            {" "}
                                            &#8369;
                                          </span>
                                          {myShoppingHaul.totalPrice}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-end items-center">
                                  <Button
                                    key={myShoppingHaul._id}
                                    variant="text"
                                    color="black"
                                    onClick={() =>
                                      handleOpen(myShoppingHaul._id)
                                    }
                                    className="mx-3 lg:mb-3 mb-4"
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

                              <AccordionBody
                                className=""
                                style={{ margin: "-1rem 0rem" }}
                              >
                                <Card
                                  key={myShoppingHaul._id}
                                  className=" w-full overflow-scroll"
                                >
                                  <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                      <tr>
                                        {TABLE_HEAD.map((head) => (
                                          <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                          >
                                            <Typography className="font-normal leading-none opacity-70 lg:text-lg text-xs text-black">
                                              {head}
                                            </Typography>
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {TABLE_ROWS.map(
                                        (
                                          {
                                            productId,
                                            productName,
                                            productImage,
                                            quantity,
                                            subtotal,
                                          },
                                          index
                                        ) => {
                                          return (
                                            <tr
                                              key={productId}
                                              className="even:bg-blue-gray-50/50"
                                            >
                                              <td className="flex justify-center">
                                                <img
                                                  src={productImage}
                                                  style={{
                                                    height: "100px",
                                                    objectFit: "cover",
                                                  }}
                                                  className="rounded-lg"
                                                />
                                              </td>
                                              <td className="p-4">
                                                <Typography className="font-normal lg:text-lg text-xs text-black">
                                                  {productName}
                                                </Typography>
                                              </td>
                                              <td className="p-4">
                                                <Typography className="font-normal lg:text-lg text-xs text-black">
                                                  {quantity}
                                                </Typography>
                                              </td>
                                              <td className="p-4">
                                                <Typography className="font-normal lg:text-lg text-xs text-black">
                                                  <span className="fw-bold">
                                                    {" "}
                                                    &#8369;{" "}
                                                  </span>
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
                              </AccordionBody>
                            </Accordion>
                          );
                        })}
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="flex justify-center">
                    {" "}
                    <PaginationProd
                      color="white"
                      activeColor="amber"
                      variant="gradient"
                      totalPosts={myOrders.length}
                      postPerPage={postPerPage}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                    />
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
