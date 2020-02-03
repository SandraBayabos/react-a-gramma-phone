import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      {images.map((image, index) => {
        return (
          <div className="user-images" key={index} id={index}>
            <img src={image} alt="user-images" className="" />
          </div>
        );
      })}
    </div>
  );
};

export default UserImages;
