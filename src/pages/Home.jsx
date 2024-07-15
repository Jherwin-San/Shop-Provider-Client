import { useContext, useEffect, useState } from "react";
import {
  MainHome,
  NewProducts,
  PopularProducts,
  SecondMain,
} from "../component";
import UserContext from "../UserContext";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const getUser = () => {
    console.log(token);
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        console.log(resObject);
        // setUser({
        //   id: resObject.user._id,
        //   isAdmin: resObject.user.isAdmin,
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);
  return (
    <div className="overflow-x-hidden min-h-screen bg-nahida-650 dark:bg-shogun-300">
      <MainHome />
      <PopularProducts />
      <SecondMain />
      <NewProducts />
    </div>
  );
};

export default Home;
