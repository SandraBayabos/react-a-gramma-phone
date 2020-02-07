import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const MyProfilePage = ({ currentUser }) => {
  const jwt = localStorage.getItem("jwt");
  console.log(currentUser.username);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://insta.nextacademy.com/api/v1/images/me",
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    }).then(result => {
      console.log(result);
    });
  }, []);

  if (!jwt || !currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <h1>Greetings {currentUser.username}</h1>
    </div>
  );
};

export default MyProfilePage;
