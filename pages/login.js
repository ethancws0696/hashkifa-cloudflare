import Head from "next/head";
import LoginForm from "../components/common/LoginForm";
import Footer from "../components/user/footer/Footer";
import Header from "../components/user/header/Header";
import Router from "next/router";
import { useEffect, useState, useRef } from "react";

function Login() {
  useEffect(async () => {
    if (localStorage.getItem("hk_user_auth_ticket")) {
      Router.push("/");
    }
  }, []);
  return (
    <div className="main-wrapper">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hashkifa</title>
        <script
          src="//code.tidio.co/5yckg2ezfdkn9bztdbu4mcjsbylkgo4y.js"
          async
        ></script>
      </Head>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
}

export default Login;
