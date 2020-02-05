import React, { useState } from "react";
import { Form, Button, ModalFooter } from "react-bootstrap";

const LogInForm = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailInput = e => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePasswordInput = e => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) return;
    console.log(`Signed up with email: ${email} and password: ${password}`);
    // setLoggedIn(true);
    toggle();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleEmailInput}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handlePasswordInput}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LogInForm;
