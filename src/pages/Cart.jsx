import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import {
  Checkout,
  DecrementQuantity,
  IncrementQuantity,
  RemoveFromCart,
} from "../component";

export default function Cart() {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user.isAdmin == false && location.pathname === "/cart") {
      fetchCartInfo();
    }
  }, []);

  const Loading = () => {
    Swal.fire({
      title: "Please wait while we process your order",
      icon: "info",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const fetchCartInfo = () => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/carts/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.userCart) {
          return;
        }
        const cartItems = data.userCart[0].cartItems;

        Promise.all(
          cartItems.map(async (cartItem) => {
            return {
              productId: cartItem.productId,
              productName: cartItem.productName,
              productImage: cartItem.productImage,
              quantity: cartItem.quantity,
              price: cartItem.price,
            };
          })
        ).then((updatedCart) => {
          setCart(updatedCart);
        });
      })
      .catch((error) => {
        // console.error("Error fetching cart data:", error);
        return null;
      });
  };

  return (
    <>
      <div className="min-h-dvh w-full flex justify-center items-center bg-nahida-650 dark:bg-shogun-300 overflow-x-hidden">
        {checkoutInProgress ? (
          <>
            <Loading />
          </>
        ) : cart.length === 0 ? (
          <div className="w-11/12 h-[45rem] lg:my-10 my-5 flex flex-col justify-center items-center shadow-3xl rounded-3xl shadow-nahida-200 dark:shadow-black dark:bg-shogun-900 bg-white  text-black dark:text-white">
            <div className="text-center">
              <h1 className="font-bold lg:text-4xl text-2xl text-black dark:text-white">
                {user.isAdmin == true
                  ? "Admins are not allowed to access the cart."
                  : "Your Cart is currently empty."}
              </h1>
            </div>
          </div>
        ) : (
          <>
            <div className="w-11/12 h-[45rem] lg:my-10 my-5 flex flex-col justify-center items-center shadow-3xl rounded-3xl shadow-nahida-200 dark:shadow-black dark:bg-shogun-900 bg-white  text-black dark:text-white">
              <div className="lg:text-4xl text-3xl font-bold">Cart</div>
              <div className="w-full mt-10 grid grid-flow-row grid-cols-1 items-center justify-center lg:px-10 px-5">
                <div
                  style={{ height: "25rem" }}
                  className=" flex justify-center items-center "
                >
                  <Card className="w-full  bg-gray-400 rounded-3xl  ">
                    <List className="w-full h-[25rem] overflow-y-scroll lg:rounded-3xl lg:border-2 border-y-2  bg-gray-400 border-gray-800 rounded-2xl  ">
                      {cart.map((cartItem) => {
                        return (
                          <ListItem
                            key={cartItem.productId}
                            ripple={false}
                            className="grid grid-flow-col w-full place-items-center py-6 items-center bg-white cursor-default"
                          >
                            <ListItemPrefix
                              key={`pre-${cartItem.productId}`}
                              className="h-[6rem] w-[5rem] flex items-center justify-center "
                            >
                              <Avatar
                                key={`avatar-${cartItem.productId}`}
                                variant="rounded"
                                src={cartItem.productImage}
                                className="h-[7rem] w-auto"
                              />
                            </ListItemPrefix>
                            <div className="grid md:grid-cols-2 justify-end w-full items-center">
                              <div className="grid md:grid-flow-col grid-cols-2 w-full gap-x-10 items-center justify-start">
                                <div className="lg:w[20rem] w-[5rem] font-semibold lg:text-lg text-xs text-pretty">
                                  {cartItem.productName}
                                </div>
                                <div className="grid grid-flow-col items-center w-[5rem]">
                                  <DecrementQuantity
                                    productId={cartItem.productId}
                                    quantity={cartItem.quantity}
                                    userId={user.id}
                                    fetchCartInfo={fetchCartInfo}
                                  />
                                  <span className="px-2 pb-1 border border-3 lg:text-lg text-xs">
                                    {cartItem.quantity}
                                  </span>
                                  <IncrementQuantity
                                    productId={cartItem.productId}
                                    quantity={cartItem.quantity}
                                    userId={user.id}
                                    fetchCartInfo={fetchCartInfo}
                                  />
                                </div>
                              </div>
                              <div className="grid lg:grid-flow-col grid-flow-col w-full gap-10 mx-auto items-center md:pt-0 pt-5">
                                <Typography className="text-pretty font-semibold lg:text-lg text-xs">
                                  &#8369;{cartItem.price * cartItem.quantity}{" "}
                                </Typography>

                                <div className="">
                                  <RemoveFromCart
                                    productId={cartItem.productId}
                                    userId={user.id}
                                    fetchCartInfo={fetchCartInfo}
                                  />
                                </div>
                              </div>
                            </div>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Card>
                </div>
              </div>
              <div className="w-full flex justify-center lg:text-2xl text-xl font-bold mt-10">
                <span className="font-bold">&#8369; </span>
                {cart.reduce((total, cartItem) => {
                  if (!cartItem) {
                    return total + 0;
                  }
                  return total + cartItem.price * cartItem.quantity;
                }, 0)}
              </div>
              <div className="w-6/12 flex justify-center mb-5 my-3">
                <Checkout
                  userId={user.id}
                  fetchCartInfo={fetchCartInfo}
                  setCheckoutInProgress={setCheckoutInProgress}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
