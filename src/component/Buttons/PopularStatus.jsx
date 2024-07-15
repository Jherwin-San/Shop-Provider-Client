import { IconButton } from "@material-tailwind/react";
import Swal from "sweetalert2";

export default function PopularStatus({ product, isPopular, fetchData }) {
  const popularToggle = (productId) => {
    fetch(
      `${
        import.meta.env.VITE_APP_API_BASE_URL
      }/shop/products/setpopular/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.message === "Product status set as Popular successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Product status successfully updated ",
          });
          fetchData();
        } else if (
          data.message === "Product is already Popular, status modified to old"
        ) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Product status successfully updated ",
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please Try again",
          });
          fetchData();
        }
      });
  };

  return isPopular ? (
    <IconButton
      key={product}
      color="purple"
      onClick={(e) => {
        e.stopPropagation();
        popularToggle(product);
      }}
      className=" mx-3 w-[7rem]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M13.5 4.938a7 7 0 1 1-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 0 1 .572-2.759 6.026 6.026 0 0 1 2.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0 0 13.5 4.938ZM14 12a4 4 0 0 1-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 0 0 1.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 0 1 1.315-4.192.447.447 0 0 1 .431-.16A4.001 4.001 0 0 1 14 12Z"
          clipRule="evenodd"
        />
      </svg>
    </IconButton>
  ) : (
    <IconButton
      key={product}
      color="deep-purple"
      onClick={(e) => {
        e.stopPropagation();
        popularToggle(product);
      }}
      className=" mx-3 w-[7rem]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M13.5 4.938a7 7 0 1 1-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 0 1 .572-2.759 6.026 6.026 0 0 1 2.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0 0 13.5 4.938ZM14 12a4 4 0 0 1-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 0 0 1.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 0 1 1.315-4.192.447.447 0 0 1 .431-.16A4.001 4.001 0 0 1 14 12Z"
          clipRule="evenodd"
        />
      </svg>
    </IconButton>
  );
}
