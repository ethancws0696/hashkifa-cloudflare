import Head from "next/head";
import Header from "../components/user/header/Header";
import Footer from "../components/user/footer/Footer";
import Homefeatured from "../components/user/homefeatured/Homefeatured";
import Shapeplaceholder from "../components/user/shapePlaceholder/Shapeplaceholder";
import Browseflims from "../components/user/browseFlims/Browseflims";
import About from "../components/user/about/About";
import Freevideos from "../components/user/freevideos/Freevideos";
import Watcheverywhere from "../components/user/watcheverywhere/Watcheverywhere";
import { useEffect, useState } from "react";
import Plyr from "plyr-react";
import UserAPI from "../services/user/UserAPI";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Homecontent from "../miandata.json";
import Parser from "html-react-parser";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
gsap.registerPlugin(ScrollTrigger);

export default function Front() {
  const router = useRouter();
  const [utmID, setUtmID] = useState(null);
  const [utmSource, setUtmSource] = useState(null);
  const [utmMedium, setUtmMedium] = useState(null);
  const [utmCampaign, setUtmCampaign] = useState(null);
  const [utmTerm, setUtmTerm] = useState(null);
  const [utmCampaignContent, setUtmCampaignContent] = useState(null);
  const [state, setState] = useState({
    popHtml: "",
    cookie_checker: null,
    popTitle: "",
  });
  const [show, setShow] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [id, setID] = useState(null);
  const [myTimeout, setMyTimeout] = useState(null);
  const handleClose = () => {
    if (Homecontent.ManagePopup.cookie_checker) {
      localStorage.setItem("cookie_checker_u", true);
    }
    setShow(false);
  };
  const handleShow = () => {
    if (!localStorage.getItem("cookie_checker_u")) {
      setShow(true);
    }
  };

  const [showq, setShowq] = useState(false);
  const handleCloseq = () => setShowq(false);

  const [Queryv, setQueryv] = useState(null);
  const [shareLink, setShareLink] = useState(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: "ease-in-out",
    });
  }, []);
  useEffect(() => {
    AOS.refresh();
  }, []);
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

    if (router.query.hasOwnProperty("video")) {
      if (myTimeout) clearTimeout(myTimeout);
      setQueryv(router.query.video);
      if (router.query.type == "free") {
        setShareLink(
          `${window.location.origin}?video=${router.query.video}&vid=${
            router.query.vid
          }&type=free${utmID ? `&utm_id=${utmID}` : ``}${
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
          }`
        );
      } else {
        setShareLink(
          `${window.location.origin}?video=${router.query.video}&vid=${
            router.query.vid
          }&purchase_enable=${router.query.purchase_enable}${
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
          }`
        );
      }

      setID(router.query.vid);
      setShowq(true);
    } else {
      setMyTimeout(setTimeout(() => handleShow(), 5000));
    }
  }, [router]);

  useEffect(() => {
    gsap.set([".bb1", ".bb2", ".bb3", ".bb4", ".bb5"], { y: "20%" });
    gsap.to(".bb1", { duration: 1, y: "0%", opacity: 1, ease: "power3.inOut" });
    gsap.to(".bb2", {
      delay: 0.5,
      duration: 1,
      y: "0%",
      opacity: 1,
      ease: "power3.inOut",
    });
    gsap.to(".bb3", {
      delay: 0.6,
      duration: 1,
      y: "0%",
      opacity: 1,
      ease: "power3.inOut",
    });
    gsap.to(".bb4", {
      delay: 0.7,
      duration: 1,
      y: "0%",
      opacity: 1,
      ease: "power3.inOut",
    });
    gsap.to(".bb5", {
      delay: 0.8,
      duration: 1,
      y: "0%",
      opacity: 1,
      ease: "power3.inOut",
    });
  }, []);

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
      <Homefeatured data={Homecontent.banner_feature_video} />
      <Shapeplaceholder name="shape-one" />
      <Browseflims
        data={Homecontent.browse_feature_films}
        homeData={Homecontent.banner_feature_video}
      />
      <About
        title={
          Homecontent.cms_content.filter(function (item) {
            return item.key_name == "abount-title";
          })[0].key_value
        }
      />
      <Freevideos data={Homecontent.homefreevideo} />
      <Watcheverywhere />
      <Footer />
      {Homecontent.ManagePopup && (
        <>
          <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            className="home-flash-modal"
            centered
          >
            <Modal.Header className="heaederControl">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                <i class="ri-close-fill close-ic"></i>
              </button>
            </Modal.Header>
            <Modal.Body className="ifImage p-0 new-modal-changes">
              {Parser(Homecontent.ManagePopup.data_html)}
              <div className="modalBtn">
                {Homecontent.ManagePopup.btn_link && (
                  <a href={Homecontent.ManagePopup.btn_link}>
                    {Homecontent.ManagePopup.btn_text
                      ? Homecontent.ManagePopup.btn_text
                      : "Purchase Now"}
                  </a>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer hidden>
              <button
                type="button"
                className="btn btn-orange ms-auto me-auto"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      <Modal show={showq} onHide={handleCloseq} size="xl" centered>
        <Modal.Body className="p-0">
          <Plyr
            source={{
              type: "video",
              sources: [
                {
                  src: Queryv,
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
          <div className={showBtn ? "uiUpdate d-block" : "uiUpdate d-none"}>
            <ul className="list-inline">
              {router.query.type !== "free" && router.query.purchase_enable ? (
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
                    <button className="btn plyrBtn-default xxx">
                      Purchase{" "}
                    </button>
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li className="list-inline-item">
                <CopyToClipboard
                  text={shareLink}
                  onCopy={() => setCopied(true)}
                >
                  <button className="btn plyrBtn-default icon">
                    <i class="ri-share-fill re-con"></i>{" "}
                    {copied ? "Copied" : "Share"}{" "}
                  </button>
                </CopyToClipboard>
              </li>
            </ul>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}
