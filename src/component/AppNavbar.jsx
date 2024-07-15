import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import { Navbar, Typography, IconButton } from "@material-tailwind/react";
import { CartButton, ProfileMenu, SearchByName } from "../component";
import { Link, useLocation } from "react-router-dom";
import { DayToggle, NightToggle, StoreLogoB, StoreLogoW } from "../images";

export default function AppNavbar({ darkMode, setDarkMode }) {
  const [openNav, setOpenNav] = React.useState(false);
  const { user } = useContext(UserContext);
  const location = useLocation();

  const switchMode = () => {
    setDarkMode(!darkMode);
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6  text-black  dark:text-white ">
      {user.isAdmin === true ? (
        <Typography
          as={Link}
          to="/adminpage"
          variant="paragraph"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=" fill-black  dark:fill-white"
          >
            <path d="M5 0.5C4.73478 0.5 4.48043 0.605357 4.29289 0.792893C4.10536 0.98043 4 1.23478 4 1.5C4 1.76522 4.10536 2.01957 4.29289 2.20711C4.48043 2.39464 4.73478 2.5 5 2.5H11C11.2652 2.5 11.5196 2.39464 11.7071 2.20711C11.8946 2.01957 12 1.76522 12 1.5C12 1.23478 11.8946 0.98043 11.7071 0.792893C11.5196 0.605357 11.2652 0.5 11 0.5H5ZM2 4.5C2 4.23478 2.10536 3.98043 2.29289 3.79289C2.48043 3.60536 2.73478 3.5 3 3.5H13C13.2652 3.5 13.5196 3.60536 13.7071 3.79289C13.8946 3.98043 14 4.23478 14 4.5C14 4.76522 13.8946 5.01957 13.7071 5.20711C13.5196 5.39464 13.2652 5.5 13 5.5H3C2.73478 5.5 2.48043 5.39464 2.29289 5.20711C2.10536 5.01957 2 4.76522 2 4.5ZM0 8.5C0 7.96957 0.210714 7.46086 0.585786 7.08579C0.960859 6.71071 1.46957 6.5 2 6.5H14C14.5304 6.5 15.0391 6.71071 15.4142 7.08579C15.7893 7.46086 16 7.96957 16 8.5V12.5C16 13.0304 15.7893 13.5391 15.4142 13.9142C15.0391 14.2893 14.5304 14.5 14 14.5H2C1.46957 14.5 0.960859 14.2893 0.585786 13.9142C0.210714 13.5391 0 13.0304 0 12.5V8.5Z" />
          </svg>
          Admin dashboard
        </Typography>
      ) : (
        <>
          <Typography
            as={Link}
            to="/products"
            variant="paragraph"
            className="flex items-center gap-x-2 p-1 font-medium text-black dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6  fill-black  dark:fill-white"
            >
              <path
                fillRule="evenodd"
                d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                clipRule="evenodd"
              />
            </svg>
            Products
          </Typography>
          {/* {location.pathname === "/" && ( // Check if on home page
            <>
              <Typography
                as="li"
                variant="paragraph"
                className="flex items-center gap-x-2 p-1 font-medium text-black dark:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 stroke-black dark:stroke-white  fill-black  dark:fill-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                    clipRule="evenodd"
                  />
                </svg>

                <a href="#popular" className="flex items-center">
                  Popular
                </a>
              </Typography>
              <Typography
                as="li"
                variant="paragraph"
                className="flex items-center gap-x-2 p-1 font-medium text-black dark:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6  fill-black  dark:fill-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 1 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 1 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z"
                    clipRule="evenodd"
                  />
                </svg>

                <a href="#new" className="flex items-center">
                  New
                </a>
              </Typography>
            </>
          )} */}
        </>
      )}
    </ul>
  );

  return (
    <Navbar
      fullWidth={true}
      className="sticky top-0 z-50 mx-auto min-w-full max-w-screen-xl px-4 py-2 border-none lg:px-8 lg:py-4 bg-nahida-300 text-black dark:bg-shogun-850 dark:text-white"
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between bg-transparent">
        <div className="px-4 cursor-pointer" onClick={switchMode}>
          {!darkMode ? (
            <img
              src={NightToggle}
              alt="logo"
              className="m-0 w-[35px] h-[35px]"
            />
          ) : (
            <img src={DayToggle} alt="logo" className="m-0 w-[35px] h-[35px]" />
          )}
        </div>
        {/* Brand */}
        <Typography
          as={Link}
          to="/"
          className="cursor-pointer py-1.5 font-medium"
        >
          {!darkMode ? (
            <img
              src={StoreLogoB}
              style={{
                height: "45px",
                objectFit: "cover",
                margin: "0rem 2rem 0rem 2rem",
              }}
            />
          ) : (
            <img
              src={StoreLogoW}
              style={{
                height: "45px",
                objectFit: "cover",
                margin: "0rem 2rem 0rem 2rem",
              }}
            />
          )}
        </Typography>

        <div className="block lg:hidden">
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 px-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6 stroke-black dark:stroke-white"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-black dark:stroke-white"
                fill="none"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            openNav ? "block" : "hidden"
          }`}
        >
          <div className="text-sm lg:flex-grow">{navList}</div>
          <div>
            <div
              className={`lg:inline-flex inline-block items-center border-0 gap-x-5 mb-1 pr-4`}
            >
              {user.isAdmin === false ? (
                <CartButton />
              ) : user.isAdmin === true ? (
                <Typography
                  as="li"
                  className="flex items-center pt-1"
                  style={{ margin: "0rem 2rem 0rem 0.5rem" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                  </svg>
                </Typography>
              ) : (
                <Typography
                  as={Link}
                  to="/login"
                  className="flex items-center pt-1"
                  style={{ margin: "0rem 2rem 0rem 0.5rem" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                  </svg>
                </Typography>
              )}

              <div className="">
                <SearchByName />
              </div>
              <div className="lg:pt-0 pt-4">
                <ProfileMenu login="login" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
