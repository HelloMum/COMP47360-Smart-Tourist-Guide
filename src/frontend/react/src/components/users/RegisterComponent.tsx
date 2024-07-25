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
    // transition: "border-color 0.2s ease-in-out",
    // "&:hover": {
    //   borderColor: theme.palette.primary.main,
    // },
  };

  return (
    open && (
      <>

        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            zIndex: 1200,
          }}
          onClick={onClose}
        ></Box>




        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "330px",
            // maxWidth: "300px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "25px 30px",
            zIndex: 1300,
      
          }}
          ref={modalRef}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ margin: 0 }}>
              Register
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>



          <form onSubmit={handleSubmit} style={{ marginTop: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", height:'180px' }}>



          <TextField
  label="Email"
  type="email"
  fullWidth
  sx={{
    marginBottom: "15px",
    '& .MuiInputBase-root': { height: '45px' },
    '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
    '& .MuiInputLabel-shrink': { transform: 'translate(14px, -6px) scale(0.75)' },
    '& .MuiInputBase-input': { padding: '14px' }
  }}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  InputProps={{ 
    style: { fontSize: fsFontsize, height: '45px' },
  }}
  InputLabelProps={{ style: { fontSize: fsFontsize } }}
/>


<TextField
  label="Password"
  type={showPassword ? "text" : "password"}
  fullWidth
  sx={{
    marginBottom: "20px",
    '& .MuiInputBase-root': { height: '45px' },
    '& .MuiInputLabel-root': { transform: 'translate(14px, 14px) scale(1)' },
    '& .MuiInputLabel-shrink': { transform: 'translate(14px, -6px) scale(0.75)' },
    '& .MuiInputBase-input': {
      padding: '14px',
      fontSize: fsFontsize,
      ...(showPassword ? {} : {
        '-webkit-text-security': 'disc',
        fontSize: '24px', 
      })
    }
  }}
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






 <Button
  type="submit"
  variant="contained"
  fullWidth
  sx={{
    borderRadius: '20px',
    boxShadow: 0,
    '&:hover': {
      boxShadow: 'none',
    },
  }}
>
  Register
</Button>

            
            {message && (
              <Typography color="error" align="center" mt={2}>
                {message}
              </Typography>
            )}
          </form>



          <Box sx={{ marginTop: "10px", display: "flex", justifyContent: "right", alignItems: "center" }}>
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
