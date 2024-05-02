import Head from "next/head";
import Header from "../components/user/header/Header";
import Footer from "../components/user/footer/Footer";
import DonateFunction from "../components/user/donate/DonateFunction";
export default function custom404() {
  return (
    <div className="main-wrapper">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Hashkifa</title>
      </Head>
      <Header />
      <main>
        <section className="main-content-404">
          <div className="container-fluid h-100 p-0">
            <div className="row g-0 align-items-center justify-content-center h-100">
              <div className="col-12 text-center">
                <h1 className="main-title-404 d-block w-100">
                  <span className="d-block w-100">404 </span>
                  Page Not Found.
                </h1>
                <a href="/" className="btn btn-orange">
                  Go to Home{" "}
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="container">
            <div className="row">
                <div className='col-sm-12'>
                    <h1>404 - page not found</h1>
                </div>
            </div>
          </div> */}
      </main>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}
