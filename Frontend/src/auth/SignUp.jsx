import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { post } from "../Rest"; // Assuming post is the function for making HTTP POST requests
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.spacing(3),
    width: "23%",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(() => ({
  display: "flex",
  alignItems: "center",
  padding: "1rem",
  borderBottom: "1px solid #ccc",
}));

const StyledDialogContent = styled(DialogContent)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
}));

const StyledTextField = styled(TextField)(() => ({
  marginBottom: "1rem",
  marginTop: "1rem",
}));

const StyledButton = styled(Button)(() => ({
  marginTop: "1rem",
}));

const SignUpPopup = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    user: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for handling request

  const handleSignUp = async (evt) => {
    evt.preventDefault();

    if (loading) return; // Prevent multiple submissions

    setLoading(true); // Set loading state to true

    document.body.style.cursor = "wait"; // Change cursor to wait for the entire body

    const { user, email, password, confirmpassword } = state;
    try {
      const response = await post("signup", {
        user,
        email,
        password,
        confirmpassword,
      });

      if (response.okk) {
        toast.success("🦄 Sign Up Successfully !!");
        props.onSignUpSuccess()
        navigate("/login");
      } else {
        toast.warn(response.message);
      }
    } catch (error) {
      console.error("Sign up failed:", error);
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
      document.body.style.cursor = "default"; // Reset cursor to default after processing
    }
  };

  return (
    <StyledDialog open={props.open} onClose={() => props.setinorout(null)}>
      <StyledDialogTitle>Sign Up</StyledDialogTitle>
      <StyledDialogContent>
        <StyledTextField
          label="User"
          variant="outlined"
          value={state.user}
          onChange={(e) => setState({ ...state, user: e.target.value })}
          required
          aria-label="User Name"
          sx={{ width: "100%" }}
        />
        <StyledTextField
          label="Email"
          variant="outlined"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          required
          aria-label="Email Address"
          sx={{ width: "100%" }}
        />
        <StyledTextField
          label="Password"
          variant="outlined"
          type="password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          required
          aria-label="Password"
          sx={{ width: "100%" }}
        />
        <StyledTextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={state.confirmpassword}
          onChange={(e) =>
            setState({ ...state, confirmpassword: e.target.value })
          }
          required
          aria-label="Confirm Password"
          sx={{ width: "100%" }}
        />
        <StyledButton
          variant="contained"
          onClick={handleSignUp}
          color="primary"
          sx={{ width: "100%" }}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Signing Up..." : "Sign Up"} {/* Change button text based on loading state */}
        </StyledButton>
        <StyledButton
          color="primary"
          onClick={() => props.setinorout(null)}
          sx={{ width: "100%" }}
        >
          Cancel
        </StyledButton>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default SignUpPopup;
