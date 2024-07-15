import { IconButton } from "@material-tailwind/react";
import Swal from "sweetalert2";

export default function NewStatus({ product, isNew, fetchData }) {
  const newToggle = (productId) => {
    fetch(
      `${
        import.meta.env.VITE_APP_API_BASE_URL
      }/shop/products/setnew/${productId}`,
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
        if (data.message === "Product status set as new successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Product status successfully updated ",
          });
          fetchData();
        } else if (
          data.message === "Product is already new, status modified to old"
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

  return isNew ? (
    <IconButton
      key={product}
      color="lime"
      onClick={(e) => {
        e.stopPropagation();
        newToggle(product);
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
          d="M9.493 2.852a.75.75 0 0 0-1.486-.204L7.545 6H4.198a.75.75 0 0 0 0 1.5h3.14l-.69 5H3.302a.75.75 0 0 0 0 1.5h3.14l-.435 3.148a.75.75 0 0 0 1.486.204L7.955 14h2.986l-.434 3.148a.75.75 0 0 0 1.486.204L12.456 14h3.346a.75.75 0 0 0 0-1.5h-3.14l.69-5h3.346a.75.75 0 0 0 0-1.5h-3.14l.435-3.148a.75.75 0 0 0-1.486-.204L12.045 6H9.059l.434-3.148ZM8.852 7.5l-.69 5h2.986l.69-5H8.852Z"
          clipRule="evenodd"
        />
      </svg>
    </IconButton>
  ) : (
    <IconButton
      key={product}
      color="amber"
      onClick={(e) => {
        e.stopPropagation();
        newToggle(product);
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
          d="M9.493 2.852a.75.75 0 0 0-1.486-.204L7.545 6H4.198a.75.75 0 0 0 0 1.5h3.14l-.69 5H3.302a.75.75 0 0 0 0 1.5h3.14l-.435 3.148a.75.75 0 0 0 1.486.204L7.955 14h2.986l-.434 3.148a.75.75 0 0 0 1.486.204L12.456 14h3.346a.75.75 0 0 0 0-1.5h-3.14l.69-5h3.346a.75.75 0 0 0 0-1.5h-3.14l.435-3.148a.75.75 0 0 0-1.486-.204L12.045 6H9.059l.434-3.148ZM8.852 7.5l-.69 5h2.986l.69-5H8.852Z"
          clipRule="evenodd"
        />
      </svg>
    </IconButton>
  );
}
