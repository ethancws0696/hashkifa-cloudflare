import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthAPI from "../../../services/common/AuthAPI";
import Help from "../../common/Help";
export default function userHeader() {
  const router = useRouter();
  const [state, setState] = useState({ cookie: null });
  const [toggle, setToggle] = useState(false);
  const logOut = async () => {
    const AuthStr = "Bearer ".concat(state.cookie);
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
        router.push("/login");
      });
  };

  const handleToggleClass = () => {
    setToggle(!toggle);
    var el = document.getElementsByClassName("responsive-nav");
    el[0].classList.toggle("mystyle");
  };

  useEffect(() => {
    setState({ ...state, cookie: localStorage.getItem("hk_user_auth_ticket") });
  }, []);

  return (
    <div className="d-flex ">
      <Help />
      <div className="side-navigation responsive-nav">
        <div className="branding-top text-center">
          <Link href="/">
            <img src="../images/logo-nw.svg" alt="branding" loading="lazy" />
          </Link>
          <div
            className={
              toggle
                ? "toggle-responsive-nav active"
                : "none-1660 toggle-responsive-nav"
            }
            onClick={handleToggleClass}
          >
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>

        <div className="side-navigation-items">
          <ul className="list-unstyled">
            <li className={router.pathname == "/mypurchase" ? "active" : ""}>
              <Link href="/mypurchase">
                <a>
                  <div
                    className={
                      router.pathname == "/mypurchase"
                        ? "dummy-cons icons-main-3 active"
                        : "dummy-cons icons-main-3"
                    }
                  ></div>{" "}
                  My Purchases{" "}
                </a>
              </Link>
            </li>
            <li className={router.pathname == "/videos" ? "active" : ""}>
              <Link href="/videos">
                <a>
                  <div
                    className={
                      router.pathname == "/videos"
                        ? "dummy-cons icons-main-4 active"
                        : "dummy-cons icons-main-4"
                    }
                  ></div>{" "}
                  My Videos{" "}
                </a>
              </Link>
            </li>
            <li className={router.pathname == "/userProfile" ? "active" : ""}>
              <Link href="/userProfile">
                <a>
                  <div
                    className={
                      router.pathname == "/userProfile"
                        ? "dummy-cons ri-user-3-fill active"
                        : "dummy-cons ri-user-3-fill"
                    }
                  ></div>{" "}
                  Profile{" "}
                </a>
              </Link>
            </li>
          </ul>
          <div className="logout-btn">
            <a href="javascript:void(0)" onClick={logOut}>
              <i className="ri-shut-down-line line-height-normal me-3"></i> Log
              Out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
