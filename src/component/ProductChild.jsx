import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { StarRating } from "../component";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

export default function ProductChild(props) {
  return (
    <Card
      className={`rounded-2xl ${props.styleOut} bg-white dark:bg-shogun-850`}
      key={props._id}
    >
      <Link to={`/shop/products/${props._id}`} className=" flex justify-center">
        <CardHeader
          shadow={false}
          floated={false}
          className="md:h-[14rem] h-[6rem] rounded-2xl"
        >
          <Image
            src={props.image}
            alt={props.name}
            cloudName={import.meta.env.VITE_APP_API_CLOUDINARY_NAME}
            className="h-full w-full object-cover"
          />
        </CardHeader>
      </Link>
      <CardBody className="container w-full">
        <div className="mb-2 flex flex-col items-center justify-center">
          <StarRating />
          <Typography className="font-bold text-pretty lg:text-lg md:text-sm text-xs lg:h-[4rem] h-[2rem]  dark:text-white text-black">
            {props.name}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <div className=" flex flex-row">
          <div className="w-full flex">
            <p
              className={` font-semibold lg:text-lg  text-xs ${props.buttonColor} dark:text-white`}
            >
              <span className="font-bold">&#8369;</span>
              {props.price}
            </p>
            <p
              className={`indent-3 font-semibold lg:text-lg text-xs line-clamp-5 line-through`}
            >
              <span className="font-bold"> &#8369;</span>
              {props.price}
            </p>
          </div>
          <div className="grid justify-end w-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:bg-gray-300 rounded cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
        </div>
        {/* <Button
          ripple={false}
          fullWidth={true}
          className={`text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 ${props.buttonColor}`}
        >
          Add to Cart
        </Button> */}
      </CardFooter>
    </Card>
  );
}
