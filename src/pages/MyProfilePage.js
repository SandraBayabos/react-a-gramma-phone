import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";

const MyProfilePage = ({ currentUser }) => {
  const jwt = localStorage.getItem("jwt");

  const [currentUserImages, setCurrentUserImages] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://insta.nextacademy.com/api/v1/images/me",
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(result => {
        console.log(result);
        console.log(result.data);

        const currentUserImagesCopy = [...result.data];
        setCurrentUserImages(currentUserImagesCopy);
      })
      .catch(error => {
        console.error(error.response); // so that we know what went wrong if the request failed
      });
  }, []);

  if (!jwt || !currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <Container fluid={true}>
      <Row>
        <Col md={12} className="text-center">
          <h1>Greetings {currentUser.username}</h1>
        </Col>
        <Col className="text-center" md={12}>
          <img src={currentUser.profile_picture} />
        </Col>
      </Row>
      <Row>
        {currentUserImages.map((image, index) => {
          return (
            <Col key={index}>
              <StyledImg src={image} alt="userImages" />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default MyProfilePage;

const StyledImg = styled.img`
  width: 30vw;
`;
