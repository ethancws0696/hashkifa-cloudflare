import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal } from "react-bootstrap";
import demo from "/public/images/demo.jpg";
import { useEffect, useState } from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import axios from "axios";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import { useMediaQuery } from "react-responsive";
import { CopyToClipboard } from "react-copy-to-clipboard";
import VideoTitle from "../../../miandata.json";

const settings = {
  // Install modules
  modules: [Navigation, Pagination],
  centeredSlides: false,
  // spaceBetween: 38,
  //loop: true,
  observer: true,
  observeParents: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1300: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1500: {
      slidesPerView: 5,
      spaceBetween: 38,
    },
  },
};

export default function Freevideos(data) {
  const [trailer, setTrailer] = useState(null);
  const [show, setShow] = useState(false);
  const [state, setState] = useState({ shareLink: "", copied: false });
  const [showBtn, setShowBtn] = useState(false);
  const [id, setID] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (trailer, id) => {
    setTrailer(trailer);
    setID(id);
    setState({
      shareLink:
        window.location.origin +
        "?video=" +
        trailer +
        "&vid=" +
        id +
        "&type=free",
    });
    setShow(true);
  };
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const handleMouseEnter = () => {
    setShowBtn(true);
  };
  const handleMouseLeave = (event) => {
    setShowBtn(false);
  };

  return (
    <section className="swiper-multi-line" id="soundbites">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12 text-center overflow-hidden">
            {VideoTitle.cms_content.filter(function (item) {
              return item.key_name == "free-video-title";
            })[0].key_value && (
              <h2
                className="under-desh"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                {
                  VideoTitle.cms_content.filter(function (item) {
                    return item.key_name == "free-video-title";
                  })[0].key_value
                }
              </h2>
            )}
          </div>
        </div>
        <div className="center-tab">
          <ul
            className="nav nav-pills justify-content-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            role="tablist"
          >
            {data.data
              ? data.data.map((item, i) => (
                  <li className="nav-item" key={`${i}${item.cat_name}`}>
                    <a
                      className={i == 0 ? "nav-link active" : "nav-link"}
                      data-bs-toggle="pill"
                      href={`#${item.cat_name.replace(/'| /g, "")}`}
                    >
                      {item.cat_name}
                    </a>
                  </li>
                ))
              : ""}
          </ul>
        </div>
        <div
          className="tab-content"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {data.data
            ? data.data.map((item, i) => {
                const detailVd = item.videos.reduce(function (
                  detailVd,
                  key,
                  index
                ) {
                  return (
                    (index % 2 == 0
                      ? detailVd.push([key])
                      : detailVd[detailVd.length - 1].push(key)) && detailVd
                  );
                },
                []);
                return (
                  <div
                    id={`${item.cat_name.replace(/ /g, "")}`}
                    key={`${i}`}
                    className={i == 0 ? "tab-pane active" : "tab-pane"}
                  >
                    {!isMobile ? (
                      <Swiper
                        {...settings}
                        className="free-vd multi-swiper-sss"
                      >
                        {/* <div className="swiper multi-swiper-sss"> */}
                        {/* <div className="swiper-wrapper"> */}
                        {detailVd.map((itemVd, j) => {
                          return (
                            <SwiperSlide>
                              {/* <div className="swiper-slide" data-attr={j}> */}
                              <div className="parent-items">
                                {itemVd.map((video, k) => {
                                  const videoSrc = {
                                    type: "video",
                                    sources: [
                                      {
                                        src: video.video_id,
                                        provider: "youtube",
                                      },
                                    ],
                                    poster: video.desktop_thumb,
                                  };

                                  const videoOptions = {
                                    seekTime: 5,
                                    i18n: {
                                      rewind: "Rewind 5s",
                                      fastForward: "Forward 5s",
                                    },
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
                                    poster: video.desktop_thumb,
                                  };

                                  return (
                                    <div className="all-child">
                                      {/* {videoSrc || videoOptions ? 
                                        <div className="shadow-video">
                                        <Plyr
                                        source={videoSrc}
                                        options = {videoOptions} />
                                        </div>
                                    : ''} */}
                                      <div className="shadow-video">
                                        <img
                                          src={
                                            video.desktop_thumb
                                              ? video.desktop_thumb
                                              : demo.src
                                          }
                                          alt=""
                                          loading="lazy"
                                        />
                                        <div
                                          className="play-icon"
                                          onClick={() =>
                                            handleShow(video.video_id, video.id)
                                          }
                                        >
                                          <span className="ply-icon icon-Path-2143"></span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              {/* </div> */}
                            </SwiperSlide>
                          );
                        })}
                        {/* </div> */}
                        <div className="swiper-button-next">
                          <span className="right-swip-arrow icon-keyboard_arrow_right"></span>
                        </div>
                        <div className="swiper-button-prev">
                          <span className="left-swip-arrow icon-keyboard_arrow_left"></span>
                        </div>
                        {/* </div> */}
                      </Swiper>
                    ) : (
                      ""
                    )}
                    {isMobile ? (
                      <div className="swiper multi-swiper-sss">
                        <div className="swiper-wrapper">
                          {detailVd.map((itemVd, j) => {
                            return (
                              <div className="swiper-slide" data-attr={j}>
                                <div className="parent-items">
                                  {itemVd.map((video, k) => {
                                    const videoSrc = {
                                      type: "video",
                                      sources: [
                                        {
                                          src: video.video_id,
                                          provider: "youtube",
                                        },
                                      ],
                                      poster: video.desktop_thumb,
                                    };

                                    const videoOptions = {
                                      poster: video.desktop_thumb,
                                    };

                                    return (
                                      <div className="all-child">
                                        {/* {videoSrc || videoOptions ? 
                                        <div className="shadow-video">
                                        <Plyr
                                        source={videoSrc}
                                        options = {videoOptions} />
                                        </div>
                                    : ''} */}
                                        <div className="shadow-video">
                                          <img
                                            src={
                                              video.desktop_thumb
                                                ? video.desktop_thumb
                                                : demo.src
                                            }
                                            alt=""
                                            loading="lazy"
                                          />
                                          <div
                                            className="play-icon"
                                            onClick={() =>
                                              handleShow(
                                                video.video_id,
                                                video.id
                                              )
                                            }
                                          >
                                            <span className="ply-icon icon-Path-2143"></span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      className="text-center mt-5 view-all-tab d-none"
                      hidden
                    >
                      <a href="#" className="btn btn-global">
                        View All{" "}
                      </a>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
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
              {/* <li className='list-inline-item'>
                        <a href={`/checkout/?vid=${id}`}><button className='btn plyrBtn-default'>Purchase </button></a>
                        </li> */}
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
    </section>
  );
}
