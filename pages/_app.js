import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "../styles/fonts/stylesheet.css";
import "../styles/fonts/icomoon/style.css";
import "../styles/css/global.css";
import "../styles/css/stylesheet.css";
import "../styles/navigation/header.css";
import "../styles/css/custom.css";
import "../styles/footer/footer.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    var myDate = new Date();
    myDate.setHours(myDate.getHours() + 24);
    localStorage.setItem("hk_user_auth_ticket_expire", myDate.getTime());
    var tokenExpire = localStorage.getItem("hk_user_auth_ticket_expire");
    if (tokenExpire < new Date().getTime()) {
      localStorage.removeItem("hk_user_auth_ticket");
      localStorage.removeItem("hk_user_auth_ticket_expire");
      localStorage.removeItem("hk_user_name");
      localStorage.removeItem("hk_user_email");
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
