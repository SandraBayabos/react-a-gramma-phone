import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Button
} from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";

const SignUpForm = ({ toggle, setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [delay, setDelay] = useState(null);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleEmailInput = e => {
    setEmail(e.target.value);
    console.log(email);
  };

  const checkUsername = newUsername => {
    console.log("checking username");
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
      )
      .then(response => {
        console.log(response.data);
        if (response.data.valid) {
          setUsernameValid(true);
          setPasswordValid(true);
        } else {
          setUsernameValid(false);
          setPasswordValid(false);
        }
      });
  };

  const handleUsernameInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    clearTimeout(delay);
    const newUsername = e.target.value;
    setUsername(newUsername); // sandrabayabos

    // put each new keystroke into the queue
    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
    }, 500);
    // every time we set the delay to the new delay, which will give each new keystroke 500ms before it times out
    setDelay(newDelay);
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
      toast.danger("Passwords do not match!");
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
          toast.success(`Congratulations! Welcome ${username}`);
          localStorage.setItem("jwt", response.data.auth_token);
          sessionStorage.setItem("clickCount", 10);
          setLoggedIn(true);
        })
        .catch(error => {
          console.error(error.response); // so that we know what went wrong if the request failed
        });
    }
  };

  // to get the properties for your input field i.e. the red/green border
  const getInputProp = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 5) {
      return { invalid: true };
    }

    if (usernameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  // properties for password

  const getPasswordProp = () => {
    if (!password.length) {
      return null;
    }
    if (password.length <= 5) {
      return { invalid: true };
    }
    if (passwordValid) {
      return { valid: true };
    } else {
      return { invalid: false };
    }
  };

  // the form feedback part i.e. the wording below your input field
  const getFormFeedback = () => {
    if (!username.length) {
      return null;
    }

    if (username.length <= 5) {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }

    if (usernameValid) {
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
    } else {
      return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            onChange={handleEmailInput}
            type="email"
            placeholder="Enter email"
          />
          <FormFeedback>Sweet! that name is available</FormFeedback>
          <FormText>Enter a valid Email</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            value={username}
            onChange={handleUsernameInput}
            {...getInputProp()}
          />
          {getFormFeedback()}
          <FormText>Enter a username between 6 and 20 characters</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            onChange={handlePasswordInput}
            type="password"
            placeholder="Password"
          />
          <FormFeedback valid tooltip>
            Sweet! that name is available
          </FormFeedback>
          <FormText>Enter a memorable password</FormText>
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            onChange={handleConfirmPasswordInput}
            type="password"
            placeholder="Confirm Password"
          />
          <FormFeedback tooltip>Passwords must be the same</FormFeedback>
          <FormText>Example help text that remains unchanged.</FormText>
        </FormGroup>
        <Button color="primary" type="submit" value="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
