import { useEffect, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(e) {
    // Prevents page redirection via form submission
    e.preventDefault();

    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Registered successfully") {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");
          localStorage.setItem("token", data.token);
          window.location.replace("/");
          Swal.fire({
            title: "Registration is successful!",
            text: `Welcome to the shop, new ${data.firstName}!`,
            icon: "success",
          });
        } else if (data.error === "User already registered") {
          Swal.fire({
            title: "Duplicate email found!",
            text: "Email already registered",
            icon: "error",
          });
        } else if (data.error === "Mobile number invalid") {
          Swal.fire({
            title: "Entered data is invalid",
            text: "Mobile number is invalid",
            icon: "error",
          });
        } else if (
          data.error ===
          "Password must contain at least one number, one letter, and one special character, and be at least 8 characters long"
        ) {
          Swal.fire({
            title: "Entered data is invalid",
            text: "Password must contain at least one number, one letter, and one special character, and be at least 8 characters long",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Please try again",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      });
  }

  return (
    <div className="flex items-center justify-center  bg-nahida-650 dark:bg-shogun-300 overflow-x-hidden">
      <div className="rounded-3xl shadow-xl md:w-7/12 w-10/12 lg:h-4/6 h-[38rem] lg:my-20 my-10 flex items-center justify-center shadow-nahida-200 dark:shadow-black bg-white md:px-20 px-10 ">
        <div className="lg:py-10 py-10 lg:w-6/12 w-full grid grid-flow-row justify-center">
          <h1 className="my-5 text-center lg:text-3xl text-lg font-bold">
            Account Registration
          </h1>
          <div className="grid grid-flow-row gap-8 w-full">
            <div>
              <Input
                size="lg"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mt-2 items-center px-3 hidden lg:flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-center text-sm px-2">
                  We'll never share your email with anyone else.
                </p>
              </div>
            </div>
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
            <Input
              size="lg"
              label="Mobile Number"
              type="number"
              value={mobileNo}
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
              onChange={(e) => setMobileNo(e.target.value)}
            />
            <div>
              <Input
                size="lg"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mt-2 items-center px-3 hidden lg:grid grid-flow-col ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-center text-sm px-2">
                  Your password must contain at least one number, one letter,
                  and one special character, and be at least 8 characters long.
                </p>
              </div>
            </div>
            <div>
              <Input
                size="lg"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p className="mt-2 text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className=" text-amber-700 font-bold"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  Click here
                </Link>{" "}
                to login.
              </p>
            </div>
          </div>
          <div className="grid grid-flow-col place-items-center w-full">
            <div className="mt-4 w-10/12 py-4">
              {isActive ? (
                <Button
                  className="font-bold"
                  fullWidth={true}
                  onClick={(e) => registerUser(e)}
                  color="blue"
                  type="submit"
                  id="submitBtn"
                >
                  Register
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
                  Register
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
