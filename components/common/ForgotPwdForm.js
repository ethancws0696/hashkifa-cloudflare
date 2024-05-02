import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthAPI from "../../services/common/AuthAPI";
import Router from "next/router";
import loginBanner from "../../public/images/login-banner.png";
import branding from "../../public/images/logo-nw.svg";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

function ForgotPwdForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [state, setState] = useState({ errors: "", success: "" });
  const recaptchaRef = useRef({});
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const [recaptchaErr, setRecaptchaErr] = useState(null);
  const onSubmit = async (data) => {
    setLoader(true);
    setDisable(true);
    setRecaptchaErr(null);
    if (recaptchaRef.current.getValue() === null) {
      setRecaptchaErr(
        "We have detected your device is not able to load Recaptcha, please try to login from another device"
      );
      setDisable(false);
      setLoader(false);
    } else {
      const token = await recaptchaRef.current.executeAsync();
      const resetData = new FormData();
      resetData.append("email", data.Email.toString().toLowerCase().trim());

      await AuthAPI.reset(resetData)
        .then((response) => {
          if (response.data.data.status) {
            setState({ ...state, success: response.data.message });
          } else {
            setState({ ...state, errors: response.data.message });
          }
        })
        .catch((error) => {
          if (error.response) {
            setState({
              ...state,
              errors: error.response.data.message,
            });
          } else {
            setState({
              ...state,
              errors:
                "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>",
            });
          }
        })
        .finally(() => {
          setLoader(false);
          setDisable(false);
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
                      Enter the email you use for Hashkifa, and we’ll email you
                      a <br /> special link to let you create a new password.{" "}
                    </p>
                  </div>
                  <div class="form-inner">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        size="invisible"
                        sitekey={process.env.recaptchaKey}
                      />
                      <div class="mb-3">
                        <input
                          type="email"
                          class="form-control text-center"
                          id=""
                          placeholder="Enter Email Address"
                          {...register("Email", { required: true, min: 1 })}
                        />
                      </div>
                      <button
                        class="btn btn-orange w-100 mb-2"
                        type="submit"
                        disabled={disable}
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
                    <div
                      className="errors"
                      dangerouslySetInnerHTML={{ __html: state.errors }}
                    ></div>
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

export default ForgotPwdForm;
