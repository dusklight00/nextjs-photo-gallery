"use client";

import { GoogleLogin } from "@react-oauth/google";
import instance from "../axios";
import { useToast } from "./Toast";

const GoogleLoginButton = () => {
  const { showToast, ToastContainer } = useToast();

  const handleLogin = async (credentialResponse: any) => {
    const username = encodeURIComponent(credentialResponse.clientId);
    const password = encodeURIComponent(
      credentialResponse.credential.substring(0, 30)
    );

    try {
      console.log("Login successful:", credentialResponse);
      const response = await instance.post("/login", {
        username,
        password,
      });

      console.log(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.log("User does not exist, trying to register...");
        try {
          console.log(username, password);
          const registerResponse = await instance.post("/register", {
            username,
            password,
            email: "google@user",
          });

          if (registerResponse.status === 200) {
            console.log("Registration successful, trying to login again...");
            const loginResponse = await instance.post("/login", {
              username,
              password,
            });
            console.log(loginResponse.data);
            localStorage.setItem("userId", loginResponse.data.user.username);
            showToast("Login successful!", "success");
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          } else {
            console.error("Registration failed", registerResponse.data);
            showToast("Registration failed!", "error");
          }
        } catch (registerError) {
          console.error("Registration request failed", registerError);
          showToast("Registration request failed!", "error");
        }
      } else {
        console.error("Login request failed", error);
        showToast("Login request failed!", "error");
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleLoginButton;
