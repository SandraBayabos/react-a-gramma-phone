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
            <Col className="" md={12} sm={6} key={index} id={index}>
              <Row className="align-center d-flex w-100 justify-content-center">
                <Link className="text-center" to={`users/${userId}`}>
                  <h2>{user.username}</h2>
                </Link>
              </Row>
              <Row className="d-flex justify-content-center">
                <Col lg={2} md={4} sm={12}>
                  <Image
                    className="profile-image w-100"
                    src={user.profileImage}
                    alt="profile"
                    width="100px"
                  />
                </Col>
              </Row>
            </Col>
            <Col
              className="user-images d-flex flex-wrap justify-content-around"
              md={12}
            >
              <UserImages images={images} userId={userId} />
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default HomePage;
