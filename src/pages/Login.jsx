import { useContext, useEffect, useState } from "react";
import { Input, Button, Checkbox, IconButton } from "@material-tailwind/react";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import { Back, Google, Github, Facebook } from "../images";

export default function Login() {
  // Allows us to consume the User context object and it's properties to use for user validation
  const { user, setUser } = useContext(UserContext);

  // State hooks to store the values of the input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // State to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(true);
  const [show, setShow] = useState(false);

  const google = () => {
    window.open("http://localhost:4004/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5173/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5173/auth/facebook", "_self");
  };

  function authenticate(e) {
    // Prevents page redirection via div submission
    e.preventDefault();
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.access !== "undefined") {
          // Set the email of the authenticated user in the local storage
          // Syntax: localStorage.setItem('propertyName', value);
          localStorage.setItem("token", data.access);
          window.location.replace("/");
          retrieveUserDetails(data.access);

          Swal.fire({
            title: "Login successful!",
            text: "Welcome User",
            icon: "success",
          });
        } else if (data.error === "No Email Found") {
          // alert(`Email not found`);
          Swal.fire({
            title: "No email found!",
            text: "Please register first.",
            icon: "error",
          });
        } else {
          // alert(`Check your login credentials`)
          Swal.fire({
            title: "Authentication failed.",
            text: "Check your login credentials",
            icon: "error",
          });
        }
      });
    // Clear input fields after submission
    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    // The token will be sent as part of the request's header indivation
    // We put "Bearer" in front of the token to follow implementation standards for JWTs
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin,
        });
      });
  };

  useEffect(() => {
    // Validation to enable submit button when all fields are populated and both passwords match
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    <div className=" flex items-center justify-center bg-nahida-650 dark:bg-shogun-300">
      <div className="rounded-3xl md:w-7/12 w-10/12 h-96 my-20 flex justify-center shadow-3xl  shadow-nahida-200 dark:shadow-black bg-white ">
        <div className="p-5 w-8/12 grid grid-flow-row justify-center">
          <h1 className="my-5 text-center lg:text-3xl text-lg font-bold">
            Login
          </h1>

          {show === false ? (
            <div className="my-5 grid grid-flow-row items-center gap-3 w-full">
              <Button
                className="font-bold text-md  bg-nahida-500 dark:bg-shogun-850"
                fullWidth={true}
                onClick={(e) => setShow(true)}
              >
                Sign In via Password
              </Button>
              <Button
                className="font-bold flex items-center text-md gap-3"
                fullWidth={true}
                onClick={google}
                color="red"
              >
                <img src={Google} alt="metamask" className="h-6 w-6" />
                Sign In with Google
              </Button>
              <Button
                className="font-bold flex items-center text-md gap-3"
                fullWidth={true}
                onClick={github}
                color="gray"
              >
                <img src={Github} alt="metamask" className="h-6 w-6" />
                Sign In with Github
              </Button>
              <Button
                className="font-bold flex items-center text-md gap-3 bg-blue-900"
                fullWidth={true}
                onClick={(e) => setShow(true)}
                // color="blue"
              >
                <img src={Facebook} alt="metamask" className="h-6 w-6" />
                Sign In with Facebook
              </Button>
            </div>
          ) : (
            <div>
              <div className="grid grid-flow-row items-center gap-8 w-full">
                <div className="absolute ml-[-4rem] ">
                  <IconButton
                    className="items-center justify-center h-12 w-12  bg-nahida-500 dark:bg-shogun-850"
                    onClick={(e) => setShow(false)}
                  >
                    <img src={Back} className="h-6 w-6" />
                  </IconButton>
                </div>
                <Input
                  size="lg"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=""
                />

                <div>
                  <div className="grid grid-flow-row items-center relative">
                    <div className="relative">
                      <Input
                        size="lg"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className=" absolute flex lg:left-64 md:left-56 left-40">
                      <Checkbox
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-3 h-3"
                          >
                            <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                            <path
                              fillRule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        }
                        value={showPassword}
                        onChange={() => setShowPassword((prev) => !prev)}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-center text-sm">
                    Don't have an account yet?{" "}
                    <Link
                      to="/register"
                      className=" text-amber-700 font-bold"
                      style={{ cursor: "pointer", textDecoration: "none" }}
                    >
                      Click here
                    </Link>{" "}
                    to register.
                  </p>
                </div>
              </div>
              <div className="grid grid-flow-col place-items-center w-full">
                <div className="mt-4 w-10/12 py-2">
                  {isActive ? (
                    <Button
                      className="font-bold"
                      fullWidth={true}
                      onClick={(e) => authenticate(e)}
                      color="blue"
                      type="submit"
                      id="submitBtn"
                    >
                      Login
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
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
