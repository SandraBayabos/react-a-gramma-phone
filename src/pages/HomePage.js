import React from "react";
import UserImages from "../components/UserImages";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import CommentBox from "../components/CommentBox";
import Image from "react-graceful-image";

const HomePage = ({ users, images }) => {
  return (
    <>
      <h1 style={{ marginTop: "0" }}>Home Page</h1>

      {users.map((user, index) => {
        const userId = user.id;
        return (
          <Row className="user-container">
            <Col
              className="d-flex justify-content-center"
              md={12}
              key={index}
              id={index}
            >
              <Link to="users/{userId}" className="align-center">
                <h2>{user.username}</h2>
              </Link>
              <Image
                className="profile-image"
                src={user.profileImage}
                alt="profile"
                width="150px"
              />
            </Col>
            <Col className="user-images" md={12}>
              <UserImages images={images} userId={userId} />
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default HomePage;
