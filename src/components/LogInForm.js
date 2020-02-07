import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Button
} from "reactstrap";

const LogInForm = ({ toggle, setLoggedIn, setCurrentUser, currentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameInput = e => {
    setUsername(e.target.value);
    console.log(username);
  };

  const handlePasswordInput = e => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!username || !password) return;
    console.log(
      `Signed up with username: ${username} and password: ${password}`
    );
    toggle();
    axios({
      method: "post",
      url: "https://insta.nextacademy.com/api/v1/login",
      data: {
        username: username,
        password: password
      }
    }).then(result => {
      console.log(result);
      localStorage.setItem("jwt", result.data.auth_token);
      localStorage.setItem("user", JSON.stringify(result.data.user));
      const loggedInUser = result.data.user;
      setLoggedIn(true);
      setCurrentUser(loggedInUser);
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            onChange={handleUsernameInput}
            type="text"
            placeholder="Enter username"
          />
          <FormFeedback>
            We'll never share your email with anyone else.
          </FormFeedback>
        </FormGroup>

        <FormGroup controlId="formBasicPassword">
          <Label>Password</Label>
          <Input
            onChange={handlePasswordInput}
            type="password"
            placeholder="Password"
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LogInForm;
