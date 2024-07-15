// import axios from 'axios'
import { useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Button,
  Textarea,
  Rating,
} from "@material-tailwind/react";
import UserContext from "../UserContext";
import { Link, NavLink } from "react-router-dom";

function UserRating({ productId }) {
  const { user } = useContext(UserContext);
  const [idEdit, setIdEdit] = useState(false);
  const [description, setDecrip] = useState("");
  const [rating, setRating] = useState(0);

  // function data() {
  // axios.get(`api/${id)}`)
  //   .then((res) => {
  //     setData(res.data)
  //   })
  // }

  // useEffect(() => {
  //  data()
  // }, [])

  // function update() {
  // axios.put(`api/${data.id}`, {
  //   name: data.name,
  //   email: data.email
  //  })
  // setImg(false)
  // }

  // const save = (e) => {
  // setData({ ...data,
  //   [e.target.name]: e.target.value
  // })
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    setRating(0);
    setDecrip("");
    setIdEdit(false);
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/ratings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: productId,
        ratingValue: rating,
        comments: description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });
  };
  return (
    <div className="w-full flex justify-center">
      {user.id === null ? (
        <NavLink to="/login" className="my-4">
          <Button>Leave a comment</Button>
        </NavLink>
      ) : (
        <div className="lg:w-[50rem] md:w-[35rem] w-[18rem] flex flex-col">
          {idEdit === false ? (
            <div className="w-full flex justify-center py-5">
              <Button onClick={() => setIdEdit(true)}>Leave a Comment</Button>
            </div>
          ) : (
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
                  src={user.profile}
                  alt="tania andrew"
                />
                <div className=" w-full grid grid-flow-row md:gap-0.5 gap-0 ">
                  <div className="grid md:grid-flow-col grid-flow-row items-center w-full">
                    <Typography
                      variant="h5"
                      className="flex text-black items-center justify-start w-[14rem] "
                    >
                      {user.isAdmin ? "Admin: " : "User: "}
                      {user.userFirstName}
                    </Typography>
                    <div className="items-center grid grid-flow-col md:justify-end justify-start">
                      <div className="flex">
                        <Rating
                          unratedColor="amber"
                          ratedColor="amber"
                          value={rating}
                          onChange={(val) => {
                            setRating(val);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="mb-6 p-0">
                <div className="w-full grid justify-center">
                  {/* {idEdit === false ? (
                    <div className="lg:w-[50rem] md:w-[35rem] w-[18rem] flex flex-col">
                      <div className="flex justify-start indent-10">
                        <Typography>&quot;{displayText}&quot;</Typography>
                      </div>
                      <div className="w-full flex justify-end pt-5">
                        <Button onClick={() => setIdEdit(true)}>
                          Leave a Comment
                        </Button>
                      </div>
                    </div>
                  ) : ( */}
                  <form
                    className="lg:w-[50rem] md:w-[35rem] w-[18rem] "
                    onSubmit={handleSubmit}
                  >
                    <Textarea
                      variant="outlined"
                      label="Review"
                      onChange={(e) => setDecrip(e.target.value)}
                    />
                    <div className=" grid gap-x-2 grid-flow-col justify-end pt-5">
                      <Button
                        onClick={() => setIdEdit(false)}
                        className="bg-gray-500"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-nahida-300 dark:bg-shogun-400"
                      >
                        SAVE
                      </Button>
                    </div>
                  </form>
                  {/* )} */}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export default UserRating;
