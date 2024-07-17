import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/users/login", { // The proxy will forward this to your backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setLoading(false);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        // Optionally redirect to another page
        // window.location.href = "/dashboard";
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setMessage("Login failed: " + error.message);
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
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
  );
};

export default LoginForm;