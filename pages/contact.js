import Head from "next/head";
import Header from "../components/user/header/Header";
import Footer from "../components/user/footer/Footer";
import ContactForm from "../components/user/contact/Contact";
import UserAPI from "../services/user/UserAPI";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Link from "next/link";
export default function Contact() {
  const [state, setState] = useState({ errors: "", success: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const onSubmit = async (data) => {
    setState({ ...state, success: null });
    setState({ ...state, errors: null });
    const emailData = new FormData();
    emailData.append("email", data.Email.toString().toLowerCase().trim());

    await UserAPI.newsletter(emailData)
      .then((response) => {
        if (response.data.status) {
          setState({ ...state, success: response.data.message });
        }
      })
      .catch((error) => {
        setState({ ...state, errors: error.response.data.message });
      });
  };

  return (
    <div className="main-wrapper">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hashkifa</title>
        <script
          src="//code.tidio.co/5yckg2ezfdkn9bztdbu4mcjsbylkgo4y.js"
          async
        ></script>
      </Head>
      <Header />
      <section class="cover-contact">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 text-center">
              <h1 class="h1">Get In Touch </h1>
              <ul class="list-unstyled short-note">
                <li>Need help? </li>
                <li>Technical Issues? </li>
                <li>Questions? </li>
                <li>Comments? </li>
              </ul>
              <p>Fill Out the form below to contact us. </p>
            </div>
          </div>
        </div>
      </section>
      <section class="contact-form overflow-hidden">
        <div class="container-xxl">
          <div class="row g-md-4 g-xxl-40">
            <div class="col-12 col-md-6 col-xxl-7 order-2 order-md-1">
              <div class="push-120">
                <h2 class="title-form">Please fill out the form </h2>
                <ContactForm />
              </div>
            </div>
            <div class="col-12 col-md-6 col-xxl-5 order-1 order-md-2">
              <div className="faq-hit mb-3">
                <Link href="/faq">
                  <button
                    type="button"
                    className="btn btn-orange w-100 btn-block"
                  >
                    Frequently Asked Questions
                  </button>
                </Link>
              </div>
              <div class="contactus-detail">
                <h1 class="h1">Contact Us </h1>
                <span class="note-title">Get in touch with us </span>
                <div class="more-details">
                  <ul class="list-unstyled">
                    <li className="d-none">
                      <div class="icons-side">
                        <span class="icon-location icon-Icon-material-location-on"></span>
                      </div>
                      <div class="place-details">
                        715 Mandy Street, Manhattan, <br /> NY 05803{" "}
                      </div>
                    </li>
                    <li>
                      <div class="icons-side">
                        <span class="icon-mail icon-Icon-ionic-ios-mail"></span>
                      </div>
                      <div class="place-details">
                        <a href="mailto:info@hashkifa.com">info@hashkifa.com</a>
                      </div>
                    </li>
                    <li>
                      <div class="icons-side">
                        <span class="icon-tel icon-Icon-awesome-phone"></span>
                      </div>
                      <div class="place-details">
                        <a href="tel:845.646.4600">845.646.4600</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="newsletter">
        <div class="container-xl">
          <div class="row">
            <div class="col-12">
              <div class="form-newsletter">
                <div class="row g-0 align-items-center">
                  <div class="col-12 col-md-12 col-lg-6 mb-4 mb-lg-0">
                    <h2 class="text-center text-lg-end m-0">
                      Receive updates when new <br className="d-none" />{" "}
                      episodes are released{" "}
                    </h2>
                  </div>
                  <div class="col-12 col-md-12 col-lg-6">
                    <form
                      class="position-relative"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="position-relative">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Your Email"
                          {...register("Email", { required: true, min: 1 })}
                        />
                        <div class="form-container">
                          <button type="submit">
                            <span class="icon-sent icon-Icon-ionic-ios-send"></span>
                          </button>
                        </div>
                      </div>
                      <div className="messages">
                        <div className="error">{state.errors}</div>
                        <div className="success">{state.success}</div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <div class="d-flex align-items-center justify-content-center flex-wrap">
                                <h2>Subscribe <br class="d-md-none"/> to our newsletter </h2>
                            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
