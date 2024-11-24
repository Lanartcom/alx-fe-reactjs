import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Validation logic
    if (!username) {
      setErrors("Username is required.");
      return;
    }
    if (!email) {
      setErrors("Email is required.");
      return;
    }
    if (!password) {
      setErrors("Password is required.");
      return;
    }

    setErrors("");
    console.log("Submitted Data:", formData);

    // Mock API request simulation
    setTimeout(() => {
      alert("User registered successfully!");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration (Controlled Components)</h2>
      {errors && <p style={{ color: "red" }}>{errors}</p>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
