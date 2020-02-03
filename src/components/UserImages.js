import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "react-graceful-image";
import { Container, Row, Col } from "reactstrap";

const UserImages = ({ userId }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
      .then(result => {
        const userImages = [...result.data];
        setImages(userImages);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, []);

  return (
    <>
      {images.map((image, index) => {
        return (
          <Image
            src={image}
            alt="user-images"
            className=""
            key={index}
            id={index}
          />
        );
      })}
    </>
  );
};

export default UserImages;
