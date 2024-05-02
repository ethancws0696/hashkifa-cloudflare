import Head from "next/head";
import Header from "../components/user/header/Header";
import Footer from "../components/user/footer/Footer";
import DonateFunction from "../components/user/donate/DonateFunction";
export default function termsOfService() {
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
      <main>
        <section className="main-content-404">
          <div className="container-fluid h-100 p-0"></div>
        </section>
      </main>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}
