import aboutimg from "../../../public/images/about.jpeg";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserAPI from "../../../services/user/UserAPI";

export default function About({ title }) {
  const [state, setState] = useState({ errors: "", success: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
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

  return (
    <section className="about-section" id="about">
      <div className="container-fluid p-0">
        <div className="row align-items-center g-0">
          <div className="col-12 col-lg-6">
            <div
              className="about-bild position-relative"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="ovl-fx"></div>
              <img src={aboutimg.src} alt="" loading="lazy" />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="content-full-about">
              <div className="overflow-hidden">
                {title && (
                  <h2
                    className="under-desh"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    About Hashkifa{" "}
                  </h2>
                )}
              </div>
              <div className="overflow-hidden">
                <div data-aos="fade-up" data-aos-duration="1000">
                  <p>
                    Hashkifa channels the power of storytelling and technology
                    to touch and inspire today's generation.
                  </p>
                  <p>
                    It produces cutting edge video content in a current and
                    engaging format, to communicate a plethora of Torah concepts
                    and values. Presented in Yoel Gold's inimitable style, a
                    collection of recent, incredible and relatable stories are
                    finding their way into the hearts and minds of viewers
                    around the globe.
                  </p>
                  <p>
                    To date, Hashkifa's videos have been translated into over a
                    half a dozen languages, shown in hundreds of schools &
                    organizations and have been met with overwhelmingly positive
                    responses, with millions of views on popular social media
                    platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="newsletter" id="subscribe">
        <div className="container-xl">
          <div className="row">
            <div className="col-12">
              <div className="form-newsletter">
                <div
                  class="row g-0 align-items-center"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div class="col-12 col-md-12 col-lg-6 mb-4 mb-lg-0">
                    <div className="d-table ms-auto me-auto m-lg-0 ms-lg-auto w-auto">
                      <div className="d-flex flex-column align-items-center">
                        <h2 class="text-center text-lg-end m-0 mb-2">
                          Receive Hashkifa Updates{" "}
                          {/*  <br className="d-none" />{" "}
                            episodes are released{" "} */}
                        </h2>
                        <ul class="list-inline social-links">
                          <li class="list-inline-item">
                            <a
                              href="https://wa.me/18454446173?text=%20Please%20sign%20me%20up%20to%20Hashkifa"
                              target="_blank"
                            >
                              <span class="icon-soc icon-whatsapp"></span>
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              href="https://www.instagram.com/hashkifa/"
                              target="_blank"
                            >
                              <span class="icon-soc icon-instagram"></span>
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              href="https://www.facebook.com/yoel.gold.7"
                              target="_blank"
                            >
                              <span class="icon-soc icon-facebook"></span>
                            </a>
                          </li>
                          <li class="list-inline-item">
                            <a
                              href="https://www.youtube.com/channel/UCYo2q2NjfAKNluVF_PnrnZw"
                              target="_blank"
                            >
                              <span class="icon-soc icon-youtube"></span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-12 col-lg-6">
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
                            className="errors"
                            dangerouslySetInnerHTML={{ __html: state.errors }}
                          ></div>
                        )}
                        <div className="success">{state.success}</div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <div className="d-flex align-items-center justify-content-center flex-wrap">
                                <h2>Receive updates when new episodes are released </h2>
                            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
