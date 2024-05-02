import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import Plyr from "plyr-react";
import Link from "next/link";
export default function Watcheverywhere() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <section className="watch-enywhere more-space-device pt-0 pb-0" id="share">
      <div className="newsletter whatsapp-section">
        <div className="container-xl">
          <div className="row">
            <div className="col-12">
              <div className="form-newsletter text-center overflow-hidden">
                <ul
                  className="list-inline"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <li className="list-inline-item">
                    <h2 class="text-center text-lg-end m-0">
                      Sign up to receive our monthly videos on WhatsApp!
                    </h2>
                  </li>
                  <li className="list-inline-item">
                    <ul class="list-inline social-links">
                      <li class="list-inline-item">
                        <a
                          href="https://wa.me/18454446173?text=%20Please%20sign%20me%20up%20to%20Hashkifa"
                          target="_blank"
                        >
                          <span class="icon-soc icon-whatsapp"></span>{" "}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="watch-enywhere-child p-0">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-12">
              <div className="title-main overflow-hidden">
                <div class="tiles">
                  <ul class="d-flex list-unstyled ">
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-1.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-2.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-3.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-4.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-5.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-6.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-7.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-8.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-9.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-10.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-11.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                  </ul>

                  <ul class="d-flex list-unstyled ">
                    <li onClick={handleShow}>
                      <a href="javacript:void(0)">
                        <img src="images/story/st-12.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-13.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-14.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-15.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-16.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-17.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-18.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-19.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-20.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-21.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-22.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                  </ul>

                  <ul class="d-flex list-unstyled ">
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-23.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-24.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-25.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-26.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-27.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-28.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-29.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-30.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-31.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-32.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-33.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                  </ul>

                  <ul class="d-flex list-unstyled ">
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-34.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-35.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-36.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-37.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-38.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-39.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-40.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-41.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-42.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-43.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-44.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                  </ul>

                  <ul class="d-flex list-unstyled ">
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-45.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-46.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-47.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-48.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-49.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-50.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-51.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-52.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-53.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-54.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                    <li onClick={handleShow}>
                      <a href="javascript:void(0)">
                        <img src="images/story/st-55.png" />
                        <div class="play-icon">
                          <span class="ply-icon icon-Path-2143"></span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="full-banner-detail overflow-hidden">
                  <div
                    className="title-top"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <img src="images/single.png" />
                  </div>
                  <div
                    className="story-information"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <p>
                      Experienced a life changing event? <br /> Felt the warm
                      touch of Hashem’s guiding hand in your life? <br />{" "}
                      Overcame a personal struggle, embraced a challenge, or
                      grew from adversity?
                    </p>
                    <p>
                      Allow us to turn your story into a source of strength for
                      others by sharing it with the world. We will <br />{" "}
                      empower you to tell your story in an effective and
                      personal way.
                    </p>

                    <div className="shareitbtn">
                      <span className="btn btn-global">
                        <Link href="/contact">Share it &gt;</Link>
                      </span>
                      <span
                        className="btn btn-global story-btn"
                        onClick={handleShow}
                      >
                        <a href="javascript:void(0)">
                          Play Story{" "}
                          <span class="icon-play icon-Group-2690"></span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Body className="player-body-modal">
          <Plyr
            source={{
              type: "video",
              sources: [
                {
                  src: "jcVOwoeArrA",
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
        </Modal.Body>
      </Modal>
    </section>
  );
}
