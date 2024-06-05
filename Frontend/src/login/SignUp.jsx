import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { post } from "../Rest"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.spacing(3),
    width: "23%",
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
});

const StyledButton = styled(Button)({
  marginTop: "1rem",
});

const SignUpPopup = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    user: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleSignUp = async (evt) => {
    evt.preventDefault();

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
        navigate("/login");
        props.onClose();
      } else {
        toast.warn(response.message);
      }
    } catch (error) {
      console.error("Sign up failed:", error);
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
          sx={{ width: "100%" }}
        />
        <StyledTextField
          label="Email"
          variant="outlined"
          value={state.email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          sx={{ width: "100%" }}
        />
        <StyledTextField
          label="Password"
          variant="outlined"
          type="password"
          value={state.password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
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
          sx={{ width: "100%" }}
        />
        <StyledButton
          variant="contained"
          onClick={handleSignUp}
          color="primary"
          sx={{ width: "100%" }}
        >
          Sign Up
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
