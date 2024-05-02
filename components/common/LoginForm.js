import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthAPI from "../../services/common/AuthAPI";
import Router, { useRouter } from "next/router";
import loginBanner from "/public/images/login-banner.png";
// import branding from '/public/images/branding.svg';
import branding from "/public/images/logo-nw.svg";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import cookieCutter from "cookie-cutter";

function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [state, setState] = useState({
    rememberme: false,
    errors: "",
    success: "",
    openeyeClass: false,
  });
  const [error, setErrors] = useState(null);
  const checkEmptyInput = useRef();
  const recaptchaRef = useRef({});
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const [recaptchaErr, setRecaptchaErr] = useState(null);

  const setRememberMe = (event) => {
    if (event.target.checked) {
      setState({ ...state, rememberme: true });
    } else {
      setState({ ...state, rememberme: false });
    }
  };

  const handleToggleClass = () => {
    setState({ ...state, openeyeClass: !state.openeyeClass });
  };
  const onSubmit = async (data) => {
    setLoader(true);
    setDisable(true);
    setErrors(null);
    setRecaptchaErr(null);
    if (data.Email == null && data.Password == null) {
      checkEmptyInput.current.focus();
    } else {
      if (recaptchaRef.current.getValue() === null) {
        setRecaptchaErr(
          "We have detected your device is not able to load Recaptcha, please try to login from another device"
        );
        setLoader(false);
        setDisable(false);
      } else {
        const token = await recaptchaRef.current.executeAsync();

        const loginData = new FormData();
        loginData.append("email", data.Email.toString().toLowerCase().trim());
        loginData.append("password", data.Password.trim());

        await AuthAPI.login(loginData)
          .then((response) => {
            if (response.data.status) {
              localStorage.setItem(
                "hk_user_auth_ticket",
                response.data.data.token
              );
              localStorage.setItem("role", response.data.data.user.role);
              localStorage.setItem(
                "hk_user_email",
                response.data.data.user.email
              );
              var myDate = new Date();
              if (state.rememberme) {
                myDate.setHours(myDate.getHours() + 8766);
              } else {
                myDate.setHours(myDate.getHours() + 24);
              }
              localStorage.setItem(
                "hk_user_auth_ticket_expire",
                myDate.getTime()
              );
              localStorage.setItem(
                "hk_user_name",
                response.data.data.user.firstName
              );
              setState({ ...state, success: response.data.message });
              router.push("/videos");
            }
          })
          .catch((error) => {
            if (error.response) {
              setErrors(error.response.data.message);
            } else {
              setErrors(
                "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>"
              );
            }
          })
          .finally(() => {
            setLoader(false);
            setDisable(false);
          });
      }
    }
  };
  return (
    <>
      <div className="cover-full-page p-50">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-12 col-xl-6">
              <div className="position-relative position-sm-absolute">
                <img
                  className="w-100 img-fluid object-cover bild-full-screen"
                  src={loginBanner.src}
                  alt=""
                  loading="lazy"
                />
                {/* <div className="branding-main">
                            <Link href="/"><img src={branding.src} alt="" loading="lazy"/></Link>
                        </div> */}
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className="d-flex align-items-center justify-content-center h-100 position-sm">
                <div className="signin-card row g-0">
                  <div className="col-12 align-self-center">
                    <div className="title-hkf">
                      <h2 className="sm-line-start">Sign In to Hashkifa </h2>
                    </div>
                    <div className="form-inner">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          size="invisible"
                          sitekey={process.env.recaptchaKey}
                        />
                        <div className="mb-3">
                          <label className="form-label">Email </label>
                          <input
                            ref={checkEmptyInput}
                            type="email"
                            className="form-control"
                            id=""
                            placeholder="Email Address"
                            {...register("Email", { required: true, min: 1 })}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <div className="position-relative">
                            <input
                              type={state.openeyeClass ? "text" : "password"}
                              className="form-control"
                              id=""
                              placeholder="Password"
                              {...register("Password", {
                                required: true,
                                min: 1,
                              })}
                            />
                            <div
                              className="toggle-show-password"
                              onClick={handleToggleClass}
                            >
                              <i
                                className={
                                  state.openeyeClass
                                    ? "full-eye ri-eye-fill"
                                    : "full-eye ri-eye-fill ri-eye-off-fill"
                                }
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div className="text-end mb-3 mb-xxl-5">
                          <Link href="/forgotpwd">
                            <a className="forget-password">
                              Forgot your password?{" "}
                            </a>
                          </Link>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-orange w-100 mb-3"
                          disabled={disable}
                        >
                          Sign In
                          <div
                            class={loader ? "spinner-border" : "d-none"}
                            role="status"
                          >
                            <span class="sr-only"></span>
                          </div>
                        </button>

                        <div className="form-check mb-4 mb-md-5">
                          <label className="form-check-label ms-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                              onChange={setRememberMe}
                            />
                            Remember Me
                          </label>
                        </div>
                      </form>
                      <div
                        className="errors"
                        dangerouslySetInnerHTML={{ __html: error }}
                      ></div>
                      <div className="errors">{recaptchaErr}</div>
                      <div className="success">{state.success}</div>
                      <h4 className="signUp-details">
                        Dont yet have an account?{" "}
                        <Link href="/signup">
                          <a>Sign up now </a>
                        </Link>{" "}
                      </h4>
                    </div>
                  </div>
                  <p className="text-black mt-4">
                    If your login is not working, it is possible you do not yet
                    have an account on this new website! You may click on{" "}
                    <Link href="/forgotpwd" className="link-to-process">
                      Forgot Password
                    </Link>{" "}
                    to reset it at any time!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
