import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Button, Input } from "@material-tailwind/react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        title: "bad Request",
        icon: "error",
        text: "Passwords do not match",
      });

      return;
    }

    try {
      const token = localStorage.getItem("token"); // Replace with your actual JWT token
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_BASE_URL}/shop/users/update-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newPassword: password }),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Password reset successfully",
        });
        setPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Failed",
          icon: "error",
          text: errorData.message,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed",
        icon: "error",
        text: "An error occurred. Please try again.",
      });
    }
  };
  useEffect(() => {
    // Validation to enable submit button when all fields are populated and both passwords match
    if (password !== "" && confirmPassword !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [password, confirmPassword]);

  return (
    <div className="flex items-center justify-center">
      <div className=" w-10/12  h-4/6 m-5 flex justify-center bg-white shadow-3xl shadow-nahida-300 dark:shadow-black rounded-3xl">
        <div className="p-5 w-6/12 grid grid-flow-row justify-center">
          <h1 className="my-5 text-center lg:text-3xl text-lg  font-bold">
            Reset Password
          </h1>
          <div className="grid grid-flow-row gap-8 w-full">
            <Input
              size="lg"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=""
            />

            <div>
              <Input
                size="lg"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                <p className="text-center text-sm px-2 w-full text-pretty">
                  Your password must contain at least one number, one letter,
                  and one special character, and be at least 8 characters long.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-flow-col place-items-center w-full">
            <div className="my-4 w-10/12 py-2">
              {isActive ? (
                <Button
                  className="font-bold"
                  fullWidth={true}
                  onClick={(e) => handleResetPassword(e)}
                  color="blue"
                  type="submit"
                  id="submitBtn"
                >
                  Reset Password
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
                  Reset Password
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
