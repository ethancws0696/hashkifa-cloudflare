import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import UserAPI from "../../../services/user/UserAPI";
import ReCAPTCHA from "react-google-recaptcha";
export default function DonateFunction({ sponsorTitle, sponsorDescription }) {
  const otheramt = useRef(null);
  const checkEmptyInput = useRef();
  const checkAmount = useRef();
  const checkCardNum = useRef();
  const checkMonth = useRef();
  const checkYear = useRef();
  const checkCVV = useRef();
  const checkCardName = useRef();
  const recaptchaRef = useRef({});
  const [state, setState] = useState({ errors: "", success: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showOther, setShowOther] = useState(false);
  const [amount, setAmount] = useState(null);
  const [year, setYear] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [success, setSuccessMsg] = useState("");
  const [blockUrlError, setBlockUrlError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    amountErr: null,
    cardnameErr: null,
    cardnumErr: null,
    emailErr: null,
    monthErr: null,
    yearErr: null,
    error: null,
    cvvErr: null,
  });
  const [formData, setFormData] = useState({
    dedicate_name: null,
    dedicate_amount: null,
    email: null,
    cardnum: null,
    month: null,
    year: null,
    cvv: null,
    cardname: null,
  });
  const [focusError, setFocusError] = useState(null);
  const [recaptchaErr, setRecaptchaErr] = useState(null);

  function isLuhnValid(cardNumber) {
    var sum = 0;
    var numDigits = cardNumber.length;
    var parity = numDigits % 2;
    for (var i = numDigits - 1; i >= 0; i--) {
      var digit = parseInt(cardNumber.charAt(i));
      if (i % 2 === parity) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }

  function formatCardNumber(cardNumber, cardType) {
    var formattedNumber = cardNumber.replace(/\s+/g, ""); // Remove existing spaces
    var parts = [];

    switch (cardType) {
      case "visa":
      case "mastercard":
      case "discover":
        for (var i = 0, len = formattedNumber.length; i < len; i += 4) {
          parts.push(formattedNumber.substring(i, i + 4));
        }
        break;
      case "amex":
        parts.push(formattedNumber.substring(0, 4));
        parts.push(formattedNumber.substring(4, 10));
        parts.push(formattedNumber.substring(10, 15));
        break;
      case "dinersclub":
        for (var i = 0, len = formattedNumber.length; i < len; i += 4) {
          parts.push(formattedNumber.substring(i, i + 4));
        }
        break;
      default:
        parts.push(formattedNumber);
    }

    return parts.join(" ");
  }

  const formValidation = () => {
    checkAmount.current.classList.remove("field-error");
    checkEmptyInput.current.classList.remove("field-error");
    checkCardNum.current.classList.remove("field-error");
    checkMonth.current.classList.remove("field-error");
    checkYear.current.classList.remove("field-error");
    checkCVV.current.classList.remove("field-error");
    checkCardName.current.classList.remove("field-error");
    const cardNumberRegex =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/;
    if (amount == null) {
      checkAmount.current.focus();
      return false;
    } else if (formData.email == null) {
      checkEmptyInput.current.focus();
      checkEmptyInput.current.classList.add("field-error");
      setFieldErrors({ ...fieldErrors, emailErr: "Please add email" });
      return false;
    } else if (
      formData.cardnum == null ||
      !cardNumberRegex.test(formData.cardnum.replace(/\s/g, ""))
    ) {
      checkCardNum.current.focus();
      checkCardNum.current.classList.add("field-error");
      setFieldErrors({
        ...fieldErrors,
        cardnumErr: "Please add valid card number",
      });
      return false;
    } else if (formData.month == null) {
      checkMonth.current.focus();
      checkMonth.current.classList.add("field-error");
      setFieldErrors({ ...fieldErrors, monthErr: "Please add card expiry" });
      return false;
    } else if (formData.year == null) {
      checkYear.current.focus();
      checkYear.current.classList.add("field-error");
      setFieldErrors({ ...fieldErrors, monthErr: "Please add card expiry" });
      return false;
    } else if (formData.cvv == null) {
      checkCVV.current.focus();
      checkCVV.current.classList.add("field-error");
      setFieldErrors({ ...fieldErrors, cvvErr: "Please add cvv" });
      return false;
    } else if (formData.cardname == null) {
      checkCardName.current.focus();
      checkCardName.current.classList.add("field-error");
      setFieldErrors({ ...fieldErrors, cvvErr: "Please add card name" });
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async (data) => {
    const token = await recaptchaRef.current.executeAsync();
    var reset = { errors: "", success: "" };
    setState({ ...reset });
    const emailData = new FormData();
    emailData.append("email", data.Email.toString().toLowerCase().trim());

    await UserAPI.newsletter(emailData)
      .then((response) => {
        if (response.data.status) {
          setState({ success: response.data.message });
        }
      })
      .catch((error) => {
        setState({
          errors:
            "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>",
        });
      });
  };

  const formDataHandle = (event) => {
    if (event.target.id == "other") {
      setShowOther(true);
      setAmount(null);
    } else if (event.target.id == "otherAmount") {
      setAmount(event.target.value);
    } else if (event.target.name == "email") {
      if (event.target.value) {
        setFieldErrors({ ...fieldErrors, emailErr: null });
        const regex =
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (regex.test(event.target.value)) {
          event.target.classList.remove("field-error");
          setFormData({ ...formData, email: event.target.value });
          setFieldErrors({
            ...fieldErrors,
            emailErr: null,
          });
        } else {
          setFormData({ ...formData, email: null });
          setFieldErrors({
            ...fieldErrors,
            emailErr: "Please enter a valid email address",
          });
          event.target.classList.add("field-error");
        }
      } else {
        setFormData({ ...formData, email: null });
      }
    } else if (event.target.name == "dedication") {
      setFormData({ ...formData, dedicate_name: event.target.value });
    } else if (event.target.name == "cardnum") {
      if (event.target.value) {
        event.target.classList.remove("field-error");
        setFieldErrors({
          ...fieldErrors,
          cardnumErr: null,
        });

        var v = event.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

        // Regular expressions for different card types
        var visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        var mastercardRegex = /^5[1-5][0-9]{14}$/;
        var amexRegex = /^3[47][0-9]{13}$/;
        var discoverRegex = /^6011[0-9]{12}$/;
        var dinersClubRegex = /^(?:30[0-5]|36|38)[0-9]{11}$/;

        // Check if the credit card number matches any of the card types
        if (visaRegex.test(v) && isLuhnValid(v)) {
          setFormData({ ...formData, cardnum: formatCardNumber(v, "visa") });
        } else if (mastercardRegex.test(v) && isLuhnValid(v)) {
          setFormData({
            ...formData,
            cardnum: formatCardNumber(v, "mastercard"),
          });
        } else if (amexRegex.test(v) && isLuhnValid(v)) {
          setFormData({
            ...formData,
            cardnum: formatCardNumber(v, "amex"),
          });
        } else if (discoverRegex.test(v) && isLuhnValid(v)) {
          setFormData({
            ...formData,
            cardnum: formatCardNumber(v, "discover"),
          });
        } else if (dinersClubRegex.test(v) && isLuhnValid(v)) {
          setFormData({
            ...formData,
            cardnum: formatCardNumber(v, "dinersclub"),
          });
        } else {
          // If the credit card number doesn't match any known format, display an error
          event.target.classList.add("field-error");
          setFieldErrors({
            ...fieldErrors,
            cardNumError: "Invalid credit card number",
          });
          setFormData({
            ...formData,
            cardnum: formatCardNumber(v),
          });
        }
      } else {
        event.target.classList.add("field-error");
        setFormData({ ...formData, cardnum: null });
      }
    } else if (event.target.name == "month") {
      if (event.target.value) {
        event.target.classList.remove("field-error");
        setFieldErrors({ ...fieldErrors, monthErr: null });
        setFormData({ ...formData, month: event.target.value });
      } else {
        event.target.classList.add("field-error");
        setFieldErrors({ ...fieldErrors, monthErr: "Please add card expiry." });
        setFormData({ ...formData, month: null });
      }
    } else if (event.target.name == "year") {
      if (event.target.value) {
        event.target.classList.remove("field-error");
        setFormData({ ...formData, year: event.target.value });
        setFieldErrors({
          ...fieldErrors,
          yearErr: null,
        });
      } else {
        event.target.classList.add("field-error");
        setFormData({ ...formData, year: null });
        setFieldErrors({
          ...fieldErrors,
          yearErr: "Please add card year.",
        });
      }
    } else if (event.target.name == "cvv") {
      if (event.target.value) {
        event.target.classList.remove("field-error");
        var vRe = event.target.value
          .replace(/\s+/g, "")
          .replace(/[^0-9]/gi, "");
        if (vRe.length > 4) {
          event.target.value = event.target.value.slice(0, 4);
          event.target.classList.remove("field-error");
          setFormData({ ...formData, cvv: event.target.value.slice(0, 4) });
          setFieldErrors({
            ...fieldErrors,
            cvvErr: null,
          });
        } else {
          event.target.classList.remove("field-error");
          setFormData({ ...formData, cvv: vRe });
          setFieldErrors({
            ...fieldErrors,
            cvvErr: null,
          });
        }
      } else {
        event.target.classList.add("field-error");
        setFormData({ ...formData, cvv: null });
        setFieldErrors({
          ...fieldErrors,
          cvvErr: "Please add cvv",
        });
      }
    } else if (event.target.name == "cardname") {
      if (event.target.value) {
        event.target.classList.remove("field-error");
        setFormData({ ...formData, cardname: event.target.value });
      } else {
        event.target.classList.add("field-error");
        setFieldErrors({
          ...fieldErrors,
          cardnumErr: "Please add card name",
        });
        setFormData({ ...formData, cardname: null });
      }
    } else {
      setShowOther(false);
      setAmount(event.target.value);
    }
    setButtonDisable(false);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setRecaptchaErr(null);
    setSuccessMsg("");
    setButtonDisable(true);
    setBlockUrlError(null);
    if (recaptchaRef.current.getValue() === null) {
      setRecaptchaErr(
        "We have detected your device is not able to load Recaptcha, please try to login from another device"
      );
      setButtonDisable(false);
    } else {
      if (formValidation()) {
        var reqBody = {
          amount: amount,
          dedication_to: formData.dedicate_name ? formData.dedicate_name : "",
          dedication_amount: 0,
          email: formData.email ? formData.email : "",
          card_name: formData.cardname ? formData.cardname : "",
          card_number: formData.cardnum ? formData.cardnum : "",
          exp_month: formData.month ? formData.month : "",
          exp_year: formData.year ? formData.year : "",
          cvv: formData.cvv ? formData.cvv : "",
        };

        await UserAPI.donate(reqBody)
          .then((response) => {
            if (response.data.status) {
              setSuccessMsg(response.data.message);
            }
          })
          .catch((error) => {
            if (error.response) {
              const errorMessages = {
                cardnameErr: error.response.data.data.card_name
                  ? error.response.data.data.card_name
                  : "",
                cardnumErr: error.response.data.data.card_number
                  ? error.response.data.data.card_number
                  : "",
                emailErr: error.response.data.data.email
                  ? error.response.data.data.email
                  : "",

                monthErr: error.response.data.data.exp_month
                  ? error.response.data.data.exp_month
                  : "",
                yearErr: error.response.data.data.exp_year
                  ? error.response.data.data.exp_year
                  : "",
                error: error.response.data.message
                  ? error.response.data.message
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
            setButtonDisable(false);
          });
      } else {
        setButtonDisable(false);
      }
    }
  };

  useEffect(() => {
    var yearsToShow = 20;
    var thisYear = new Date().getFullYear();
    var list = [];
    for (var y = thisYear; y < thisYear + yearsToShow; y++) {
      list.push(y);
    }
    setYear([...list]);
  }, []);

  return (
    <>
      <section className="cover-contact cover-contact-donate">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              {sponsorTitle && <h1 className="h1">{sponsorTitle}</h1>}
              {sponsorDescription && (
                <ul className="list-unstyled short-note">
                  <li>{sponsorDescription}</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="contact-form overflow-hidden donate-form">
        <div className="container-xxl p-0">
          <div className="row g-0">
            <div className="col-12">
              <div className="d-table ms-auto me-auto">
                <h1 className="title-centerBox">
                  <span>100% of your sponsorship </span> will be <br /> used to
                  help inspire Am Yisroel
                </h1>
              </div>
              <form onSubmit={handleForm} method="post" name="donateForm">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size="invisible"
                  sitekey={process.env.recaptchaKey}
                />
                <div className="donate-box-main">
                  <div className="mb-5 d-table w-100">
                    <h2 className="text-center">Sponsor Amount (USD) </h2>
                    <ul className="donate-now">
                      <li>
                        <input
                          ref={checkAmount}
                          type="radio"
                          id="a180"
                          name="amount"
                          value="180"
                          onClick={formDataHandle}
                        />
                        <label for="a180">$180</label>
                      </li>
                      <li>
                        <input
                          ref={checkAmount}
                          type="radio"
                          id="a360"
                          name="amount"
                          value="360"
                          onClick={formDataHandle}
                        />
                        <label for="a360">$360</label>
                      </li>
                      <li>
                        <input
                          ref={checkAmount}
                          type="radio"
                          id="a500"
                          name="amount"
                          value="500"
                          onClick={formDataHandle}
                        />
                        <label for="a500">$500</label>
                      </li>
                      <li>
                        <input
                          ref={checkAmount}
                          type="radio"
                          id="a1000"
                          name="amount"
                          value="1000"
                          onClick={formDataHandle}
                        />
                        <label for="a1000">$1,000</label>
                      </li>
                      <li>
                        <input
                          ref={checkAmount}
                          type="radio"
                          id="a1800"
                          name="amount"
                          value="1800"
                          onClick={formDataHandle}
                        />
                        <label for="a1800">$1,800</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="a3600"
                          name="amount"
                          value="3600"
                          onClick={formDataHandle}
                        />
                        <label for="a3600">$3,600</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="a5000"
                          name="amount"
                          value="5000"
                          onClick={formDataHandle}
                        />
                        <label for="a5000">$5,000</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="a10000"
                          name="amount"
                          value="10000"
                          onClick={formDataHandle}
                        />
                        <label for="a10000">$10,000</label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="a18000"
                          name="amount"
                          value="18000"
                          onClick={formDataHandle}
                        />
                        <label for="a18000">$18,000</label>
                      </li>
                      <li className="otherAmount-button">
                        <div
                          className={
                            showOther ? "other-input d-none" : "other-input"
                          }
                        >
                          <input
                            type="radio"
                            id="other"
                            name="amount"
                            value="30"
                            onClick={formDataHandle}
                          />
                          <label
                            for="other"
                            className={showOther ? "d-none" : "d-block"}
                            id="other-input"
                            onClick={formDataHandle}
                          >
                            Other
                          </label>
                        </div>

                        <div className={showOther ? "donate-input" : "d-none"}>
                          <span className="input-grouptext">$</span>
                          <input
                            type="number"
                            ref={otheramt}
                            className="otherAmount"
                            id="otherAmount"
                            name="numAmount"
                            onChange={formDataHandle}
                          />
                        </div>
                      </li>
                      {/* <li className={showOther ? "otherAmount-list" : "otherAmount-list d-none"}>
                            </li> */}
                    </ul>
                    {fieldErrors.amountErr ? (
                      <div className="error">{fieldErrors.amountErr}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-5 d-table w-100-custom">
                    <h2 className="text-center mb-3">Your Email </h2>
                    <input
                      ref={checkEmptyInput}
                      type="email"
                      className="form-control text-center"
                      placeholder="Your Email Address"
                      name="email"
                      id=""
                      onChange={formDataHandle}
                    />
                    {fieldErrors.emailErr ? (
                      <div className="error">{fieldErrors.emailErr}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-5 d-table w-100-custom">
                    <h2 className="text-center mb-3">Dedication </h2>
                    <input
                      type="text"
                      className="form-control text-center"
                      placeholder="Dedication Message"
                      name="dedication"
                      id=""
                      onChange={formDataHandle}
                    />
                  </div>
                  <div className="d-table w-100-custom">
                    <div className="mb-4 text-center">
                      <h2 className="mb-1">Credit Card </h2>
                      <img src="" />
                    </div>
                    <div className="mb-4">
                      <input
                        ref={checkCardNum}
                        type="text"
                        className="form-control text-center cn-card-number"
                        value={formData.cardnum}
                        placeholder="Card Number"
                        name="cardnum"
                        onChange={formDataHandle}
                        inputMode="numeric"
                      />
                      {fieldErrors.cardnumErr ? (
                        <div className="error">{fieldErrors.cardnumErr}</div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row mb-4">
                      <div className="col-12 col-md-4 mb-3 mb-md-0">
                        <select
                          ref={checkMonth}
                          className="select-control form-select"
                          aria-label="Default select example"
                          name="month"
                          onChange={formDataHandle}
                        >
                          <option disabled="true" selected>
                            Month
                          </option>
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        {fieldErrors.monthErr ? (
                          <div className="error">{fieldErrors.monthErr}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-12 col-md-4 mb-3 mb-md-0">
                        <select
                          ref={checkYear}
                          className="select-control form-select"
                          aria-label="Default select example"
                          name="year"
                          onChange={formDataHandle}
                        >
                          <option disabled="true" selected>
                            Year
                          </option>
                          {year
                            ? year.map((item, key) => {
                                return <option value={item}>{item}</option>;
                              })
                            : ""}
                        </select>
                        {fieldErrors.yearErr ? (
                          <div className="error">{fieldErrors.yearErr}</div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-12 col-md-4">
                        <input
                          ref={checkCVV}
                          type="text"
                          className="cvv-control form-control"
                          value={formData.cvv}
                          placeholder="CVV"
                          name="cvv"
                          onChange={formDataHandle}
                        />
                      </div>
                    </div>
                    <div className="mb-5">
                      <input
                        ref={checkCardName}
                        type="text"
                        className="form-control text-center"
                        placeholder="Cardholder Name"
                        name="cardname"
                        id=""
                        onChange={formDataHandle}
                      />
                      {fieldErrors.cardnameErr ? (
                        <div className="error">{fieldErrors.cardnameErr}</div>
                      ) : (
                        ""
                      )}
                    </div>
                    {fieldErrors.error ? (
                      <div className="error">{fieldErrors.error}</div>
                    ) : (
                      ""
                    )}
                    <div className="errors">{recaptchaErr}</div>
                    {blockUrlError && (
                      <div
                        className="errors mb-2"
                        dangerouslySetInnerHTML={{ __html: blockUrlError }}
                      ></div>
                    )}
                    <div className="action-button text-center ">
                      <button
                        type="submit"
                        className="btn btn-orange-default"
                        disabled={buttonDisable}
                      >
                        Sponsor
                      </button>
                    </div>
                    {success ? <div className="success">{success}</div> : ""}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="newsletter">
        <div className="container-xl">
          <div className="row">
            <div className="col-12">
              <div className="form-newsletter">
                <div className="row g-0 align-items-center">
                  <div className="col-12 col-md-12 col-lg-6 mb-4 mb-lg-0">
                    <h2 className="text-center text-lg-end m-0">
                      Receive updates when new <br className="d-none" />{" "}
                      episodes are released{" "}
                    </h2>
                  </div>
                  <div className="col-12 col-md-12 col-lg-6">
                    <form
                      className="position-relative"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Email"
                          {...register("Email", { required: true, min: 1 })}
                        />
                        <div className="form-container">
                          <button type="submit">
                            <span className="icon-sent icon-Icon-ionic-ios-send"></span>
                          </button>
                        </div>
                      </div>
                      <div className="messages">
                        {state.errors && (
                          <div
                            className="error"
                            dangerouslySetInnerHTML={{ __html: state.errors }}
                          ></div>
                        )}
                        <div className="success">{state.success}</div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
