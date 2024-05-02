import Head from "next/head";
import FriendRegisterForm from "../components/common/FriendRegistration";
import Footer from "../components/user/footer/Footer";
import Header from "../components/user/header/Header";
import { useEffect, useState, useRef } from "react";
import Router, { useRouter } from "next/router";
import AuthAPI from "../services/common/AuthAPI";

export default function FriendSignup() {
  const router = useRouter();
  const [inviteData, setInviteData] = useState({ token: null, email: null });
  const logOut = async (token) => {
    const AuthStr = "Bearer ".concat(token);
    await AuthAPI.logout(AuthStr)
      .then((response) => {
        if (response.data.status) {
          localStorage.removeItem("hk_user_auth_ticket");
          localStorage.removeItem("hk_user_auth_ticket_expire");
          localStorage.removeItem("hk_user_name");
          localStorage.removeItem("hk_user_email");
          window.location = window.location.origin;
        }
      })
      .catch((error) => {
        localStorage.removeItem("hk_user_auth_ticket");
        localStorage.removeItem("hk_user_auth_ticket_expire");
        localStorage.removeItem("hk_user_name");
        localStorage.removeItem("hk_user_email");
        router.push("/invite");
      });
  };
  useEffect(() => {
    if (localStorage.getItem("hk_user_auth_ticket")) {
      logOut(localStorage.getItem("hk_user_auth_ticket"));
    }
    if (router.query.token !== null && router.query.email !== null) {
      var data = { token: router.query.token, email: router.query.email };
      setInviteData({ ...data });
    }
  }, [router]);

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
      <FriendRegisterForm data={inviteData} />
      <Footer />
    </div>
  );
}
