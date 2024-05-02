import Logo from "../../../public/images/logo.png";
import Paycomplete from "../../../public/images/pay-complete.png";
import completeOrder from "../../../public/images/comp-order.png";
import arrowLeft from "../../../public/images/awesome-arrow-left.png";
import { useEffect, useState, useRef } from "react";
import UserAPI from "../../../services/user/UserAPI";
import Router, { useRouter } from "next/router";
export default function orderComplete() {
  const router = useRouter();
  const [orderID, setOrderID] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(async () => {
    if (router.query.orderid) {
      setLoader(true);
      setOrderID(orderID);
      await UserAPI.orderDetails(
        localStorage.getItem("hk_user_auth_ticket"),
        router.query.orderid
      )
        .then((response) => {
          if (response.data.status) {
            setOrderData(response.data.data.orderitems);
            setTotalAmount(response.data.data.total_amount);
          }
        })
        .catch((error) => {
          //console.log(error.response);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [router]);
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
      {/* <section className="cover-main">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 text-center">
                    <a href="/"><img src={Logo.src} alt=""/></a>
                </div>
            </div>
        </div>
    </section> */}
      <section className="midd-back-action mb-3 pt-5">
        <div className="container-fluid max-1366">
          <div className="row">
            <div className="col-12">
              <div className="bkend-top-title mb-0 border-bottom-0">
                <div className="title-bild ms-auto me-auto text-center">
                  <img src={Paycomplete.src} alt="" loading="lazy" />
                  <h1 className="text-center single-top-title mt-3">
                    Thank you for your Order!
                  </h1>
                  {/* <p className="pay-done-info">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore. </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="more-order-detail">
        <div className="container-fluid max-1366">
          <div className="row">
            {orderData.orderid ? (
              <div className="col-12">
                <h3 className="order-number">
                  Order ID :{" "}
                  <span className="text-orange">{orderData.orderid}</span>
                </h3>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="card card-order-final">
            <div className="row">
              <div className="col-12">
                <h4 className="order-sum">Order Summary </h4>
              </div>
            </div>
            {orderData &&
              orderData.map((element, key) => {
                return (
                  <div className="row g-4 g-md-5 g-xxl-6 mb-5">
                    <div className="col-12 col-md-6">
                      {element.videodetails.desktop_thumb ? (
                        <ul className="purchase-item-listing list-unstyled mb-3">
                          <li>
                            <img
                              src={element.videodetails.desktop_thumb}
                              alt=""
                              loading="lazy"
                            />
                          </li>
                        </ul>
                      ) : (
                        ""
                      )}
                      {element.type ? (
                        <a href="/videos">
                          <div className="spp-price">
                            <span>{element.type}</span>
                          </div>
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="total-price-review">
                        {element.videodetails.name ? (
                          <h5>{element.videodetails.name}</h5>
                        ) : (
                          ""
                        )}
                        {element.videodetails.description ? (
                          <p>{element.videodetails.description}</p>
                        ) : (
                          ""
                        )}
                        {/* <div className="row g-0 bg-changes">
                                {element.item_price ? 
                                <>
                                <div className="col-6 col-md-6">
                                    <span className="text-nomal font-medium">Price </span>
                                </div>
                                <div className="col-6 col-md-6 text-end">
                                    <span className="text-nomal font-weight-bold">{`$${element.item_price}`}</span>
                                </div>
                                </>
                                : ''}
                            </div> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="row g-0 bg-changes space-reduced total-fonts">
              {totalAmount ? (
                <>
                  {/* <div className="col-6 col-md-6">
                    </div> */}
                  <div className="col-12 text-end">
                    <span className="text-total font-weight-bold">
                      Total &nbsp;{" "}
                    </span>
                    <span className="text-total font-weight-bold text-orange">{`$${parseFloat(
                      totalAmount
                    ).toFixed(2)}`}</span>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="action-to-video">
                <a href="/videos" className="btn btn-theme-orange">
                  <img src={arrowLeft.src} alt="" loading="lazy" />
                  <span className="ms-2">My Videos </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
