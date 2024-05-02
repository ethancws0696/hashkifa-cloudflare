import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthAPI from "../../services/common/AuthAPI";
import Router from "next/router";
import loginBanner from "../../public/images/login-banner.png";
import branding from "../../public/images/logo-nw.svg";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

function ResetPwdForm(data) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [state, setState] = useState({
    errors: null,
    success: null,
    openeyePClass: false,
    openeyeCClass: false,
  });
  const [formData, setFormData] = useState({
    email: data.data.email,
    token: data.data.token,
  });
  const [fieldError, setFieldError] = useState({
    emailErr: null,
    passwordErr: null,
    confirmPasswordErr: null,
  });
  const [btn, setBtn] = useState(false);
  const [loader, setLoader] = useState(false);
  const recaptchaRef = useRef({});
  const [recaptchaErr, setRecaptchaErr] = useState(null);
  useEffect(() => {
    var setData = { token: data.data.token, email: data.data.email };
    setFormData({ ...setData });
  }, [data]);

  const handlePToggleClass = () => {
    setState({ ...state, openeyePClass: !state.openeyePClass });
  };

  const handleCToggleClass = () => {
    setState({ ...state, openeyeCClass: !state.openeyeCClass });
  };

  const onSubmitData = async (data) => {
    setBtn(true);
    setLoader(true);
    setRecaptchaErr(null);
    if (recaptchaRef.current.getValue() === null) {
      setRecaptchaErr(
        "We have detected your device is not able to load Recaptcha, please try to login from another device"
      );
      setBtn(false);
      setLoader(false);
    } else {
      var resetErrors = {
        emailErr: null,
        passwordErr: null,
        confirmPasswordErr: null,
      };
      setFieldError({ ...resetErrors });
      var resetVal = {
        errors: null,
        success: null,
        openeyePClass: false,
        openeyeCClass: false,
      };
      setState({ ...resetVal });
      const token = await recaptchaRef.current.executeAsync();
      var reqBody = {
        email: formData.email
          ? formData.email.toString().toLowerCase().trim()
          : null,
        token: formData.token,
        password: data.Password,
        password_confirmation: data.ConfirmPassword,
      };
      await AuthAPI.resetPwd(reqBody)
        .then((response) => {
          if (response.data.status) {
            setState({ ...state, success: response.data.message });
          }
        })
        .catch((error) => {
          if (error.response) {
            var errors = {
              emailErr: error.response.data.message.email
                ? error.response.data.message.email
                : null,
              passwordErr: error.response.data.message.password
                ? error.response.data.message.password
                : null,
              confirmPasswordErr: error.response.data.message
                .password_confirmation
                ? error.response.data.message.password_confirmation
                : null,
            };
            setFieldError({ ...errors });
          } else {
            setState({
              ...state,
              errors:
                "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>",
            });
          }
        })
        .finally(() => {
          setBtn(false);
          setLoader(false);
        });
    }
  };
  return (
    <div className="cover-full-page p-50">
      <div className="container-fluid p-0">
        <div class="row g-0">
          <div class="col-12 col-xl-6">
            <div class="position-relative">
              <img
                class="w-100 img-fluid object-cover bild-full-screen"
                src={loginBanner.src}
                alt=""
                loading="lazy"
              />
              {/* <div class="branding-main">
                    <Link href="/"><img src={branding.src} alt="" loading="lazy"/></Link>
                    </div> */}
            </div>
          </div>
          <div class="col-12 col-xl-6 h-100vh">
            <div class="d-flex align-items-center justify-content-center h-100 position-sm">
              <div class="signin-card row g-0">
                <div class="col-12 align-self-center">
                  <div class="title-hkf text-center mb-4">
                    <h2 class="sm-line-far">Reset Your Password </h2>
                    <p className="text-dark">
                      Enter the email you use for Hashkifa, and
                      <br /> create a new password.
                    </p>
                  </div>
                  <div class="form-inner">
                    <form onSubmit={handleSubmit(onSubmitData)}>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey={process.env.recaptchaKey}
                      />
                      <div class="mb-3">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          class="form-control"
                          id=""
                          placeholder="Enter Email Address"
                          disabled
                        />
                        {fieldError.emailErr ? (
                          <div className="error">{fieldError.emailErr}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="position-relative">
                          <input
                            name="passwordI"
                            type={state.openeyePClass ? "text" : "password"}
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
                            onClick={handlePToggleClass}
                          >
                            <i
                              className={
                                state.openeyePClass
                                  ? "full-eye ri-eye-fill"
                                  : "full-eye ri-eye-fill ri-eye-off-fill"
                              }
                            ></i>
                          </div>
                        </div>
                        {fieldError.passwordErr ? (
                          <div className="error">{fieldError.passwordErr}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="position-relative">
                          <input
                            name="confirmpwd"
                            type={state.openeyeCClass ? "text" : "password"}
                            className="form-control"
                            id=""
                            placeholder="Confirm Password"
                            {...register("ConfirmPassword", {
                              required: true,
                              min: 1,
                            })}
                          />
                          <div
                            className="toggle-show-password"
                            onClick={handleCToggleClass}
                          >
                            <i
                              className={
                                state.openeyeCClass
                                  ? "full-eye ri-eye-fill"
                                  : "full-eye ri-eye-fill ri-eye-off-fill"
                              }
                            ></i>
                          </div>
                        </div>
                        {fieldError.confirmPasswordErr ? (
                          <div className="error">
                            {fieldError.confirmPasswordErr}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {state.errors && (
                        <div
                          className="errors mb-2"
                          dangerouslySetInnerHTML={{ __html: state.errors }}
                        ></div>
                      )}
                      <button
                        class="btn btn-orange w-100 mb-2"
                        type="submit"
                        disabled={btn}
                      >
                        Reset Password
                        <div
                          class={loader ? "spinner-border" : "d-none"}
                          role="status"
                        >
                          <span class="sr-only"></span>
                        </div>
                      </button>
                    </form>
                    <div className="text-end mb-3 mb-xxl-5">
                      <Link href="/login">
                        <a className="forget-password">Back to Login </a>
                      </Link>
                    </div>

                    <div className="errors">{recaptchaErr}</div>
                    <div className="success">{state.success}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPwdForm;
