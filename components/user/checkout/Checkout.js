import Logo from "../../../public/images/logo.png";
import Bag from "../../../public/images/bag.png";
import Output from "../../../public/images/output.png";
import { useEffect, useState, useRef } from "react";
import UserAPI from "../../../services/user/UserAPI";
import Router, { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import AutoComplete, { usePlacesWidget } from "react-google-autocomplete";
import ReCAPTCHA from "react-google-recaptcha";
import AuthAPI from "../../../services/common/AuthAPI";

export default function CheckoutProcess(data) {
  var validators = require("credit-card-validate");
  const countryList = require("country-list");
  const countryArr = countryList.getNames();
  const checkEmptyInput = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const cardNum = useRef();
  const cardExp = useRef();
  const cardCvv = useRef();
  const cardHolderName = useRef();
  const phoneRef = useRef();
  const countryRef = useRef();
  const recaptchaRef = useRef({});
  const router = useRouter();
  const promoinput = useRef();
  const giftName = useRef();
  const giftEmail = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [splPck, setSplPck] = useState(null);
  const [commonErr, setCommonErr] = useState(null);
  const [gift, setGift] = useState({ name: null, email: null, message: null });
  const [packageRadio, setPackage] = useState(null);
  const [recaptchaErr, setRecaptchaErr] = useState(null);
  const [state, setState] = useState({
    showAnotherPayment: false,
    subtotal: null,
    success: null,
    error: null,
    cookie: false,
    videoThumb: null,
    videoDesc: null,
    videoName: null,
    packages: [],
  });
  const [formData, setFormData] = useState({
    password: null,
    exp_month: null,
    exp_year: null,
    selectPackage: null,
    useSavedPayment: false,
    addPaymentMethod: false,
    cardNumber: null,
    cardExp: null,
    cvv: null,
    holderName: null,
    phone: null,
    email: null,
    password: null,
    address: null,
    city: null,
    zip: null,
    region: null,
    country: null,
  });
  const [fieldErrors, setFieldErrors] = useState({
    passwordError: null,
    packageError: null,
    cardNumError: null,
    cardExpError: null,
    cvvError: null,
    cardHolderError: null,
    phoneError: null,
    emailError: null,
    addressError: null,
    cityError: null,
    zipError: null,
    regionError: null,
    countryError: null,
    giftNameError: null,
    giftEmailError: null,
  });
  const [focusErrors, setFocusErrors] = useState(null);
  const [payBtnDisable, setPayBtnDisable] = useState({ payBtnDisable: true });
  const [savedCardId, setSavedCardId] = useState(null);
  const [showcards, setShowCards] = useState([]);
  const [savedCardsNo, setSavedCardsNo] = useState(0);
  const [loader, setLoader] = useState(false);
  const [promo, setPromo] = useState(null);
  const [promoErr, setPromoErr] = useState(null);
  const [promoSuccess, setPromoSuccess] = useState(null);
  const [promoFlag, setPromoFlag] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [promoCode, setPromoCode] = useState(null);
  const [showPromo, setShowPromo] = useState(false);
  const [orderDone, setOrderData] = useState(null);
  const [city, setCity] = useState(null);
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState(null);
  const [country, setCountry] = useState(null);
  const [zip, setZip] = useState(null);
  const [promoTxt, setPromoTxt] = useState("Apply");
  const [originalTotal, setOriginalTotal] = useState(null);
  var placeReq = false;
  const [utmID, setUtmID] = useState(null);
  const [utmSource, setUtmSource] = useState(null);
  const [utmMedium, setUtmMedium] = useState(null);
  const [utmCampaign, setUtmCampaign] = useState(null);
  const [utmTerm, setUtmTerm] = useState(null);
  const [utmCampaignContent, setUtmCampaignContent] = useState(null);
  const [showSpl, setShowSpl] = useState(false);
  const [giftFlag, setGiftFlag] = useState(false);
  const [giftFriendError, setGiftFriendError] = useState(null);
  const [cardBlockErr, setCardBlockErr] = useState(null);
  const [validatedUser, setValidatedUser] = useState(null);

  const combineErrorMessages = (errorMessages) => {
    const combinedMessages = Object.values(errorMessages)
      .filter((errorMessage) => errorMessage !== null && errorMessage !== "")
      .join("\n"); // Join the non-null error messages with a line break

    return combinedMessages;
  };

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

  useEffect(async () => {
    setState({ ...state, cookie: localStorage.getItem("hk_user_auth_ticket") });
    if (data.splOffer) {
      setSplPck(data.splPckg[0].id);
    }
    setLoader(true);
    if (localStorage.getItem("hk_user_auth_ticket")) {
      getSavedPayment();
    }
    if (data.vid) {
      getVideoData();
    }
    if (data.utmID) {
      setUtmID(data.utmID);
    }
    if (data.utmSource) {
      setUtmSource(data.utmSource);
    }
    if (data.utmMedium) {
      setUtmMedium(data.utmMedium);
    }
    if (data.utmCampaign) {
      setUtmCampaign(data.utmCampaign);
    }
    if (data.utmCampaignContent) {
      setUtmCampaignContent(data.utmCampaignContent);
    }
    if (data.utmTerm) {
      setUtmTerm(data.utmTerm);
    }
    userValidate();
  }, [data]);

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

  const handleGiftPurchase = (e) => {
    if (!e.target.classList.contains("collapsed")) {
      setGiftFlag(true);
    } else {
      setGiftFriendError(null);
      setGiftFlag(false);
    }
  };

  const handleCardDelete = async (cardID) => {
    setLoader(true);
    setCardBlockErr(null);
    await UserAPI.cardDelete(
      cardID,
      localStorage.getItem("hk_user_auth_ticket")
    )
      .then((response) => {
        if (response.data.status) {
          window.location.reload();
        }
      })
      .catch((error) => {
        if (!error.response) {
          setCardBlockErr(
            "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>"
          );
        }
        //console.log(error.response);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleAllCardDelete = async () => {
    setLoader(true);
    setCardBlockErr(null);
    await UserAPI.cardAllDelete(
      showcards,
      localStorage.getItem("hk_user_auth_ticket")
    )
      .then((response) => {
        var responseData = response[response.length - 1];
        if (responseData.data.status) {
          window.location.reload();
        }
      })
      .catch((error) => {
        if (!error.response) {
          setCardBlockErr(
            "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>"
          );
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleDesign = (e) => {
    var otherSP = [].slice.call(document.getElementsByClassName("spl-offer"));
    otherSP.forEach((e) => e.classList.remove("orgn-border"));
    var SP = [].slice.call(document.getElementsByClassName("sp"));
    SP.forEach((e) => e.classList.remove("checked11"));
    e.target.closest(`li`).classList.add("orgn-border");
    e.target.closest(`div.form-check`).classList.add("checked11");
    let dataID = e.target.closest(`li`).getAttribute("data-id");
    let dataPrice = e.target.closest(`li`).getAttribute("data-price");

    var radio = document.querySelector(
      "input[type=radio][name=optradio]:checked"
    );
    radio.checked = false;

    var elements = [].slice.call(document.getElementsByClassName("op"));
    elements.forEach((e) => e.classList.remove("checked11"));

    setSplPck(dataID);
    setPackage(null);
    setState({ ...state, subtotal: Number(dataPrice) });
    setOriginalTotal(Number(dataPrice));
  };
  async function userValidate() {
    await UserAPI.validateUser(localStorage.getItem("hk_user_auth_ticket"))
      .then((response) => {
        setValidatedUser(true);
      })
      .catch((error) => {
        setValidatedUser(false);
        localStorage.removeItem("hk_user_auth_ticket");
      });
  }
  const formValidation = () => {
    const reset = {
      packageError: null,
      cardNumError: null,
      cardExpError: null,
      cvvError: null,
      cardHolderError: null,
      phoneError: null,
      emailError: null,
      addressError: null,
      cityError: null,
      zipError: null,
      regionError: null,
      countryError: null,
      giftNameError: null,
      giftEmailError: null,
    };
    setFocusErrors(null);
    setGiftFriendError(null);
    setFieldErrors({ ...reset });
    const cardNumberRegex =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/;

    const nameRegex = /^[A-Za-z ]+$/;

    if (
      localStorage.getItem("hk_user_auth_ticket") &&
      formData.addPaymentMethod
    ) {
      if (gift.name == null && giftFlag) {
        giftName.current.focus();
        giftName.current.classList.add("field-error");
        setGiftFriendError("Please add friend's name");
        setFieldErrors({
          ...fieldErrors,
          giftNameError: "Please add friend's name",
        });
        return false;
      } else if (gift.email == null && giftFlag) {
        giftEmail.current.focus();
        giftEmail.current.classList.add("field-error");
        setGiftFriendError("Please enter a valid friend's email address");
        setFieldErrors({
          ...fieldErrors,
          giftEmailError: "Please enter a valid friend's email address",
        });
        return false;
      } else if (
        formData.cardNumber == null ||
        !cardNumberRegex.test(formData.cardNumber.replace(/\s/g, ""))
      ) {
        cardNum.current.focus();
        cardNum.current.classList.add("field-error");
        setFocusErrors("Please add valid card number");
        setFieldErrors({
          ...fieldErrors,
          cardNumError: "Please add valid card number",
        });
        return false;
      } else if (formData.cardExp == null) {
        cardExp.current.focus();
        cardExp.current.classList.add("field-error");
        setFocusErrors("Please add valid card expiry");
        setFieldErrors({
          ...fieldErrors,
          cardExpError: "Please add valid card expiry",
        });
        return false;
      } else if (formData.cvv == null) {
        cardCvv.current.focus();
        cardCvv.current.classList.add("field-error");
        setFocusErrors("Please add cvv");
        setFieldErrors({
          ...fieldErrors,
          cvvError: "Please add cvv",
        });
        return false;
      } else if (
        formData.holderName == null ||
        !nameRegex.test(formData.holderName)
      ) {
        cardHolderName.current.focus();
        cardHolderName.current.classList.add("field-error");
        setFocusErrors(
          "Cardholder name must only contain alphabetic characters and cannot be empty."
        );
        setFieldErrors({
          ...fieldErrors,
          cardHolderError:
            "Cardholder name must only contain alphabetic characters and cannot be empty.",
        });
        return false;
      } else {
        return true;
      }
    } else if (
      localStorage.getItem("hk_user_auth_ticket") &&
      formData.useSavedPayment
    ) {
      if (gift.name == null && giftFlag) {
        giftName.current.focus();
        giftName.current.classList.add("field-error");
        setGiftFriendError("Please add friend's name");
        setFieldErrors({
          ...fieldErrors,
          giftNameError: "Please add friend's name",
        });
        return false;
      } else if (gift.email == null && giftFlag) {
        giftEmail.current.focus();
        giftEmail.current.classList.add("field-error");
        setGiftFriendError("Please enter a valid friend's email address");
        setFieldErrors({
          ...fieldErrors,
          giftEmailError: "Please enter a valid friend's email address",
        });
        return false;
      } else {
        return true;
      }
    } else if (!localStorage.getItem("hk_user_auth_ticket")) {
      if (gift.name == null && giftFlag) {
        giftName.current.focus();
        giftName.current.classList.add("field-error");
        setGiftFriendError("Please add friend's name");
        setFieldErrors({
          ...fieldErrors,
          giftNameError: "Please add friend's name",
        });
        return false;
      } else if (gift.email == null && giftFlag) {
        giftEmail.current.focus();
        giftEmail.current.classList.add("field-error");
        setGiftFriendError("Please enter a valid friend's email address");
        setFieldErrors({
          ...fieldErrors,
          giftEmailError: "Please enter a valid friend's email address",
        });
        return false;
      } else if (formData.email == null) {
        emailRef.current.focus();
        emailRef.current.classList.add("field-error");
        setFocusErrors("Please enter a valid email address");
        setFieldErrors({
          ...fieldErrors,
          emailError: "Please enter a valid email address",
        });
        return false;
      } else if (formData.password == null) {
        passRef.current.focus();
        passRef.current.classList.add("field-error");
        setFocusErrors("Password must be minimum 6 characters");
        setFieldErrors({
          ...fieldErrors,
          passwordError: "Password must be minimum 6 characters",
        });
        return false;
      } else if (
        formData.cardNumber == null ||
        !cardNumberRegex.test(formData.cardNumber.replace(/\s/g, ""))
      ) {
        cardNum.current.focus();
        cardNum.current.classList.add("field-error");
        setFocusErrors("Please add valid card number");
        setFieldErrors({
          ...fieldErrors,
          cardNumError: "Please add valid card number",
        });
        return false;
      } else if (formData.cardExp == null) {
        cardExp.current.focus();
        cardExp.current.classList.add("field-error");
        setFocusErrors("Please add valid card expiry");
        setFieldErrors({
          ...fieldErrors,
          cardExpError: "Please add valid card expiry",
        });
        return false;
      } else if (formData.cvv == null) {
        cardCvv.current.focus();
        cardCvv.current.classList.add("field-error");
        setFocusErrors("Please add cvv");
        setFieldErrors({
          ...fieldErrors,
          cvvError: "Please add cvv",
        });
        return false;
      } else if (formData.holderName == null) {
        cardHolderName.current.focus();
        cardHolderName.current.classList.add("field-error");
        setFocusErrors(
          "Cardholder name must only contain alphabetic characters and cannot be empty."
        );
        setFieldErrors({
          ...fieldErrors,
          cardHolderError:
            "Cardholder name must only contain alphabetic characters and cannot be empty.",
        });
        return false;
      } else if (formData.phone == null) {
        phoneRef.current.focus();
        phoneRef.current.classList.add("field-error");
        setFocusErrors("Please add phone number");
        setFieldErrors({
          ...fieldErrors,
          phoneError: "Please add phone number",
        });
        return false;
      } else if (formData.country == null) {
        countryRef.current.focus();
        countryRef.current.classList.add("field-error");
        setFocusErrors("Please choose country");
        setFieldErrors({
          ...fieldErrors,
          countryError: "Please choose country",
        });
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const onPromo = async (e) => {
    setPromoSuccess(null);
    setPromoErr(null);
    if (e.target.textContent.trim() == "Apply") {
      if (promoinput.current.value) {
        var reqBody = {
          promo_code: promoinput.current.value,
        };
        await UserAPI.promoCode(reqBody)
          .then((response) => {
            //console.log(response.data);
            if (response.data.data.discount_percentage) {
              setPromoCode(response.data.data.id);
              setPromoFlag(true);
              setDiscount(Number(response.data.data.discount_percentage));
              setPromoSuccess(response.data.message);
              setState({
                ...state,
                subtotal:
                  parseFloat(state.subtotal).toFixed(2) -
                  (
                    (parseFloat(state.subtotal).toFixed(2) *
                      Number(response.data.data.discount_percentage)) /
                    100
                  ).toFixed(2),
              });
              e.target.textContent = "Reset";
            }
          })
          .catch((error) => {
            if (error.response) {
              setPromoErr(error.response.data.message);
            } else {
              setPromoErr(
                "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>"
              );
            }
          });
      } else {
        promoinput.current.focus();
      }
    } else {
      promoinput.current.value = "";
      promoinput.current.focus();
      e.target.textContent = "Apply";
      setPromoCode(null);
      setDiscount(null);
      setState({ ...state, subtotal: originalTotal });
    }
  };

  const handleShowPromo = () => {
    setShowPromo(!showPromo);
  };

  const handleSavedCardId = (event) => {
    setSavedCardId(event.target.value);
  };
  const getVideoData = async () => {
    await UserAPI.getVideopackage(data.vid)
      .then((response) => {
        if (response.data.data.packages) {
          setPackage(response.data.data.packages[0].id);
          setPayBtnDisable({ ...payBtnDisable, payBtnDisable: false });
          var dataSet = {
            subtotal: data.splOffer
              ? Number(data.splPckg[0].price)
              : Number(response.data.data.packages[0].price),
            videoThumb: response.data.data.desktop_thumb,
            videoDesc: response.data.data.description,
            videoName: response.data.data.name,
            packages: response.data.data.packages,
          };
          setState({ ...state, ...dataSet });
          setOriginalTotal(Number(response.data.data.packages[0].price));
        } else {
          Router.push("/");
        }
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const getSavedPayment = async () => {
    await UserAPI.getSavedCards(localStorage.getItem("hk_user_auth_ticket"))
      .then((response) => {
        setSavedCardsNo(response.data.data.length);
        setShowCards(response.data.data);
        setSavedCardId(response.data.data[0].id);
        var changeVal = { addPaymentMethod: false, useSavedPayment: true };
        setFormData({ ...formData, ...changeVal });
      })
      .catch((error) => {
        var changeVal = { addPaymentMethod: true, useSavedPayment: false };
        setFormData({ ...formData, ...changeVal });
      });
  };

  const showAnotherPayment = () => {
    var formDiff = { useSavedPayment: false, addPaymentMethod: true };
    setState({ ...state, showAnotherPayment: true });
    setFormData({ ...formData, ...formDiff });
    setSavedCardId(null);
  };

  const handleAddress = (event) => {
    if (event.target.name == "city") {
      var city = event.target.value.split(",");
      var changeData = { city: city[0], state: city[1] };
      setFormData({ ...formData, ...changeData });
    }
  };

  const formDataHandle = (event) => {
    if (event.target.name == "normalRadio") {
      //console.log("yay");
    } else if (event.target.name == "optradio") {
      //console.log("here");
      setShowSpl(false);
      var radio = document.querySelector("input[type=radio][name=spradio]");
      if (radio.checked) {
        radio.checked = false;
      }
      setSplPck(null);
      var elementsSP = [].slice.call(
        document.getElementsByClassName("form-check")
      );
      elementsSP.forEach((e) => e.classList.remove("checked11"));

      var otherSP = [].slice.call(document.getElementsByClassName("spl-offer"));
      otherSP.forEach((e) => e.classList.remove("orgn-border"));

      let closeAccordion = document.querySelector(".collapse");
      closeAccordion.classList.remove("show");

      var elements = [].slice.call(
        document.getElementsByClassName("form-check")
      );
      elements.forEach((e) => e.classList.remove("checked11"));
      event.target.parentNode.classList.add("checked11");
      setPackage(event.target.getAttribute("value"));
      if (discount) {
        setState({
          ...state,
          subtotal:
            Number(event.target.getAttribute("data-price")) -
            (Number(event.target.getAttribute("data-price")) * discount) / 100,
        });
      } else {
        setState({
          ...state,
          subtotal: event.target.getAttribute("data-price"),
        });
      }
      setOriginalTotal(Number(event.target.getAttribute("data-price")));
      setPayBtnDisable({ ...payBtnDisable, payBtnDisable: false });
    } else if (event.target.name == "spradio") {
      setShowSpl(true);
      var radio = document.querySelector("input[type=radio][name=optradio]");
      if (radio.checked) {
        radio.checked = false;
      }
      var elements = [].slice.call(
        document.getElementsByClassName("form-check")
      );
      elements.forEach((e) => e.classList.remove("checked11"));
      var elements = [].slice.call(document.getElementsByClassName("sp"));
      elements.forEach((e) => e.classList.remove("checked11"));
      event.target.parentNode.classList.add("checked11");
      setSplPck(event.target.getAttribute("value"));
      setPackage(null);
      setState({
        ...state,
        subtotal: Number(event.target.getAttribute("data-price")),
      });
      setOriginalTotal(Number(event.target.getAttribute("data-price")));
    } else if (event.target.id == "sp") {
      getSavedPayment();
      var sp = { useSavedPayment: true, addPaymentMethod: false };
      setFormData({ ...formData, ...sp });
    } else if (event.target.id == "ap") {
      var ap = { useSavedPayment: false, addPaymentMethod: true };
      setFormData({ ...formData, ...ap });
    } else if (event.target.name == "cardnumber") {
      if (event.target.value) {
        event.target.classList.remove("field-error");
        setFieldErrors({
          ...fieldErrors,
          cardNumError: null,
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
          setFormData({ ...formData, cardNumber: formatCardNumber(v, "visa") });
        } else if (mastercardRegex.test(v) && isLuhnValid(v)) {
          setFormData({
            ...formData,
            cardNumber: formatCardNumber(v, "mastercard"),
          });
        } else if (amexRegex.test(v) && isLuhnValid(v)) {
          setFormData({
            ...formData,
            cardNumber: formatCardNumber(v, "amex"),
          });
        } else if (discoverRegex.test(v) && isLuhnValid(v)) {
          setFormData({
            ...formData,
            cardNumber: formatCardNumber(v, "discover"),
          });
        } else if (dinersClubRegex.test(v) && isLuhnValid(v)) {
          setFormData({
            ...formData,
            cardNumber: formatCardNumber(v, "dinersclub"),
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
            cardNumber: formatCardNumber(v),
          });
        }
      } else {
        event.target.classList.add("field-error");
        setFieldErrors({
          ...fieldErrors,
          cardNumError: "Please add valid card number",
        });
        setFormData({
          ...formData,
          cardNumber: null,
        });
      }
    } else if (event.target.name == "cardexp") {
      event.target.classList.remove("field-error");
      if (event.target.value) {
        var inputChar = String.fromCharCode(event.keyCode);
        var code = event.keyCode;
        var allowedKeys = [8];
        if (allowedKeys.indexOf(code) !== -1) {
          return;
        }

        event.target.value = event.target.value
          .replace(
            /^([1-9]\/|[2-9])$/g,
            "0$1/" // 3 > 03/
          )
          .replace(
            /^(0[1-9]|1[0-2])$/g,
            "$1/" // 11 > 11/
          )
          .replace(
            /^([0-1])([3-9])$/g,
            "0$1/$2" // 13 > 01/3
          )
          .replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
            "$1/$2" // 141 > 01/41
          )
          .replace(
            /^([0]+)\/|[0]+$/g,
            "0" // 0/ > 0 and 00 > 0
          )
          .replace(
            /[^\d\/]|^[\/]*$/g,
            "" // To allow only digits and `/`
          )
          .replace(
            /\/\//g,
            "/" // Prevent entering more than 1 `/`
          );
        if (event.target.value.length > event.target.maxLength) {
          event.target.value = event.target.value.slice(
            0,
            event.target.maxLength
          );
          event.target.classList.remove("field-error");
          setFormData({
            ...formData,
            cardExp: event.target.value.slice(0, event.target.maxLength),
          });
          setFieldErrors({
            ...fieldErrors,
            cardExpError: null,
          });
        } else {
          event.target.classList.remove("field-error");
          setFormData({ ...formData, cardExp: event.target.value });
          setFieldErrors({
            ...fieldErrors,
            cardExpError: null,
          });
        }
      } else {
        event.target.classList.add("field-error");
        setFormData({ ...formData, cardExp: null });
        setFieldErrors({
          ...fieldErrors,
          cardExpError: "Please add card expiry",
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
            cvvError: null,
          });
        } else {
          event.target.classList.remove("field-error");
          setFormData({ ...formData, cvv: vRe });
          setFieldErrors({
            ...fieldErrors,
            cvvError: null,
          });
        }
      } else {
        event.target.classList.add("field-error");
        setFormData({ ...formData, cvv: null });
        setFieldErrors({
          ...fieldErrors,
          cvvError: "Please add cvv",
        });
      }
    } else if (event.target.name == "holdername") {
      if (event.target.value) {
        var holderRegex = /^[A-Za-z ]+$/;
        if (holderRegex.test(event.target.value)) {
          event.target.classList.remove("field-error");
          setFormData({ ...formData, holderName: event.target.value });
          setFieldErrors({
            ...fieldErrors,
            cardHolderError: null,
          });
        } else {
          event.target.classList.add("field-error");
          setFormData({ ...formData, holderName: null });
          setFieldErrors({
            ...fieldErrors,
            cardHolderError: "please add alphabetical letters",
          });
        }
      } else {
        event.target.classList.add("field-error");
        setFieldErrors({
          ...fieldErrors,
          cardHolderError:
            "Cardholder name must only contain alphabetic characters and cannot be empty.",
        });
      }
    } else if (event.target.name == "phone") {
      if (event.target.value) {
        event.target.classList.remove("field-error");
        const v = event.target.value
          .replace(/\s+/g, "")
          .replace(/[^0-9]/gi, "");
        var phoneRegex = /^(\+\d{1,3}\s?)?(\(\d{1,}\)\s?)?[\d\s\-]{5,}$/;
        if (phoneRegex.test(v)) {
          event.target.classList.remove("field-error");
          setFormData({ ...formData, phone: v });
          setFieldErrors({
            ...fieldErrors,
            phoneError: null,
          });
        } else {
          event.target.classList.add("field-error");
          setFormData({ ...formData, phone: null });
          setFieldErrors({
            ...fieldErrors,
            phoneError: "Please add phone number",
          });
        }
      } else {
        event.target.classList.add("field-error");
        setFormData({ ...formData, phone: null });
        setFieldErrors({
          ...fieldErrors,
          phoneError: "Please add phone number",
        });
      }
    } else if (event.target.name == "email") {
      setFieldErrors({ ...fieldErrors, emailError: null });
      const regex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      if (regex.test(event.target.value)) {
        event.target.classList.remove("field-error");
        setFormData({ ...formData, email: event.target.value });
        setFieldErrors({
          ...fieldErrors,
          emailError: null,
        });
      } else {
        setFormData({ ...formData, email: null });
        setFieldErrors({
          ...fieldErrors,
          emailError: "Please enter a valid email address",
        });
        event.target.classList.add("field-error");
      }
    } else if (event.target.name == "password") {
      setFieldErrors({ ...fieldErrors, passwordError: null });
      const passRegex = /^.{6,}$/;
      if (passRegex.test(event.target.value)) {
        event.target.classList.remove("field-error");
        setFormData({ ...formData, password: event.target.value });
        setFieldErrors({
          ...fieldErrors,
          passwordError: null,
        });
      } else {
        setFormData({ ...formData, password: null });
        setFieldErrors({
          ...fieldErrors,
          passwordError: "Password must be minimum 6 characters",
        });
        event.target.classList.add("field-error");
      }
    } else if (event.target.name == "country") {
      setCountry(null);
      if (event.target.value) {
        setFormData({ ...formData, country: event.target.value });
        event.target.classList.remove("field-error");
        setFieldErrors({
          ...fieldErrors,
          countryError: null,
        });
      } else {
        event.target.classList.add("field-error");
        setFieldErrors({
          ...fieldErrors,
          countryError: "Please add country",
        });
      }
    } else if (event.target.name == "promo") {
      setPromo(event.target.value);
    } else if (event.target.name == "giftname") {
      if (event.target.value && giftFlag) {
        event.target.classList.remove("field-error");
        setFieldErrors({ ...fieldErrors, giftNameError: null });
        setGift({ ...gift, name: event.target.value });
      }
    } else if (event.target.name == "giftaddress") {
      if (event.target.value && giftFlag) {
        const regex =
          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (regex.test(event.target.value)) {
          event.target.classList.remove("field-error");
          setGift({ ...gift, email: event.target.value });
          setFieldErrors({
            ...fieldErrors,
            giftEmailError: null,
          });
        } else {
          setGift({ ...gift, message: event.target.value });
          setFieldErrors({
            ...fieldErrors,
            giftEmailError: "Please enter a valid friend's email address",
          });
          event.target.classList.add("field-error");
        }
      }
    } else if (event.target.name == "giftmessage") {
      setGift({ ...gift, message: event.target.value });
    }
  };
  const placeOrder = async () => {
    setRecaptchaErr(null);
    setCommonErr(null);

    if (recaptchaRef.current.getValue() === null) {
      setRecaptchaErr(
        "We have detected your device is not able to load Recaptcha, please try to login from another device"
      );
      setLoader(false);
    } else {
      const token = await recaptchaRef.current.executeAsync();

      if (formValidation()) {
        var packageSelected = packageRadio ? [packageRadio] : null;
        if (formData.cardExp) {
          var cardexp = formData.cardExp.split("/");
        }
        if (formData.holderName) {
          var holderName = formData.holderName.trim();
        }
        if (formData.email) {
          var email = formData.email.toString().toLowerCase().trim();
        }

        if (formData.useSavedPayment && validatedUser) {
          const reset = {
            packageError: null,
            cardNumError: null,
            cardExpError: null,
            cvvError: null,
            cardHolderError: null,
            phoneError: null,
            emailError: null,
            addressError: null,
            cityError: null,
            zipError: null,
            regionError: null,
            countryError: null,
            giftNameError: null,
            giftEmailError: null,
          };
          setFieldErrors({ ...reset });
          setLoader(true);
          setPayBtnDisable({ ...payBtnDisable, payBtnDisable: true });
          var reqBody = {
            card_number: formData.cardNumber,
            exp_month: cardexp ? cardexp[0] : "",
            exp_year: cardexp ? cardexp[1] : "",
            items: packageSelected,
            cvv: formData.cvv,
            special_package_id: splPck ? splPck : null,
            saved_card: formData.addPaymentMethod,
            saved_card_id:
              formData.useSavedPayment && savedCardId ? savedCardId : "",
            promo_code_id: promoCode ? promoCode : "",
            gift_name: giftFlag ? gift.name : "",
            gift_email: giftFlag ? gift.email : "",
            gift_message: gift.message,
            utm_id: utmID,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_term: utmTerm,
            utm_campaign_content: utmCampaignContent,
            debug_params: "logged in",
          };
        } else if (formData.addPaymentMethod && validatedUser) {
          const reset = {
            packageError: null,
            cardNumError: null,
            cardExpError: null,
            cvvError: null,
            cardHolderError: null,
            phoneError: null,
            emailError: null,
            addressError: null,
            cityError: null,
            zipError: null,
            regionError: null,
            countryError: null,
            giftNameError: null,
            giftEmailError: null,
          };
          setFieldErrors({ ...reset });
          setLoader(true);
          setPayBtnDisable({ ...payBtnDisable, payBtnDisable: true });
          var reqBody = {
            firstName: holderName,
            card_number: formData.cardNumber,
            exp_month: cardexp ? cardexp[0] : "",
            exp_year: cardexp ? cardexp[1] : "",
            items: packageSelected,
            cvv: formData.cvv,
            special_package_id: splPck ? splPck : null,
            saved_card: formData.addPaymentMethod,
            saved_card_id:
              formData.useSavedPayment && savedCardId ? savedCardId : "",
            promo_code_id: promoCode ? promoCode : "",
            gift_name: giftFlag ? gift.name : "",
            gift_email: giftFlag ? gift.email : "",
            gift_message: gift.message,
            utm_id: utmID,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_term: utmTerm,
            utm_campaign_content: utmCampaignContent,
            debug_params: "logged in and new payment",
          };
        } else {
          const reset = {
            packageError: null,
            cardNumError: null,
            cardExpError: null,
            cvvError: null,
            cardHolderError: null,
            phoneError: null,
            emailError: null,
            addressError: null,
            cityError: null,
            zipError: null,
            regionError: null,
            countryError: null,
            giftNameError: null,
            giftEmailError: null,
          };
          setFieldErrors({ ...reset });
          setLoader(true);
          setPayBtnDisable({ ...payBtnDisable, payBtnDisable: true });
          var reqBody = {
            firstName: holderName,
            email: email,
            password: formData.password,
            mobile: formData.phone,
            card_number: formData.cardNumber,
            exp_month: cardexp ? cardexp[0] : "",
            exp_year: cardexp ? cardexp[1] : "",
            cvv: formData.cvv,
            items: packageSelected,
            saved_card: true,
            country: country ? country : formData.country,
            promo_code_id: promoCode ? promoCode : "",
            special_package_id: splPck ? splPck : null,
            gift_name: giftFlag ? gift.name : "",
            gift_email: giftFlag ? gift.email : "",
            gift_message: gift.message,
            utm_id: utmID,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_term: utmTerm,
            utm_campaign_content: utmCampaignContent,
            debug_params: "guest user",
          };
        }

        if (validatedUser && formData.useSavedPayment) {
          await UserAPI.placeorder(
            reqBody,
            localStorage.getItem("hk_user_auth_ticket")
          )
            .then((response) => {
              if (response.data.status) {
                setOrderData(response.data.data);
                if (response.data.data.token) {
                  localStorage.setItem(
                    "hk_user_auth_ticket",
                    response.data.data.token
                  );
                }
                var myDate = new Date();
                myDate.setHours(myDate.getHours() + 24);
                localStorage.setItem(
                  "hk_user_auth_ticket_expire",
                  myDate.getTime()
                );
                if (response?.data?.data?.user?.firstName) {
                  localStorage.setItem(
                    "hk_user_name",
                    response.data.data.user.firstName
                  );
                }
                if (response?.data?.data?.user?.email) {
                  localStorage.setItem(
                    "hk_user_email",
                    response.data.data.user.email
                  );
                }

                router.push({
                  pathname: "/order-successful",
                  query: { orderid: response.data.data.order_id },
                });
              }
            })
            .catch((error) => {
              console.log(error.response.data.message);
              if (error.response) {
                const errorMessages = {
                  packageError: null,
                };
                setFieldErrors({ ...errorMessages });

                setCommonErr(error.response.data.message);
                setRecaptchaErr(combineErrorMessages(errorMessages));
              } else {
                setCommonErr(
                  "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>"
                );
              }
            })
            .finally(() => {
              setLoader(false);
              setPayBtnDisable({ ...payBtnDisable, payBtnDisable: false });
            });
        } else if (validatedUser && formData.addPaymentMethod) {
          await UserAPI.placeorder(
            reqBody,
            localStorage.getItem("hk_user_auth_ticket")
          )
            .then((response) => {
              if (response.data.status) {
                setOrderData(response.data.data);
                if (response.data.data.token) {
                  localStorage.setItem(
                    "hk_user_auth_ticket",
                    response.data.data.token
                  );
                }
                var myDate = new Date();
                myDate.setHours(myDate.getHours() + 24);
                localStorage.setItem(
                  "hk_user_auth_ticket_expire",
                  myDate.getTime()
                );
                if (response?.data?.data?.user?.firstName) {
                  localStorage.setItem(
                    "hk_user_name",
                    response.data.data.user.firstName
                  );
                }
                if (response?.data?.data?.user?.email) {
                  localStorage.setItem(
                    "hk_user_email",
                    response.data.data.user.email
                  );
                }

                router.push({
                  pathname: "/order-successful",
                  query: { orderid: response.data.data.order_id },
                });
              }
            })
            .catch((error) => {
              console.log(error.response.data.message);
              if (error.response) {
                const errorMessages = {
                  packageError: null,
                  cardNumError: error.response.data.data.card_number
                    ? error.response.data.data.card_number
                    : null,
                  cardExpError:
                    error.response.data.data.exp_month ||
                    error.response.data.data.exp_year
                      ? "Please add card expiry"
                      : null,
                  cardHolderError: error.response?.data?.data?.firstName
                    ? error.response.data.data.firstName
                    : null,
                };

                setFieldErrors({ ...errorMessages });
                setCommonErr(error.response.data.message);
                setRecaptchaErr(combineErrorMessages(errorMessages));
              } else {
                setCommonErr(
                  "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>"
                );
              }
            })
            .finally(() => {
              setLoader(false);
              setPayBtnDisable({ ...payBtnDisable, payBtnDisable: false });
            });
        } else {
          await UserAPI.placeorder(reqBody)
            .then((response) => {
              if (response.data.status) {
                setOrderData(response.data.data);
                if (response.data.data.token) {
                  localStorage.setItem(
                    "hk_user_auth_ticket",
                    response.data.data.token
                  );
                }
                var myDate = new Date();
                myDate.setHours(myDate.getHours() + 24);
                localStorage.setItem(
                  "hk_user_auth_ticket_expire",
                  myDate.getTime()
                );
                if (response?.data?.data?.user?.firstName) {
                  localStorage.setItem(
                    "hk_user_name",
                    response.data.data.user.firstName
                  );
                }
                if (response?.data?.data?.user?.email) {
                  localStorage.setItem(
                    "hk_user_email",
                    response.data.data.user.email
                  );
                }

                router.push({
                  pathname: "/order-successful",
                  query: { orderid: response.data.data.order_id },
                });
              }
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response.data.data.email);
                const errorMessages = {
                  packageError: null,
                  cardNumError: error.response.data.data.card_number
                    ? error.response.data.data.card_number
                    : null,
                  cardExpError:
                    error.response.data.data.exp_month ||
                    error.response.data.data.exp_year
                      ? "Please add card expiry"
                      : null,
                  cardHolderError: error.response?.data?.data?.firstName
                    ? error.response.data.data.firstName
                    : null,
                  phoneError: error.response.data.data.mobile
                    ? error.response.data.data.mobile
                    : null,
                  emailError: error.response.data.data.email
                    ? error.response.data.data.email
                    : null,
                  passwordError: error.response.data.data.password
                    ? error.response.data.data.password
                    : null,
                  addressError: error.response.data.data.address
                    ? error.response.data.data.address
                    : null,
                  cityError: error.response.data.data.city
                    ? error.response.data.data.city
                    : null,
                  regionError: error.response.data.data.state
                    ? error.response.data.data.state
                    : null,
                  countryError: error.response.data.data.country
                    ? error.response.data.data.country
                    : null,
                };
                setFieldErrors({ ...errorMessages });

                setCommonErr(error.response.data.message);
                setRecaptchaErr(combineErrorMessages(errorMessages));
              } else {
                setCommonErr(
                  "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>"
                );
              }
            })
            .finally(() => {
              setLoader(false);
              setPayBtnDisable({ ...payBtnDisable, payBtnDisable: false });
            });
        }
      } else {
        setLoader(false);
        setPayBtnDisable({ ...payBtnDisable, payBtnDisable: false });
      }
    }
  };

  return (
    <>
      <div class={loader ? "loader-inner d-block" : "loader-inner d-none"}>
        <div class="loader">
          <svg>
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="2"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2"
                  result="gooey"
                />
                <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <section
        className="cover-contact cover-contact-donate cover-contact-checkout"
        hidden
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="h1 text-bold">Checkout Page </h1>
            </div>
          </div>
        </div>
      </section>
      {data.vid ? (
        <section className="midd-back-action pt-5">
          <div className="container-fluid max-1366">
            <div className="row">
              <div className="col-12">
                <div className="bkend-top-title mb-0 border-bottom-0 position-relative">
                  <div className="back-action-btn">
                    <Link href="/">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-orange btn-them-back d-flex align-items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="me-2"
                          width="20"
                          height="20px"
                          viewBox="0 0 34.975 23.33"
                        >
                          <path
                            id="Icon_awesome-arrow-left"
                            className="arrow-fill"
                            data-name="Icon awesome-arrow-left"
                            d="M13.755,24.414,12.57,25.6a1.277,1.277,0,0,1-1.811,0L.373,15.22a1.277,1.277,0,0,1,0-1.811L10.758,3.024a1.277,1.277,0,0,1,1.811,0L13.755,4.21a1.284,1.284,0,0,1-.021,1.832L7.3,12.175H33.689a1.279,1.279,0,0,1,1.282,1.282v1.71a1.279,1.279,0,0,1-1.282,1.282H7.3l6.437,6.133A1.274,1.274,0,0,1,13.755,24.414Z"
                            transform="translate(0.004 -2.647)"
                            fill="#ff9016"
                          ></path>
                        </svg>
                        Go Back
                      </a>
                    </Link>
                  </div>
                  <div className="title-bild ms-auto me-auto text-center">
                    <img src={Bag.src} alt="" loading="lazy" />
                    <h1 className="text-center single-top-title mt-3">
                      Complete the check out.
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      {data.vid ? (
        <section className="pay-detail mb-5">
          <div className="container-fluid max-1366">
            <div className="row g-xxl-6">
              <div className="col-12 col-sm-12 col-lg-6">
                <div className="output-bilder">
                  {state.videoThumb ? (
                    <div className="purchase-item">
                      <img src={state.videoThumb} alt="" loading="lazy" />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="total-price-container">
                    <div className="total-price mb-4">
                      <div className="full-pr-info">
                        {state.videoName ? (
                          <h3 className="bilder-ttl">{state.videoName}</h3>
                        ) : (
                          ""
                        )}
                      </div>
                      {state.videoDesc ? <p>{state.videoDesc}</p> : ""}
                    </div>
                    {state.packages ? (
                      <div className="full-package-info">
                        <ul className="list-unstyled">
                          {state.packages.map((item, i) => {
                            return (
                              <li name="normalRadio" onClick={formDataHandle}>
                                <div
                                  className={
                                    i == 0 && !data.splOffer
                                      ? "form-check checked11 op"
                                      : "form-check op"
                                  }
                                >
                                  <input
                                    type="radio"
                                    className="form-check-input round-radio"
                                    id={`radio${i}`}
                                    name="optradio"
                                    data-price={item.price}
                                    value={item.id}
                                    onChange={formDataHandle}
                                    defaultChecked={
                                      i == 0 && !data.splOffer ? true : false
                                    }
                                  />
                                  <label
                                    className="form-check-label ms-0"
                                    for={`radio${i}`}
                                  >
                                    <div className="full-pkg-detail">
                                      <div className="d-flex align-items-center justify-content-between">
                                        {item.package_name ? (
                                          <span className="offer-title">
                                            {item.package_name}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                        {item.price ? (
                                          <span className="offer-price">{`$${item.price}`}</span>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              </li>
                            );
                          })}
                          {fieldErrors.packageError ? (
                            <div className="error">
                              {fieldErrors.packageError}
                            </div>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="splpckg mb-5">
                  {data.splPckg && (
                    <>
                      <div class="total-price mb-4">
                        <div class="full-pr-info">
                          <h3 class="bilder-ttl">Special Package</h3>
                        </div>
                      </div>
                      <div
                        className="full-package-info"
                        data-clicked="clickedDiv"
                      >
                        <ul
                          className="list-unstyled comboOfferac"
                          id="accordionNw"
                        >
                          {data.splPckg.map((item, i) => {
                            return (
                              <li
                                className={
                                  i == 0 && data.splOffer
                                    ? "mb-4 spl-offer orgn-border"
                                    : "mb-4 spl-offer"
                                }
                                data-id={item.id}
                                data-price={item.price}
                              >
                                <a
                                  className="btn collapsed p-0 w-100"
                                  data-bs-toggle="collapse"
                                  href={`#collapse${i}`}
                                >
                                  <div
                                    className={
                                      i == 0 && data.splOffer
                                        ? "form-check checked11 sp"
                                        : "form-check sp"
                                    }
                                    onClick={handleDesign}
                                  >
                                    <input
                                      type="radio"
                                      className="form-check-input round-radio"
                                      id={`radio${i}`}
                                      name="spradio"
                                      data-price={item.price}
                                      value={item.id}
                                      onChange={formDataHandle}
                                      defaultChecked={
                                        i == 0 && data.splOffer ? true : false
                                      }
                                    />
                                    <label
                                      className="form-check-label ms-0"
                                      for={`radio${item.id}`}
                                    >
                                      <div className="full-pkg-detail">
                                        <div className="d-flex justify-content-between">
                                          <div className="d-flex flex-column text-start">
                                            {item.package_name ? (
                                              <span className="offer-title">
                                                {item.package_name}
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                            {item.description ? (
                                              <span className="offer-description">
                                                {item.description}
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          {item.price ? (
                                            <span className="offer-price">{`$${item.price}`}</span>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                </a>
                                <div
                                  id={`collapse${i}`}
                                  className="collapse"
                                  data-bs-parent="#accordionNw"
                                >
                                  <div className="inner-content-area">
                                    {item.special_list.map((element, key) => {
                                      return (
                                        <div className="row mb-3">
                                          <div className="col-4">
                                            {element.video.desktop_thumb && (
                                              <img
                                                className="w-100 rounded"
                                                src={
                                                  element.video.desktop_thumb
                                                }
                                                alt=""
                                                loading="lazy"
                                              />
                                            )}
                                          </div>
                                          <div className="col-8">
                                            <div className="product-details-bunch">
                                              {element.video.name && (
                                                <h5 className="videoTitle mb-1">
                                                  {element.video.name}
                                                </h5>
                                              )}
                                              {element.video.description && (
                                                <p className="videoDesc mb-1">
                                                  {element.video.description}
                                                </p>
                                              )}
                                              {/* {element.video.price && 
                                                                        <h6 className="videoPrice mb-0">{element.video.price}</h6>
                                                                    } */}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-12 col-lg-6">
                <div className="forFriend mb-5">
                  <div id="accordion">
                    <div className="card card-condition">
                      <div className="card-header">
                        <a
                          className="btn collapsed"
                          data-bs-toggle="collapse"
                          href="#collapseOne"
                          onClick={handleGiftPurchase}
                        >
                          <ul className="list-unstyled text-start">
                            <li>
                              <span className="w-100 d-block main-title-ff">
                                Purchase for a Friend{" "}
                              </span>
                            </li>
                          </ul>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28.045"
                            height="18.707"
                            viewBox="0 0 28.045 18.707"
                          >
                            <path
                              id="Icon_awesome-arrow-left"
                              data-name="Icon awesome-arrow-left"
                              d="M11.033,17.454l-.951.951a1.024,1.024,0,0,1-1.452,0L.3,10.082a1.024,1.024,0,0,1,0-1.452L8.629.3a1.024,1.024,0,0,1,1.452,0l.951.951a1.029,1.029,0,0,1-.017,1.469L5.854,7.64H27.016a1.026,1.026,0,0,1,1.028,1.028v1.371a1.026,1.026,0,0,1-1.028,1.028H5.854l5.162,4.918A1.022,1.022,0,0,1,11.033,17.454Z"
                              transform="translate(28.045 18.707) rotate(180)"
                              fill="#ff9016"
                            />
                          </svg>
                        </a>
                      </div>

                      <div
                        id="collapseOne"
                        className="collapse"
                        data-bs-parent="#accordion"
                      >
                        <div className="card-body">
                          <span className="w-100 d-block">
                            MAKES A GREAT GIFT!
                          </span>
                          <p>
                            This entire purchase will be assigned to a friend.{" "}
                          </p>
                          <form>
                            <div className="row mb-3">
                              <div className="col-12 col-lg-12 col-xl-6 mb-3 mb-lg-3 mb-xl-0 mb-xxl-0">
                                <input
                                  ref={giftName}
                                  type="text"
                                  className="form-control"
                                  name="giftname"
                                  placeholder="Friend's name:"
                                  onChange={formDataHandle}
                                />
                                {fieldErrors.giftNameError && (
                                  <div class="error">
                                    {fieldErrors.giftNameError}
                                  </div>
                                )}
                              </div>
                              <div className="col-12 col-lg-12 col-xl-6">
                                <input
                                  ref={giftEmail}
                                  type="email"
                                  className="form-control"
                                  name="giftaddress"
                                  placeholder="Friend's email address:"
                                  onChange={formDataHandle}
                                />
                                {fieldErrors.giftEmailError && (
                                  <div class="error">
                                    {fieldErrors.giftEmailError}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="mb-0">
                              <textarea
                                className="form-control"
                                name="giftmessage"
                                placeholder="Message"
                                onChange={formDataHandle}
                              ></textarea>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="full-package-info mb-5 remove-cursore-area">
                  <ul className="list-unstyled">
                    <li>
                      {localStorage.getItem("hk_user_auth_ticket") &&
                      validatedUser ? (
                        <div className="form-check border-check-form">
                          {localStorage.getItem("hk_user_email") && (
                            <h4 class="fw-bolder cl-nw-color">
                              {localStorage.getItem("hk_user_email")}
                            </h4>
                          )}
                          <button
                            type="button"
                            class="btn btn-theme-orange"
                            onClick={logOut}
                          >
                            Log Out
                          </button>
                        </div>
                      ) : (
                        <div className="form-check border-check-form">
                          <h4 class="fw-bolder cl-nw-color">
                            Create Your New Account
                          </h4>
                          <p>
                            You are now creating a new account, if your email
                            already exists in our system, the password you set
                            here will become the new password, please make sure
                            to save the email address and password you enter
                            here as this will be required to login to your
                            account!
                          </p>
                          <div className="row mb-3">
                            <div className="col-12 mb-3">
                              <label className="form-label">Email </label>
                              <input
                                ref={emailRef}
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={formDataHandle}
                              />
                              {fieldErrors.emailError ? (
                                <div className="error">
                                  {fieldErrors.emailError}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-12 mb-3">
                              <label className="form-label">Password </label>
                              <input
                                ref={passRef}
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={formDataHandle}
                              />
                              {fieldErrors.passwordError ? (
                                <div className="error">
                                  {fieldErrors.passwordError}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="main-content-area mb-0">
                            {/* <h4 className='fw-bolder cl-nw-color mb-2'>Already have an Account?</h4> */}
                            <a className="link-to-process" href="/login">
                              Already have an account? Click Here to login{" "}
                            </a>
                          </div>
                        </div>
                      )}
                    </li>
                    <li></li>
                  </ul>
                </div>

                {showcards.length ? (
                  <div className="full-package-info mb-5">
                    <ul className="list-unstyled">
                      <li>
                        <div className="form-check border-check-form">
                          <input
                            type="radio"
                            className="form-check-input round-radio"
                            id="sp"
                            name="payment"
                            value=""
                            onChange={formDataHandle}
                            defaultChecked={
                              localStorage.getItem("hk_user_auth_ticket") &&
                              showcards
                                ? true
                                : false
                            }
                          />
                          <label className="form-check-label ms-0" for="radio4">
                            <div className="full-pkg-detail">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="offer-title ft-dark w-100">
                                  Saved Payment Method
                                  <div
                                    className={
                                      formData.useSavedPayment
                                        ? "d-block"
                                        : "d-none"
                                    }
                                  >
                                    {showcards
                                      ? showcards.map((item, key) => {
                                          return (
                                            <div className="payment-storage">
                                              <span className="cr-detail-box">
                                                <input
                                                  type="radio"
                                                  className="form-check-input card-log round-radio"
                                                  id={`saveradio${key}`}
                                                  name="saveradio"
                                                  value={item.id}
                                                  onChange={handleSavedCardId}
                                                  defaultChecked={
                                                    key == 0 ? true : false
                                                  }
                                                />
                                                <div className="box-of-detail">
                                                  <img
                                                    src="images/card.svg"
                                                    alt=""
                                                    loading="lazy"
                                                  />{" "}
                                                  <span className="cardNumb">{`${item.card_type} **** ${item.card_number}`}</span>{" "}
                                                  <span className="cardExp">{`${item.month}/${item.year}`}</span>{" "}
                                                  <span className="cardName">
                                                    {item.card_name}
                                                  </span>
                                                </div>
                                              </span>
                                              <button
                                                onClick={() =>
                                                  handleCardDelete(item.id)
                                                }
                                                type="button"
                                                className="btn-remove"
                                              >
                                                <i class="ri-close-line"></i>{" "}
                                              </button>
                                            </div>
                                          );
                                        })
                                      : ""}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>
                        {cardBlockErr && (
                          <div
                            className="errors"
                            dangerouslySetInnerHTML={{ __html: cardBlockErr }}
                          ></div>
                        )}
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}

                <div class="card pay-detail-card">
                  {localStorage.getItem("hk_user_auth_ticket") ? (
                    <div class="add-new-item">
                      <div className="full-package-info full-package-info-new">
                        <ul className="list-unstyled">
                          {savedCardsNo < 3 ? (
                            <li>
                              <div className="form-check p-0 border-0">
                                <input
                                  type="radio"
                                  className="form-check-input round-radio"
                                  id="ap"
                                  name="payment"
                                  value=""
                                  onChange={formDataHandle}
                                  onClick={showAnotherPayment}
                                  defaultChecked={
                                    formData.addPaymentMethod ? true : false
                                  }
                                  checked={
                                    showcards.length == 0 ||
                                    formData.addPaymentMethod ||
                                    !localStorage.getItem("hk_user_auth_ticket")
                                      ? true
                                      : false
                                  }
                                />
                                <label
                                  className="form-check-label ms-0"
                                  for="radio5"
                                >
                                  <div className="full-pkg-detail">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <span className="offer-title">
                                        {savedCardsNo > 0
                                          ? "Add Another Payment Method"
                                          : "Enter Your Payment Details"}
                                      </span>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </li>
                          ) : (
                            <li>
                              <div className="form-check p-0 border-0">
                                <div className="full-pkg-detail">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <span className="offer-title">
                                      {savedCardsNo > 0
                                        ? "Add Another Payment Method"
                                        : "Enter Your Payment Details"}
                                    </span>{" "}
                                    <button
                                      type="button"
                                      onClick={handleAllCardDelete}
                                      className="btn btn-delete btn-theme-orange"
                                    >
                                      Delete all cards
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div class="add-new-item">
                      {/* <div className='main-content-area'>
                        <h4 className='fw-bolder cl-nw-color'>Already have an Account?</h4>
                        <a className='link-to-process' href="/login">Login to use an existing payment method </a>
                    </div> */}
                      <div className="full-package-info full-package-info-new">
                        <ul className="list-unstyled">
                          <li>
                            <div className="form-check p-0 border-0">
                              <input
                                type="radio"
                                className="form-check-input round-radio"
                                id="ap"
                                name="payment"
                                value=""
                                onChange={formDataHandle}
                                onClick={showAnotherPayment}
                                defaultChecked={
                                  !formData.useSavedPayment ? true : false
                                }
                                checked={
                                  formData.addPaymentMethod ||
                                  !localStorage.getItem("hk_user_auth_ticket")
                                    ? true
                                    : false
                                }
                              />
                              <label
                                className="form-check-label ms-0"
                                for="radio5"
                              >
                                <div className="full-pkg-detail">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <span className="offer-title">
                                      Enter Your Payment Details
                                    </span>
                                  </div>
                                  {/* <p>
                                                Lorem Ipsum is simply dummy text of the and typesetting.
                                            </p> */}
                                </div>
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <form>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      size="invisible"
                      sitekey={process.env.recaptchaKey}
                    />
                    {showcards.length ? (
                      <div
                        className={
                          formData.addPaymentMethod ? "d-block" : "d-none"
                        }
                      >
                        <div className="form-title">
                          <h3 className="title-detail-card">
                            Payment Details{" "}
                          </h3>
                          <p>
                            Complete your purchase by providing your payment
                            details.{" "}
                          </p>
                        </div>
                        <div className="row">
                          <div className="col-12 mb-3">
                            <div className="new-card-detail">
                              <ul className="list-unstyled">
                                <li>
                                  <label className="form-label d-md-none">
                                    Card Details{" "}
                                  </label>
                                  <div className="ttl-card">
                                    <input
                                      ref={cardNum}
                                      type="text"
                                      className="form-control"
                                      name="cardnumber"
                                      value={formData.cardNumber}
                                      placeholder="Card Number"
                                      onChange={formDataHandle}
                                      inputMode="numeric"
                                    />
                                    {fieldErrors.cardNumError ? (
                                      <div className="error">
                                        {fieldErrors.cardNumError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </li>
                                <li>
                                  <label className="form-label d-md-none">
                                    Card Expiration{" "}
                                  </label>
                                  <div className="position-relative">
                                    <input
                                      ref={cardExp}
                                      type="text"
                                      maxLength="5"
                                      name="cardexp"
                                      className="form-control"
                                      placeholder="MM/YY"
                                      onChange={formDataHandle}
                                      inputMode="numeric"
                                    />
                                    {fieldErrors.cardExpError ? (
                                      <div className="error">
                                        {fieldErrors.cardExpError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </li>
                                <li>
                                  <label className="form-label d-md-none">
                                    CV Code{" "}
                                  </label>
                                  <div className="position-relative">
                                    <input
                                      ref={cardCvv}
                                      type="text"
                                      name="cvv"
                                      value={formData.cvv}
                                      className="form-control"
                                      placeholder="CVC"
                                      onChange={formDataHandle}
                                      inputMode="numeric"
                                    />
                                    {fieldErrors.cvvError ? (
                                      <div className="error">
                                        {fieldErrors.cvvError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 mb-3">
                            <label className="form-label">
                              Cardholder Name{" "}
                            </label>
                            <input
                              ref={cardHolderName}
                              type="text"
                              className="form-control"
                              name="holdername"
                              placeholder="Cardholder Name"
                              onChange={formDataHandle}
                            />
                            {fieldErrors.cardHolderError ? (
                              <div className="error">
                                {fieldErrors.cardHolderError}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="form-title">
                          <h3 className="title-detail-card">
                            Payment Details{" "}
                          </h3>
                          <p>
                            Complete your purchase by providing your payment
                            details.{" "}
                          </p>
                        </div>
                        <div className="row">
                          <div className="col-12 mb-3">
                            <div className="new-card-detail">
                              <ul className="list-unstyled">
                                <li>
                                  <label className="form-label d-md-none">
                                    Card Details{" "}
                                  </label>
                                  <div className="ttl-card">
                                    <input
                                      ref={cardNum}
                                      type="text"
                                      className="form-control"
                                      name="cardnumber"
                                      value={formData.cardNumber}
                                      placeholder="Card Number"
                                      onChange={formDataHandle}
                                      inputMode="numeric"
                                    />
                                    {fieldErrors.cardNumError ? (
                                      <div className="error">
                                        {fieldErrors.cardNumError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </li>
                                <li className="position-relative">
                                  <label className="form-label d-md-none">
                                    Card Expiration{" "}
                                  </label>
                                  <div className="position-relative">
                                    <input
                                      ref={cardExp}
                                      type="text"
                                      maxLength="5"
                                      name="cardexp"
                                      className="form-control"
                                      placeholder="MM/YY"
                                      onChange={formDataHandle}
                                      inputMode="numeric"
                                    />
                                    {fieldErrors.cardExpError ? (
                                      <div className="error">
                                        {fieldErrors.cardExpError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </li>
                                <li className="position-relative">
                                  <label className="form-label d-md-none">
                                    CV Code{" "}
                                  </label>
                                  <div className="position-relative">
                                    <input
                                      ref={cardCvv}
                                      type="text"
                                      name="cvv"
                                      value={formData.cvv}
                                      className="form-control"
                                      placeholder="CVC"
                                      onChange={formDataHandle}
                                      inputMode="numeric"
                                    />
                                    {fieldErrors.cvvError ? (
                                      <div className="error">
                                        {fieldErrors.cvvError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 mb-3">
                            <label className="form-label">
                              Cardholder Name{" "}
                            </label>
                            <input
                              ref={cardHolderName}
                              type="text"
                              className="form-control"
                              name="holdername"
                              placeholder="Cardholder Name"
                              onChange={formDataHandle}
                            />
                            {fieldErrors.cardHolderError ? (
                              <div className="error">
                                {fieldErrors.cardHolderError}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12 mb-3">
                            <label className="form-label">Phone </label>
                            <input
                              ref={phoneRef}
                              type="tel"
                              className="form-control"
                              name="phone"
                              value={formData.phone}
                              placeholder="Phone"
                              onChange={formDataHandle}
                            />
                            {fieldErrors.phoneError ? (
                              <div className="error">
                                {fieldErrors.phoneError}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        {/* <div className="row">
                                <div className="col-12 mb-3">
                                    <label className="form-label">Email </label>
                                    <input type="text" name="email" className="form-control" placeholder="Email" onChange={formDataHandle}/>
                                    {fieldErrors.emailError ? 
                                    <div className='error'>{fieldErrors.emailError}</div>
                                    : ''}
                                </div>
                            </div>
                            {!localStorage.getItem('hk_user_auth_ticket') ?
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label className="form-label">Password </label>
                                    <input type="password" name="password" className="form-control" placeholder="Password" onChange={formDataHandle}/>
                                    {fieldErrors.passwordError ? 
                                    <div className='error'>{fieldErrors.passwordError}</div>
                                    : ''}
                                </div>
                            </div>
                            : '' } */}
                        {/* <div className="row">
                                <div className="col-12 mb-3">
                                    <label className="form-label">Address </label>
                                    <AutoComplete
                                    name="address"
                                    className="form-control" 
                                    placeholder="Address"
                                    types={["geocode"]}
                                    apiKey={process.env.mapAPI}
                                    onChange={formDataHandle}
                                    value={address}
                                    onPlaceSelected={(place) => {console.log(place);
                                        place.address_components.map((item,key) => {
                                            item.types.map((itemTwo,value) => {
                                                if(itemTwo == 'locality') {
                                                    setAddress(item.long_name);
                                                } else if(itemTwo == 'administrative_area_level_2') {
                                                    setCity(item.long_name);
                                                } else if(itemTwo == 'administrative_area_level_1') {
                                                    setRegion(item.long_name)
                                                } else if(itemTwo == 'postal_code') {
                                                    setZip(item.long_name);
                                                } else if(itemTwo == 'country') {
                                                    setCountry(item.long_name);
                                                }
                                            })
                                        })
                                    
                                    }}
                                    />
                                    <input type="text" name="address" className="form-control" placeholder="Address" onChange={formDataHandle}/>
                                    {fieldErrors.addressError ? 
                                    <div className='error'>{fieldErrors.addressError}</div>
                                    : ''}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 col-xl-4 col-xxl-4 mb-3">
                                    <label className="form-label">City </label>
                                    <AutoComplete
                                    name="city"
                                    className="form-control" 
                                    placeholder="City"
                                    types={["(cities)"]}
                                    apiKey={process.env.mapAPI}
                                    onChange={formDataHandle}
                                    value={city}
                                    onPlaceSelected={(place) => setCity(place.address_components[0].short_name)}
                                    />
                                    <input type="text" value={city} name="city" className="form-control" placeholder="City" onChange={formDataHandle}/>
                                    {fieldErrors.cityError ? 
                                    <div className='error'>{fieldErrors.cityError}</div>
                                    : ''}
                                </div>
                                
                                <div className="col-12 col-md-12 col-xl-4 col-xxl-4 mb-3">
                                    <label className="form-label">State/Region </label>
                                    <AutoComplete
                                    name="region"
                                    className="form-control" 
                                    placeholder="State/Region"
                                    types={["(regions)"]}
                                    apiKey={process.env.mapAPI}
                                    onChange={formDataHandle}
                                    value={region}
                                    onPlaceSelected={(place) => setRegion(place.address_components[0].short_name)}
                                    />
                                    <input type="text" value={region} name="region" className="form-control" placeholder="State/Region" onChange={formDataHandle}/>
                                    {fieldErrors.regionError ? 
                                    <div className='error'>{fieldErrors.regionError}</div>
                                    : ''}
                                </div>
                                <div className="col-12 col-md-6 col-xl-4 col-xxl-4 mb-3">
                                    <label className="form-label">Zip </label>
                                    <input type="text" name="zip" className="form-control" placeholder="Zip" onChange={formDataHandle}/>
                                    {fieldErrors.zipError ? 
                                    <div className='error'>{fieldErrors.zipError}</div>
                                    : ''}
                                </div>
                                
                            </div> */}
                        <div className="row">
                          <div className="col-12 mb-3">
                            <label className="form-label">Country </label>
                            <select
                              ref={countryRef}
                              name="country"
                              className="select-control form-select"
                              value={country}
                              aria-label="Country"
                              onChange={formDataHandle}
                            >
                              <option disabled="true" selected>
                                Select Country
                              </option>
                              <option value="false" disabled>
                                -------
                              </option>
                              <option value="United States">
                                United States
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="Israel">Israel</option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
                              <option value="false" disabled>
                                -------
                              </option>
                              {countryArr
                                ? countryArr.map((item, key) => {
                                    return <option value={item}>{item}</option>;
                                  })
                                : ""}
                            </select>
                            {fieldErrors.countryError ? (
                              <div className="error">
                                {fieldErrors.countryError}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    <div className="row">
                      <div className="col-12 mb-3">
                        <div className="pormocode-container">
                          <div
                            className={
                              showPromo
                                ? "before-promocode d-none"
                                : "before-promocode"
                            }
                          >
                            <p>
                              Have a Promo Code?{" "}
                              <a
                                href="javascript:void(0);"
                                className="btn-link"
                                onClick={handleShowPromo}
                              >
                                Click here to enter a code{" "}
                              </a>{" "}
                            </p>
                          </div>
                          <div
                            className={
                              showPromo
                                ? "after-promocode d-block"
                                : "after-promocode"
                            }
                          >
                            <label className="form-label text-capitalize">
                              Promo code{" "}
                            </label>
                            <div class="input-group mb-3">
                              <input
                                ref={promoinput}
                                type="text"
                                className="form-control"
                                name="promo"
                                placeholder="Enter Promo Code"
                                onChange={formDataHandle}
                              />
                              <button
                                class="btn btn-orange-cs"
                                type="button"
                                onClick={onPromo}
                              >
                                {promoTxt}{" "}
                              </button>
                            </div>
                            {promoSuccess ? (
                              <div className="success">{promoSuccess}</div>
                            ) : (
                              ""
                            )}
                            {promoErr && (
                              <div
                                className="errors"
                                dangerouslySetInnerHTML={{ __html: promoErr }}
                              ></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {state.subtotal ? (
                      <ul className="row list-unstyled total-pay">
                        {discount ? (
                          <>
                            {/* <li className="col-6 col-md-6">
                                    <span className="normal-text">Discount </span>
                                </li> */}

                            <li className="col-12 text-end">
                              <span className="normal-text me-2">
                                Discount{" "}
                              </span>
                              <span className="normal-text">{`$${(
                                (parseFloat(originalTotal).toFixed(2) *
                                  discount) /
                                100
                              ).toFixed(2)}`}</span>
                            </li>
                          </>
                        ) : (
                          ""
                        )}
                        {/* <li className="col-6 col-md-6">
                                    <span className="total-text">Total </span>
                                </li> */}
                        {discount ? (
                          <li className="col-12 text-end">
                            <span className="total-text me-2">Total </span>
                            <span className="total-text">{`$${parseFloat(
                              parseFloat(originalTotal).toFixed(2) -
                                (
                                  (parseFloat(originalTotal).toFixed(2) *
                                    discount) /
                                  100
                                ).toFixed(2)
                            ).toFixed(2)}`}</span>
                          </li>
                        ) : (
                          <li className="col-12 text-end">
                            <span className="total-text me-2">Total </span>
                            <span className="total-text">{`$${parseFloat(
                              state.subtotal
                            ).toFixed(2)}`}</span>
                          </li>
                        )}
                      </ul>
                    ) : (
                      ""
                    )}
                    {commonErr && (
                      <div
                        className="errors mb-2"
                        dangerouslySetInnerHTML={{ __html: commonErr }}
                      ></div>
                    )}

                    {state.success ? (
                      <div className="success">{state.success}</div>
                    ) : (
                      ""
                    )}
                    {recaptchaErr && (
                      <div className="error mb-2">{recaptchaErr}</div>
                    )}
                    {focusErrors && (
                      <div className="error mb-2">{focusErrors}</div>
                    )}
                    {giftFriendError && (
                      <div className="error mb-2">{giftFriendError}</div>
                    )}
                    <button
                      type="button"
                      className="btn btn-theme-orange"
                      onClick={placeOrder}
                      disabled={payBtnDisable.payBtnDisable}
                    >
                      Pay{" "}
                    </button>
                  </form>

                  <div className="pay-secure-note">
                    <div className="d-flex align-items-center justify-content-center">
                      <img src="images/protect.png" alt="" loading="lazy" />
                      <span className="ms-3 d-table ss-paymet">
                        Safe & Secure Payment{" "}
                      </span>
                    </div>
                    {/* <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo. </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
