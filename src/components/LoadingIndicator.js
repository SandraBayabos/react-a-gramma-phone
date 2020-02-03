import React from "react";
import Loader from "../images/loading.gif";
import { Container, Row, Col } from "reactstrap";

const LoadingIndicator = () => {
  return (
    <Col>
      <Row className="justify-content-md-center">
        <img id="loader" src={Loader} alt="loading..." />
      </Row>
    </Col>
  );
};

export default LoadingIndicator;
