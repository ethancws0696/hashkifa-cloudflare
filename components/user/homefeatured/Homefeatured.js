import bannervd from "/public/images/banner-video.png";
import { useEffect, useState, useRef } from "react";
import Plyr, { APITypes } from "plyr-react";
import "plyr-react/dist/plyr.css";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { Router, useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";
export default function Homefeatured(data) {
  const ref = useRef(null);
  const [utmID, setUtmID] = useState(null);
  const [utmSource, setUtmSource] = useState(null);
  const [utmMedium, setUtmMedium] = useState(null);
  const [utmCampaign, setUtmCampaign] = useState(null);
  const [utmTerm, setUtmTerm] = useState(null);
  const [utmCampaignContent, setUtmCampaignContent] = useState(null);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [purchaseEnable, setPurchaseEnable] = useState(false);
  const [purchaseText, setPurchaseText] = useState("Purchase");
  const handlePlyrPause = () => console.log("pause");
  const handleClose = () => setShow(false);
  const handleShow = (purchase_enable) => {
    setPurchaseEnable(purchase_enable);
    setState({
      ...state,
      shareLink:
        window.location.origin +
        "?video=" +
        state.trailer +
        "&vid=" +
        state.id +
        "&purchase_enable=" +
        purchase_enable +
        "&type=" +
        data.data.type,
    });
    setShow(true);
  };
  const [state, setState] = useState({
    id: null,
    showBtn: false,
    shareLink: "",
    copied: false,
    id: null,
    videoOptions: {},
    videoSrc: {
      type: "video",
      sources: [
        {
          src: data.data.trailer,
          provider: "youtube",
        },
      ],
    },
    desktop_thumb: null,
    trailer: data.data.trailer,
    name: null,
    year: null,
    desc: null,
    duration: null,
  });

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

    if (data) {
      const d = new Date(data.data.publish_date);
      const dataVd = {
        id: data.data.id,
        hero_text: data.data.hero_text,
        name: data.data.name,
        year: d.getFullYear(),
        desc: data.data.description,
        duration: data.data.duration,
        trailer: data.data.trailer,
        desktop_thumb: data?.data?.desktop_thumb,
        videoSrc: {
          type: "video",
          sources: [
            {
              src: state.trailer,
              provider: "youtube",
            },
          ],
          poster: state.desktop_thumb,
        },
        videoOptions: {
          autoplay: true,
          poster: state.desktop_thumb,
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
        },
      };
      setState({ ...state, ...dataVd });
    }

    // document.querySelector("body").classList.add("home")
  }, [data, router]);

  return (
    <section className="banner-header more-space-device" id="home">
      <div className="container-xl ex-container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 col-xxl-5 text-center text-md-start">
            {/* <h4>Featured Video</h4> */}
            <h4 className="bb1">{data.data.banner_txt} </h4>
            <h1 className="text-capitalize bb2">{state.name}</h1>
            {data.data.type == "free" ? (
              <span className="category bb3">
                {state.hero_text ? state.hero_text : ""}
              </span>
            ) : (
              <span className="category bb3">
                {state.hero_text ? state.hero_text + " |" : ""}{" "}
                {state.year ? state.year + " | " : "|"}{" "}
                {state.duration ? "  " + state.duration + "  " : "|"}
              </span>
            )}
            <div className="bb4 mb-4">
              {state.desc ? (
                <p className="playInformation">{state.desc}</p>
              ) : (
                ""
              )}
            </div>
            <div className="d-none d-md-block bb5">
              <ul className="list-inline action-desktop btn-changes">
                {data.data.type == "free" ? (
                  <li className="list-inline-item">
                    <a
                      href="javascript:void(0)"
                      className="btn btn-global btn-gl-dark with-icon"
                      onClick={() => handleShow(data.data.purchase_enable)}
                    >
                      <span className="icon-play icon-Group-2690"></span>
                      Watch Video
                    </a>
                  </li>
                ) : (
                  data.data.trailer && (
                    <li className="list-inline-item">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-global btn-gl-dark with-icon"
                        onClick={() => handleShow(data.data.purchase_enable)}
                      >
                        <span className="icon-play icon-Group-2690"></span>
                        Watch Trailer
                      </a>
                    </li>
                  )
                )}
                {data.data.type !== "free" && data.data.purchase_enable ? (
                  <li className="list-inline-item">
                    <Link
                      href={`/checkout/?vid=${state.id}${
                        data.data.purchase_enable ? `&purchase_enable=true` : ``
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
                      <a className="btn btn-global with-icon">
                        {/* <span className="icon-play icon-Group-2690"></span> */}
                        <i class="ricon-bag ri-shopping-bag-line me-2 "></i>
                        {data.data.btn_text ? data.data.btn_text : "Purchase"}
                      </a>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xxl-7 pd-cs-40">
            <div
              className="video-bild-holder position-relative shadow-video"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="ovl-fx"></div>
              {state.desktop_thumb ? (
                <img
                  src={state.desktop_thumb}
                  alt=""
                  loading="lazy"
                  width="60%"
                  height="100%"
                />
              ) : (
                ""
              )}
              <div className="video-information" hidden>
                <h5 className="text-white text-capitalize">{state.name}</h5>
                {state.year && state.duration ? (
                  <p>
                    {state.hero_text + " "}{" "}
                    {state.year ? " | " + state.year + " | " : "|"}{" "}
                    {state.duration ? "  " + state.duration + "  " : "|"}
                  </p>
                ) : (
                  ""
                )}
              </div>
              {data.data.trailer && (
                <div
                  className="play-icon"
                  onClick={() => handleShow(data.data.purchase_enable)}
                >
                  <span className="ply-icon icon-Path-2143"></span>
                </div>
              )}
            </div>
            <div className="d-table ms-auto me-auto d-md-none">
              <ul className="list-unstyled mobile-action-bt btn-changes">
                {data.data.type == "free" ? (
                  <li className="list-inline-item">
                    <a
                      href="javascript:void(0)"
                      className="btn btn-global btn-gl-dark with-icon"
                      onClick={() => handleShow(data.data.purchase_enable)}
                    >
                      <span className="icon-play icon-Group-2690"></span>
                      Watch Video
                    </a>
                  </li>
                ) : (
                  data.data.trailer && (
                    <li className="list-inline-item">
                      <a
                        href="javascript:void(0)"
                        className="btn btn-global btn-gl-dark with-icon"
                        onClick={() => handleShow(data.data.purchase_enable)}
                      >
                        <span className="icon-play icon-Group-2690"></span>
                        Watch Trailer
                      </a>
                    </li>
                  )
                )}
                {data.data.type !== "free" && data.data.purchase_enable ? (
                  <li className="list-inline-item">
                    <Link
                      href={`/checkout/?vid=${state.id}${
                        data.data.purchase_enable ? `&purchase_enable=true` : ``
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
                      <a className="btn btn-global with-icon">
                        {/* <span className="icon-play icon-Group-2690"></span> */}
                        <i class="ricon-bag ri-shopping-bag-line me-2 "></i>
                        {data.data.btn_text ? data.data.btn_text : "Purchase"}
                      </a>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="toggle-scroll-down overflow-hidden">
        <div
          className="clip-area"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-offset="100"
        >
          <Link href="/#film">Scroll For More</Link>
          <span className="icon-keyboard icon-keyboard_arrow_down"></span>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Body className="player-body-modal">
          <Plyr
            source={state.videoSrc}
            options={state.videoOptions}
            autoPlay
            ref={ref}
          />
          <div className="uiUpdate d-block">
            <ul className="list-inline">
              {data.data.type !== "free" && purchaseEnable ? (
                <li className="list-inline-item">
                  <a href={`/checkout/?vid=${state.id}`}>
                    <button className="btn plyrBtn-default">
                      {purchaseText}
                    </button>
                  </a>
                </li>
              ) : (
                ""
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
        {/* <Modal.Footer> */}
        {/* <CopyToClipboard text={state.shareLink}
          onCopy={() => setState({...state,copied: true})}>
            <button className='btn btn-orange'>Share</button>
        </CopyToClipboard> */}
        {/* {state.copied ? <span style={{color: 'red'}}>Copied.</span> : null} */}
        {/* </Modal.Footer> */}
      </Modal>
    </section>
  );
}
