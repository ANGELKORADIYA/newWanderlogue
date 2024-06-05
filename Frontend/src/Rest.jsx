import React from "react";
import Cookies from "js-cookie";
const URL = "http://localhost:8383/";
export const post = async (url, payload) => {
  try {
    document.body.style.cursor = "wait"; 

    let cookies = document.cookie;
    console.log(payload);
    const response = await fetch(`${URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: Cookies.get("token"),
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }finally{
    document.body.style.cursor = "default"; 
    
  }
};
export const get = async (url) => {
  let cookies = document.cookie;
  const response = await fetch(`${URL}${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: Cookies.get("token"),
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};
