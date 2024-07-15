import { Button } from "@material-tailwind/react";

export default function DecrementQuantity({
  productId,
  quantity,
  fetchCartInfo,
  userId,
}) {
  const handleIncrement = () => {
    // Call your API to update the quantity for the given product
    fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/shop/carts/updateQuantity`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: userId,
          productId,
          quantity: quantity - 1,
        }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        // Fetch updated cart information after successful update
        fetchCartInfo();
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  return (
    <button
      className="bg-red-600 text-white md:px-3 md:py-2 px-1.5 py-1 font-bold rounded-lg"
      onClick={handleIncrement}
    >
      -
    </button>
  );
}
