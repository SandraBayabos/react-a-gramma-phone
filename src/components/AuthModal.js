import React, { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import {
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

const AuthModal = () => {
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

  return (
    <>
      <NavLink>
        <NavLink color="primary" onClick={toggle}>
          Log In
        </NavLink>
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
              />
            ) : (
              <SignUpForm
                showLogin={showLogin}
                toggleLogInAndSignUp={toggleLogInAndSignUp}
                toggle={toggle}
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
