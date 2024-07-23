import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTheme,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./LoginComponent.scss";

const RegisterComponent: React.FC<{
  onClose: () => void;
  onSwitch: () => void;
  open: boolean;
}> = ({ onClose, onSwitch, open }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Custom variables
  const fsFontsize = "0.875rem";

  const buttonStyle = {
    color: theme.palette.primary.dark,
    borderColor: "transparent",
    borderRadius: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "0.875rem",
    height: "2rem",
    borderWidth: "0.1rem",
    borderStyle: "solid",
    transition: "border-color 0.2s ease-in-out",
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  };

  return (
    open && (
      <>
        <div className="modal-overlay" onClick={onClose}></div>
        <Box className="register-modal" ref={modalRef}>
          <Box className="register-modal-header">
            <Typography variant="h6" className="register-modal-title">
              Register
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit} className="register-modal-form">
            <TextField
              label="Email"
              type="email"
              fullWidth
              className="register-modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{ style: { fontSize: fsFontsize } }}
              InputLabelProps={{ style: { fontSize: fsFontsize } }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              className="register-modal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                style: { fontSize: fsFontsize },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{ color: theme.palette.primary.main }}
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { fontSize: fsFontsize } }}
            />
            <Button type="submit" variant="contained" fullWidth>
              Register
            </Button>
            {message && (
              <Typography color="error" align="center" mt={2}>
                {message}
              </Typography>
            )}
          </form>
          <Box className="register-modal-footer">
            <Typography variant="body2">Already a Member?</Typography>
            <Button variant="text" onClick={onSwitch} sx={buttonStyle}>
              Login
            </Button>
          </Box>
        </Box>
      </>
    )
  );
};

export default RegisterComponent;
