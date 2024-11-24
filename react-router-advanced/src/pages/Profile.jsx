import React from "react";
import { Outlet, Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h1>Profile Page</h1>
      <nav>
        <Link to="details">Profile Details</Link> | <Link to="settings">Profile Settings</Link>
      </nav>
      <Outlet /> {/* Nested routes will render here */}
    </div>
  );
};

export default Profile;
