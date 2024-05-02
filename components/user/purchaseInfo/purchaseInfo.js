import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import UserAPI from "../../../services/user/UserAPI";
import Moment from "moment";
import Link from "next/link";
import Router, { useRouter } from "next/router";
export default function purchaseInfo(props) {
  const [data, setData] = useState([]);
  const [loginName, setLoginName] = useState(null);
  const [shortName, setShortName] = useState(null);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const getOrderData = async () => {
    setLoader(true);
    await UserAPI.orderDetails(
      localStorage.getItem("hk_user_auth_ticket"),
      props.order_id
    )
      .then((response) => {
        //console.log(response.data.data);
        setData(response.data.data);
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
    if (props.order_id !== null) {
      getOrderData();
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
  }, [props]);

  const columns = [
    {
      name: "Items",
      selector: (row) => row.videodetails.name,
      cell: (row) => (
        <div className="name-short-name d-flex align-items-center ms-0">
          <div className="sm-output">
            <img
              className="w-100"
              src={row.videodetails.desktop_thumb}
              alt=""
              loading="lazy"
            />
          </div>
          <span className="full-name ms-3">{row.videodetails.name}</span>
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row) => row.type,
      cell: (row) => (
        <div className="normal-font-user text-start">{row.type}</div>
      ),
    },
    {
      name: "Price",
      selector: (row) => row.item_price,
      cell: (row) => (
        <div className="normal-font-user text-start">{`$${parseFloat(
          row.item_price
        ).toFixed(2)}`}</div>
      ),
    },
  ];

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
          <div className="row mb-4">
            <div className="col-12">
              <div className="bkend-top-title">
                <div class="back-action-btn">
                  <Link href="/mypurchase">
                    <a class="btn btn-them-back d-flex align-items-center">
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
                  </Link>
                </div>
                <h1 className="text-center single-top-title">My Purchases </h1>
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
        <div className="container-fluid">
          <div className="d-md-none">
            <div className="row mb-4">
              <div className="col-12">
                <div className="backBtn">
                  <Link href="/mypurchase">
                    <a class="btn btn-them-back d-flex align-items-center">
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
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col-12 col-xxl-5 d-flex align-items-stretch">
              <div class="card customer-edit mb-5 flex-card-stretch w-100">
                <h4 class="font-medium mb-4">
                  Purchased Items
                  <span class="sub-title-gl font-16 w-100 mt-2 d-block text-white">
                    Details regarding payment and transactions.
                  </span>
                </h4>
                <div class="order-info-details">
                  {data.order_id && (
                    <div class="wall-detail mb-20">
                      <div class="row g-0">
                        <div class="col-12 col-md-6">
                          <div class="trans-id">ID </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="trans-id">{data.order_id}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {data.transaction_id && (
                    <div class="wall-detail mb-20">
                      <div class="row g-0">
                        <div class="col-12 col-md-6">
                          <div class="trans-id">Transaction ID </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="trans-id">{data.transaction_id}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {data.created_at && (
                    <div class="wall-detail mb-20">
                      <div class="row g-0">
                        <div class="col-12 col-md-6">
                          <div class="trans-id">Payment Date </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="trans-id">
                            {Moment(data.created_at).format("MMM DD, YYYY")}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {data.payment_method && (
                    <div class="wall-detail mb-20">
                      <div class="row g-0">
                        <div class="col-12 col-md-6">
                          <div class="trans-id">Payment Method </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="trans-id d-flex align-items-center">
                            <img
                              width="21px"
                              src="images/card.svg"
                              alt=""
                              loading="lazy"
                            />
                            <span class="ms-2">{data.payment_method}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {data.ip_address && (
                    <div class="wall-detail mb-20">
                      <div class="row g-0">
                        <div class="col-12 col-md-6">
                          <div class="trans-id">IP Address </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="trans-id">{data.ip_address}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {data.status && (
                    <div class="wall-detail mb-20">
                      <div class="row g-0">
                        <div class="col-12 col-md-6">
                          <div class="trans-id">Status </div>
                        </div>
                        <div class="col-12 col-md-6">
                          <div class="trans-id d-flex align-items-center">
                            {/* <span class="square newgreen"></span> */}
                            <i class="ri-checkbox-circle-fill newgreen me-1 text-success"></i>
                            {data.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div class="col-12 col-xxl-7 d-flex align-items-stretch">
              <div class="card mb-5 flex-card-stretch w-100">
                <div class="row mb-4 mb-lg-0">
                  <div class="col-12 col-lg-9 col-xxl-10">
                    <h4 class="font-medium mb-4">
                      <span className="text-white">Ordered Products </span>
                      <span class="sub-title-gl font-16 mt-2 w-100 d-block text-white">
                        Details regarding order item,type and pricing.
                      </span>
                    </h4>
                  </div>
                </div>

                <div className="table-responsive backend-table card-table user-purchase-chart">
                  <DataTable
                    className={"table"}
                    columns={columns}
                    rows={[{ name: "here" }]}
                    data={data.orderitems}
                    responsive={true}
                    dense={true}
                  />
                  <table className="table">
                    <tbody>
                      {data.special_offer || data.coupon_code ? (
                        <tr>
                          <td colspan="3" class="text-end">
                            {data.special_offer && (
                              <>
                                <b>Special offer :</b> Yes <br />
                              </>
                            )}
                            {data.coupon_code && (
                              <>
                                <b>Promo Code</b> : {data.coupon_code}
                              </>
                            )}
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                      {data.discount_amount && (
                        <tr>
                          <td colspan="3" class="text-end">
                            <div class="normal-font-sm ttl-price pe-4">
                              Discount : $
                              {parseFloat(data.discount_amount).toFixed(2)}
                            </div>
                          </td>
                        </tr>
                      )}
                      {data.total_amount && (
                        <tr>
                          <td colspan="3" class="text-end">
                            <div class="normal-font-sm ttl-price">
                              Total : $
                              {parseFloat(data.total_amount).toFixed(2)}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
