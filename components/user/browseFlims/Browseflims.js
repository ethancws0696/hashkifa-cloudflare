import React, { useEffect, useState } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Shapeplaceholder from "../shapePlaceholder/Shapeplaceholder";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
// modules styles
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

export default function Browseflims({ data, homeData }) {
  const isDesktop = useMediaQuery({ query: `(min-width: 992px)` });
  var settingsB = "";
  if (isDesktop) {
    SwiperCore.use([Navigation, Pagination]);
    var settingsB = {
      // Install modules
      modules: [Navigation, Pagination],
      slidesPerView: 4,
      spaceBetween: 38,
      centeredSlides: false,
      //   loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".brows-film-next",
        prevEl: ".brows-film-prev",
      },
      breakpoints: {
        319: {
          slidesPerView: 1,
          spaceBetween: 30,
          centeredSlides: false,
        },
        // 600: {
        //   slidesPerView: 2,
        //   spaceBetween: 30,
        //   centeredSlides: false,
        // },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 38,
          centeredSlides: false,
        },
        1800: {
          slidesPerView: 4,
          spaceBetween: 38,
          centeredSlides: false,
        },
      },
    };
  }

  const [utmID, setUtmID] = useState(null);
  const [utmSource, setUtmSource] = useState(null);
  const [utmMedium, setUtmMedium] = useState(null);
  const [utmCampaign, setUtmCampaign] = useState(null);
  const [utmTerm, setUtmTerm] = useState(null);
  const [utmCampaignContent, setUtmCampaignContent] = useState(null);
  const router = useRouter();
  const bvd = data;
  const handleMouseEnter = () => {
    setShowBtn(true);
  };
  const handleMouseLeave = (event) => {
    setShowBtn(false);
  };
  const [trailer, setTrailer] = useState(null);
  const [show, setShow] = useState(false);
  const [showReadMore, setReadMore] = useState(false);
  const [readContent, setReadContent] = useState(null);
  const [readTitle, setReadTitle] = useState(null);
  const handleClose = () => setShow(false);
  const [state, setState] = useState({ shareLink: "", copied: false });
  const [showBtn, setShowBtn] = useState(false);
  const [purchaseEnable, setPurchaseEnable] = useState(false);
  const [purchaseText, setPurchaseText] = useState("Purchase");

  const [id, setID] = useState(null);
  const handleShow = (trailer, id, purchase_enable, btn_text) => {
    setPurchaseText(btn_text);
    setPurchaseEnable(purchase_enable);
    setTrailer(trailer);
    setID(id);
    var shareLinkSet = `${window.location.origin}?video=${trailer}&vid=${id}${
      purchase_enable ? `&purchase_enable=true` : ``
    }${utmID ? `&utm_id=${utmID}` : ``}${
      utmSource ? `&utm_source=${utmSource}` : ``
    }${utmMedium ? `&utm_medium=${utmMedium}` : ``}${
      utmCampaign
        ? `&utm_campaign=${utmCampaign}${
            utmTerm ? `&utm_term=${utmTerm}` : ``
          }${
            utmCampaignContent
              ? `&utm_campaign_content=${utmCampaignContent}`
              : ``
          }`
        : ``
    }`;
    setState({ shareLink: shareLinkSet });
    setShow(true);
  };

  const handleReadMore = (title, content) => {
    setReadTitle(title);
    setReadContent(content);
    setReadMore(true);
  };

  const handleCloseReadMore = () => {
    setReadMore(false);
  };

  useEffect(() => {
    if (router.query.utm_id) {
      setUtmID(router.query.utm_id);
    }
    if (router.query.utm_source) {
      setUtmSource(router.query.utm_source);
    }
    if (router.query.utm_medium) {
      setUtmMedium(router.query.utm_medium);
    }
    if (router.query.utm_campaign) {
      setUtmCampaign(router.query.utm_campaign);
    }
    if (router.query.utm_campaign_content) {
      setUtmCampaignContent(router.query.utm_campaign_content);
    }
    if (router.query.utm_term) {
      setUtmTerm(router.query.utm_term);
    }
  }, [router]);

  return (
    <section className="brows-film more-space-device" id="film">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 overflow-hidden">
            <h2
              className="under-desh"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              Featured Films{" "}
            </h2>
          </div>
        </div>
        <div className="slider-compact position-relative">
          <div className="move-slider">
            <div className="row swiper-wrapper">
              {/* <div className="col-12 col-md-6 col-lg-4 swiper-column-pu">
                <div className="parent-items clickToShow position-relative">
                  <div
                    className="all-child"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <div className="ovl-fx"></div>
                    <img src={homeData.desktop_thumb} alt="" />
                    <div class="w-trailer">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-border-glob stretched-link"
                        onClick={() =>
                          handleShow(
                            homeData.trailer,
                            homeData.id,
                            homeData.purchase_enable,
                            homeData.btn_text
                          )
                        }
                      >
                        <span className="ply-icon icon-Path-2143"></span>
                      </a>
                    </div>
                  </div>
                  <div className="overlay-slider">
                    <h2
                      className="text-white"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      {homeData.name}
                    </h2>
                    <span
                      className="category"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      PREMIUM{" "}
                      {homeData.year ? " | " + homeData.year + " | " : "|"}{" "}
                      {homeData.duration
                        ? "  " + homeData.duration + "  "
                        : "|"}
                    </span>
                    <p data-aos="fade-up" data-aos-duration="1000">
                      {homeData.description}
                      {homeData.description.length > 150 ? (
                        <a
                          href="javascript:void(0)"
                          className="readMore"
                          onClick={() =>
                            handleReadMore(homeData.name, homeData.description)
                          }
                        >
                          Read more
                        </a>
                      ) : (
                        ""
                      )}
                    </p>
                    <ul
                      className="list-inline d-flex align-items-center"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      {homeData.purchase_enable && (
                        <li className="list-inline-item">
                          <Link
                            href={`/checkout/?vid=${homeData.id}${
                              homeData.purchase_enable
                                ? `&purchase_enable=true`
                                : ``
                            }${utmID ? `&utm_id=${utmID}` : ``}${
                              utmSource ? `&utm_source=${utmSource}` : ``
                            }${utmMedium ? `&utm_medium=${utmMedium}` : ``}${
                              utmCampaign
                                ? `&utm_campaign=${utmCampaign}${
                                    utmTerm ? `&utm_term=${utmTerm}` : ``
                                  }${
                                    utmCampaignContent
                                      ? `&utm_campaign_content=${utmCampaignContent}`
                                      : ``
                                  }`
                                : ``
                            }`}
                          >
                            <a className="btn btn-global">
                              {homeData.btn_text
                                ? homeData.btn_text
                                : "Purchase"}
                            </a>
                          </Link>
                        </li>
                      )}
                      <li className="list-inline-item">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-border-glob"
                          onClick={() =>
                            handleShow(
                              homeData.trailer,
                              homeData.id,
                              homeData.purchase_enable,
                              homeData.btn_text
                            )
                          }
                        >
                          <span className="icon-play icon-Group-2690"></span>{" "}
                          Watch Trailer
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
              {bvd
                ? bvd.map(
                    ({
                      id,
                      publish_date,
                      description,
                      duration,
                      name,
                      desktop_thumb,
                      trailer,
                      purchase_enable,
                      btn_text,
                    }) => {
                      const d = new Date(publish_date);
                      let year = d.getFullYear();
                      return (
                        <div className="col-12 col-md-6 col-lg-4 swiper-column-pu">
                          <div className="parent-items clickToShow position-relative">
                            <div
                              className="all-child"
                              data-aos="fade-up"
                              data-aos-duration="1000"
                            >
                              <div className="ovl-fx"></div>
                              <img src={desktop_thumb} alt="" />
                              <div class="w-trailer">
                                <a
                                  href="javascript:void(0)"
                                  className="btn btn-border-glob stretched-link"
                                  onClick={() =>
                                    handleShow(
                                      trailer,
                                      id,
                                      purchase_enable,
                                      btn_text
                                    )
                                  }
                                >
                                  <span className="ply-icon icon-Path-2143"></span>
                                </a>
                              </div>
                            </div>
                            <div
                              className="overlay-slider"
                              data-aos="fade-up"
                              data-aos-duration="1000"
                            >
                              <h2
                                className="text-white"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                              >
                                {name}
                              </h2>
                              <span
                                className="category"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                              >
                                PREMIUM {year ? " | " + year + " | " : "|"}{" "}
                                {duration ? "  " + duration + "  " : "|"}
                              </span>
                              <p data-aos="fade-up" data-aos-duration="1000">
                                {description}
                                {description.length > 150 ? (
                                  <a
                                    href="javascript:void(0)"
                                    className="readMore"
                                    onClick={() =>
                                      handleReadMore(name, description)
                                    }
                                  >
                                    Read more
                                  </a>
                                ) : (
                                  ""
                                )}
                              </p>
                              <ul
                                className="list-inline d-flex align-items-center"
                                data-aos="fade-up"
                                data-aos-duration="1000"
                              >
                                {purchase_enable && (
                                  <li className="list-inline-item">
                                    <Link
                                      href={`/checkout/?vid=${id}${
                                        purchase_enable
                                          ? `&purchase_enable=true`
                                          : ``
                                      }${utmID ? `&utm_id=${utmID}` : ``}${
                                        utmSource
                                          ? `&utm_source=${utmSource}`
                                          : ``
                                      }${
                                        utmMedium
                                          ? `&utm_medium=${utmMedium}`
                                          : ``
                                      }${
                                        utmCampaign
                                          ? `&utm_campaign=${utmCampaign}${
                                              utmTerm
                                                ? `&utm_term=${utmTerm}`
                                                : ``
                                            }${
                                              utmCampaignContent
                                                ? `&utm_campaign_content=${utmCampaignContent}`
                                                : ``
                                            }`
                                          : ``
                                      }`}
                                    >
                                      <a className="btn btn-global">
                                        {btn_text ? btn_text : "Purchase"}
                                      </a>
                                    </Link>
                                  </li>
                                )}
                                {trailer && (
                                  <li className="list-inline-item">
                                    <a
                                      href="javascript:void(0)"
                                      className="btn btn-border-glob"
                                      onClick={() =>
                                        handleShow(
                                          trailer,
                                          id,
                                          purchase_enable,
                                          btn_text
                                        )
                                      }
                                    >
                                      <span className="icon-play icon-Group-2690"></span>{" "}
                                      Watch Trailer
                                    </a>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )
                : ""}
            </div>
          </div>
        </div>
      </div>
      <Shapeplaceholder name="shape-two" />
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Body className="player-body-modal">
          <Plyr
            source={{
              type: "video",
              sources: [
                {
                  src: trailer,
                  provider: "youtube",
                },
              ],
            }}
            options={{
              autoplay: true,
              seekTime: 5,
              i18n: { rewind: "Rewind 5s", fastForward: "Forward 5s" },
              controls: [
                "play-large",
                "rewind",
                "play",
                "fast-forward",
                "progress",
                "current-time",
                "duration",
                "mute",
                "volume",
                "fullscreen",
              ],
            }}
            autoPlay
          />
          <div className="uiUpdate d-block">
            <ul className="list-inline">
              {purchaseEnable && (
                <li className="list-inline-item">
                  <Link
                    href={`/checkout/?vid=${id}${
                      utmID ? `&utm_id=${utmID}` : ``
                    }${utmSource ? `&utm_source=${utmSource}` : ``}${
                      utmMedium ? `&utm_medium=${utmMedium}` : ``
                    }${
                      utmCampaign
                        ? `&utm_campaign=${utmCampaign}${
                            utmTerm ? `&utm_term=${utmTerm}` : ``
                          }${
                            utmCampaignContent
                              ? `&utm_campaign_content=${utmCampaignContent}`
                              : ``
                          }`
                        : ``
                    }`}
                  >
                    <button className="btn plyrBtn-default">
                      {purchaseText}{" "}
                    </button>
                  </Link>
                </li>
              )}
              <li className="list-inline-item">
                <CopyToClipboard
                  text={state.shareLink}
                  onCopy={() => setState({ ...state, copied: true })}
                >
                  <button className="btn plyrBtn-default icon">
                    <i class="ri-share-fill re-con"></i>{" "}
                    {state.copied ? "Copied" : "Share"}{" "}
                  </button>
                </CopyToClipboard>
              </li>
            </ul>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showReadMore}
        className="readmoreText"
        onHide={handleCloseReadMore}
        size="lg"
        centered
      >
        <Modal.Header>
          <>
            <h4 className="modal-title">{readTitle}</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={handleCloseReadMore}
            >
              <i className="ri-close-fill text-white text-20"></i>
            </button>
          </>
        </Modal.Header>
        <Modal.Body>
          <p>{readContent}</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-orange"
            data-bs-dismiss="modal"
            onClick={handleCloseReadMore}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
