import React, { useState, useEffect, useContext } from "react";
import { Badge, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";

const CartButton = () => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.id && user.isAdmin == false) {
      fetchCartInfo();
    }
  }, [cart]);

  const fetchCartInfo = () => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/carts/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.userCart) {
          return 0;
        }
        const cartItems = data.userCart[0].cartItems;

        Promise.all(
          cartItems.map(async (cartItem) => {
            return {
              quantity: cartItem.quantity,
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
  let totalQuantity = cart.reduce((total, cartItem) => {
    if (!cartItem) {
      return total + 0;
    }
    return total + cartItem.quantity;
  }, 0);
  return (
    <Typography
      as={Link}
      to="/cart"
      className="flex items-center pt-1"
      style={{ margin: "0rem 2rem 0rem 0.5rem" }}
    >
      <Badge className="" content={totalQuantity}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
        </svg>
      </Badge>
    </Typography>
  );
};

export default CartButton;
