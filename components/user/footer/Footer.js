import logoft from "/public/images/logo-nw.svg";
import Link from "next/link";
import Help from "../../common/Help";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container-xl">
          <div className="row">
            <div className="mb-4 col-12 col-sm-12 col-md-6 col-xl-4 col-xxl-4 text-center text-md-start">
              <Link href="/" className="foot-brand">
                <img className="foot-brand" src={logoft.src} alt="" />
              </Link>
              <p className="copyRight d-none d-md-block">
                Copyright © {new Date().getFullYear()} Hashkifa{" "}
              </p>
              <p className="copyRight d-none d-md-block nwn-title-new">
                A subsidiary of Nuggets of Inspiration{" "}
              </p>
              {/* <p className='copyRight d-none d-md-block'><a href='https://cwsio.com/' className='siteby' target="_blank">Website by CWS </a> </p> */}
            </div>
            <div className="mb-4 col-12 col-sm-12 col-md-6 col-xl-3 col-xxl-2 text-center text-md-start">
              <h4 className="ft-titl">Get In Touch </h4>
              {/* <ul className="list-unstyled ft-items">
                        <li><a href="#">About us </a></li>
                        <li><a href="#">Our mission </a></li>
                        <li><a href="#">contact us </a></li>
                    </ul> */}
              <ul className="list-unstyled ft-items">
                <li>
                  <Link href="mailto:info@hashkifa.com">info@hashkifa.com</Link>
                </li>
                <li>
                  <Link href="tel:8456464600">845.646.4600 </Link>
                </li>
              </ul>
            </div>
            <div className="mb-4 col-12 col-sm-12 col-md-6 col-xl-2 col-xxl-3 text-center text-md-start">
              <h4 className="ft-titl">Support </h4>
              <ul className="list-unstyled ft-items">
                <li>
                  <Link href="/contact">Help center </Link>
                </li>
                <li>
                  <Link href="/terms-of-service">Terms of service </Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy policy </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-xl-3 col-xxl-3 text-center text-md-start">
              <h4 className="ft-titl d-none d-md-block">Social Media </h4>
              <ul className="list-inline social-links">
                <li className="list-inline-item">
                  <a
                    href="https://wa.me/18454446173?text=%20Please%20sign%20me%20up%20to%20Hashkifa"
                    target="_blank"
                  >
                    <span className="icon-soc icon-whatsapp"></span>{" "}
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="https://www.instagram.com/hashkifa/" target="_blank">
                    <span className="icon-soc icon-instagram"></span>{" "}
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.facebook.com/yoel.gold.7"
                    target="_blank"
                  >
                    <span className="icon-soc icon-facebook"></span>{" "}
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.youtube.com/channel/UCYo2q2NjfAKNluVF_PnrnZw"
                    target="_blank"
                  >
                    <span className="icon-soc icon-youtube"></span>{" "}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-fluid p-0">
          <div className="border-filler">
            <div className="row g-0">
              <div className="col-12">
                <div className="d-md-none">
                  <p className="copyRight">
                    Copyright © {new Date().getFullYear()} Hashkifa{" "}
                  </p>
                  <p className="copyRight">
                    A subsidiary of Nuggets of Inspiration{" "}
                  </p>
                  {/* <p className='copyRight'><a className='siteby' href='https://cwsio.com/' target="_blank">Website by CWS </a> </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid p-0 last-footer">
          <div className="row g-0">
            <div className="col-12">
              <div className="company-branding text-center">
                <a
                  href="https://cwsio.com/"
                  target="_blank"
                  title="Creative Web Services"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="75.275"
                    height="36.875"
                    viewBox="0 0 75.275 36.875"
                  >
                    <g
                      id="Group_4340"
                      data-name="Group 4340"
                      transform="translate(-116.725 -975.72)"
                    >
                      <g
                        id="Group_2949"
                        data-name="Group 2949"
                        transform="translate(-564.143 -465.201)"
                      >
                        <rect
                          id="Rectangle_1777"
                          data-name="Rectangle 1777"
                          width="13.36"
                          height="6.18"
                          rx="0.5"
                          transform="translate(702.813 1447.829)"
                          fill="#fdb627"
                        />
                        <rect
                          id="Rectangle_1778"
                          data-name="Rectangle 1778"
                          width="13.36"
                          height="6.18"
                          rx="0.5"
                          transform="translate(694.684 1445.29) rotate(135)"
                          fill="#fdb627"
                        />
                        <rect
                          id="Rectangle_1779"
                          data-name="Rectangle 1779"
                          width="13.36"
                          height="6.18"
                          rx="0.5"
                          transform="translate(690.314 1459.82) rotate(-135)"
                          fill="#fdb627"
                        />
                        <path
                          id="Path_10079"
                          data-name="Path 10079"
                          d="M716.094,1485.589a.6.6,0,0,1,.595.7,16.034,16.034,0,0,1-31.487,0,.6.6,0,0,1,.6-.7h5.156a.608.608,0,0,1,.572.418,9.958,9.958,0,0,0,18.841,0,.608.608,0,0,1,.572-.418Z"
                          transform="translate(-2.08 -21.495)"
                          fill="#fdb627"
                        />
                      </g>
                      <text
                        id="Website_by_CWS"
                        data-name="Website by CWS"
                        transform="translate(158 994.595)"
                        fill="#fff"
                        font-size="6"
                        font-family="Poppins-Black, Poppins"
                        font-weight="800"
                        letter-spacing="-0.025em"
                      >
                        <tspan x="0" y="0">
                          Website by
                        </tspan>
                        <tspan x="0" y="8">
                          CWS
                        </tspan>
                      </text>
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <Help/> */}
    </>
  );
}
