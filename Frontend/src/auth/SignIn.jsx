import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { post } from "../Rest";
import { useNavigate } from "react-router-dom";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.spacing(3),
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  borderBottom: "1px solid #ccc",
});

const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
});

const StyledTextField = styled(TextField)({
  marginBottom: "1rem",
  marginTop: "1rem",
  width: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
});

const SignInPopup = ({ open, setinorout , changecookie }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (evt) => {
    evt.preventDefault();
    document.body.style.cursor = "wait"; // Change cursor to wait
    setLoading(true); // Set loading state to true

    try {
      const response = await post("login", { email, password });

      if (response.okk) {
        document.cookie = `token=${response.token};expires=${new Date(
          new Date().getTime() + 1 * 60 * 60 * 10000
        ).toUTCString()};`;

        toast.success("🦄 Log in Successfully !!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            zIndex: 9999999
          }
        });
        changecookie(document.cookie);
        navigate("/dashboard");
      } else {
        toast.warn(response.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            zIndex: 9999999
          }
        });
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          zIndex: 9999999
        }
      });
    } finally {
      setTimeout(() => {
        document.body.style.cursor = "default"; // Reset cursor after processing
      }, 1500);
      setLoading(false); // Set loading state to false after request completion
    }
  };

  return (
    <StyledDialog open={open} onClose={() => setinorout(null)}>
      <StyledDialogTitle>Sign In</StyledDialogTitle>
      <StyledDialogContent>
        <StyledTextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email Address"
        />
        <StyledTextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleSignIn}
          fullWidth
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </StyledButton>
        <StyledButton
          color="primary"
          onClick={() => setinorout(null)}
          fullWidth
        >
          Cancel
        </StyledButton>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default SignInPopup;
