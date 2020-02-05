import React, { useState, useEffect } from "react";
import axios from "axios";
import { Router, Link, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import LoadingIndicator from "./components/LoadingIndicator";
import { Container, Row, Col } from "reactstrap";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // const [logIn, setLoggedIn] = useState(false);

  // const userIsLoggedIn = () => {

  // }

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
      <Navbar />

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
    </Container>
  );
}

export default App;
