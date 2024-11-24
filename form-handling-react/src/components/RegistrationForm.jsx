import React, { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setError("");
    console.log("Form Submitted:", { username, email, password });
    alert("User registered successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form (Controlled Components)</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username} // Explicitly setting the value for controlled components
          onChange={(e) => setUsername(e.target.value)} // Updating state on change
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email} // Explicitly setting the value for controlled components
          onChange={(e) => setEmail(e.target.value)} // Updating state on change
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password} // Explicitly setting the value for controlled components
          onChange={(e) => setPassword(e.target.value)} // Updating state on change
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
