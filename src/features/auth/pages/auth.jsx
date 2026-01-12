import React, { useState } from "react";
import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/signup/SignupForm";

const AuthPage = () => {
  const [isLogin] = useState(true);

  return <div>{isLogin ? <LoginForm /> : <SignupForm />}</div>;
};

export default AuthPage;
