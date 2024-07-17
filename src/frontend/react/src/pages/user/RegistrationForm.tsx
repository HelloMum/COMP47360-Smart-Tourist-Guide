import React, { useState } from "react";

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
            "Error:",
            response.status,
            response.statusText,
            errorText
        );
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  return (
      <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
      >
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
          <label>Password:</label>
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
  );
};

export default RegistrationForm;