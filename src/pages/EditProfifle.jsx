import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function EditProfile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({});

  useEffect(() => {
    // console.log(user);
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
  }, []);

  return user.id === null ? (
    <Navigate to="/login" />
  ) : (
    <div className="  flex flex-row pb-28 justify-center items-center bg-nahida-650 dark:bg-shogun-300">
      <div className="grid ">
        <div className="grid grid-flow-col">
          <div className="p-5 grid grid-flow-row">
            <div className="grid md:grid-cols-2 grid-rows-1 text-white dark:text-black pt-10">
              <div className="pb-5 flex justify-center">
                <img
                  src={details.profile}
                  className=" rounded-full object-cover h-[16rem] w-[16rem]"
                />{" "}
              </div>
              <div className="py-10 grid grid-flow-row">
                <h1 className="py-4 font-bold text-4xl ">Welcome Back!</h1>
                <hr className="lg:h-3 h-1 lg:w-[30rem] w-[11rem] bg-nahida-300 dark:bg-shogun-850 border rounded-lg border-5" />
                <h2 className="mt-3 font-bold text-2xl">{`${details.firstName} ${details.lastName}`}</h2>
                <h3 className="mt-3 font-body text-xl">{details.email}</h3>
                <h3 className="mt-3 font-medium text-xl">{details.mobileNo}</h3>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="h-[24rem]">
          <div className="flex justify-center items-center">
            <ResetPassword />
          </div>
        </div> */}
      </div>
    </div>
  );
}
