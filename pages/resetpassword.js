import Head from "next/head";
import ResetPwdForm from "../components/common/ResetPwdForm";
import Footer from "../components/user/footer/Footer";
import Header from "../components/user/header/Header";
import { useEffect, useState, useRef } from "react";
import Router, { useRouter } from "next/router";
export default function ResetPassword() {
  const router = useRouter();
  const [resetData, setResetData] = useState({ token: null, email: null });
  useEffect(() => {
    if (router.query.token !== null && router.query.email !== null) {
      var data = { token: router.query.token, email: router.query.email };
      setResetData({ ...data });
    } else {
      Router.push("/");
    }
  }, [router]);
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
      <ResetPwdForm data={resetData} />
      <Footer />
    </div>
  );
}
