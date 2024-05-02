import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import UserAPI from "../../../services/user/UserAPI";
import Moment from "moment";
import Link from "next/link";
import Router, { useRouter } from "next/router";
export default function purchase() {
  const [data, setData] = useState([]);
  const [loginName, setLoginName] = useState(null);
  const [shortName, setShortName] = useState(null);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const getPurchaseData = async () => {
    setLoader(true);
    await UserAPI.purchase(localStorage.getItem("hk_user_auth_ticket"))
      .then((response) => {
        let purchase = [];
        response.data.data.map((item, key) => {
          var element = {};
          var today = Moment();
          var exp_date = Moment(item.expire_date);
          var diff = Moment.duration(exp_date.diff(today));

          element.image = item.videodetails.desktop_thumb;
          element.items = item.order_text;
          element.type = item.type;
          element.price = item.discount_price
            ? item.discount_price
            : item.item_price;
          element.payment_method = item.orderdetails.card_number;
          element.purchased_date = Moment(item.created_at).format(
            "MMM DD, YYYY"
          );
          element.exp_date = Moment(item.expire_date).format("MMM DD, YYYY");
          element.orderID = item.orderdetails.order_id;
          element.remaining_days =
            Math.floor(diff.asWeeks()) > 0
              ? Math.floor(diff.asWeeks()) +
                " weeks, " +
                (diff.days() % 7) +
                " days."
              : "Expired";

          purchase.push({ ...element });
        });
        setData(purchase);
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
    getPurchaseData();
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

  const columns = [
    {
      name: "Items",
      selector: (row) => row.items,
      cell: (row) => (
        <Link href={`/purchaseDetail/?order_id=${row.orderID}`}>
          <div className="name-short-name d-flex align-items-center ms-0">
            <div className="sm-output">
              <img className="w-100" src={row.image} alt="" loading="lazy" />
            </div>
            <span className="full-name ms-3">{row.items}</span>
          </div>
        </Link>
      ),
    },
    {
      name: "Type",
      selector: (row) => row.type,
      cell: (row) => (
        <Link href={`/purchaseDetail/?order_id=${row.orderID}`}>
          <div className="normal-font-user text-start">{row.type}</div>
        </Link>
      ),
    },
    {
      name: "Paid",
      selector: (row) => row.price,
      cell: (row) => (
        <Link href={`/purchaseDetail/?order_id=${row.orderID}`}>
          <div className="normal-font-user text-start">{`$${parseFloat(
            row.price
          ).toFixed(2)}`}</div>
        </Link>
      ),
    },
    {
      name: "Payment Method",
      selector: (row) => row.payment_method,
      cell: (row) => (
        <Link href={`/purchaseDetail/?order_id=${row.orderID}`}>
          <div className="normal-font-user">
            <div className="d-flex align-items-center">
              <img src="images/card.svg" alt="" loading="lazy" />
              <span className="ms-4">{`***${row.payment_method}`} </span>
            </div>
          </div>
        </Link>
      ),
    },
    {
      name: "Purchase Date",
      selector: (row) => row.purchased_date,
      cell: (row) => (
        <Link href={`/purchaseDetail/?order_id=${row.orderID}`}>
          <div className="normal-font-user text-center">
            {row.purchased_date}
          </div>
        </Link>
      ),
    },
    {
      name: "Exp Date",
      selector: (row) => row.exp_date,
      cell: (row) => (
        <Link href={`/purchaseDetail/?order_id=${row.orderID}`}>
          <div className="normal-font-user text-center">{row.exp_date} </div>
        </Link>
      ),
    },
    {
      name: "Days Remanining",
      selector: (row) => row.remaining_days,
      cell: (row) => (
        <Link href={`/purchaseDetail/?order_id=${row.orderID}`}>
          <div className="normal-font-user text-center">
            {row.remaining_days}
          </div>
        </Link>
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
                  <Link href="/">
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
                  <Link href="/">
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
            <div className="col-12 col-sm-12">
              <div className="card">
                <h4 className="font-medium mb-4">
                  Purchased Items
                  {/* <span className="sub-title-gl font-16 mt-1 w-100 d-block">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed </span> */}
                </h4>
                <div className="table-responsive backend-table card-table user-purchase-chart">
                  <DataTable
                    className={"table"}
                    columns={columns}
                    data={data}
                    pagination={true}
                    paginationPerPage={10}
                    responsive={true}
                    dense={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
