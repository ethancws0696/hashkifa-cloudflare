import React, { useEffect, useState } from "react";
import UserAPI from "../../../services/user/UserAPI";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function myvideos() {
  const baseURL = process.env.apiUrl;
  const vdUrl = `${baseURL}/api/v1/myvideos`;
  const [loginName, setLoginName] = useState(null);
  const [shortName, setShortName] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [showLoadMore, setLoadMore] = useState(false);
  const [vdURL, setVdURL] = useState(vdUrl);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [purchaseEnable, setPurchaseEnable] = useState(false);
  const [purchaseText, setPurchaseText] = useState("Purchase");
  const [trailer, setTrailer] = useState(null);
  const [id, setID] = useState(null);
  const [shareLink, setShareLink] = useState(null);
  const [copy, setCopy] = useState(null);
  const router = useRouter();
  const handleShow = (trailer, id, purchase_enable, btn_text) => {
    setPurchaseText(btn_text);
    setPurchaseEnable(purchase_enable);
    setTrailer(trailer);
    setID(id);
    var shareLinkSet = `${window.location.origin}?video=${trailer}&vid=${id}${
      purchase_enable ? `&purchase_enable=true` : ``
    }`;
    setShareLink(shareLinkSet);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const getVideoData = async () => {
    setLoader(true);
    await UserAPI.videos(localStorage.getItem("hk_user_auth_ticket"), vdURL)
      .then((response) => {
        var updated = response.data.data.data;
        const sortedArray = updated.sort(
          (a, b) => b.purchase_flag - a.purchase_flag
        );
        setVideoList([...videoList, ...sortedArray]);
        if (response.data.data.next_page_url) {
          setLoadMore(true);
          setVdURL(response.data.data.next_page_url);
        } else {
          setLoadMore(false);
        }
      })
      .catch((error) => {
        //console.log(error.response);
        localStorage.removeItem("hk_user_auth_ticket");
        localStorage.removeItem("hk_user_auth_ticket_expire");
        localStorage.removeItem("hk_user_name");
        localStorage.removeItem("hk_user_email");
        router.push("/login");
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    getVideoData();
    if (localStorage.getItem("hk_user_name")) {
      setLoginName(localStorage.getItem("hk_user_name"));
      setShortName(
        localStorage
          .getItem("hk_user_name")
          .split(" ")
          .map((word) => word[0])
          .join("")
      );
    }
  }, []);
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
      <div className="main-content-right">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="bkend-top-title">
                <div class="back-action-btn d-none d-md-block">
                  <a
                    href="/"
                    class="btn btn-them-back d-flex align-items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="me-3"
                      width="34.975"
                      height="23.33"
                      viewBox="0 0 34.975 23.33"
                    >
                      <path
                        id="Icon_awesome-arrow-left"
                        class="arrow-fill"
                        data-name="Icon awesome-arrow-left"
                        d="M13.755,24.414,12.57,25.6a1.277,1.277,0,0,1-1.811,0L.373,15.22a1.277,1.277,0,0,1,0-1.811L10.758,3.024a1.277,1.277,0,0,1,1.811,0L13.755,4.21a1.284,1.284,0,0,1-.021,1.832L7.3,12.175H33.689a1.279,1.279,0,0,1,1.282,1.282v1.71a1.279,1.279,0,0,1-1.282,1.282H7.3l6.437,6.133A1.274,1.274,0,0,1,13.755,24.414Z"
                        transform="translate(0.004 -2.647)"
                        fill="#ff9016"
                      ></path>
                    </svg>
                    Back
                  </a>
                </div>
                <h1 className="text-center single-top-title">My Videos </h1>
                <a href="/userProfile">
                  <div className="use-details">
                    <div className="name-detail">
                      {loginName}
                      <span>User </span>
                    </div>
                    <div className="short-name-detail">
                      <span>{shortName}</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mb-4 mb-xl-5">
          <div className="d-md-none">
            <div className="row mb-4">
              <div className="col-12">
                <div className="backBtn">
                  <a
                    href="/"
                    class="btn btn-them-back d-flex align-items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="me-3"
                      width="34.975"
                      height="23.33"
                      viewBox="0 0 34.975 23.33"
                    >
                      <path
                        id="Icon_awesome-arrow-left"
                        class="arrow-fill"
                        data-name="Icon awesome-arrow-left"
                        d="M13.755,24.414,12.57,25.6a1.277,1.277,0,0,1-1.811,0L.373,15.22a1.277,1.277,0,0,1,0-1.811L10.758,3.024a1.277,1.277,0,0,1,1.811,0L13.755,4.21a1.284,1.284,0,0,1-.021,1.832L7.3,12.175H33.689a1.279,1.279,0,0,1,1.282,1.282v1.71a1.279,1.279,0,0,1-1.282,1.282H7.3l6.437,6.133A1.274,1.274,0,0,1,13.755,24.414Z"
                        transform="translate(0.004 -2.647)"
                        fill="#ff9016"
                      ></path>
                    </svg>
                    Back
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">My Videos </a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12">
              <div className="video-category">
                {/* <ul className="list-inline video-filters">
                            <li className="list-inline-item">
                                <button type="button" data-filter=".category-a">Free Videos</button> 
                            </li>
                            <li className="list-inline-item">
                                <button type="button" data-filter=".category-b">Featured Films </button> 
                            </li>
                            <li className="list-inline-item">
                                <button type="button" data-filter="all">All Videos </button> 
                            </li>
                        </ul> */}

                <div className="mix-container mixitupcontainer row g-4 g-xxl-6">
                  {videoList.length ? (
                    videoList.map((item, key) => (
                      <div className="mix category-a col-12 col-md-6 col-lg-4">
                        <div className="mini-card-figure">
                          <img src={item.desktop_thumb} alt="" loading="lazy" />
                          <div className="figurecaption">
                            <h3 className="video-titl">{item.name}</h3>
                            <p>{item.description}</p>
                            <div className="d-table">
                              {item.purchase_flag ? (
                                <Link href={`/videos/vDetail/?id=${item.id}`}>
                                  <button
                                    type="button"
                                    className="btn btn-theme-orange sm-orang-btn"
                                  >
                                    <svg
                                      id="play-button"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12.351"
                                      height="14.126"
                                      viewBox="0 0 12.351 14.126"
                                    >
                                      <path
                                        id="Path_431"
                                        data-name="Path 431"
                                        d="M13.458,5.64,3.93.218A1.308,1.308,0,0,0,1.889,1.406v11.32a1.252,1.252,0,0,0,1.208,1.4,1.6,1.6,0,0,0,.83-.255L13.5,8.013a1.4,1.4,0,0,0,.743-1.2A1.4,1.4,0,0,0,13.458,5.64Zm-.6,1.326-9.57,5.857a.609.609,0,0,1-.15.069.636.636,0,0,1-.019-.166V1.407a.91.91,0,0,1,.021-.19.48.48,0,0,1,.186.069l9.526,5.423c.117.067.152.125.164.113A.412.412,0,0,1,12.856,6.967Z"
                                        transform="translate(-1.889 0)"
                                        fill="#fff"
                                      />
                                    </svg>
                                    Play Video
                                  </button>
                                </Link>
                              ) : (
                                <ul class="list-inline d-flex align-items-center">
                                  <li class="list-inline-item">
                                    <a
                                      class="btn btn-global"
                                      href={`/checkout?vid=${item.id}`}
                                    >
                                      Purchase
                                    </a>
                                  </li>
                                  {item.trailer && (
                                    <li class="list-inline-item">
                                      <a
                                        href="javascript:void(0)"
                                        class="btn btn-border-glob"
                                        onClick={() =>
                                          handleShow(
                                            item.trailer,
                                            item.id,
                                            item.purchase_enable,
                                            item.btn_text
                                          )
                                        }
                                      >
                                        <span class="icon-play icon-Group-2690"></span>
                                        Watch Trailer
                                      </a>
                                    </li>
                                  )}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="message">
                      <p>No video is available.</p>
                    </div>
                  )}
                </div>
                {showLoadMore ? (
                  <div className="load-more mt-5">
                    <a
                      className="d-table ms-auto me-auto text-center"
                      onClick={getVideoData}
                    >
                      <span className="w-100 d-block text-center text-white">
                        Load More{" "}
                      </span>
                      <img
                        className=""
                        src="images/more.svg"
                        alt=""
                        loading="lazy"
                      />
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        className="large-md"
      >
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
                  <Link href={`/checkout/?vid=${id}`}>
                    <button className="btn plyrBtn-default">
                      {purchaseText}{" "}
                    </button>
                  </Link>
                </li>
              )}
              <li className="list-inline-item">
                <CopyToClipboard text={shareLink} onCopy={() => setCopy(true)}>
                  <button className="btn plyrBtn-default icon">
                    <i class="ri-share-fill re-con"></i>{" "}
                    {copy ? "Copied" : "Share"}{" "}
                  </button>
                </CopyToClipboard>
              </li>
            </ul>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
