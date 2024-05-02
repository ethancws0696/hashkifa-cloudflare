import React, { useEffect, useState, useRef } from "react";
import UserAPI from "../../../services/user/UserAPI";
import Link from "next/link";
import VideoJS from "./videoJS";
import Router, { useRouter } from "next/router";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import ReactPlayer from "react-player";
import LeftArrow from "../../../public/images/awesome-arrow-left.png";
import axios from "axios";
export default function videoDetail(data) {
  const videoId = "29474908";
  const provider = "vimeo";
  const videoOptions = undefined;
  const playerRef = useRef(null);
  const [loginName, setLoginName] = useState(null);
  const [shortName, setShortName] = useState(null);
  const [vdata, setVdata] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showAltLink, setShowAltLink] = useState(false);
  const [altPage, setAltPage] = useState(false);
  const [version, setVersion] = useState(null);
  const router = useRouter();
  const [ip, setIP] = useState("");
  const controlsList = [
    "play",
    "progress",
    "current-time",
    "mute",
    "volume",
    "settings",
    "nodownload",
  ];

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    changePlayerOptions();
    // you can handle player events here
  };

  const changePlayerOptions = () => {
    //console.log("here",playerRef);
    // you can update the player through the Video.js player instance
    if (!playerRef.current) {
      //console.log("here 1");
      return;
    }
    // [update player through instance's api]
    playerRef.current.src([{ src: "mp4", type: "video/mp4" }]);
  };

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
  };
  const getVideoData = async () => {
    setLoader(true);
    await UserAPI.videoAccess(
      localStorage.getItem("hk_user_auth_ticket"),
      data.data
    )
      .then((response) => {
        setVdata(response.data.data);
        setAltPage(false);
        if (response.data.data.alt_link) {
          setShowAltLink(true);
        }
        if (response.data.data.versions.length) {
          setVersion(response.data.data.versions);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const getVideoDataAlt = async () => {
    setLoader(true);
    await UserAPI.videoAccessAlt(
      localStorage.getItem("hk_user_auth_ticket"),
      data.data
    )
      .then((response) => {
        setVdata(response.data.data);
        setShowAltLink(false);
        setAltPage(true);
        setVersion(null);
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(async () => {
    getData();
    if (data.data) {
      if (router.query.type) {
        getVideoDataAlt();
      } else {
        getVideoData();
      }
    }
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
  }, [data, router]);

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
      <div className="main-content-right vdetail">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="bkend-top-title">
                <div class="back-action-btn d-none d-md-block">
                  <a
                    href="/videos"
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
        <div className="container-fluid mb-5">
          <div className="d-md-none">
            <div className="row mb-4">
              <div className="col-12">
                <div className="backBtn">
                  <a
                    href="/videos"
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
                    <a href="#">Videos </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/videos">My Videos </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {vdata.name}{" "}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-12">
              {vdata ? (
                <div className="video-container">
                  <div className="title-view">
                    <h1>{vdata.name} </h1>
                    <p>{vdata.description}</p>
                    {/* <a href="/videos" className="btn btn-theme-dark d-flex align-items-center">
                            <img className="me-2 arrow-white-aws" src={LeftArrow.src} alt=""/>
                            Back
                        </a> */}
                    {showAltLink ? (
                      <div className="altLink">
                        <p>
                          Having Trouble ?{" "}
                          <Link
                            href={`/videos/vDetail/?id=${vdata.video_id}&type=alt_link`}
                          >
                            Try an Alternate Version
                          </Link>
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {version?.length ? (
                    <>
                      <div className="center-tab">
                        <ul
                          className="nav nav-pills justify-content-center"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              data-bs-toggle="pill"
                              href="#default"
                            >
                              Default
                            </a>
                          </li>
                          {version
                            ? version.map((item, i) => (
                                <li className="nav-item">
                                  <a
                                    className="nav-link"
                                    data-bs-toggle="pill"
                                    href={`#${item.title.replace(/'| /g, "")}`}
                                  >
                                    {item.title}
                                  </a>
                                </li>
                              ))
                            : ""}
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div id="default" className="tab-pane active">
                          {!altPage && vdata.video_id ? (
                            <div className="card mb-4">
                              <div className="aspect-ratio">
                                <iframe
                                  src={
                                    vdata.provider === "vimeo"
                                      ? `https://player.vimeo.com/video/${vdata.video_id}`
                                      : vdata.link
                                  }
                                  width="640"
                                  height="360"
                                  frameborder="0"
                                  allow="autoplay; fullscreen"
                                  allowfullscreen
                                ></iframe>
                              </div>
                            </div>
                          ) : (
                            <div className="player-wrapper">
                              {/* <VideoJS  options={{ 
                                    autoplay: true,
                                    controls: true,
                                    responsive: true,
                                    fluid: true,
                                    sources: [{
                                    src: vdata.alt_link,
                                    type: 'video/mp4'
                                    }]
                                }} onReady={handlePlayerReady}/> */}
                              <ReactPlayer
                                controls
                                url={vdata.alt_link}
                                config={{
                                  file: {
                                    attributes: {
                                      controlsList: controlsList.join(" "),
                                    },
                                  },
                                }}
                              />
                            </div>
                          )}
                        </div>
                        {version
                          ? version.map((item, i) => (
                              <div
                                id={`${item.title.replace(/'| /g, "")}`}
                                className="tab-pane"
                              >
                                <div className="card mb-4">
                                  <div className="aspect-ratio">
                                    <iframe
                                      src={
                                        vdata.provider === "vimeo"
                                          ? `https://player.vimeo.com/video/${item.video_id}`
                                          : item.video_link
                                      }
                                      width="640"
                                      height="360"
                                      frameborder="0"
                                      allow="autoplay; fullscreen"
                                      allowfullscreen
                                    ></iframe>
                                  </div>
                                </div>
                              </div>
                            ))
                          : ""}
                      </div>
                    </>
                  ) : (
                    <>
                      {!altPage && vdata.video_id ? (
                        <div className="card mb-4">
                          <div className="aspect-ratio">
                            <iframe
                              src={
                                vdata.provider === "vimeo"
                                  ? `https://player.vimeo.com/video/${vdata.video_id}`
                                  : vdata.link
                              }
                              width="640"
                              height="360"
                              frameborder="0"
                              allow="autoplay; fullscreen"
                              allowfullscreen
                            ></iframe>
                          </div>
                        </div>
                      ) : (
                        <div className="player-wrapper">
                          {/* <VideoJS options={{ 
                                    autoplay: true,
                                    controls: true,
                                    responsive: true,
                                    fluid: true,
                                    sources: [{
                                    src: vdata.alt_link,
                                    type: 'video/mp4'
                                    }]
                                }} onReady={handlePlayerReady}/> */}
                          <ReactPlayer
                            controls
                            url={vdata.alt_link}
                            config={{
                              file: {
                                attributes: {
                                  controlsList: controlsList.join(" "),
                                },
                              },
                            }}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="error">
                  <p>{error}</p>
                </div>
              )}
              {/* <div><p>Your IP is:<span>{ip}</span></p></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
