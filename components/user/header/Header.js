import logo from "/public/images/logo-nw.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import AuthAPI from "../../../services/common/AuthAPI";
import Router, { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import { Dropdown } from "react-bootstrap";
import Help from "../../common/Help";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [state, setState] = useState({ toggleClass: false, cookie: null });
  const router = useRouter();
  const handleLiClick = () => {
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-hidden");
    document
      .getElementsByClassName("credential-search")[0]
      .classList.remove("op-light");
    document
      .getElementsByClassName("navbar-toggler")[0]
      .classList.remove("change");
  };
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
  useEffect(() => {
    const el_autohide = document.querySelector(".autohide");
    setState({ ...state, cookie: localStorage.getItem("hk_user_auth_ticket") });

    const navbar = document.querySelector(".main-nav");
    const onScroll = () => {
      const scroll = document.documentElement.scrollTop;

      if (scroll < 0) {
        if (document.querySelector(".fixed-top").length) {
          document.querySelector(".fixed-top").style.top = "0";
        }
      }
    };

    // Use the function
    window.addEventListener("scroll", onScroll);
    const showAnim = gsap
      .from(".fixed-top", {
        yPercent: -130,
        paused: true,
        duration: 0.1,
      })
      .progress(1);

    ScrollTrigger.create({
      start: "+=10",
      end: 99999,
      toggleClass: "activation",
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      },
    });
  }, []);

  const handleToggleClass = () => {
    setState({ ...state, toggleClass: !state.toggleClass });
    document
      .getElementsByTagName("body")[0]
      .classList.toggle("overflow-hidden");
    document
      .getElementsByClassName("credential-search")[0]
      .classList.toggle("op-light");
    //document.getElementById('collapsibleNavbar').classList.toggle("show");
  };

  const handleBrandClick = () => {
    if (
      document
        .getElementsByTagName("body")[0]
        .classList.contains("overflow-hidden")
    ) {
      setState({ ...state, toggleClass: false });
      document
        .getElementsByTagName("body")[0]
        .classList.remove("overflow-hidden");
      document
        .getElementsByClassName("credential-search")[0]
        .classList.remove("op-light");
    }
  };

  return (
    <>
      <Help />
      <div className="main-nav autohide fixed-top">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
          <div className="container-fluid">
            <Link href="/">
              <span
                className="navbar-brand order-2 order-lg-1"
                onClick={handleBrandClick}
              >
                <img src={logo.src} alt="" loading="lazy" />
              </span>
            </Link>
            <button
              className={
                state.toggleClass
                  ? "navbar-toggler order-1 order-lg-2 change"
                  : "navbar-toggler order-1 order-lg-2"
              }
              onClick={handleToggleClass}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavbar"
            >
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </button>
            <div
              className={
                state.toggleClass
                  ? "show collapse navbar-collapse order-4 order-lg-2"
                  : "collapse navbar-collapse order-4 order-lg-2"
              }
              id="collapsibleNavbar"
            >
              <ul className="navbar-nav w-100 align-items-center">
                {/* <li className="nav-item active">
                    <Link href="#home"><a className="nav-link" href="/">home </a></Link>
                    </li> */}
                <li className="nav-item" onClick={handleBrandClick}>
                  <a href="/#film">
                    <span
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target=".navbar-collapse.show"
                    >
                      Films
                    </span>
                  </a>
                </li>
                <li className="nav-item" onClick={handleBrandClick}>
                  <a href="/#about">
                    <span
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target=".navbar-collapse.show"
                    >
                      About
                    </span>
                  </a>
                </li>
                <li className="nav-item" onClick={handleBrandClick}>
                  <a href="/#soundbites">
                    <span
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target=".navbar-collapse.show"
                    >
                      Videos
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="nav-link">
                      Contact
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleLiClick}>
                        <Link href="/contact">
                          <span
                            className="nav-link"
                            data-bs-toggle="collapse"
                            data-bs-target=".navbar-collapse.show"
                          >
                            Contact
                          </span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLiClick}>
                        <Link href="/#share">
                          <span
                            data-bs-toggle="collapse"
                            data-bs-target=".navbar-collapse.show"
                            class="nav-link"
                          >
                            Share Your Story
                          </span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLiClick}>
                        <Link href="/contact">
                          <span
                            className="nav-link"
                            data-bs-toggle="collapse"
                            data-bs-target=".navbar-collapse.show"
                          >
                            Support
                          </span>
                        </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item" onClick={handleLiClick}>
                  <Link href="/sponsorships">
                    <span
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target=".navbar-collapse.show"
                    >
                      Sponsorships
                    </span>
                  </Link>
                </li>
                {state.cookie ? (
                  <li className="nav-item" onClick={handleLiClick}>
                    <Link href="/videos">
                      <span
                        className="nav-link"
                        data-bs-toggle="collapse"
                        data-bs-target=".navbar-collapse.show"
                      >
                        My Videos
                      </span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li className="nav-item" onClick={handleLiClick}>
                  <Link href="/faq">
                    <span
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target=".navbar-collapse.show"
                    >
                      FAQs
                    </span>
                  </Link>
                </li>
                <li className="nav-item" onClick={handleLiClick}>
                  <Link href="/#subscribe">
                    <span
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target=".navbar-collapse.show"
                    >
                      Subscribe
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="credential-search order-3">
              <ul className="list-inline">
                <li className="list-inline-item d-none">
                  <Link className="nav-link" href="">
                    <span className="icon-search icon-search"></span>
                  </Link>
                </li>
                <li className="list-inline-item" onClick={handleLiClick}>
                  {state.cookie === null ? (
                    <Link href="/login">
                      <a className="nav-link">Sign in</a>
                    </Link>
                  ) : (
                    <Link href="/videos">
                      <a data-attr={state.cookie} className="nav-link">
                        My Account
                      </a>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
