import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthAPI from "../../services/common/AuthAPI";
import Router, { useRouter } from "next/router";
import loginBanner from "../../public/images/login-banner.png";
import branding from "../../public/images/logo-nw.svg";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import cookieCutter from "cookie-cutter";

function FriendRegisterForm(data) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [state, setState] = useState({
    success: null,
    error: null,
    openeyePasswordClass: false,
    openeyeConfirmPasswordClass: false,
  });
  const [fieldError, setFieldErrors] = useState({
    emailError: "",
    passwordError: "",
    firstNameError: "",
  });
  const [friendToken, setFriendToken] = useState(null);
  const [friendEmail, setFriendEmail] = useState(null);
  const [friendFirstName, setFriendFirstName] = useState(null);
  const [firendPass, setFriendPass] = useState(null);
  const [btn, setBtn] = useState(false);
  const checkEmptyInput = useRef();
  const emailInput = useRef();
  const passInput = useRef();
  const recaptchaRef = useRef({});
  const [recaptchaErr, setRecaptchaErr] = useState(null);
  const [loader, setLoader] = useState(false);
  const [blockUrlError, setBlockUrlError] = useState(null);

  useEffect(() => {
    if (data) {
      setFriendToken(data.data.token);
      setFriendEmail(data.data.email);
    }
  }, [data]);

  const handleChange = (e) => {
    if (e.target.name == "Email") {
      setFriendEmail(e.target.value);
    } else if (e.target.name == "Name") {
      setFriendFirstName(e.target.value);
    } else if (e.target.name == "Password") {
      setFriendPass(e.target.value);
    }
  };
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
    setBtn(true);
    setLoader(true);
    setRecaptchaErr(null);
    setBlockUrlError(null);
    var resetVal = {
      success: null,
      error: null,
      openeyePasswordClass: false,
      openeyeConfirmPasswordClass: false,
    };
    setState({ ...resetVal });
    var resetError = {
      emailError: null,
      passwordError: null,
      firstNameError: null,
    };
    setFieldErrors({ ...resetError });
    if (friendFirstName == null && friendEmail == null && firendPass == null) {
      checkEmptyInput.current.focus();
    } else {
      if (recaptchaRef.current.getValue() === null) {
        setRecaptchaErr(
          "We have detected your device is not able to load Recaptcha, please try to login from another device"
        );
        setBtn(false);
        setLoader(false);
      } else {
        const token = await recaptchaRef.current.executeAsync();
        const registerData = {
          token: friendToken,
          firstName: friendFirstName,
          email: friendEmail.toString().toLowerCase().trim(),
          password: firendPass,
        };

        await AuthAPI.invite(registerData)
          .then((response) => {
            if (response.data.status) {
              setState({ ...state, success: response.data.message });
            }
          })
          .catch((error) => {
            if (error.response) {
              const errorMessages = {
                emailError: error.response?.data?.data?.email
                  ? error.response.data.data.email
                  : null,
                passwordError: error.response?.data?.data?.password
                  ? error.response.data.data.password
                  : null,
                firstNameError: error.response?.data?.data?.firstName
                  ? error.response.data.data.firstName
                  : null,
              };
              setFieldErrors({ ...errorMessages });
              setState({ ...state, error: error.response?.data?.message });
            } else {
              setBlockUrlError(
                "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>"
              );
            }
          })
          .finally(() => {
            setBtn(false);
            setLoader(false);
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
                          name="Name"
                          placeholder="Name"
                          onChange={handleChange}
                          auto-complete="new-name"
                        />
                        <span className="w-100 d-block error">
                          {fieldError.firstNameError}
                        </span>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email </label>
                        <input
                          ref={emailInput}
                          type="email"
                          value={friendEmail}
                          className="form-control"
                          id=""
                          name="Email"
                          placeholder="Email"
                          onChange={handleChange}
                          auto-complete="new-email"
                          disabled
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
                            ref={passInput}
                            type={
                              state.openeyePasswordClass ? "text" : "password"
                            }
                            className="form-control"
                            name="Password"
                            id=""
                            placeholder="Password.."
                            onChange={handleChange}
                            auto-complete="new-password"
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
                      {/* <div className="mb-3">
                                        <label className="form-label">Confirm Password</label>
                                        <div className="position-relative">
                                            <input type={state.openeyeConfirmPasswordClass ? "text":"password" } className="form-control" id="" placeholder="Password.."  {...register("ConfirmPassword", { required: true, min: 1 })}/>
                                            <div className="toggle-show-password" onClick={handleToggleConfirmPasswordClass}>
                                                <i className={state.openeyeConfirmPasswordClass ? 'full-eye ri-eye-fill' : 'full-eye ri-eye-fill ri-eye-off-fill'}></i>
                                            </div>
                                        </div>
                                    </div> */}
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
                        <p className="note">
                          <b>
                            If you previously had an account with us, the
                            password you create here will be your new password
                            going forward and the old one will no longer be
                            valid.
                          </b>
                        </p>
                      </div>
                      <span className="w-100 d-block error">{state.error}</span>
                      <span className="w-100 d-block success">
                        {state.success}
                      </span>
                      {blockUrlError && (
                        <div
                          class="errors mb-2"
                          dangerouslySetInnerHTML={{ __html: blockUrlError }}
                        ></div>
                      )}
                      <button
                        className="btn btn-orange w-100 mb-4 mb-md-5"
                        type="submit"
                        disabled={btn}
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

export default FriendRegisterForm;
