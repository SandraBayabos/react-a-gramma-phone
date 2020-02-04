import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";

const UserProfilePage = ({ users }) => {
  const { id } = useParams();
  console.log(id);

  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    // performing a GET request
    axios
      .get(`https://insta.nextacademy.com/api/v1/images?userId=${id}`)
      .then(result => {
        console.log(result.data);
        const userImages = result.data;
        const userImagesCopy = [...userImages];
        setUserImages(userImagesCopy);
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error);
      });
  }, []);

  return (
    <Container fluid={true}>
      <Row>
        {users.map((user, index) => {
          if (user.id == id) {
            const currentUser = user;
            console.log(currentUser);
            return (
              <>
                <Col sm={4}>
                  <img
                    className="w-100"
                    src={currentUser.profileImage}
                    alt=""
                  />
                </Col>
                <Col>{currentUser.username}</Col>
              </>
            );
          }
        })}
      </Row>
      <Row>
        {userImages.map((image, index) => {
          return <img src={image} alt="feed..." key={index} />;
        })}
      </Row>
      ;
    </Container>
  );
};

export default UserProfilePage;
