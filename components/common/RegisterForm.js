import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthAPI from "../../services/common/AuthAPI";
import Router, { useRouter } from "next/router";
import loginBanner from "../../public/images/login-banner.png";
import branding from "../../public/images/logo-nw.svg";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import cookieCutter from "cookie-cutter";

function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [state, setState] = useState({
    openeyePasswordClass: false,
    openeyeConfirmPasswordClass: false,
  });
  const [fieldError, setFieldErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const checkEmptyInput = useRef();
  const recaptchaRef = useRef({});
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const [recaptchaErr, setRecaptchaErr] = useState(null);
  const [blockUrlError, setBlockUrlError] = useState(null);
  const handleTogglePasswordClass = () => {
    setState({ ...state, openeyePasswordClass: !state.openeyePasswordClass });
  };
  const handleToggleConfirmPasswordClass = () => {
    setState({
      ...state,
      openeyeConfirmPasswordClass: !state.openeyeConfirmPasswordClass,
    });
  };
  const onSubmit = async (data) => {
    setLoader(true);
    setDisable(true);
    setRecaptchaErr(null);
    setBlockUrlError(null);
    if (
      data.Name == null &&
      data.Email == null &&
      data.Password == null &&
      data.ConfirmPassword == null
    ) {
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
        const registerData = new FormData();
        registerData.append("firstName", data.Name.trim());
        registerData.append(
          "email",
          data.Email.toString().toLowerCase().trim()
        );
        registerData.append("password", data.Password.trim());
        registerData.append(
          "password_confirmation",
          data.ConfirmPassword.trim()
        );

        await AuthAPI.register(registerData)
          .then((response) => {
            if (response.data.status) {
              localStorage.setItem(
                "hk_user_auth_ticket",
                response.data.data.token
              );
              localStorage.setItem("role", response.data.data.user.role);
              var myDate = new Date();
              myDate.setHours(myDate.getHours() + 24);
              localStorage.setItem(
                "hk_user_auth_ticket_expire",
                myDate.getTime()
              );
              localStorage.setItem(
                "hk_user_name",
                response.data.data.user.firstName
              );
              localStorage.setItem(
                "hk_user_email",
                response.data.data.user.email
              );
              router.push("/");
            }
          })
          .catch((error) => {
            if (error.response) {
              const errorMessages = {
                emailError: error.response.data.data.email
                  ? error.response.data.data.email
                  : "",
                passwordError: error.response.data.data.password
                  ? error.response.data.data.password
                  : "",
              };
              setFieldErrors({ ...errorMessages });
            } else {
              setBlockUrlError(
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
    <div className="cover-full-page p-50">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12 col-xl-6">
            <div className="position-relative">
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
                    <h2 className="sm-line-start">Create your account </h2>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      size="invisible"
                      sitekey={process.env.recaptchaKey}
                    />
                    <div className="form-inner">
                      <div className="mb-3">
                        <label className="form-label">Name* </label>
                        <input
                          ref={checkEmptyInput}
                          type="text"
                          className="form-control"
                          id=""
                          placeholder="Name"
                          {...register("Name", { required: true, min: 1 })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email </label>
                        <input
                          type="email"
                          className="form-control"
                          id=""
                          placeholder="Email"
                          {...register("Email", {
                            required: true,
                            pattern: {
                              value:
                                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                              message: "I think I said _valid_, didn't I?",
                            },
                          })}
                        />
                        {/* <br/> */}
                        <span className="w-100 d-block error">
                          {fieldError.emailError}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Create Password</label>
                        <div className="position-relative">
                          <input
                            type={
                              state.openeyePasswordClass ? "text" : "password"
                            }
                            className="form-control"
                            id=""
                            placeholder="Password.."
                            {...register("Password", {
                              required: true,
                              min: 1,
                            })}
                          />
                          <div
                            className="toggle-show-password"
                            onClick={handleTogglePasswordClass}
                          >
                            <i
                              className={
                                state.openeyePasswordClass
                                  ? "full-eye ri-eye-fill"
                                  : "full-eye ri-eye-fill ri-eye-off-fill"
                              }
                            ></i>
                          </div>
                          {/* <br/> */}
                        </div>
                        <span className="w-100 d-block error">
                          {fieldError.passwordError}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <div className="position-relative">
                          <input
                            type={
                              state.openeyeConfirmPasswordClass
                                ? "text"
                                : "password"
                            }
                            className="form-control"
                            id=""
                            placeholder="Password.."
                            {...register("ConfirmPassword", {
                              required: true,
                              min: 1,
                            })}
                          />
                          <div
                            className="toggle-show-password"
                            onClick={handleToggleConfirmPasswordClass}
                          >
                            <i
                              className={
                                state.openeyeConfirmPasswordClass
                                  ? "full-eye ri-eye-fill"
                                  : "full-eye ri-eye-fill ri-eye-off-fill"
                              }
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="form-check mb-4">
                        <label className="form-check-label ms-0">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            required
                          />
                          <span className="d-table">
                            {" "}
                            I have read and agree to the terms of service and
                            privacy policy{" "}
                          </span>
                        </label>
                      </div>
                      {blockUrlError && (
                        <div
                          class="errors mb-2"
                          dangerouslySetInnerHTML={{ __html: blockUrlError }}
                        ></div>
                      )}
                      <button
                        className="btn btn-orange w-100 mb-4 mb-md-5"
                        type="submit"
                        disabled={disable}
                      >
                        Sign Up
                        <div
                          class={loader ? "spinner-border" : "d-none"}
                          role="status"
                        >
                          <span class="sr-only"></span>
                        </div>
                      </button>
                      <div className="errors">{recaptchaErr}</div>
                      <h4 className="signUp-details">
                        Have an account?{" "}
                        <Link href="/login">
                          <a>Sign in now</a>
                        </Link>{" "}
                      </h4>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
