import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProvider } from "./UserContext";
import axios from "axios";

import {
  AdminPage,
  Cart,
  CreateProduct,
  Home,
  Login,
  PageNotFound,
  Products,
  Profile,
  Register,
  AllOrders,
  SetUserAdmin,
  ThankYou,
  UserOrderView,
  EditProfile,
} from "./pages";
import { AppNavbar, ProductView, Footer } from "./component";

function App() {
  const [user, setUser] = useState({ access: localStorage.getItem("token") });

  const [darkMode, setDarkMode] = useState(undefined);
  const [AuthUser, setAuthUser] = useState(null);

  // const getUser = async () => {
  //   try {
  //     const url = `${
  //       import.meta.env.VITE_APP_API_BASE_URL
  //     }/auth/google/login/success`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     setAuthUser(data.AuthUser._json);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      window.document.documentElement.classList.add("dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false");
      window.document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    }
  }, [darkMode]);

  const unsetUser = () => {
    localStorage.clear();
  };
  useEffect(() => {
    // console.log(user);
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        method: "GET",
        credentials: "include",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.user !== "undefined") {
          setUser({
            id: data.user._id,
            profile: data.user.profile,
            isAdmin: data.user.isAdmin,
            userFirstName: data.user.firstName,
          });
        } else {
          setUser({
            id: null,
            profile: null,
            isAdmin: null,
            userFirstName: null,
          });
        }
      });
  }, []);

  // useEffect(() => {
  //   // Update component state when the user context changes
  //   if (user) {
  //     setUser((prevUser) => {
  //       if (
  //         prevUser.id !== user.id ||
  //         prevUser.profile !== user.profile ||
  //         prevUser.isAdmin !== user.isAdmin ||
  //         prevUser.userFirstName !== user.userFirstName
  //       ) {
  //         // Do something with updated user information
  //         console.log("User information updated:", user);
  //       }
  //       return user;
  //     });
  //   }
  // }, [user]);
  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar darkMode={darkMode} setDarkMode={setDarkMode} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={<Products darkMode={darkMode} />}
            />
            <Route path="/shop/products/:productId" element={<ProductView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myProfile" element={<Profile />} />
            <Route path="editMyProfile" element={<EditProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/myOrders" element={<UserOrderView />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/createproduct" element={<CreateProduct />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/usertoadmin" element={<SetUserAdmin />} />
            <Route path="/allorders" element={<AllOrders />} />
          </Routes>
          <Footer darkMode={darkMode} />
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
