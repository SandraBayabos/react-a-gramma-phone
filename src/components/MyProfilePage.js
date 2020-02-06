import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfilePage = () => {
  const jwt = localStorage.getItem("jwt");

  axios({
    method: "get",
    url: "https://insta.nextacademy.com/api/v1/images/me",
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }).then(result => {
    console.log(result);
  });

  return (
    <div>
      <h1>My Profile Page</h1>
    </div>
  );
};

export default MyProfilePage;
