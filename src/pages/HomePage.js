import React from "react";
import UserImages from "../components/UserImages";

const HomePage = ({ users, images }) => {
  return (
    <div className="landing-page">
      <h1 style={{ marginTop: "0" }}>Home Page</h1>

      <div className="users-display">
        {users.map((user, index) => {
          const userId = user.id;
          return (
            <div className="user-display" key={index} id={index}>
              <h2>{user.username}</h2>
              <div className="profile-image">
                <img src={user.profileImage} alt="profile-image" />
              </div>

              <UserImages images={images} userId={userId} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
