import React, { useState } from "react";
import { Form, FormGroup, FormText, Input, Button, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";

const StyledCard = styled.div`
  height: 60vh;
  width: 60vw;
  position: relative;
  border: 1px solid white;
  border-radius: 20px;
  margin-top: 5%;
  background: #2b4141;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

const StyledImg = styled.img`
  height: 80%;
`;

const UploadPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");

  const history = useHistory();
  console.log(history);

  const handleFile = e => {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));

    setImageFile(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    let formData = new FormData();

    formData.append("image", imageFile);

    axios
      .post("https://insta.nextacademy.com/api/v1/images/", formData, {
        headers: { Authorization: `Bearer ${jwt}` }
      })
      .then(response => {
        if (response.data.success) {
          console.log(response.data);
          setMessage("Image Uploaded Successfully!");
          setPreviewImage(null);
          setImageFile(null);
          history.push("/profile");
          toast.success("Successfully uploaded your picture!");
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <>
      <Row className="d-flex justify-content-center mb-4">
        <StyledCard className="card">
          {previewImage ? (
            <StyledImg src={previewImage} />
          ) : (
            <StyledHeader className="text-center">
              {message ? message : "Live Preview"}
            </StyledHeader>
          )}
        </StyledCard>
      </Row>

      <Row className="text-center d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="file"
              name="image-file"
              onChange={handleFile}
              multiple="false"
            />
            <FormText color="muted">
              Make sure the image being uploaded is a supported format.
            </FormText>
          </FormGroup>
          <Button type="submit" color="primary">
            Upload
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default UploadPage;
