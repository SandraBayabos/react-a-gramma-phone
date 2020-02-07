import React, { useState, useEffect } from "react";
import axios from "axios";
import { Router, Link, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import LoadingIndicator from "./components/LoadingIndicator";
import MyProfilePage from "./components/MyProfilePage";
import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // if I don't have jwt I am not logged in
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwt") !== null
  );

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) ?? null
  );

  // AXIOS CALL TO GET ALL USERS

  useEffect(() => {
    // performing a GET request
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then(result => {
        console.log(result.data);
        setIsLoading(false);
        const usersCopy = [...result.data];
        setUsers(usersCopy);
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error);
      });
  }, []);

  return (
    <Container fluid={true} className="App">
      <Navbar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <ToastContainer />

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Route
          exact
          path="/"
          component={props => {
            return <HomePage users={users} />;
          }}
        />
      )}
      <Route path="/users/:id">
        <UserProfilePage users={users} />
      </Route>
      <Route
        exact
        path="/profile"
        component={props => <MyProfilePage currentUser={currentUser} />}
      />
    </Container>
  );
}

export default App;
