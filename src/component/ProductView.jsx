import { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Button, Breadcrumbs, Typography } from "@material-tailwind/react";
import { TabPane, StarRating } from "../component";
import { Image } from "cloudinary-react";

export default function ProductView() {
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");
  const [othername, setOtherName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.product) {
          Swal.fire({
            title: "Bad Request",
            icon: "error",
            text: "Please check your account credentials.",
          });
          return;
        }
        setName(data.product.name);
        setOtherName(data.product.otherName);
        setCategory(data.product.category);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setLoading(false);
        setImagePath(data.product.image);
      });
  }, [productId]);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addToCart = () => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/carts/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    }).then((res) => {
      res.json();
      Swal.fire({
        title: "Success!",
        icon: "success",
        text: `${name} is added in your cart`,
      });
    });
  };
  if (loading) {
    return (
      <div className="min-h-dvh w-full flex justify-center items-center bg-nahida-650 dark:bg-shogun-300 ">
        <div
          className="mx-auto w-screen mt-5 text-black grid justify-center items-center"
          style={{ height: "40rem" }}
        >
          <div className="text-center text-2xl lg:p-56 p-24 rounded-lg shadow-2xl shadow-black outline-black bg-white-400">
            <Button variant="text" size="lg" loading={true}>
              <span className="font-bold text-4xl">Loading</span>
            </Button>
            <h4>Please wait for a moment.</h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="min-h-dvh w-full flex justify-center items-center py-10  bg-nahida-650 dark:bg-shogun-200 bg-blend-overlay bg-pexel3 dark:bg-pexel4"
      style={{ overflowX: "hidden" }}
    >
      <div className="md:w-11/12 w-full flex flex-col justify-center  md:my-5 my-0 container">
        <div className="flex justify-center">
          <Breadcrumbs>
            <Typography as={Link} to="/" className="opacity-60 md:px-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Typography>
            <Typography as={Link} to="/products" className="opacity-60 md:px-8">
              <span>Products</span>
            </Typography>
            <Typography className="md:px-8 text-pretty" disabled>
              {name}
            </Typography>
          </Breadcrumbs>
        </div>

        <div className="w-full md:mt-10 mt-7 grid grid-flow-row justify-center items-center shadow-3xl rounded-3xl shadow-nahida-200 dark:shadow-black dark:bg-shogun-900 bg-white md:p-10 p-5">
          <div className="grid grid-cols-2">
            <div className="grid place-items-center mr-[2rem] ">
              <Image
                src={imagePath}
                cloudName={import.meta.env.VITE_APP_API_CLOUDINARY_NAME}
                className=" border-4 border-gray-500
                lg:h-[40rem] lg:w-[40rem] md:w-[20rem] md:h-[20rem] w-[17rem] h-[17rem] rounded-xl object-cover "
              />
            </div>
            <div className="grid grid-flow-row lg:py-20 py-14">
              <h1 className="font-bold lg:py-3 lg:text-4xl text-2xl text-black dark:text-white">
                {name}
              </h1>
              <h3 className=" lg:-mt-[2rem] font-light italic lg:text-3xl text-lg text-black dark:text-white">
                ' {othername} '
              </h3>
              <div className="lg:py-0 py-1">
                <StarRating />
              </div>
              <div className="grid md:grid-cols-4 grid-flow-col lg:text-2xl text-sm  text-black dark:text-white">
                <p className="font-semibold">Category:</p>{" "}
                <span>{category}</span>
              </div>
              <div className="grid grid-flow-col lg:py-0 py-2">
                <div className="flex items-center lg:text-2xl text-sm">
                  <h3 className=" text-black dark:text-white">
                    <span className="font-bold">&#8369; </span>
                    {price}{" "}
                  </h3>
                  <h3 className="font-bold text-gray-800 line-through px-3">
                    {" "}
                    <span className="font-bold">&#8369; </span>
                    {price + 50}
                  </h3>
                </div>
                <div></div>
              </div>
              <br />
              <div className="flex items-center">
                <div className="grid  items-center grid-cols-3 lg:border-4 rounded-xl border-2 border-gray-500 bg-gray-500">
                  <Button color="red" onClick={decrementQuantity}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="lg:w-4 lg:h-4 w-3 h-3"
                    >
                      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                    </svg>
                  </Button>
                  <span className="lg:px-4 py-1 lg:text-xl lg:border-4 px-3 text-sm border-2 border-gray-500  bg-white text-center">
                    {quantity}
                  </span>
                  <Button color="blue" onClick={incrementQuantity}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="lg:w-4 lg:h-4 w-3 h-3"
                    >
                      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                    </svg>
                  </Button>
                </div>
              </div>

              {quantity < 1 || user.isAdmin ? (
                <Button
                  color="red"
                  size="md"
                  disabled
                  className="mt-3 lg:w-2/4 rounded-2xl"
                >
                  <span className="lg:text-2xl text-lg">Add to Cart</span>
                </Button>
              ) : user.isAdmin === null ? (
                <Button
                  as={Link}
                  color="amber"
                  size="md"
                  to="/login"
                  className="mt-3 lg:w-2/4 rounded-2xl"
                >
                  <span className="lg:text-2xl text-lg">Add to Cart</span>
                </Button>
              ) : (
                <Button
                  color="blue"
                  onClick={addToCart}
                  size="md"
                  className="mt-3 lg:w-2/4 rounded-2xl"
                >
                  <span className="lg:text-2xl text-lg">Add to Cart</span>
                </Button>
              )}
            </div>
          </div>
          <div className="pt-10">
            <TabPane description={description} productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
}
