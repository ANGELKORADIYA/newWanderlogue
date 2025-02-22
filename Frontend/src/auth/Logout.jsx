import React from "react";
import { toast } from "react-toastify";
import { Providecookies } from "../App";
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();

  try {
    document.cookie = "token=;expires=" + new Date(0).toUTCString();
    Providecookies("next done");
    toast.success("Logged out successfully!", { position: "bottom-center" });
    history.push("/login");
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Logout failed. Please try again.", { position: "bottom-center" });
  }
}

export default Logout;
