import { Button } from "@material-tailwind/react";

export default function RemoveFromCart({ productId, userId, fetchCartInfo }) {
  const removeItem = () => {
    fetch(
      `${
        import.meta.env.VITE_APP_API_BASE_URL
      }/shop/carts/${productId}/removeFromCart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId: userId }),
      }
    )
      .then((res) => res.json())
      .then((data) => fetchCartInfo())
      .catch((error) => console.error("Error removing item from cart:", error));
  };

  return (
    <button
      onClick={removeItem}
      className=" lg:text-lg text-xs text-red-900 border-2 border-red-900  md:px-3 md:py-2 px-1.5 py-1 font-bold rounded-lg"
    >
      Remove from cart
    </button>
  );
}
