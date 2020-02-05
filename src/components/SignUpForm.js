import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const SignUpForm = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailInput = e => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handleUsernameInput = e => {
    setUsername(e.target.value);
    console.log(username);
  };

  const handlePasswordInput = e => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleConfirmPasswordInput = e => {
    setConfirmPassword(e.target.value);
    console.log(confirmPassword);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !username || !password || !confirmPassword) return;
    if (password !== confirmPassword) {
      console.log("The passwords do not match!");
    } else {
      console.log(
        `Signed up with email: ${email} and username: ${username} and passwords provided match.`
      );
      toggle();
      axios({
        method: "POST",
        url: "https://insta.nextacademy.com/api/v1/users/",
        data: {
          username: username,
          email: email,
          password: password
        }
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error.response); // so that we know what went wrong if the request failed
        });
    }
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

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleUsernameInput}
            type="text"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handlePasswordInput}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={handleConfirmPasswordInput}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
