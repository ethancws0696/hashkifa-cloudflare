import React, { useEffect, useState, useRef } from "react";
import UserAPI from "../../../services/user/UserAPI";
import AuthAPI from "../../../services/common/AuthAPI";
import Router, { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import Link from "next/link";
import { set } from "react-hook-form";
export default function profile() {
  const countryList = require("country-list");
  const countryArr = countryList.getNames();
  const checkEmptyInput = useRef();
  const checkPassEmptyInput = useRef();
  const [loginName, setLoginName] = useState(null);
  const [shortName, setShortName] = useState(null);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    phone: null,
    country: null,
    password: null,
    confirmpass: null,
  });
  const [showcards, setShowCards] = useState([]);
  const [fieldDisableEnable, setFieldDisableEnable] = useState(true);
  const [success, setSuccess] = useState(null);
  const [fielderror, setFieldError] = useState({
    nameErr: null,
    emailErr: null,
    phoneErr: null,
    countryErr: null,
  });
  const [reseterror, setResetError] = useState({
    passwordErr: null,
    confirmPasswordErr: null,
  });
  const router = useRouter();
  const [btn, setBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState({
    success: null,
    error: null,
    openeyePClass: false,
    openeyeCClass: false,
  });

  const handlePToggleClass = () => {
    setState({ ...state, openeyePClass: !state.openeyePClass });
  };

  const handleCToggleClass = () => {
    setState({ ...state, openeyeCClass: !state.openeyeCClass });
  };

  const handleCardDelete = async (cardID) => {
    setLoader(true);
    await UserAPI.cardDelete(
      cardID,
      localStorage.getItem("hk_user_auth_ticket")
    )
      .then((response) => {
        if (response.data.status) {
          Router.reload(window.location.pathname);
        }
      })
      .catch((error) => {
        //console.log(error.response);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const getSavedPayment = async () => {
    await UserAPI.getSavedCards(localStorage.getItem("hk_user_auth_ticket"))
      .then((response) => {
        if (response.data.status) {
          setShowCards(response.data.data);
        }
      })
      .catch((error) => {
        // console.log("here 5");
        // console.log(error.response);
        // localStorage.removeItem('hk_user_auth_ticket');
        // localStorage.removeItem("hk_user_auth_ticket_expire");
        // localStorage.removeItem("hk_user_name");
        // router.push('/login');
      });
  };

  const handleFormData = (e) => {
    if (e.target.name == "view-edit") {
      setFieldDisableEnable(!fieldDisableEnable);
    } else if (e.target.name == "firstname") {
      setUserData({ ...userData, name: e.target.value });
    } else if (e.target.name == "email") {
      setUserData({ ...userData, email: e.target.value });
    } else if (e.target.name == "phone") {
      setUserData({ ...userData, phone: e.target.value });
    } else if (e.target.name == "country") {
      setUserData({ ...userData, country: e.target.value });
    } else if (e.target.name == "passwordI") {
      setUserData({ ...userData, password: e.target.value });
    } else if (e.target.name == "confirmpwd") {
      setUserData({ ...userData, confirmpass: e.target.value });
    }
  };

  const handleFormSubmit = async () => {
    setSuccess(null);
    var resetVal = {
      nameErr: null,
      emailErr: null,
      phoneErr: null,
      countryErr: null,
    };
    setFieldError({ ...resetVal });
    if (
      userData.name == null &&
      userData.email == null &&
      userData.phone == null &&
      userData.country == null
    ) {
      checkEmptyInput.current.focus();
    } else {
      setLoader(true);
      var reqBody = {
        firstName: userData.name,
        email: userData.email,
        mobile: userData.phone,
        country: userData.country,
      };

      await UserAPI.updateDetails(
        localStorage.getItem("hk_user_auth_ticket"),
        reqBody
      )
        .then((response) => {
          if (response.data.status) {
            setSuccess(response.data.message);
          }
        })
        .catch((error) => {
          //console.log(error.response.data.data);

          if (error.response.data) {
            var errormsg = {
              nameErr: error.response.data.data?.firstName
                ? error.response.data.data.firstName
                : null,
              emailErr: error.response.data.data?.email
                ? error.response.data.data.email
                : null,
              phoneErr: error.response.data.data?.mobile
                ? error.response.data.data.mobile
                : null,
              countryErr: error.response.data.data?.country
                ? error.response.data.data.country
                : null,
            };
            setFieldError({ ...errormsg });
          }
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };

  const userDetails = async () => {
    setLoader(true);
    await UserAPI.userDetails(localStorage.getItem("hk_user_auth_ticket"))
      .then((response) => {
        if (response.data.status) {
          setLoginName(response.data.data.firstName);
          setShortName(
            response.data.data.firstName
              .split(" ")
              .map((word) => word[0])
              .join("")
          );
          var userProfileData = {
            name: response.data.data.firstName,
            email: response.data.data.email,
            phone: response.data.data.mobile,
            country: response.data.data.country,
          };
          setUserData(userProfileData);
          getSavedPayment();
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

  const handleResetModalPassword = () => {
    setShowModal(true);
  };

  const handleCloseReset = () => {
    setShowModal(false);
  };

  const handleResetPassword = async () => {
    var resetVal = {
      success: null,
      error: null,
      openeyePClass: false,
      openeyeCClass: false,
    };
    setState({ ...resetVal });
    var resetErrors = {
      passwordErr: null,
      confirmPasswordErr: null,
    };
    setResetError({ ...resetErrors });
    if (userData.password == null && userData.confirmpass == null) {
      checkPassEmptyInput.current.focus();
    } else {
      setBtn(true);
      var reqBody = {
        password: userData.password ? userData.password : null,
        confirm_password: userData.confirmpass ? userData.confirmpass : null,
      };

      await UserAPI.resetPwdUser(
        localStorage.getItem("hk_user_auth_ticket"),
        reqBody
      )
        .then((response) => {
          if (response.data.status) {
            setState({ ...state, success: response.data.message });
          }
        })
        .catch((error) => {
          if (
            error.response.data.data.password ||
            error.response.data.data.password_confirmation
          ) {
            var errors = {
              passwordErr: error.response.data.data.password
                ? error.response.data.data.password
                : null,
              confirmPasswordErr: error.response.data.data.confirm_password
                ? error.response.data.data.confirm_password
                : null,
            };
            setResetError({ ...errors });
          }
        })
        .finally(() => {
          setBtn(false);
        });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("hk_user_auth_ticket")) {
      userDetails();
    }
  }, []);

  return (
    <>
      <div className={loader ? "loader-inner d-block" : "loader-inner d-none"}>
        <div className="loader">
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
                <h1 className="text-center single-top-title">Profile </h1>
                <Link href="/userProfile">
                  <div className="use-details">
                    {loginName ? (
                      <div className="name-detail">
                        {loginName}
                        <span>User </span>
                      </div>
                    ) : (
                      ""
                    )}
                    {shortName ? (
                      <div className="short-name-detail">
                        <span>{shortName}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-xl-8 offset-xl-4 ms-0 me-auto">
              <div className="card customer-edit h-100">
                <div className="name-short-name d-flex align-items-center ms-0 dashboard-pg">
                  {shortName ? (
                    <div className="short-name-detail">
                      <span className="short-name-tl">{shortName}</span>
                    </div>
                  ) : (
                    ""
                  )}
                  {loginName ? (
                    <div className="full-name-tl">{loginName}</div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row g-4 mb-5 align-items-center justify-content-between">
                  <div className="col-12 col-xxl-6">
                    <button
                      type="button"
                      className="btn btn btn-theme-orange d-flex align-items-center"
                      onClick={handleResetModalPassword}
                    >
                      <svg
                        id="synchronize"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-3"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          id="Path_2103"
                          data-name="Path 2103"
                          d="M13.75,7H13V5A5,5,0,0,0,3,5V7H2.25A2.253,2.253,0,0,0,0,9.25v8.5A2.253,2.253,0,0,0,2.25,20h9.8a2.786,2.786,0,0,1,.79-1.48,2.987,2.987,0,0,1-.23-3.19A7.223,7.223,0,0,1,16,12.16V9.25A2.253,2.253,0,0,0,13.75,7ZM5,5a3,3,0,0,1,6,0V7H5Z"
                          fill="#fff"
                        ></path>
                        <path
                          id="Path_2104"
                          data-name="Path 2104"
                          d="M23.226,19.88a1,1,0,0,0-1.355.4A3.226,3.226,0,0,1,17.3,21.506l.476-.476a.75.75,0,0,0-.53-1.28h-2.5a.75.75,0,0,0-.75.75V23a.751.751,0,0,0,.463.693.738.738,0,0,0,.287.057.746.746,0,0,0,.53-.22l.573-.573a5.262,5.262,0,0,0,7.776-1.721,1,1,0,0,0-.4-1.356Z"
                          fill="#fff"
                        ></path>
                        <path
                          id="Path_2105"
                          data-name="Path 2105"
                          d="M23.537,13.807a.749.749,0,0,0-.817.163l-.573.573a5.257,5.257,0,0,0-7.778,1.733,1,1,0,0,0,1.762.947A3.22,3.22,0,0,1,20.7,15.994l-.476.476a.75.75,0,0,0,.53,1.28h2.5A.75.75,0,0,0,24,17V14.5A.751.751,0,0,0,23.537,13.807Z"
                          fill="#fff"
                        ></path>
                      </svg>
                      Reset Password
                    </button>
                  </div>
                  <div className="col-12 col-xxl-6">
                    <div className="fake-btn-bg">
                      <div className="form-check form-switch p-0">
                        <div className="switch active-switch">
                          <label for="idChk-normal" className="view-opt ms-0">
                            View
                          </label>
                          <input
                            type="checkbox"
                            name="view-edit"
                            className="switch"
                            id="idChk-normal"
                            onChange={handleFormData}
                          />
                          <label for="idChk-normal" className="ms-0">
                            <span className="edit-opt">Edit</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-container">
                  <form>
                    <div className="row align-items-center mb-30">
                      <div className="col-12 col-xxl-2">
                        <label className="form-label">Name </label>
                      </div>
                      <div className="col-12 col-xxl-10">
                        <input
                          ref={checkEmptyInput}
                          type="text"
                          name="firstname"
                          value={userData.name}
                          className="form-control"
                          placeholder="Name"
                          disabled={fieldDisableEnable}
                          onChange={handleFormData}
                        />
                      </div>
                      {fielderror.nameErr ? (
                        <div className="error">{fielderror.nameErr}</div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row align-items-center mb-30">
                      <div className="col-12 col-xxl-2">
                        <label className="form-label">Email </label>
                      </div>
                      <div className="col-12 col-xxl-10">
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          className="form-control"
                          placeholder="Email"
                          disabled={fieldDisableEnable}
                          onChange={handleFormData}
                        />
                      </div>
                      {fielderror.emailErr ? (
                        <div className="error">{fielderror.emailErr}</div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row align-items-center mb-30">
                      <div className="col-12 col-xxl-2">
                        <label className="form-label">Phone </label>
                      </div>
                      <div className="col-12 col-xxl-10">
                        <input
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          className="form-control"
                          placeholder="Phone"
                          disabled={fieldDisableEnable}
                          onChange={handleFormData}
                        />
                      </div>
                      {fielderror.phoneErr ? (
                        <div className="error">{fielderror.phoneErr}</div>
                      ) : (
                        ""
                      )}
                    </div>
                    {showcards.length ? (
                      <div className="align-items-center mb-30">
                        {showcards
                          ? showcards.map((item, key) => {
                              return (
                                <div className="row align-items-center mb-30">
                                  <div className="col-12 col-xxl-2">
                                    {key == 0 && (
                                      <label className="form-label">
                                        Payment{" "}
                                        <br className="d-none d-xxl-block" />{" "}
                                        Method{" "}
                                      </label>
                                    )}
                                  </div>
                                  <div className="col-12 col-xxl-10">
                                    <div className="row position-relative nw-cols">
                                      <div className="col-12 col-sm-8 col-xxl-9 mb-3 mb-md-0">
                                        <div className="ttl-card">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={`${item.card_type} **** ${item.card_number}`}
                                            disabled
                                          />
                                        </div>
                                      </div>
                                      <div className="col-12 col-sm-4 col-xxl-3">
                                        <div className="d-sm-none">
                                          <label className="form-label">
                                            Expiry date{" "}
                                          </label>
                                        </div>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={`${item.month}/${item.year}`}
                                          disabled
                                        />
                                      </div>
                                      {!fieldDisableEnable ? (
                                        <button
                                          onClick={() =>
                                            handleCardDelete(item.id)
                                          }
                                          type="button"
                                          className="btn-remove"
                                        >
                                          <i class="ri-close-line"></i>{" "}
                                        </button>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="row align-items-center">
                      <div className="col-12">
                        <div className="row align-items-center">
                          <div className="col-12 col-xxl-2">
                            <label className="form-label w-100">Country </label>
                          </div>
                          <div className="col-12 col-xxl-10">
                            <select
                              name="country"
                              classNameName="select-control form-select"
                              value={userData.country}
                              aria-label="Country"
                              disabled={fieldDisableEnable}
                              onChange={handleFormData}
                            >
                              <option disabled="true" selected>
                                Select Country
                              </option>
                              <option value="false" disabled>
                                -------
                              </option>
                              <option value="United States">
                                United States
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="Israel">Israel</option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
                              <option value="false" disabled>
                                -------
                              </option>
                              {countryArr
                                ? countryArr.map((item, key) => {
                                    return <option value={item}>{item}</option>;
                                  })
                                : ""}
                            </select>
                          </div>
                          {fielderror.countryErr ? (
                            <div className="error">{fielderror.countryErr}</div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    {!fieldDisableEnable ? (
                      <div class="button_edit mt-4">
                        <button
                          type="button"
                          class="btn btn btn-theme-orange d-flex align-items-center"
                          onClick={handleFormSubmit}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path
                              d="M18 19h1V6.828L17.172 5H16v4H7V5H5v14h1v-7h12v7zM4 3h14l2.707 2.707a1 1 0 0 1 .293.707V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm4 11v5h8v-5H8z"
                              fill="rgba(255,255,255,1)"
                            ></path>
                          </svg>
                          &nbsp; Save
                        </button>
                      </div>
                    ) : (
                      ""
                    )}

                    {success ? <div className="success">{success}</div> : ""}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        className="resetmodal"
        onHide={handleCloseReset}
        size="lg"
        centered
      >
        <Modal.Body className="mt-4">
          <>
            <h3 className="text-dark mb-4 text-center">
              Are you sure you want to change password?
            </h3>
            <form className="mb-4">
              <div className="w-90 ms-auto me-auto position-relative mb-3">
                <input
                  ref={checkPassEmptyInput}
                  name="passwordI"
                  type={state.openeyePClass ? "text" : "password"}
                  className="form-control"
                  id=""
                  placeholder="Password"
                  autoComplete="new-password"
                  onChange={handleFormData}
                />
                <div
                  className="toggle-show-password"
                  onClick={handlePToggleClass}
                >
                  <i
                    className={
                      state.openeyePClass
                        ? "full-eye ri-eye-fill"
                        : "full-eye ri-eye-fill ri-eye-off-fill"
                    }
                  ></i>
                </div>
                {reseterror.passwordErr ? (
                  <div className="error">{reseterror.passwordErr}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="w-90 ms-auto me-auto position-relative">
                <input
                  name="confirmpwd"
                  type={state.openeyeCClass ? "text" : "password"}
                  className="form-control"
                  id=""
                  placeholder="Confirm Password"
                  onChange={handleFormData}
                />
                <div
                  className="toggle-show-password"
                  onClick={handleCToggleClass}
                >
                  <i
                    className={
                      state.openeyeCClass
                        ? "full-eye ri-eye-fill"
                        : "full-eye ri-eye-fill ri-eye-off-fill"
                    }
                  ></i>
                </div>
                {reseterror.confirmPasswordErr ? (
                  <div className="error">{reseterror.confirmPasswordErr}</div>
                ) : (
                  ""
                )}
              </div>
            </form>
            {state.success ? (
              <div className="success">{state.success}</div>
            ) : (
              ""
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-orange"
            data-bs-dismiss="modal"
            onClick={handleResetPassword}
            disabled={btn}
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
