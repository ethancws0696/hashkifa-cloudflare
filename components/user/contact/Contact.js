import UserAPI from "../../../services/user/UserAPI";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import React from "react";
export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [state, setState] = useState({
    error: "",
    success: "",
    nameError: "",
    emailError: "",
    phoneError: "",
    subjectError: "",
    messageError: "",
  });
  const [btnDisable, setBtnDisable] = useState(false);
  const recaptchaRef = useRef({});
  const checkEmptyInput = useRef();
  const [recaptchaErr, setRecaptchaErr] = useState(null);
  const [blockUrlError, setBlockUrlError] = useState(null);
  const onSubmit = async (data) => {
    const reset = {
      error: "",
      success: "",
      nameError: "",
      emailError: "",
      phoneError: "",
      subjectError: "",
      messageError: "",
    };
    setState({ ...reset });
    setBtnDisable(true);
    setRecaptchaErr(null);
    setBlockUrlError(null);
    try {
      if (
        data.name == null &&
        data.email == null &&
        data.phone == null &&
        data.message == null &&
        data.subject == null
      ) {
        checkEmptyInput.current.focus();
      } else {
        if (recaptchaRef.current.getValue() === null) {
          setRecaptchaErr(
            "We have detected your device is not able to load Recaptcha, please try to login from another device"
          );
          setBtnDisable(false);
        } else {
          const token = await recaptchaRef.current.executeAsync();
          const contactData = new FormData();
          contactData.append("name", data.name.trim());
          contactData.append(
            "email",
            data.email.toString().toLowerCase().trim()
          );
          contactData.append("phone", data.phone.trim());
          contactData.append("message", data.message);
          contactData.append("subject", data.subject);

          await UserAPI.contactus(contactData)
            .then((response) => {
              if (response.data.status) {
                setState({ success: response.data.message });
              }
            })
            .catch((error) => {
              if (error.response) {
                const errorMessages = {
                  nameError: error.response.data.message.name
                    ? error.response.data.message.name
                    : null,
                  emailError: error.response.data.message.email
                    ? error.response.data.message.email
                    : null,
                  phoneError: error.response.data.message.phone
                    ? error.response.data.message.phone
                    : null,
                  subjectError: error.response.data.message.subject
                    ? error.response.data.message.subject
                    : null,
                  messageError: error.response.data.message.message
                    ? error.response.data.message.message
                    : null,
                };
                setState({ ...errorMessages });
              } else {
                setBlockUrlError(
                  "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>"
                );
              }
            })
            .finally(() => {
              setBtnDisable(false);
            });
        }
      }
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.recaptchaKey}
      />
      <div className="mb-3">
        <input
          ref={checkEmptyInput}
          type="text"
          className="form-control"
          placeholder="Full Name*"
          {...register("name", { required: true, min: 1 })}
        />
        <span className="error">{state.nameError}</span>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Your E-mail *"
          {...register("email", { required: true, min: 1 })}
        />
        <span className="error">{state.emailError}</span>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Phone Number*"
          {...register("phone", { required: true, min: 1 })}
        />
        <span className="error">{state.phoneError}</span>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Subject*"
          {...register("subject", { required: true, min: 1 })}
        />
        <span className="error">{state.subjectError}</span>
      </div>
      <div className="mb-4">
        <textarea
          rows="6"
          className="form-control"
          placeholder="Message*"
          {...register("message", { required: true, min: 1 })}
        ></textarea>
        <span className="error">{state.messageError}</span>
      </div>
      <div className="mb-3">
        <button
          type="submit"
          className="btn btn-global w-100"
          disabled={btnDisable}
        >
          SUBMIT{" "}
        </button>
      </div>
      <div className="errors">{recaptchaErr}</div>
      {setBlockUrlError && (
        <div
          className="errors"
          dangerouslySetInnerHTML={{ __html: blockUrlError }}
        ></div>
      )}
      <div className="success">
        <p>{state.success}</p>
      </div>
    </form>
  );
}
