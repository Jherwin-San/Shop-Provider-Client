import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { ProfileMenu, ResetPassword } from "../component";
import {
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { upload_area } from "../images";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [dataToSend, setDataToSend] = useState("");

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setDetails(data.user);
        } else {
          // <Navigate to="/login" />;
          // Swal.fire({
          //   title: "User not found",
          //   icon: "error",
          //   text: "Something went wrong, kindly contact us for assistance.",
          // });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Something went wrong",
          icon: "error",
          text: "Something went wrong, kindly contact us for assistance.",
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [details]);

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    let responseData;
    let formData = new FormData();
    formData.append("user-image", profile);
    await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/users/profile`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("POST", data);
        responseData = data;
      });
    if (responseData.success == true) {
      fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/shop/users/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            profile: responseData.data,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log("PUT", data);
          if (data.message === "Profile updated successfully") {
            Swal.fire({
              title: "Success",
              icon: "success",
              text: `Profile picture is updated successfully`,
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

  const handleShow = () => {
    if (show && true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const imageHandler = (e) => {
    setProfile(e.target.files[0]);
  };

  useEffect(() => {
    setIsActive(profile !== false);
  }, [profile]);
  const handleSubmit = () => {
    setShow(false);
    // console.log(dataToSend);
    updateProfile(dataToSend);
  };

  return user.id === null ? (
    <Navigate to="/login" />
  ) : (
    <>
      <div className="  flex flex-row pb-28 justify-center items-center bg-nahida-650 dark:bg-shogun-300">
        <div className="grid ">
          <div className="grid grid-flow-col">
            <div className="p-5 grid grid-flow-row">
              <div className="grid md:grid-cols-2 grid-rows-1 text-white dark:text-black pt-10">
                <div className="pb-5 flex justify-center">
                  <img
                    src={details.profile}
                    onClick={() => {
                      handleShow();
                    }}
                    className=" cursor-pointer rounded-full object-cover h-[16rem] w-[16rem]"
                  />{" "}
                </div>
                <div className="py-10 grid grid-flow-row">
                  <h1 className="py-4 font-bold text-4xl ">Welcome Back!</h1>
                  <hr className="lg:h-3 h-1 lg:w-[30rem] w-[11rem] bg-nahida-300 dark:bg-shogun-850 border rounded-lg border-5" />
                  <h2 className="mt-3 font-bold text-2xl">{`${details.firstName} ${details.lastName}`}</h2>
                  <h3 className="mt-3 font-body text-xl">{details.email}</h3>
                  <h3 className="mt-3 font-medium text-xl">
                    {details.mobileNo}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[24rem]">
            <div className="flex justify-center items-center">
              <ResetPassword />
            </div>
          </div>
        </div>
      </div>
      <Dialog open={show}>
        <DialogHeader>Update My Profile Picture</DialogHeader>
        <DialogBody>
          <div className="grid grid-flow-col gap-8 w-full">
            <div className="flex items-center justify-center">
              <div className=" flex justify-center">
                <label htmlFor="file-input">
                  <img
                    src={
                      profile ? URL.createObjectURL(profile) : details.profile
                    }
                    alt=""
                    className="cursor-pointer h-[18rem] w-[18rem] object-cover rounded-full"
                  />
                </label>
                <input
                  onChange={imageHandler}
                  type="file"
                  name="image"
                  // value={profile}
                  id="file-input"
                  hidden
                />
              </div>
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
      </Dialog>{" "}
      <div className="hidden">
        <ProfileMenu fetchData={fetchData} />
      </div>
    </>
  );
}
