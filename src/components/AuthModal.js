import React, { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import {
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavItem
} from "reactstrap";

const AuthModal = ({ loggedIn, setLoggedIn }) => {
  const [modal, setModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const toggle = () => setModal(!modal);

  const toggleLogInAndSignUp = () => {
    if (showLogin) {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem("jwt");
  };

  return (
    <>
      <NavLink>
        <NavLink onClick={toggle}>{loggedIn ? "Logged In" : "Log In"}</NavLink>
        {loggedIn ? <NavLink onClick={logOut}>Log Out</NavLink> : ""}

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {showLogin ? "Log In" : "Sign Up"}
          </ModalHeader>
          <ModalBody>
            {showLogin ? (
              <LogInForm
                showLogin={showLogin}
                toggleLogInAndSignUp={toggleLogInAndSignUp}
                toggle={toggle}
                setLoggedIn={setLoggedIn}
              />
            ) : (
              <SignUpForm
                showLogin={showLogin}
                toggleLogInAndSignUp={toggleLogInAndSignUp}
                toggle={toggle}
                setLoggedIn={setLoggedIn}
              />
            )}
          </ModalBody>
          <ModalFooter>
            {showLogin ? "Don't have an account?" : "Already have an account?"}
            <Button
              color="primary"
              onClick={
                showLogin ? () => setShowLogin(false) : () => setShowLogin(true)
              }
            >
              {showLogin ? "Sign Up" : "Log In"}
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </NavLink>
    </>
  );
};

export default AuthModal;
