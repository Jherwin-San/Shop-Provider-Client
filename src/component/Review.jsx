// import axios from 'axios'
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Textarea,
  Rating,
  rating,
} from "@material-tailwind/react";

function formatDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dateString);
  const formattedDate = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
  return formattedDate;
}

function Review({ productId }) {
  const [idEdit, setIdEdit] = useState(false);
  const [allData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_BASE_URL}/shop/ratings/${productId}`
        );
        const data = await response.json();
        if (
          data.status === "success" &&
          data.data &&
          data.data.ratings &&
          data.data.ratings.length > 0
        ) {
          const allRatings = data.data.ratings.map((ratingItem) => ({
            _id: ratingItem._id,
            name: ratingItem.userName,
            profile: ratingItem.profile,
            ratingValue: ratingItem.ratingValue,
            comments: ratingItem.comments,
            createdOn: formatDate(ratingItem.createdOn),
          }));
          setData(allRatings);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [productId]);

  return (
    <>
      <Card
        color="transparent"
        shadow={false}
        className="container w-full md:max-w-[50rem] md:px-10"
      >
        <CardHeader
          color="transparent"
          floated={true}
          shadow={false}
          className="mx-0 flex items-center gap-4 py-6"
        >
          <Avatar
            size="lg"
            variant="circular"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="tania andrew"
          />
          <div className=" w-full grid grid-flow-row md:gap-0.5 gap-0 ">
            <div className="grid md:grid-flow-col grid-flow-row items-center w-full">
              <Typography
                variant="h5"
                className="flex text-black items-center justify-start w-[14rem] "
              >
                Tania Andrew
              </Typography>
              <div className="items-center grid grid-flow-col md:justify-end justify-start">
                <div className="flex">
                  <Rating value={5} readonly />
                </div>
              </div>
            </div>
            <Typography className=" text-black items-center justify-start">
              April 21, 2024
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0">
          <Typography>
            &quot;I received the product in well condition and it was securely
            packaged! And it's really affordable, very humble guys !!!&quot;
          </Typography>
        </CardBody>
      </Card>
      <Card
        color="transparent"
        shadow={false}
        className="container w-full md:max-w-[50rem] md:px-10"
      >
        <CardHeader
          color="transparent"
          floated={true}
          shadow={false}
          className="mx-0 flex items-center gap-4 py-6"
        >
          <Avatar
            size="lg"
            variant="circular"
            src="https://placehold.co/600x400?text=SJ"
            alt="tania andrew"
          />
          <div className=" w-full grid grid-flow-row md:gap-0.5 gap-0 ">
            <div className="grid md:grid-flow-col grid-flow-row items-center w-full">
              <Typography
                variant="h5"
                className="flex text-black items-center justify-start w-[14rem] "
              >
                S** ****
              </Typography>
              <div className="items-center grid grid-flow-col md:justify-end justify-start">
                <div className="flex">
                  <Rating
                    value={4}
                    unratedColor="amber"
                    ratedColor="amber"
                    readonly
                  />
                </div>
              </div>
            </div>
            <Typography className=" text-black items-center justify-start">
              April 21, 2024
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0">
          <Typography>&quot;I received it in good condition.&quot;</Typography>
        </CardBody>
      </Card>
      {allData.map((reviewed) => (
        <Card
          key={reviewed._id}
          color="transparent"
          shadow={false}
          className="container w-full md:max-w-[50rem] md:px-10"
        >
          <CardHeader
            color="transparent"
            floated={true}
            shadow={false}
            className="mx-0 flex items-center gap-4 py-6"
          >
            <Avatar
              size="lg"
              variant="circular"
              src={reviewed.profile}
              alt="Profile Picture"
            />
            <div className=" w-full grid grid-flow-row md:gap-0.5 gap-0 ">
              <div className="grid md:grid-flow-col grid-flow-row items-center w-full">
                <Typography
                  variant="h5"
                  className="flex text-black items-center justify-start w-[14rem] "
                >
                  {reviewed.name}
                </Typography>
                <div className="items-center grid grid-flow-col md:justify-end justify-start">
                  <div className="flex">
                    <Rating value={reviewed.ratingValue} readonly />
                  </div>
                </div>
              </div>
              <Typography className=" text-black items-center justify-start">
                {reviewed.createdOn}
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography>&quot;{reviewed.comments}&quot;</Typography>
          </CardBody>
        </Card>
      ))}
    </>
  );
}

export default Review;
