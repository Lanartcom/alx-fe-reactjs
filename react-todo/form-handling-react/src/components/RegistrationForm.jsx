import React, { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // State for field-specific errors

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for each field
    const validationErrors = {};
    if (!username) validationErrors.username = "Username is required.";
    if (!email) validationErrors.email = "Email is required.";
    if (!password) validationErrors.password = "Password is required.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if any validation fails
      return;
    }

    setErrors({}); // Clear errors if validation passes
    console.log("Form Submitted:", { username, email, password });
    alert("User registered successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form (Controlled Components)</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username} // Explicitly setting the value for controlled components
          onChange={(e) => setUsername(e.target.value)} // Updating state on change
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email} // Explicitly setting the value for controlled components
          onChange={(e) => setEmail(e.target.value)} // Updating state on change
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password} // Explicitly setting the value for controlled components
          onChange={(e) => setPassword(e.target.value)} // Updating state on change
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
