import { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { upload_area } from "../images";

export default function CreateProduct() {
  const [image, setImage] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [productDetails, setProductDetails] = useState({
    image: "",
    name: "",
    category: "",
    otherName: "",
    description: "",
    price: "",
    stock: "",
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    setIsActive(
      image !== false &&
        productDetails.name.trim() !== "" &&
        productDetails.otherName.trim() !== "" &&
        productDetails.category.trim() !== "" &&
        productDetails.description.trim() !== "" &&
        productDetails.price.trim() !== "" &&
        productDetails.stock.trim() !== ""
    );
  }, [image, productDetails]);

  const Add_Product = async (e) => {
    const token = localStorage.getItem("token");

    e.preventDefault();
    let responseData;
    let formData = new FormData();
    formData.append("product-image", image);
    await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/shop/products/upload`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success == true) {
      fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: productDetails.name,
          image: responseData.data,
          otherName: productDetails.otherName,
          description: productDetails.description
            .split(",")
            .map((item) => item.trim()),
          category: productDetails.category,
          price: productDetails.price,
          stock: productDetails.stock,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "The product was created Successfully") {
            setProductDetails({
              image: "",
              name: "",
              otherName: "",
              description: "",
              category: "",
              price: "",
              stock: "",
            });
            Swal.fire({
              title: "Product registration success!",
              icon: "success",
              text: `${productDetails.name} is added successfully`,
            });
          } else if (data.error === "Product already exists") {
            Swal.fire({
              title: "Duplicate Product Found!",
              text: "Please register an another product.",
              icon: "error",
            });
            alert("Duplicate Product Found!");
          } else {
            Swal.fire({
              title: "Request Error",
              text: "Something went wrong.",
              icon: "error",
            });
          }
        });
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-nahida-650 dark:bg-shogun-300">
      <div className="md:w-7/12 w-10/12 lg:h-4/6 flex items-center justify-center shadow-xl rounded-2xl shadow-nahida-200 dark:shadow-black bg-white my-10">
        <div className="lg:py-5 py-3 lg:w-10/12 w-full grid grid-flow-row justify-center">
          <h1 className="my-5 text-center lg:text-3xl text-lg font-bold">
            Product Registration
          </h1>
          <div className="grid grid-flow-row gap-8 w-full">
            <div className=" flex justify-center">
              <label htmlFor="file-input">
                <img
                  src={image ? URL.createObjectURL(image) : upload_area}
                  alt=""
                  className="cursor-pointer h-[15rem] w-[15rem] object-cover"
                />
              </label>
              <input
                onChange={imageHandler}
                type="file"
                name="image"
                value={productDetails.image}
                id="file-input"
                hidden
              />
            </div>
            <Input
              size="lg"
              label="Product Name"
              type="text"
              name="name"
              value={productDetails.name}
              onChange={changeHandler}
            />
            <Input
              size="lg"
              label="Scientific Name"
              type="text"
              name="otherName"
              value={productDetails.otherName}
              onChange={changeHandler}
            />
            <Input
              size="lg"
              label="Product Category"
              type="text"
              name="category"
              value={productDetails.category}
              onChange={changeHandler}
            />
            <Textarea
              size="lg"
              label="Description"
              type="text"
              name="description"
              value={productDetails.description}
              onChange={changeHandler}
            />
            <Input
              size="lg"
              label="Price"
              type="number"
              name="price"
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              value={productDetails.price}
              onChange={changeHandler}
            />
            <Input
              size="lg"
              label="Inventory Stock"
              type="number"
              name="stock"
              value={productDetails.stock}
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              onChange={changeHandler}
            />
          </div>
          <div className="grid grid-flow-col place-items-center w-full">
            <div className="mt-4 w-10/12 py-4">
              <Button
                className="font-bold"
                fullWidth={true}
                onClick={(e) => Add_Product(e)}
                color={isActive ? "blue" : "gray"} // Change button color based on isActive
                type="submit"
                id="submitBtn"
                disabled={!isActive} // Disable button when isActive is false
              >
                Add Product
              </Button>
              {/* {isActive ? (
                <Button
                  className="font-bold"
                  fullWidth={true}
                  onClick={(e) => Add_Product(e)}
                  color="blue"
                  type="submit"
                  id="submitBtn"
                >
                  Add Product
                </Button>
              ) : (
                <Button
                  className="font-bold"
                  fullWidth={true}
                  color="gray"
                  type="submit"
                  id="submitBtn"
                  disabled
                >
                  Add Product
                </Button>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
