import { useEffect, useState, useRef } from "react";
import axios from "axios";
import UserAPI from "../../services/user/UserAPI";
import platform from "platform";
import { Modal } from "react-bootstrap";
import Link from "next/link";
export default function Help() {
  const [helpBox, setHelpBox] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [message, setMessage] = useState(null);
  const [formdata, setFormData] = useState({
    email: null,
    phone: null,
    textarea: null,
  });
  const [isLoggedin, setLoggedin] = useState(false);
  const [afterSubmit, setAfterSubmit] = useState(false);
  const [randomOne, setRandomOne] = useState(null);
  const [randomTwo, setRandomTwo] = useState(null);
  const [verifyMsg, setVerifyMsg] = useState(null);
  const verify = useRef();
  const checkTextarea = useRef();
  const email = useRef();
  const phone = useRef();
  const [show, setShow] = useState(false);
  const getRandom = () => {
    return Math.ceil(Math.random() * 10);
  };
  useEffect(() => {
    setRandomOne(getRandom());
    setRandomTwo(getRandom());
    if (localStorage.getItem("hk_user_auth_ticket")) {
      setLoggedin(true);
    }
  }, []);

  const handleClose = () => {
    setHelpBox(false);
  };
  const handleHelp = () => {
    setMessage(null);
    setRandomOne(getRandom());
    setRandomTwo(getRandom());
    setAfterSubmit(false);
    setHelpBox(true);
  };
  const handleChange = (e) => {
    if (e.target.name == "email") {
      setFormData({ ...formdata, email: e.target.value });
    } else if (e.target.name == "phone") {
      const v = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
      setFormData({ ...formdata, phone: v });
    } else if (e.target.name == "textarea") {
      setFormData({ ...formdata, textarea: e.target.value });
    } else if (e.target.name == "verify") {
      const summation = parseInt(randomOne) + parseInt(randomTwo);
      if (summation !== parseInt(e.target.value)) {
        setVerifyMsg("Incorrect");
      } else {
        setVerifyMsg(null);
      }
    }
  };
  const handleHelpClick = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (verifyMsg == null) {
      if (isLoggedin) {
        if (checkTextarea.current.value !== "") {
          if (verify.current.value == "") {
            verify.current.focus();
          } else {
            setBtnDisable(true);
            const res = await axios.get("https://geolocation-db.com/json/");
            var reqBody = {
              ipaddress: res.data.IPv4,
              user_email: localStorage.getItem("hk_user_email"),
              page_url: window.location.href,
              browser_type: platform.name,
              device_type: platform.os.family,
              phone: formdata.phone,
              message_description: checkTextarea.current.value,
            };
            await UserAPI.help(reqBody)
              .then((response) => {
                setFormData({ email: "", phone: "", textarea: "" });
                setRandomOne(null);
                setRandomTwo(null);
                setAfterSubmit(true);
                if (response.data.status) {
                  setBtnDisable(false);
                  setMessage(
                    "Thank you for letting us know, we will look into it and try to get back to you as soon as possible!"
                  );
                }
              })
              .catch((error) => {
                setVerifyMsg(
                  "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>"
                );
              });
          }
        } else {
          checkTextarea.current.focus();
        }
      } else {
        if (email.current.value !== "") {
          if (checkTextarea.current.value == "") {
            checkTextarea.current.focus();
          } else if (verify.current.value == "") {
            verify.current.focus();
          } else {
            setBtnDisable(true);
            const res = await axios.get("https://geolocation-db.com/json/");
            var reqBody = {
              ipaddress: res.data.IPv4,
              user_email: formdata.email,
              page_url: window.location.href,
              browser_type: platform.name,
              device_type: platform.os.family,
              phone: formdata.phone,
              message_description: checkTextarea.current.value,
            };
            await UserAPI.help(reqBody)
              .then((response) => {
                setFormData({ email: "", phone: "", textarea: "" });
                setRandomOne(null);
                setRandomTwo(null);
                setAfterSubmit(true);
                if (response.data.status) {
                  setBtnDisable(false);
                  setMessage(
                    "Thank you for letting us know, we will look into it and try to get back to you as soon as possible!"
                  );
                }
              })
              .catch((error) => {
                setVerifyMsg(
                  "<p>We have detected that your device has either blocked the URL or encountered a network error <br/> Possible cause: Filter blocking. Check <a href='/faq'>FAQ</a> page for details about Filters</p>"
                );
              });
          }
        } else {
          email.current.focus();
        }
      }
    }
  };
  return (
    <>
      <div className="test-fix">
        <button className="help-fix" onClick={handleHelp}>
          Need Help?{" "}
        </button>
      </div>
      <div className={helpBox ? "help-box help-transition" : "help-box"}>
        <div className="faq-hit mb-3 d-flex align-items-center">
          <button type="button" className="btn btn-orange w-100 btn-block">
            <Link href="/faq">Frequently Asked Questions</Link>
          </button>
          <button
            type="button"
            class="btn-close"
            onClick={handleClose}
          ></button>
        </div>

        <form className={afterSubmit ? "form-transition" : ""}>
          {!isLoggedin && (
            <input
              ref={email}
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={formdata.email}
              name="email"
              onChange={handleChange}
              required
            />
          )}
          <input
            ref={phone}
            type="tel"
            className="form-control"
            placeholder="Phone Number"
            value={formdata.phone}
            name="phone"
            onChange={handleChange}
          />
          <textarea
            ref={checkTextarea}
            className="form-control"
            name="textarea"
            value={formdata.textarea}
            placeholder="Please describe your issue"
            required
            onChange={handleChange}
          ></textarea>
          {randomOne && randomTwo && (
            <div className="captcha-container">
              <span>
                <b>Just making sure you are human, What is </b>
              </span>
              <div className="dummy-captcha">
                <span className="me-1">{randomOne} </span>{" "}
                <span className="me-1"> + </span>{" "}
                <span className="me-1">{randomTwo} </span>{" "}
                <span className="me-1"> = </span>{" "}
                <input
                  className="form-control"
                  ref={verify}
                  type="number"
                  name="verify"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {verifyMsg && (
            <div
              class="error verify"
              dangerouslySetInnerHTML={{ __html: verifyMsg }}
            ></div>
          )}
          <button
            className="action-control"
            type="submit"
            disabled={btnDisable}
            onClick={handleHelpClick}
          >
            Send Message
          </button>
        </form>
        {message && <div className="success">{message}</div>}
      </div>
    </>
  );
}
