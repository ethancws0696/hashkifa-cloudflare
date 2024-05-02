import Head from "next/head";
import Header from "../components/user/header/Header";
import Footer from "../components/user/footer/Footer";
import DonateFunction from "../components/user/donate/DonateFunction";
import Sponsorcontent from "../miandata.json";
export default function Donate() {
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
      <DonateFunction
        sponsorTitle={
          Sponsorcontent.cms_content.filter(function (item) {
            return item.key_name == "sponsorships-page-title";
          })[0].key_value
        }
        sponsorDescription={
          Sponsorcontent.cms_content.filter(function (item) {
            return item.key_name == "sponsorships-page-tagline";
          })[0].key_value
        }
      />
      <Footer />
    </div>
  );
}
