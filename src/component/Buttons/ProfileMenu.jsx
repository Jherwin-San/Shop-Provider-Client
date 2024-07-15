import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import Swal from "sweetalert2";

export default function ProfileMenu({ login }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});
  const [show, setShow] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [dataToSend, setDataToSend] = useState("");
  const closeMenu = () => setIsMenuOpen(false);

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
    updateProfile(dataToSend);
  };
  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    await fetch(
      `${import.meta.env.VITE_APP_API_BASE_URL}/shop/users/update-user`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User details updated successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: `Your details has updated successfully`,
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
  };

  useEffect(() => {
    if (firstName !== "" && lastName !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName]);

  const profileMenuItems = [];

  if (user.id) {
    profileMenuItems.push(
      {
        label: "My Profile",
        icon: UserCircleIcon,
        link: `${user.id ? "myProfile" : "register"}`,
      },
      {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
        link: "myProfile",
      },
      {
        label: "My Orders",
        icon: ShoppingBagIcon,
        link: `${user.id ? "myOrders" : "register"}`,
      },
      {
        label: `${user.id ? "Sign Out" : "Login"}`,
        icon: PowerIcon,
        link: `${user.id ? "" : login}`,
      }
    );
  } else {
    profileMenuItems.push(
      {
        label: "My Profile",
        icon: UserCircleIcon,
        link: `${user.id ? "myProfile" : "register"}`,
      },
      {
        label: "My Orders",
        icon: ShoppingBagIcon,
        link: `${user.id ? "myOrders" : "register"}`,
      },
      {
        label: "Login",
        icon: PowerIcon,
        link: login,
      }
    );
  }
  return (
    <>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto stroke-black dark:stroke-white"
          >
            {user.id ? (
              <Avatar src={details.profile} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-10 h-10 stroke-black dark:stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}

            <p className="px-2 text-black dark:text-white">
              {user.id ? details.firstName : " "}{" "}
            </p>
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, link }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            const isSecondItem = key === 1;
            return (
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? user.id
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : "hover:bg-blue-500/10 focus:bg-blue-500/10 active:bg-blue-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${
                    isLastItem
                      ? user.id
                        ? "text-red-500"
                        : "text-blue-500"
                      : ""
                  }`,
                  strokeWidth: 2,
                })}
                <Typography
                  as={Link}
                  to={`/${link}`}
                  onClick={() => {
                    if (isLastItem) {
                      if (user.id) {
                        localStorage.removeItem("token");
                        window.location.replace("/");
                      }
                    }
                    if (user.id && isSecondItem) {
                      handleShow();
                    }
                  }}
                  variant="small"
                  className="font-normal w-full h-full"
                  color={isLastItem ? (user.id ? "red" : "blue") : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <Dialog open={show}>
        <DialogHeader>Update My Name</DialogHeader>
        <DialogBody>
          <div className="grid grid-flow-col gap-8 w-full">
            <div className="grid grid-flow-row gap-8 w-full">
              <Input
                size="lg"
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                size="lg"
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
      </Dialog>{" "}
    </>
  );
}
