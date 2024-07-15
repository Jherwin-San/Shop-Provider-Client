import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";

export default function SetAdmin({ userId, isAdmin, fetchData }) {
  const switchAccess = (user) => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/users/set-as-admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId: user }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "User granted with admin access",
          });
          fetchData();
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return isAdmin ? (
    <Button
      color="red"
      className="w-[6rem]"
      onClick={(e) => {
        switchAccess(userId);
      }}
    >
      Admin
    </Button>
  ) : (
    <Button
      color="green"
      className="w-[6rem]"
      onClick={(e) => {
        switchAccess(userId);
      }}
    >
      User
    </Button>
  );
}
