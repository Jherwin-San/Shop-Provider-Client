import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import Swal from "sweetalert2";
import { upload_area } from "../../images";

export default function UpdateProduct({ product, productName, fetchData }) {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [dataToSend, setDataToSend] = useState("");
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

  const handleShow = () => {
    if (show && true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const handleSubmit = () => {
    setShow(false);
    // console.log(dataToSend);
    updateProduct(dataToSend);
  };

  const updateProduct = async (productId) => {
    const token = localStorage.getItem("token");
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
      fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/shop/products/${productId}`,
        {
          method: "PUT",
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
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "The product is updated successfully") {
            Swal.fire({
              title: "Success",
              icon: "success",
              text: `${productDetails.name} is updated successfully`,
            });
            fetchData();
          } else {
            Swal.fire({
              title: "Something Went Wrong",
              icon: "error",
              text: "Please Try again",
            });
          }
        });
    }
  };

  return (
    <>
      <Button
        onClick={(e) => {
          handleShow();
          setDataToSend(product);
        }}
        variant="gradient"
        color="blue"
        className=" mx-3 w-[7rem]"
      >
        Update
      </Button>
      <Dialog open={show}>
        <DialogHeader>Updating {productName}</DialogHeader>
        <DialogBody>
          <div className="grid grid-flow-col gap-8 w-full">
            <div className="flex items-center justify-center">
              <div className=" flex justify-center">
                <label htmlFor="file-input">
                  <img
                    src={image ? URL.createObjectURL(image) : upload_area}
                    alt=""
                    className="cursor-pointer h-[18rem] w-[18rem] object-contain"
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
            </div>
            <div className="grid grid-flow-row gap-8 w-full">
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
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              handleShow();
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>

          {isActive ? (
            <Button
              variant="gradient"
              color="blue"
              onClick={() => {
                handleSubmit();
              }}
            >
              <span>Confirm</span>
            </Button>
          ) : (
            <Button color="gray" type="submit" disabled>
              Confirm
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
