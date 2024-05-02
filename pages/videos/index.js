import UserHeader from "../../components/user/userHeader/userHeader";
import Purchase from "../../components/user/purchase/purchase";
import Icon3 from "../../public/images/icon-3.png";
import Icon4 from "../../public/images/icon-4.png";
import Icon5 from "../../public/images/icon-5.png";
import Head from "next/head";
import Myvideos from "../../components/user/myVideos/myvideos";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CoverCheckout from "../../public/images/cover-checkout.png";
import CardSVG from "../../public/images/card.svg";
export default function myVideo() {
  useEffect(async () => {
    if (!localStorage.getItem("hk_user_auth_ticket")) {
      Router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hashkifa</title>
        <script
          src="//code.tidio.co/5yckg2ezfdkn9bztdbu4mcjsbylkgo4y.js"
          async
        ></script>
      </Head>
      <UserHeader />
      <Myvideos />
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap");
        html {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-font-smoothing: antialiased;
          -o-font-smoothing: antialiased;
          -ms-font-smoothing: antialiased;
          -moz-text-rendering: optimizelegibility;
          text-rendering: optimizelegibility;
        }

        *,
        :after,
        :before {
          -webkit-box-sizing: inherit;
          box-sizing: inherit;
        }

        .h1,
        .h2,
        .h3,
        .h4,
        .h5,
        .h6,
        body,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        ol,
        p,
        ul {
          margin: 0;
          padding: 0;
          font-weight: normal;
        }

        body {
          font-size: 14px;
          background-color: #1f2327;
          font-family: "Sofia Pro";
          color: #fff;
          font-weight: normal;
        }

        input {
          outline: none;
        }

        a,
        button {
          outline: none !important;
          text-decoration: none;
        }

        a:active,
        a:visited,
        a:focus,
        a:hover,
        button:active,
        button:visited,
        button:focus,
        button:hover {
          text-decoration: none;
        }

        .wide {
          display: block;
          width: 100%;
        }

        .h1,
        .h2,
        .h3,
        .h4,
        .h5,
        .h6,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Sofia Pro";
          font-weight: normal;
          color: #fff;
        }

        p {
          font-size: 14px;
          font-weight: 300;
          line-height: 20px;
          color: #fff;
          margin-bottom: 20px;
        }

        p:last-child {
          margin-bottom: 0;
        }

        .object-cover {
          -o-object-fit: cover;
          object-fit: cover;
        }

        .signin-card {
          background-color: #fefefe;
          padding: 85px 105px;
          border: 0.5px solid rgba(255, 255, 255, 0.2);
          max-width: 633px;
          border-radius: 33px;
          margin: 0 auto;
          width: 100%;
          min-height: 740px;
        }

        .branding-main {
          position: absolute;
          left: 50%;
          top: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }

        .title-hkf h2 {
          font-size: 33px;
          line-height: 41px;
          letter-spacing: -0.825px;
          font-weight: 500;
        }

        .signin-card .sm-line-start {
          position: relative;
          margin-bottom: 40px;
          padding-bottom: 7px;
          color: #292e33;
        }

        .signin-card .sm-line-start::after {
          content: "";
          height: 5px;
          width: 53px;
          background-color: #ff9016;
          position: absolute;
          left: 0;
          bottom: 0;
        }

        .signin-card .sm-line-center {
          position: relative;
          margin-bottom: 40px;
          padding-bottom: 7px;
          color: #292e33;
        }

        .signin-card .sm-line-center::after {
          content: "";
          height: 5px;
          width: 53px;
          background-color: #ff9016;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0 auto;
        }

        .signin-card .sm-line-far {
          position: relative;
          margin-bottom: 20px;
          padding-bottom: 20px;
          color: #292e33;
        }

        .signin-card .sm-line-far::after {
          content: "";
          height: 5px;
          width: 53px;
          background-color: #ff9016;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0 auto;
        }

        label {
          color: #292e33;
          font-size: 16px;
          line-height: normal;
          margin-left: 30px;
        }

        .form-control {
          height: 47px;
          background-color: #f3f3f3;
          border-radius: 8px;
          border: 0.5px solid rgba(255, 255, 255, 0.2);
          padding: 15px 30px;
        }

        .form-control:focus {
          -webkit-box-shadow: none;
          box-shadow: none;
          outline: 0;
          border-color: transparent;
          background-color: #f3f3f3;
        }

        .bild-full-screen {
          height: 100vh;
          border-radius: 0 50px 0 0;
        }

        .toggle-show-password {
          position: absolute;
          top: 50%;
          right: 23px;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
          cursor: pointer;
        }

        .toggle-show-password .full-eye,
        .toggle-show-password .h-full-eye {
          font-size: 20px;
          color: #707070;
        }

        .forget-password {
          color: #292e33;
          text-decoration: none;
          font-size: 14px;
          line-height: normal;
          font-weight: 300;
          -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
        }

        .forget-password:hover {
          color: #ff9016;
        }

        .btn {
          font-size: 14px;
          line-height: 30px;
        }

        .btn.btn-orange {
          background-color: #ff9016;
          border: 0;
          border-radius: 8px;
          font-weight: bold;
          color: #ffffff;
          padding: 8px 15px;
          text-transform: capitalize;
          transition: 0.3s all;
        }
        .btn.btn-orange:hover {
          transform: scale(1.1);
        }

        .form-check .form-check-input {
          background-color: #f3f3f3;
          width: 18px;
          height: 19px;
          border-radius: 2px;
          margin-right: 12px;
        }

        .form-check .form-check-input:focus {
          -webkit-box-shadow: none;
          box-shadow: none;
          border-color: rgba(0, 0, 0, 0.25);
        }

        .form-check .form-check-input:checked {
          border-color: rgba(0, 0, 0, 0.25);
          background-color: #ff9016;
        }

        .form-check .form-check-label {
          font-size: 12px;
          line-height: 27px;
        }

        .signUp-details {
          font-size: 23px;
          font-weight: 300;
          color: #292e33;
        }

        .signUp-details a {
          font-weight: bold;
          color: #ff9016;
          -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
        }

        .signUp-details a:hover {
          color: #ffffff;
        }

        .sort-name {
          height: 145px;
          width: 145px;
          border: 6px solid #ff9016;
          border-radius: 50%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          margin: 0 auto 25px auto;
          font-size: 46px;
          font-weight: 900;
          color: #ffffff;
          background-color: #1f2327;
        }

        .side-navigation {
          width: 290px;
          background-color: #1a1d20;
          height: 100vh;
          border-radius: 0 37px 37px 0;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
        }

        .side-navigation .branding-top img {
          width: 161px;
          height: 60px;
          margin: 49px 0;
        }

        .side-navigation .side-navigation-items ul li {
          margin-bottom: 11px;
        }

        .side-navigation .side-navigation-items ul li .dummy-cons {
          margin-right: 15px;
        }

        .side-navigation .side-navigation-items ul li a {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          color: #ffffff;
          font-size: 18px;
          font-weight: 300;
          width: 100%;
          background: transparent;
          padding: 10px;
          max-width: calc(100% - 80px);
          margin: 0 auto;
          border-radius: 8px;
          opacity: 0.61;
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
        }

        .side-navigation .side-navigation-items ul li a:hover,
        .side-navigation .side-navigation-items ul li.active a {
          background-color: #ff9016;
          opacity: 1;
        }

        .main-content-right {
          width: calc(100% - 290px);
          padding: 40px 60px 40px;
          margin-left: auto;
        }

        .bkend-top-title {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          border-bottom: 0.25px solid #292e33;
          padding-bottom: 20px;
          margin-bottom: 35px;
        }

        .bkend-top-title .single-top-title {
          margin: 0 auto;
          font-weight: 600;
          position: relative;
          padding-bottom: 7px;
          color: #fff;
        }

        .bkend-top-title .single-top-title::after {
          content: "";
          height: 5px;
          width: 53px;
          background-color: #ff9016;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          margin: 0 auto;
        }

        .bkend-top-title .use-details {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          background: #292e33;
          padding: 5px 22px 5px 42px;
          border-radius: 8px;
        }

        .bkend-top-title .use-details .name-detail {
          text-align: right;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
        }

        .bkend-top-title .use-details .name-detail span {
          width: 100%;
          display: block;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.52);
        }

        .bkend-top-title .use-details .short-name-detail {
          margin-left: 12px;
        }

        .bkend-top-title .use-details .short-name-detail span {
          height: 38px;
          width: 38px;
          border: 2px solid #ff9016;
          text-transform: uppercase;
          border-radius: 50%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          background-color: #1f2327;
          color: #ffffff;
          font-weight: 900;
          font-size: 16px;
        }

        .wall-white-gl {
          background-color: #ffffff;
          padding: 36px 42px;
          border-radius: 16px;
        }

        .input-group-text {
          background-color: #f3f3f3;
        }

        .simple-input-grop .input-group-text {
          border: 0;
          margin-top: 1px;
          height: 45px;
          padding-left: 28px;
        }

        .simple-input-grop input {
          padding-left: 0;
        }

        .simple-input-grop input[readonly] {
          background-color: #f3f3f3;
        }

        .reverse-input-grop .input-group-text {
          border: 0;
          margin-top: 1px;
          height: 45px;
          padding-right: 28px;
        }

        .reverse-input-grop input {
          padding-right: 0;
        }

        .reverse-input-grop input[readonly] {
          background-color: #f3f3f3;
        }

        .totle-search-results {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 12px 15px 11px 65px;
          max-width: 375px;
        }

        .totle-search-results .ttl-results {
          font-size: 16px;
          font-weight: 500;
          letter-spacing: -0.4px;
          display: block;
        }

        table th {
          font-size: 16px;
          font-weight: 500;
        }

        table th label {
          font-size: 16px !important;
          font-weight: 500;
        }

        table td {
          font-size: 16px;
        }

        .backend-table table {
          border-collapse: separate;
          border-spacing: 0 14px;
        }

        .backend-table thead tr {
          background-color: #ffffff;
        }

        .backend-table thead tr th {
          border: 0;
          padding: 20px 38px;
          vertical-align: middle;
        }

        .backend-table thead tr th:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        .backend-table thead tr th:last-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        .backend-table tbody::before {
          content: "@";
          display: block;
          line-height: 10px;
          text-indent: -99999px;
        }

        .backend-table tbody tr {
          background-color: #ffffff;
          cursor: pointer;
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
        }

        .backend-table tbody tr td {
          padding: 14px 38px;
          border: 0;
          vertical-align: middle;
        }

        .backend-table tbody tr td:first-child {
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        .backend-table tbody tr td:last-child {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }

        .backend-table tbody tr:hover {
          background-color: #ff9016;
        }

        .backend-table tbody tr:hover .full-name-tl,
        .backend-table tbody tr:hover .normal-font {
          color: #ffffff;
        }

        .backend-table tbody tr:hover .navigation-dropdown svg circle,
        .backend-table tbody tr:hover .navigation-dropdown svg g {
          fill: #ffffff;
          opacity: 1;
        }

        .backend-table tbody tr:hover .name-short-name .short-name-tl {
          border-color: #ffffff;
        }

        .backend-table.card-table thead tr {
          background-color: #f3f3f3;
        }

        .backend-table.card-table tbody tr {
          background-color: #f3f3f3;
        }

        .backend-table.card-table tbody tr:hover {
          background-color: #ff9016;
        }

        .backend-table.card-table tbody tr:hover .full-name-tl,
        .backend-table.card-table tbody tr:hover .normal-font {
          color: #ffffff;
        }

        .backend-table.card-table
          tbody
          tr:hover
          .navigation-dropdown
          svg
          circle,
        .backend-table.card-table tbody tr:hover .navigation-dropdown svg g {
          fill: #ffffff;
          opacity: 1;
        }

        .backend-table.card-table tbody tr .name-short-name .short-name-tl {
          height: 38px;
          width: 38px;
          font-size: 16px;
        }

        .backend-table.card-table.sm-table-card {
          max-height: 660px;
          overflow-x: auto;
        }

        .backend-table.card-table.sm-table-card tbody::before {
          line-height: 10px;
        }

        .backend-table.card-table.sm-table-card table {
          border-spacing: 0 10px;
        }

        .name-tbl {
          margin-left: 38px;
        }

        .name-short-name {
          margin-left: 55px;
        }

        .name-short-name .short-name-tl {
          height: 59px;
          width: 59px;
          border: 3px solid #ff9016;
          border-radius: 50%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          background-color: #1f2327;
          color: #ffffff;
          font-weight: 900;
          font-size: 19px;
          text-transform: uppercase;
        }

        .full-name-tl,
        .normal-font {
          margin-left: 25px;
          font-size: 16px;
          font-weight: 500;
          line-height: normal;
          letter-spacing: -0.4px;
          color: rgba(41, 46, 51, 0.51);
        }

        .normal-font {
          margin-left: 0;
        }

        a:hover.normal-font {
          color: #292e33;
        }

        .dashboard-pg .full-name-tl {
          color: #292e33;
          font-size: 20px;
          line-height: 25px;
          letter-spacing: -0.5px;
          font-weight: 600;
        }

        .dashboard-pg .full-name-tl .subtitl-line {
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0;
        }

        .card {
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 39px 49px;
          border-radius: 35px;
          background-color: #1a1d20;
        }

        .card .space-padd-ar {
          padding: 39px 49px;
          height: 320px;
          position: relative;
          z-index: 2;
        }

        .diagram-circle {
          margin-bottom: 40px;
        }

        .diagram-circle .diagram-value {
          font-size: 40px;
          line-height: normal;
          color: #292e33;
          position: absolute;
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          z-index: 2;
        }

        .diagram-circle .diagram-value .diagrampr-info {
          font-size: 14px;
          line-height: 16px;
          letter-spacing: -0.35px;
          font-weight: 300;
        }

        .palate {
          height: 39px;
          width: 41px;
          border-radius: 6px;
        }

        .palate.orange {
          background-color: #ff9016;
        }

        .palate.red {
          background-color: #e64a18;
        }

        .palate.yellow {
          background-color: #fcda2e;
        }

        .graph-temp {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .graph-temp img {
          width: 100%;
        }

        .profit-numbers .sold-video-numb {
          font-size: 12px;
          font-weight: normal;
        }

        .font-medium {
          font-weight: 500;
        }

        .sub-title-gl {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.35px;
          font-weight: 300;
          color: rgba(41, 46, 51, 0.8);
        }

        .view-status {
          font-weight: 600;
        }

        .view-status span {
          font-size: 14px;
          line-height: 16px;
          letter-spacing: -0.35px;
          font-weight: 300;
          margin-top: 5px;
        }

        .video-key .fake-btn-bg {
          background-color: #ffffff;
          padding: 18px 21px;
          height: auto;
          min-width: 360px;
        }

        .video-key .edite-switch .fake-btn-bg {
          padding: 18px 57px;
          height: 75px;
        }

        .video-key .edite-switch .view-opt {
          font-size: 25px;
        }

        .current-activity ul li {
          margin: 0 !important;
        }

        .current-activity ul li:first-child {
          -ms-flex-item-align: start;
          align-self: flex-start;
        }

        .current-activity ul li svg {
          width: 7px;
          height: 7px;
          margin-right: 5px;
          position: relative;
          top: -1px;
        }

        .current-activity ul li:last-child {
          color: #ff9016;
        }

        .g-6,
        .gy-6 {
          --bs-gutter-y: 4rem;
        }

        .g-6,
        .gx-6 {
          --bs-gutter-x: 4rem;
        }

        .mb-72 {
          margin-bottom: 72px;
        }

        .text-orange {
          color: #ff9016;
        }

        .media-items {
          margin-bottom: 36px;
        }

        .media-items .media .media-bild {
          -o-object-fit: cover;
          object-fit: cover;
          height: 47px;
          width: 74px;
        }

        .media-items .media .title-media {
          font-size: 14px;
          line-height: 20px;
          color: #292e33;
          font-weight: 400;
        }

        .media-items .media .progress {
          height: 3px;
          background-color: #2d3136;
          margin-bottom: 5px;
        }

        .media-items .media .progress .theme-bar {
          height: 3px;
          background-color: #ff9016;
        }

        .media-items .media .ttl-sales {
          font-size: 12px;
          line-height: 15px;
          letter-spacing: 0.12px;
          color: rgba(41, 46, 51, 0.8);
          font-weight: 500;
        }

        .ttl-price {
          font-size: 25px;
          line-height: normal;
          font-weight: bold;
          color: #ff9016;
        }

        .tbl-nohover tr {
          pointer-events: none;
        }

        .video-inputs .fc-big-font {
          height: 67px;
          font-size: 30px;
          font-weight: bold;
          letter-spacing: -0.75px;
          color: #292e33;
        }

        .video-inputs .fc-big-font.vimeo-dummy {
          background: #f3f3f3 url("../../public/images/code.png") no-repeat;
          text-indent: 11%;
          background-position: 8% 53%;
        }

        .video-inputs .fc-big-font.vimeo-dummy:focus {
          background-image: none;
          text-indent: 0;
        }

        .video-inputs .fc-big-font:focus::-webkit-input-placeholder {
          color: transparent;
        }

        .video-inputs .fc-big-font:focus:-ms-input-placeholder {
          color: transparent;
        }

        .video-inputs .fc-big-font:focus::-ms-input-placeholder {
          color: transparent;
        }

        .video-inputs .fc-big-font:focus::placeholder {
          color: transparent;
        }

        .video-inputs textarea.form-control {
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.4px;
          font-weight: 300;
        }

        .video-inputs .btn-theme-orange {
          font-size: 16px;
          font-weight: 500;
        }

        .video-inputs .fc-big-font::-webkit-input-placeholder {
          font-size: 30px;
          font-weight: bold;
          letter-spacing: -0.75px;
          color: rgba(41, 46, 51, 0.5);
        }

        .video-inputs .fc-big-font:-ms-input-placeholder {
          font-size: 30px;
          font-weight: bold;
          letter-spacing: -0.75px;
          color: rgba(41, 46, 51, 0.5);
        }

        .video-inputs .fc-big-font::-ms-input-placeholder {
          font-size: 30px;
          font-weight: bold;
          letter-spacing: -0.75px;
          color: rgba(41, 46, 51, 0.5);
        }

        .video-inputs .fc-big-font::placeholder {
          font-size: 30px;
          font-weight: bold;
          letter-spacing: -0.75px;
          color: rgba(41, 46, 51, 0.5);
        }

        .video-inputs .form-check-label {
          font-size: 18px;
          color: rgba(41, 46, 51, 0.4);
        }

        .video-inputs .form-check-input:checked ~ .form-check-label {
          color: #ff9016;
          font-weight: bold;
        }

        .video-inputs .form-check-input[type="checkbox"] {
          background-color: #ffffff;
        }

        .video-inputs .form-check-input:checked[type="checkbox"] {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z' fill='rgba(255,144,22,1)'/%3E%3C/svg%3E");
        }

        .white-checkbox[type="checkbox"] {
          background-color: #ffffff !important;
        }

        .white-checkbox:checked[type="checkbox"] {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z' fill='rgba(255,144,22,1)'/%3E%3C/svg%3E") !important;
        }

        .purchase-detail .btn-theme-orange {
          font-size: 14px;
        }

        .text-green {
          color: #02bc77;
        }

        .btn-them-back {
          background-color: #292e33;
          border-radius: 8px;
          padding: 8px 23px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 14px;
          font-weight: 400;
        }

        .btn-them-back svg,
        .btn-them-back .arrow-fill {
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
          fill: #ff9016;
        }

        .btn-them-back:hover {
          background-color: #ff9016;
          color: #ffffff;
        }

        .btn-them-back:hover .arrow-fill {
          fill: #fff;
        }

        .font-semi-bold {
          font-weight: 600;
        }

        .customer-edit .name-short-name {
          margin-bottom: 30px;
        }

        .customer-edit .short-name-detail .short-name-tl {
          height: 113px;
          width: 113px;
          font-size: 40px;
          border-width: 6px;
        }

        .customer-edit .full-name-tl {
          font-size: 30px;
          line-height: 36px;
          margin-left: 35px;
        }

        .customer-edit .full-name-tl .subtitl-line {
          line-height: normal;
        }

        .fake-btn-bg {
          background-color: #f3f3f3;
          height: 53px;
          margin-left: auto;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          border-radius: 8px;
        }

        .switch {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }

        .switch .view-opt {
          padding-right: 25px;
          font-size: 20px;
          cursor: pointer;
          font-weight: bold;
          color: #ff9016;
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
        }

        .switch .edit-opt {
          margin-left: 25px;
          font-size: 20px;
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
        }

        .switch.active .view-opt {
          font-weight: 400;
          color: #292e33;
        }

        .switch.active .edit-opt {
          font-weight: bold;
          color: #ff9016;
        }

        .ttl-card {
          position: relative;
        }

        .ttl-card input {
          padding-left: 80px;
        }

        .ttl-card::before {
          content: "";
          background: url(${CardSVG.src}) no-repeat;
          background-size: contain;
          width: 30px;
          height: 19px;
          position: absolute;
          left: 30px;
          top: 50%;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
        }

        .btn-theme-orange {
          background-color: #ff9016;
          width: 100%;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          padding: 10px 15px;
          font-size: 20px;
          font-weight: bold;
          color: #ffffff;
          border-radius: 8px;
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
          -webkit-transform: scale(1);
          transform: scale(1);
        }

        .btn-theme-orange:hover {
          -webkit-transform: scale(1.02);
          transform: scale(1.02);
          color: #ffffff;
        }

        .btn-theme-dark {
          background-color: #292e33;
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          border-radius: 8px;
          padding: 7px 15px;
          min-width: 140px;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
          -webkit-transform: scale(1);
          transform: scale(1);
        }

        .btn-theme-dark:hover {
          -webkit-transform: scale(1.03);
          transform: scale(1.03);
          color: #ffffff;
        }

        .modal-backdrop {
          background-color: transparent;
        }

        .modal-open .modal-backdrop.show {
          -webkit-backdrop-filter: blur(19px);
          backdrop-filter: blur(19px);
          opacity: 1;
          -webkit-filter: brightness(80%);
          filter: brightness(80%);
        }

        .btn:focus {
          outline: 0;
          -webkit-box-shadow: none;
          box-shadow: none;
        }

        .square {
          width: 16px;
          height: 16px;
          display: inline-block;
          border-radius: 4px;
          margin-right: 12px;
        }

        .square.red {
          background-color: #f10101;
        }

        .square.green {
          background-color: #21f101;
        }

        .square.sfron {
          background-color: #ff9016;
        }

        .purchase-item-tbl h4 {
          font-size: 25px;
          line-height: 40px;
        }

        .purchase-item-tbl .backend-table tbody::before {
          line-height: 0;
        }

        .purchase-item-tbl .backend-table table {
          border-spacing: 0 12px;
        }

        .purchase-item-tbl .full-name-tl,
        .purchase-item-tbl .normal-font {
          color: #292e33;
        }

        .purchase-item-tbl .backend-table.card-table tbody tr {
          cursor: auto;
        }

        .purchase-item-tbl .backend-table.card-table tbody tr .popover-dm {
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
          cursor: pointer;
        }

        .purchase-item-tbl
          .backend-table.card-table
          tbody
          tr
          .popover-dm:hover {
          color: #ff9016;
        }

        .purchase-item-tbl .backend-table.card-table tbody tr:hover {
          background-color: #f3f3f3;
        }

        .purchase-item-tbl
          .backend-table.card-table
          tbody
          tr:hover
          .full-name-tl,
        .purchase-item-tbl
          .backend-table.card-table
          tbody
          tr:hover
          .normal-font {
          color: #292e33;
        }

        .purchase-item-tbl
          .backend-table.card-table
          tbody
          tr:hover
          .navigation-dropdown
          svg
          circle,
        .purchase-item-tbl
          .backend-table.card-table
          tbody
          tr:hover
          .navigation-dropdown
          svg
          g {
          fill: #292e33;
          opacity: 0.7;
        }

        .popover .popover-body {
          font-size: 9px;
          text-align: center;
          max-width: 132px;
          background-color: rgba(45, 49, 54, 0.88);
          color: #ffffff;
          padding: 12px 14px;
          border-radius: 4px;
        }

        .bs-popover-auto[data-popper-placement^="top"] > .popover-arrow::after,
        .bs-popover-top > .popover-arrow::after {
          border-top-color: rgba(45, 49, 54, 0.88);
        }

        .modal-main-content {
          max-width: 730px;
          margin: 0 auto;
        }

        .modal-main-content .title-and-oti h2 {
          font-size: 35px;
          line-height: 43px;
          letter-spacing: -0.875px;
          font-weight: bold;
          position: relative;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }

        .modal-main-content .title-and-oti h2::after {
          content: "";
          background-color: #ff9016;
          height: 5px;
          width: 53px;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
        }

        .modal-main-content .title-and-oti p {
          font-size: 22px;
          letter-spacing: -0.55px;
          line-height: 28px;
          font-weight: 300;
          color: rgba(41, 46, 51, 0.56);
          max-width: 680px;
          margin: 0 auto 30px auto;
        }

        .modal-main-content .form-modal .btn-theme-orange {
          padding: 7px 15px;
          font-size: 14px;
        }

        .space-modal {
          padding-bottom: 80px;
        }

        .modal-content {
          border-radius: 18px;
          border: 0;
          background-color: rgba(255, 255, 255, 0.88);
        }

        .modal-header .btn-close {
          opacity: 1;
          position: relative;
          background: #000000;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          margin: 10px 10px 10px auto;
        }

        .modal-header .btn-close .close-ic {
          font-size: 30px;
          line-height: normal;
          color: #ffffff;
        }

        .purchase-table tr:hover .action-anchore {
          -webkit-filter: brightness(0) invert(1);
          filter: brightness(0) invert(1);
        }

        .purchase-table tr:hover .form-check-input[type="checkbox"]:checked {
          background-color: #ffffff;
        }

        .purchase-table tr:hover .form-check-input:checked[type="checkbox"] {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z' fill='rgba(255,144,22,1)'/%3E%3C/svg%3E");
        }

        .purchase-table tr td {
          padding: 21px 38px !important;
        }

        .video-table tr th:first-child {
          padding-right: 0;
        }

        .video-table tr th:last-child {
          padding-left: 0;
        }

        .video-table .lt-fonts {
          color: rgba(41, 46, 51, 0.56);
        }

        .video-subject img {
          -o-object-fit: cover;
          object-fit: cover;
          border-radius: 33px;
          width: 100%;
        }

        .slider-price-event {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: end;
          -ms-flex-pack: end;
          justify-content: flex-end;
          font-size: 10px;
          color: rgba(41, 46, 51, 0.52);
        }

        .slider-price-event span {
          font-size: 10px;
          color: rgba(41, 46, 51, 0.52);
        }

        .price-slider {
          background: #f3f3f3;
          padding: 13px 20px;
          border-radius: 8px;
        }

        .video-thumb-edit img {
          border-radius: 10px;
          width: 100%;
          max-width: 265px;
          -o-object-fit: cover;
          object-fit: cover;
          height: 170px;
        }

        .purchase-row {
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }

        .purchase-row .custm-col-gl {
          width: 250px;
        }

        .purchase-row .custm-col-gldff {
          width: 283px;
        }

        .order-info-details .wall-detail {
          background-color: #f3f3f3;
          padding: 13px 30px;
          border-radius: 8px;
        }

        .order-info-details .wall-detail .trans-id {
          color: rgba(41, 46, 51, 0.5);
        }

        .deem-cl {
          color: rgba(41, 46, 51, 0.5);
        }

        .browse-file {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }

        .browse-file .desktop-file {
          max-width: 336px;
          width: 100%;
        }

        .browse-file .mobile-file {
          max-width: 150px;
          width: 100%;
        }

        .browse-file .custom-file-input {
          color: transparent;
          width: 100%;
        }

        .browse-file .custom-file-input::-webkit-file-upload-button {
          visibility: hidden;
        }

        .browse-file .custom-file-input::before {
          content: "Desktop";
          color: rgba(41, 46, 51, 0.82);
          display: inline-block;
          background: #f3f3f3;
          border: 0;
          border-radius: 8px;
          padding: 13px 15px;
          outline: none;
          white-space: nowrap;
          -webkit-user-select: none;
          cursor: pointer;
          font-weight: 400;
          font-size: 14px;
          text-align: center;
          width: 100%;
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
        }

        .browse-file .custom-file-input:hover::before {
          background-color: #ff9016;
          color: #ffffff;
        }

        .browse-file .custom-file-input:active {
          outline: 0;
        }

        .browse-file .file-preview {
          margin-top: 20px;
          border-radius: 8px;
          overflow: hidden;
        }

        .browse-file .file-preview * {
          width: 100%;
          max-width: 100%;
          -o-object-fit: cover;
          object-fit: cover;
          height: 215px;
        }

        .browse-file .mobile-file .custom-file-input::before {
          content: "Mobile";
        }

        .backend-table.report-table tr th {
          padding: 22px 20px;
        }

        .backend-table.report-table tr td {
          padding: 11px 20px;
        }

        .map-graph-data {
          max-width: 524px;
          width: 100%;
        }

        .map-graph-data .border-child {
          border-bottom: 0.25px solid rgba(41, 46, 51, 0.66);
          padding-top: 18px;
          padding-bottom: 18px;
        }

        .map-graph-data .border-child .wr-items {
          font-size: 16px;
          letter-spacing: -0.4px;
        }

        .map-graph-data:last-child .border-child {
          border-bottom: 0;
        }

        .user-purchase-chart {
          border-spacing: 0 12px;
        }

        .user-purchase-chart tr th,
        .user-purchase-chart tr td {
          white-space: nowrap;
        }

        .user-purchase-chart tbody::before {
          line-height: 0;
        }

        .user-purchase-chart tbody tr .full-name,
        .user-purchase-chart tbody tr .normal-font-user {
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
        }

        .user-purchase-chart tbody tr:hover .full-name,
        .user-purchase-chart tbody tr:hover .normal-font-user {
          color: #ffffff;
        }

        .statistics-feed a .orange-card-gl {
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
        }

        .statistics-feed a .orange-card-gl::before {
          content: "";
          background: url(../../public/images/shadow.png) no-repeat;
          background-position: center top;
          background-size: cover;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          opacity: 0;
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
        }

        .statistics-feed a .orange-card-gl .info-user .category-info {
          font-size: 16px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: -0.4px;
          color: #292e33;
        }

        .statistics-feed a .orange-card-gl .info-user .category-title {
          font-weight: bold;
          line-height: 30px;
        }

        .statistics-feed
          a
          .orange-card-gl
          .info-user
          .category-title
          .category-more-info {
          font-size: 14px;
          font-weight: 300;
          line-height: normal;
          margin-top: 15px;
        }

        .statistics-feed a .orange-card-gl .card-icon svg {
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
        }

        .statistics-feed a .orange-card-gl .card-icon svg path {
          fill: #ff9016;
        }

        .statistics-feed a:hover .orange-card-gl {
          background-color: #ff9016;
        }

        .statistics-feed a:hover .orange-card-gl::before {
          opacity: 1;
        }

        .statistics-feed a:hover .orange-card-gl .category-info,
        .statistics-feed a:hover .orange-card-gl .category-title,
        .statistics-feed a:hover .orange-card-gl .category-more-info {
          color: #ffffff;
        }

        .statistics-feed a:hover .orange-card-gl .card-icon svg path {
          fill: #ffffff;
        }

        .video-thumb-container .btn-theme-dark,
        .video-thumb-container .btn-theme-orange {
          width: 100%;
          font-size: 16px;
        }

        .video-thumb-container .btn-theme-dark {
          padding: 10px 15px;
        }

        .video-thumb-container .btn-theme-dark img {
          position: relative;
          top: 2px;
        }

        .max-500 {
          max-width: 500px;
        }

        .dummy-cons {
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          width: 20px;
          height: 20px;
          margin-right: 15px;
        }

        .dummy-cons.icons-main-1 {
          background-image: url(../../public/images/icon-1.png);
        }

        .dummy-cons.icons-main-2 {
          background-image: url(../../public/images/icon-2.png);
          background-size: auto;
        }

        .dummy-cons.icons-main-3 {
          background-image: url(${Icon3.src});
          background-size: auto;
        }

        .dummy-cons.icons-main-4 {
          background-image: url(${Icon4.src});
        }

        .dummy-cons.icons-main-5 {
          background-image: url(${Icon5.src});
        }

        .dummy-cons.icons-main-6 {
          background-image: url(../../public/images/icon-6.png);
        }

        .load-more span {
          font-size: 12px;
          font-weight: bold;
          color: #292e33;
          margin-bottom: 8px;
        }

        .mb-28 {
          margin-bottom: 28px;
        }

        .mb-30 {
          margin-bottom: 30px;
        }

        .mb-40 {
          margin-bottom: 40px;
        }

        .mb-20 {
          margin-bottom: 20px;
        }

        .font-16 {
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.4px;
        }

        .font-weight-bold {
          font-weight: bold;
        }

        .switch input[type="checkbox"] {
          display: none;
        }

        .switch input[type="checkbox"] + label {
          position: relative;
          min-width: calc(calc(2.375rem * 0.8) * 2);
          border-radius: calc(2.375rem * 0.8);
          height: calc(2.375rem * 0.8);
          line-height: calc(2.375rem * 0.8);
          display: inline-block;
          cursor: pointer;
          outline: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          vertical-align: middle;
          text-indent: calc(calc(calc(2.375rem * 0.8) * 2) + 0.5rem);
        }

        .switch input[type="checkbox"] + label::before,
        .switch input[type="checkbox"] + label::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: calc(calc(2.375rem * 0.8) * 2);
          bottom: 0;
          display: block;
        }

        .switch input[type="checkbox"] + label::before {
          right: 0;
          background-color: #ff9016;
          border-radius: calc(2.375rem * 0.8);
          -webkit-transition: 0.2s all;
          transition: 0.2s all;
        }

        .switch input[type="checkbox"] + label::after {
          top: 5px;
          left: 5px;
          width: calc(calc(2.375rem * 0.8) - calc(5px * 2));
          height: calc(calc(2.375rem * 0.8) - calc(5px * 2));
          border-radius: 50%;
          background-color: #fff;
          -webkit-transition: all 0.3s ease-in 0s;
          transition: all 0.3s ease-in 0s;
        }

        .switch input[type="checkbox"]:checked + label::before {
          background-color: #ff9016;
        }

        .switch input[type="checkbox"]:checked + label::after {
          margin-left: calc(2.375rem * 0.8);
        }

        .switch input[type="checkbox"]:focus + label::before {
          outline: none;
          -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 136, 221, 0.25);
          box-shadow: 0 0 0 0.2rem rgba(0, 136, 221, 0.25);
        }

        .switch input[type="checkbox"]:disabled + label {
          color: #868e96;
          cursor: not-allowed;
        }

        .switch input[type="checkbox"]:disabled + label::before {
          background-color: #e9ecef;
        }

        .switch.switch-xs {
          font-size: 0.8rem;
        }

        .switch.switch-xs input[type="checkbox"] + label {
          min-width: calc(calc(1.5375rem * 0.8) * 2);
          height: calc(1.5375rem * 0.8);
          line-height: calc(1.5375rem * 0.8);
          text-indent: calc(calc(calc(1.5375rem * 0.8) * 2) + 0.5rem);
        }

        .switch.switch-xs input[type="checkbox"] + label::before {
          width: calc(calc(1.5375rem * 0.8) * 2);
        }

        .switch.switch-xs input[type="checkbox"] + label::after {
          width: calc(calc(1.5375rem * 0.8) - calc(2px * 2));
          height: calc(calc(1.5375rem * 0.8) - calc(2px * 2));
        }

        .switch.switch-xs input[type="checkbox"]:checked + label::after {
          margin-left: calc(1.5375rem * 0.8);
        }

        .breadcrumb .breadcrumb-item {
          font-size: 20px;
          line-height: normal;
          letter-spacing: -0.5px;
          color: #ff9016;
          font-weight: 600;
        }

        .breadcrumb .breadcrumb-item a {
          font-weight: 300;
          color: #fff;
        }

        .breadcrumb-item + .breadcrumb-item::before {
          content: ">";
        }

        .breadcrumb-item:last-child::before {
          color: #ff9016;
        }

        .responsive-nav .side-navigation-items {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          height: calc(100% - 130px);
        }

        .responsive-nav .side-navigation-items .logout-btn {
          margin-top: auto;
          padding-bottom: 50px;
        }

        .responsive-nav .side-navigation-items .logout-btn a {
          font-size: 18px;
          color: #ffffff;
          border-radius: 8px;
          opacity: 0.61;
          padding: 10px;
          max-width: calc(100% - 80px);
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          margin: 0 auto;
          -webkit-transition: 0.3s all;
          transition: 0.3s all;
        }

        .responsive-nav .side-navigation-items .logout-btn a:hover {
          background-color: #ff9016;
          opacity: 1;
        }

        .video-container {
          display: table;
          max-width: calc(100% - 115px);
          margin: 0 auto;
        }

        .video-container .card {
          padding: 31px 30px;
        }

        .video-container .title-view {
          padding-left: 30px;
        }

        .video-container .title-view h1 {
          font-size: 55px;
          font-weight: 500;
          line-height: 67px;
        }

        .video-container .title-view p {
          font-size: 20px;
          line-height: 36px;
          letter-spacing: -0.75px;
          font-weight: 300;
          margin-bottom: 45px;
        }

        .video-container .btn-theme-dark {
          max-width: 230px;
        }

        .video-container .btn-theme-dark .arrow-white-aws {
          position: relative;
          top: 1px;
        }

        .cover-main {
          background: url(${CoverCheckout.src}) no-repeat;
          height: 365px;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          border-radius: 0 0 34px 34px;
        }

        .video-category .video-filters {
          background-color: #f3f3f3;
          padding: 7px 17px;
          border-radius: 7px;
          display: table;
          margin-bottom: 30px;
        }

        .video-category .video-filters button {
          border: 0;
          background-color: transparent;
          font-size: 14px;
          font-weight: 400;
          line-height: 28px;
          border-radius: 7px;
          padding: 1px 15px;
        }

        .video-category .video-filters button.mixitup-control-active {
          background-color: #ff9016;
          color: #ffffff;
          font-weight: bold;
        }

        .video-category .mini-card-figure {
          background-color: #1a1d20;
          padding: 26px;
          border-radius: 33px;
        }

        .video-category .mini-card-figure img {
          -o-object-fit: fill;
          object-fit: fill;
          width: 100%;
          max-width: 100%;
          height: 245px;
          border-radius: 34px;
        }

        .video-category .mini-card-figure .figurecaption {
          margin-top: 15px;
        }

        .video-category .mini-card-figure .figurecaption .video-titl {
          font-weight: 500;
          font-size: 30px;
          margin-bottom: 5px;
          color: #fff;
        }

        .video-category .mini-card-figure .figurecaption p {
          font-size: 16px;
          line-height: 19px;
          letter-spacing: -0.4px;
          font-weight: 300;
          color: #fff;
        }

        .video-category .mini-card-figure .figurecaption .sm-orang-btn {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          font-size: 14px;
          letter-spacing: -0.35px;
          font-weight: 300;
          border-radius: 4px;
          padding: 4px 15px;
          min-width: 146px;
        }

        .video-category .mini-card-figure .figurecaption .sm-orang-btn svg {
          margin-right: 10px;
        }

        .video-container .card img,
        .video-container .card iframe {
          max-width: 100%;
          width: 100%;
          border-radius: 34px;
        }

        .cover-main {
          margin-bottom: 80px;
        }

        .midd-back-action {
          margin-bottom: 80px;
        }

        .midd-back-action .single-top-title {
          font-size: 33px;
        }

        .midd-back-action .back-action-btn .btn-them-back {
          min-width: 160px;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
        }

        .midd-back-action .bkend-top-title {
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }

        .midd-back-action .bkend-top-title .back-action-btn {
          margin: 0 auto 0 0;
          position: absolute;
          left: 0;
        }

        .output-bilder .purchase-item {
          margin-bottom: 30px;
        }

        .output-bilder .purchase-item img {
          width: 100%;
          max-width: 100%;
          -o-object-fit: cover;
          object-fit: cover;
          height: 460px;
          border-radius: 33px;
        }

        .total-price {
          margin: 0 auto;
          max-width: calc(100% - 60px);
        }

        .total-price .full-pr-info {
          margin-bottom: 15px;
        }

        .total-price .full-pr-info .bilder-ttl {
          font-size: 30px;
          font-weight: bold;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }

        .total-price p {
          font-size: 18px;
          letter-spacing: -0.45px;
        }

        .order-number {
          text-align: center;
          font-weight: 900;
          font-size: 30px;
        }

        .order-sum {
          font-weight: 600;
          font-size: 30px;
          margin-bottom: 30px;
        }

        .purchase-item-listing {
          margin-bottom: 20px;
        }

        .purchase-item-listing img {
          width: 100%;
          max-width: 100%;
          height: 165px;
          -o-object-fit: cover;
          object-fit: cover;
          border-radius: 8px;
        }

        .card-order-final {
          padding: 50px 90px;
          max-width: 915px;
          margin: 30px auto 40px auto;
        }

        .action-to-video .btn {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          max-width: 231px;
          margin: 0 auto;
        }

        .total-price-review h5 {
          font-size: 20px;
          line-height: 25px;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .total-price-review p {
          font-size: 14px;
          line-height: 17px;
          color: #fff;
        }

        .total-price-review .text-nomal {
          font-size: 16px;
        }

        .total-price-review .text-total {
          font-size: 25px;
        }

        .total-price-review .bg-changes {
          background-color: #1f2327;
          padding: 11px 30px;
          margin-bottom: 12px;
          border-radius: 8px;
        }

        .total-price-review .bg-changes.space-reduced {
          padding: 5px 30px;
        }

        .more-order-detail {
          margin-bottom: 50px;
        }

        .spp-price span {
          font-size: 16px;
          font-weight: 900;
          color: #ff9016;
          border: 1px solid #ff9016;
          border-radius: 8px;
          display: block;
          background-color: #1f2327;
          padding: 14px 30px;
        }

        .full-package-info .form-check-label {
          width: calc(100% - 50px);
        }

        .full-package-info ul li {
          margin-bottom: 21px;
        }

        .full-package-info .form-check {
          background-color: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.33);
          border-radius: 18px;
          padding: 35px 40px;
          border: 3px solid transparent;
        }

        .full-package-info .form-check * {
          cursor: pointer;
        }

        .full-package-info .form-check .form-check-input {
          margin-left: 0;
          margin-top: 7px;
        }

        .full-package-info .form-check .form-check-input.round-radio {
          border: 2px solid rgba(0, 0, 0, 0.33);
        }

        .full-package-info .form-check .full-pkg-detail .offer-title,
        .full-package-info .form-check .full-pkg-detail .offer-price {
          font-size: 25px;
          line-height: 30px;
          color: rgba(45, 49, 54, 0.49);
          font-weight: bold;
        }

        .full-package-info .form-check .full-pkg-detail .offer-title.ft-dark,
        .full-package-info .form-check .full-pkg-detail .offer-price.ft-dark {
          color: #2d3136;
        }

        .full-package-info
          .form-check
          .full-pkg-detail
          .offer-title
          .cr-detail-box,
        .full-package-info
          .form-check
          .full-pkg-detail
          .offer-price
          .cr-detail-box {
          width: 100%;
          background: #f3f3f3;
          border-radius: 8px;
          display: block;
          padding: 9px 30px;
          margin-top: 15px;
        }

        .full-package-info
          .form-check
          .full-pkg-detail
          .offer-title
          .cr-detail-box
          .box-of-detail,
        .full-package-info
          .form-check
          .full-pkg-detail
          .offer-price
          .cr-detail-box
          .box-of-detail {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          font-weight: 400;
          color: rgba(41, 46, 51, 0.51);
          font-size: 14px;
        }

        .full-package-info
          .form-check
          .full-pkg-detail
          .offer-title
          .cr-detail-box
          .box-of-detail
          span,
        .full-package-info
          .form-check
          .full-pkg-detail
          .offer-price
          .cr-detail-box
          .box-of-detail
          span {
          margin-left: 21px;
        }

        .full-package-info .form-check .full-pkg-detail p {
          margin-top: 15px;
        }

        .full-package-info .form-check.checked11 {
          border: 3px solid #ff9016;
        }

        .full-package-info .form-check.checked11 .offer-title,
        .full-package-info .form-check.checked11 .offer-price {
          color: #ff9016;
        }

        .full-package-info .form-check.checked11 .offer-title.ft-dark,
        .full-package-info .form-check.checked11 .offer-price.ft-dark {
          color: #ff9016;
        }

        .pay-detail-card {
          padding: 60px 100px;
          margin-bottom: 50px;
        }

        .pay-detail-card .form-title {
          margin-bottom: 30px;
        }

        .pay-detail-card .form-title .title-detail-card {
          font-size: 33px;
          line-height: 41px;
          letter-spacing: -0.825px;
          font-weight: 600;
          position: relative;
          margin-bottom: 15px;
        }

        .pay-detail-card .form-title .title-detail-card::after {
          content: "";
          height: 5px;
          width: 53px;
          background-color: #ff9016;
          display: table;
        }

        .pay-detail-card .form-title p {
          font-size: 14px;
          color: rgba(41, 46, 51, 0.51);
        }

        .pay-detail-card .form-label {
          font-weight: 500;
        }

        .pay-done-info {
          font-size: 22px;
          line-height: 28px;
          letter-spacing: -0.55px;
          color: rgba(41, 46, 51, 0.56);
          max-width: 800px;
          margin-top: 20px;
        }

        .total-pay {
          margin-bottom: 22px;
        }

        .total-pay li {
          margin-bottom: 8px;
        }

        .total-pay .normal-text {
          font-size: 18px;
          line-height: normal;
          letter-spacing: -0.45px;
          font-weight: 500;
        }

        .total-pay .total-text {
          font-size: 25px;
          line-height: normal;
          letter-spacing: -0.625px;
          font-weight: 500;
          color: #ff9016;
        }

        .pay-secure-note {
          margin-top: 15px;
        }

        .pay-secure-note .ss-paymet {
          font-size: 16px;
          line-height: normal;
          font-weight: 600;
        }

        .pay-secure-note p {
          font-size: 12px;
          line-height: 17px;
          letter-spacing: -0.3px;
          margin-top: 15px;
        }

        .form-check .form-check-input.round-radio {
          height: 23px;
          width: 23px;
          border-radius: 50px;
          margin-right: 25px;
        }

        .form-check .form-check-input.round-radio:checked {
          background-color: #ffffff;
          border: 2px solid #ff9016;
        }

        .form-check .form-check-input.round-radio:checked[type="radio"] {
          background-image: url("https://api.iconify.design/ri/checkbox-blank-circle-fill.svg?color=%23ff9016");
          background-size: 17px;
          background-repeat: no-repeat;
        }

        .cl-nw-color {
          color: #2d3136;
        }
        .link-to-process {
          color: #ff9016;
          font-size: 20px;
          text-decoration: underline;
        }
        .link-to-process:hover {
          color: #ff9016;
          text-decoration: none;
        }
        .main-content-area {
          margin-bottom: 35px;
        }
        .full-package-info-new {
          margin-left: -45px;
        }
        .add-new-item {
          margin-bottom: 30px;
          padding-bottom: 30px;
          position: relative;
        }
        .add-new-item::after {
          content: "";
          height: 1px;
          width: 100%;
          background: rgba(112, 112, 112, 0.35);
          position: absolute;
          left: 0;
          right: 0;
          max-width: 537px;
          margin: 0 auto;
          bottom: 0;
        }

        @media (min-width: 1200px) {
          .modal-xl {
            max-width: 1010px;
          }
        }

        @media (min-width: 1400px) {
          .max-1366 {
            max-width: 1366px;
          }
        }

        @media (max-width: 1900px) {
          .video-container {
            max-width: 100%;
          }
          .video-container .title-view h1 {
            font-size: 42px;
            line-height: 57px;
          }
          .video-container .title-view p {
            font-size: 22px;
            line-height: 34px;
            margin-bottom: 35px;
          }
          .breadcrumb .breadcrumb-item {
            font-size: 18px;
          }
          .breadcrumb {
            margin-bottom: 0;
          }
          .pay-detail-card {
            padding: 30px 40px;
          }
          .full-package-info .form-check {
            padding: 25px 20px;
          }
          .cover-main {
            margin-bottom: 50px;
          }
          .midd-back-action {
            margin-bottom: 40px;
          }
        }

        @media (min-width: 1661px) {
          .none-1660 {
            display: none;
          }
        }
        @media (max-width: 1660px) {
          .side-navigation {
            -webkit-transform: translateX(-200px);
            transform: translateX(-200px);
            -webkit-transition: all 0.2s ease-in;
            transition: all 0.2s ease-in;
            z-index: 9;
          }
          .main-content-right {
            width: calc(100% - 90px);
            padding: 40px 20px 40px;
          }
          .mystyle.side-navigation {
            -webkit-transform: translateX(0);
            transform: translateX(0);
          }
          .bkend-top-title .single-top-title {
            font-size: 30px;
          }
          .bar1,
          .bar2,
          .bar3 {
            width: 30px;
            height: 3px;
            background-color: #ffffff;
            margin: 5px 0;
            -webkit-transition: 0.4s;
            transition: 0.4s;
          }
          .change .bar1 {
            -webkit-transform: rotate(-45deg) translate(-4px, 3px);
            transform: rotate(-45deg) translate(-4px, 3px);
          }
          .change .bar2 {
            opacity: 0;
          }
          .change .bar3 {
            -webkit-transform: rotate(45deg) translate(-8px, -8px);
            transform: rotate(45deg) translate(-8px, -8px);
          }
          .responsive-nav img {
            max-width: 130px;
          }
          .responsive-nav .toggle-responsive-nav {
            cursor: pointer;
          }
          .responsive-nav .branding-top {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            padding: 0 30px;
          }
          .responsive-nav.side-navigation .side-navigation-items ul li a {
            max-width: calc(100% - 40px);
          }
        }
        @media (max-width: 1199px) {
          .video-container .title-view h1 {
            font-size: 32px;
            line-height: 47px;
          }
          .video-container .title-view p {
            font-size: 18px;
            line-height: 32px;
            margin-bottom: 20px;
          }
          .video-container .title-view {
            padding-left: 0;
          }
          .btn-them-back {
            padding: 5px 15px;
          }
          .btn-them-back svg,
          .btn-them-back .arrow-fill {
            width: 20px;
          }
          .responsive-nav .side-navigation-items .logout-btn {
            margin-top: 0;
          }
          .responsive-nav .side-navigation-items .logout-btn a {
            max-width: calc(100% - 40px);
          }
        }

        @media (min-width: 767px) {
          .new-card-detail {
            background: #f3f3f3;
            border-radius: 8px;
          }
          .new-card-detail ul {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .new-card-detail ul .form-control {
            padding: 10px;
          }
          .new-card-detail ul .ttl-card .form-control {
            padding-left: 80px;
          }
          .new-card-detail ul li:nth-child(2) {
            max-width: 120px;
          }
          .new-card-detail ul li:last-child {
            max-width: 70px;
          }
        }

        @media (min-width: 1900px) {
          .g-xxl-6 {
            --bs-gutter-y: 4rem;
          }
          .g-xxl-6 {
            --bs-gutter-x: 4rem;
          }
        }

        @media (max-width: 1900px) {
          .full-package-info-new {
            margin-left: 0;
          }
        }
        @media (max-width: 1700px) {
          .video-category .mini-card-figure .figurecaption .video-titl {
            font-size: 20px;
          }
          .full-package-info .form-check .full-pkg-detail .offer-title,
          .full-package-info .form-check .full-pkg-detail .offer-price,
          .total-price .full-pr-info .bilder-ttl {
            font-size: 18px;
            line-height: 24px;
          }
        }

        @media (max-width: 1440px) {
          .main-content-right {
            padding: 40px 20px 40px;
          }
          .video-category .mini-card-figure .figurecaption p {
            font-size: 14px;
          }
          .video-category .mini-card-figure img {
            height: 160px;
          }
          .midd-back-action .bkend-top-title {
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
          }
          .cover-main img {
            max-width: 300px;
          }
          .more-order-detail .card-order-final {
            padding: 50px 60px;
          }
        }

        @media (max-width: 991px) {
          .bkend-top-title .use-details {
            display: none;
          }
          .side-navigation {
            -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
            width: 100%;
            border-radius: 0;
          }
          .main-content-right {
            width: 100%;
          }
          .toggle-responsive-nav::before {
            content: "";
            background: #1a1d20;
            position: absolute;
            left: -40px;
            right: 0;
            bottom: 0px;
            top: -10px;
            z-index: -1;
            width: 85px;
            height: 50px;
            border-radius: 5px;
            -webkit-transition: 0.2s all;
            transition: 0.2s all;
          }
          .responsive-nav .toggle-responsive-nav {
            position: absolute;
            right: -40px;
            -webkit-transition: 0.2s all;
            transition: 0.2s all;
          }
          .mystyle .toggle-responsive-nav::before {
            content: none;
          }
          .mystyle.responsive-nav .toggle-responsive-nav {
            position: static;
          }
          .video-container .card {
            padding: 30px 25px;
          }
          .bkend-top-title .single-top-title {
            font-size: 26px;
          }
          .video-container .title-view h1 {
            font-size: 28px;
            line-height: 34px;
          }
          .full-package-info .form-check .form-check-input {
            margin-top: 2px;
          }
          .full-package-info .form-check .full-pkg-detail p {
            margin-top: 10px;
          }
          .full-package-info .form-check .full-pkg-detail p br {
            display: none;
          }
          .form-check .form-check-input.round-radio {
            margin-right: 20px;
          }
          .bkend-top-title {
            flex-direction: row-reverse;
          }
          .bkend-top-title .back-action-btn {
            position: absolute;
            right: 30px;
            z-index: 1;
          }
        }

        @media (max-width: 767px) {
          .video-category .mini-card-figure img {
            height: auto;
          }
          .video-container .title-view h1 {
            font-size: 22px;
            line-height: 28px;
          }
          .video-container .title-view p {
            font-size: 16px;
            line-height: 26px;
          }
          .video-container .btn-theme-dark {
            max-width: inherit;
          }
          .midd-back-action .bkend-top-title .back-action-btn {
            margin-bottom: 30px;
          }
          .output-bilder .purchase-item img {
            height: auto;
          }
          .total-price p {
            font-size: 14px;
            line-height: normal;
          }
          .full-package-info
            .form-check
            .full-pkg-detail
            .offer-title
            .cr-detail-box
            .box-of-detail {
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
          }
          .full-package-info
            .form-check
            .full-pkg-detail
            .offer-title
            .cr-detail-box
            .box-of-detail
            span {
            margin-left: 0;
            margin-top: 2px;
          }
          .full-package-info
            .form-check
            .full-pkg-detail
            .offer-title
            .cr-detail-box {
            padding: 15px 20px;
          }
          .pay-detail-card .form-title .title-detail-card {
            font-size: 26px;
            line-height: 36px;
          }
          .pay-detail-card {
            padding: 30px;
          }
          .total-pay .total-text {
            font-size: 22px;
          }
          .cover-main img {
            max-width: 200px;
          }
          .cover-main {
            height: 250px;
          }
          .order-number,
          .order-sum {
            font-size: 26px;
          }
          .pay-done-info {
            font-size: 18px;
            line-height: normal;
          }
          .more-order-detail .card-order-final {
            padding: 40px;
          }
          .spp-price span {
            font-size: 14px;
          }
          .midd-back-action .bkend-top-title .back-action-btn {
            position: static;
          }
          .new-card-detail ul li {
            margin-bottom: 16px;
          }
          .new-card-detail ul li:last-child {
            margin-bottom: 0;
          }
          .bkend-top-title .back-action-btn {
            display: none;
          }
        }
        .loader-inner {
          background: #1b2832;
          position: fixed;
          overflow: hidden;
          height: 100%;
          width: 100%;
          left: 0;
          top: 0;
          z-index: 99999;
        }

        @-webkit-keyframes loader-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes loader-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .loader {
          position: absolute;
          margin: -18px 0 0 -18px;
          border: 3.6px solid #ff9016;
          box-sizing: border-box;
          overflow: hidden;
          width: 36px;
          height: 36px;
          left: 50%;
          top: 50%;
          animation: loader-spin 2s linear infinite reverse;
          filter: url(#goo);
          box-shadow: 0 0 0 1px #ff9016 inset;
        }
        .loader:before {
          content: "";
          position: absolute;
          -webkit-animation: loader-spin 2s cubic-bezier(0.59, 0.25, 0.4, 0.69)
            infinite;
          animation: loader-spin 2s cubic-bezier(0.59, 0.25, 0.4, 0.69) infinite;
          background: #ff9016;
          transform-origin: top center;
          border-radius: 50%;
          width: 150%;
          height: 150%;
          top: 50%;
          left: -12.5%;
        }
        /*# sourceMappingURL=globalstyle.css.map */
      `}</style>
    </>
  );
}
