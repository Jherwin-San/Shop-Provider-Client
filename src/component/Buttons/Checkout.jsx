import React, { useState } from "react";
import { Spinner, Button } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

export default function Checkout({ userId, fetchCartInfo }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/orders/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setLoading(false);
        navigate("/thankyou");
        fetchCartInfo();
      })
      .catch((error) => {
        console.error("Error during checkout:", error);
        setLoading(false);
      });
  };

  return (
    <Button
      fullWidth={true}
      size="lg"
      color={loading ? "gray" : "amber"}
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? (
        <>
          <Spinner />
          <span className="hidden">Loading...</span>
        </>
      ) : (
        "Checkout"
      )}
    </Button>
  );
}
