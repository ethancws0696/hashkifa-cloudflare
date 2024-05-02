import Head from "next/head";
import Header from "../components/user/header/Header";
import Footer from "../components/user/footer/Footer";

export default function FAQ() {
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
      <main className="faq__main">
        <div className="container-xl">
          <div className="row">
            <div className="col-12">
              <div className="ifImage faq">
                <div className="faq-block">
                  <strong>
                    If you have a filtered internet connection or device
                  </strong>
                  <p>
                    it's important to be aware of how filters can impact your
                    browsing experience on Hashkifa.com. Here's what you need to
                    know:
                  </p>{" "}
                  <p>
                    Filters, by their nature, are designed to restrict certain
                    types of traffic, and sometimes they can unintentionally
                    block legitimate traffic, including your ability to make
                    purchases or enjoy a seamless viewing experience on our
                    website. Unfortunately, there is little we can do from our
                    end to resolve this issue directly.
                  </p>{" "}
                  <p>
                    Our website relies on several necessary domains to function
                    properly. If your device or network filter is blocking any
                    of these domains, it may cause disruptions in your ability
                    to purchase, log in, or watch videos on our platform. In
                    such cases, we recommend contacting your filter company's
                    support team.
                  </p>{" "}
                  <p>Here's what you can do:</p>
                  <ol>
                    <li>
                      Contact Your Filter Company: Get in touch with your filter
                      company's customer support and explain the situation. Ask
                      them to investigate any potential blockages that may be
                      hindering your experience on our website. Request that
                      they whitelist any domains or connections related to
                      Hashkifa.com to ensure uninterrupted access.
                    </li>
                    <li>
                      List of Essential Domains: We have compiled a list of
                      domains crucial for uninterrupted access to our website.
                      If any of these domains are blocked, you will likely
                      encounter issues with purchasing, logging in, and watching
                      videos. Please consult our list and ensure that these
                      domains are allowed by your filter:
                    </li>
                  </ol>{" "}
                  <p>List of Essential Domains:</p>
                  <ul>
                    <li>hashkifa.com</li>
                    <li>app.hashkifa.com</li>
                    <li>thumbs.hashkifa.com</li>
                    <li>www.gstatic.com</li>
                    <li>player.vimeo.com</li>
                    <li>i.vimeocdn.com</li>
                    <li>f.vimeocdn.com</li>
                    <li>137vod-adaptive.akamaized.net</li>
                  </ul>{" "}
                </div>
                <div className="faq-block">
                  <strong>
                    Can I share my login info. with family and friends?
                  </strong>
                  <p>
                    Only a person or family in the same household may login into
                    an account to watch the film/s they purchased.
                  </p>
                  <p>
                    Hashkifa reserves the right to deactivate any account that’s
                    being shared with extended family and friends who have not
                    purchased the film.
                  </p>
                  <p>
                    Please note the option on the purchase page “Purchase For A
                    Friend” to surprise a loved one with the gift of a Hashkifa
                    film.
                  </p>
                </div>

                <div className="faq-block">
                  <strong>Can I use maaser money to pay for film?</strong>
                  <p>
                    Hashkifa is a non-profit organization that is focused on
                    producing cutting edge content in an engaging manner to
                    uplift the hearts of Am Yisroel.{" "}
                  </p>
                  <p>
                    Please communicate this information to your Rabbi or Rov for
                    Halachic guidance.
                  </p>
                </div>

                <div className="faq-block">
                  <strong>
                    Is there a limit to how many times I can login or watch the
                    film?{" "}
                  </strong>
                  <p>
                    You can view the film/s you’ve purchased as many times as
                    you want.{" "}
                  </p>
                </div>

                <div className="faq-block">
                  <strong>
                    If I purchased the family package, can someone who’s staying
                    over watch with us?
                  </strong>
                  <p>
                    Hashkifa allows for guests who have been staying in the same
                    household to watch the film/s with the family.
                  </p>
                </div>

                <div className="faq-block">
                  <strong>
                    Can I download or buy the films to watch without internet
                    access?
                  </strong>
                  <p>
                    Hashkifa films can only be streamed directly from the
                    Hashkifa website.{" "}
                  </p>
                </div>

                <div className="faq-block">
                  <strong>
                    I forgot my password, how do I reset it to login?
                  </strong>
                  <p>
                    On the sign in page, click on the words “Forgot your
                    password?” for the prompts to reset your passwords.
                  </p>
                </div>

                <div className="faq-block">
                  <strong>
                    I purchased films in the past and I can’t login to access my
                    account?
                  </strong>
                  <p>
                    Due to the upgrades to our site, you may be experiencing
                    difficulty logging in with an old password. Please use the
                    "Reset Password" page to regain access to your account.
                  </p>
                </div>

                <div className="faq-block">
                  <strong>Purchasing For A Friend</strong>
                  <p>
                    If you would like to surprise someone with a video gift,
                    we've made the process easy for you. During the checkout
                    process, simply follow these steps:{" "}
                  </p>
                  <ol>
                    <li>Click on the tab labeled "Purchase For A Friend."</li>
                    <li>
                      Fill out the recipient's name, email address, and include
                      a personal message that you would like them to see. It's
                      important to enter the correct email address to ensure
                      they receive the gift message and login information
                      without any issues.
                    </li>
                  </ol>
                  <p>
                    Please note that gifting a video works regardless of whether
                    the recipient has an account with our website or not. In
                    either case, they will be guided through the following
                    steps:
                  </p>
                  <ol>
                    <li>
                      If the recipient has an existing account, they will be
                      prompted to log in using their credentials.
                    </li>
                    <li>
                      If the recipient does not have an account, they will be
                      asked to create a new login by providing their email
                      address and setting a password.
                    </li>
                  </ol>
                  <p>
                    In the event that the recipient has forgotten their login
                    credentials, they can easily proceed with the password reset
                    process by clicking on the "Forgot Password" option.
                  </p>
                </div>
                <div className="faq-block">
                  <strong>Receiving a Gift from Someone</strong>
                  <p>
                    When someone sends you a gift, we want to make sure you have
                    a smooth experience accessing it. Here's how it works:
                  </p>
                  <ol>
                    <li>
                      Email Notification: You will receive an email notification
                      informing you about the gift. This email will include a
                      direct link to access the video.
                    </li>
                    <li>
                      Existing Account:
                      <ul>
                        <li>
                          If you already have an account with us, click on the
                          provided link, and you will be prompted to log in
                          using your previous account login information.
                        </li>
                        <li>
                          In case you have forgotten your password, click on the
                          "Forgot Password" option to initiate the password
                          reset process. Please ensure that the email address
                          you use for the password reset is the same as the one
                          to which the gift was sent.
                        </li>
                      </ul>
                      <li>New Account:</li>
                      <ul>
                        <li>
                          If you have never had an account with us before, use
                          the link provided in the email to set your password.
                          This will allow you to proceed with logging in to your
                          new account and accessing the gift.
                        </li>
                        <li>
                          If you encounter any difficulties during the process
                          or have any questions, our dedicated customer support
                          team is here to assist you. Simply reach out to us,
                          and we'll be happy to help.
                        </li>
                      </ul>
                    </li>
                  </ol>
                  <p>
                    We hope you enjoy your gift and have a wonderful experience
                    on Hashkifa.com!
                  </p>
                </div>
                <div className="faq-block">
                  <strong>
                    If you are encountering difficulties while trying to
                    complete the checkout process
                  </strong>
                  <p>
                    we understand that it can be frustrating. Here are some
                    steps to troubleshoot the issue:
                  </p>
                  <ol>
                    <li>
                      Error Message: Check if there is a red error message
                      displayed next to the "Pay" button. This message may
                      provide specific information regarding the problem you are
                      facing. Take note of the error message for further
                      assistance.
                    </li>
                    <li>
                      Filter Restrictions: If you have a filter installed, it is
                      possible that it is blocking some necessary background
                      connections required for the checkout process. In such
                      cases, we recommend reaching out to your filter company's
                      support team. They can often identify the blockage and
                      assist in allowing the necessary connections to proceed.
                    </li>
                    <li>
                      Payment Information: Double-check the accuracy of the card
                      information you entered, including the card number,
                      expiration date, and CVC code. Even a minor mistake in
                      these details can prevent a successful payment. Verify
                      that the information is correct and try again.
                    </li>
                    <li>
                      Alternative Device: If the issue persists, you may want to
                      try completing the checkout process from a different
                      device. Sometimes, technical issues can be
                      device-specific. Switching to another device can help
                      determine if the problem lies with your current device.
                    </li>
                    <li>
                      Seek Support: If none of the above steps resolve the
                      issue, click on the "Need Help?" button located on the
                      right side of the screen. Fill out the support request
                      form, providing as much detail as possible about the
                      problem you are experiencing. Our support team will make
                      every effort to assist you promptly. Please note that
                      during peak periods, such as T'Baav, there might be a
                      larger backlog of requests, which may result in a longer
                      response time. Therefore, it is essential to rule out any
                      potential issues with your filter, device, or other
                      factors.
                    </li>
                  </ol>
                </div>
                <div className="faq-block">
                  <strong>
                    If you are unsure about your login information
                  </strong>
                  <p>
                    such as your email address or password, don't worry! You can
                    follow these steps to reset your password:
                  </p>
                  <ol>
                    <li>
                      Forgotten Email Address: If you don't remember the email
                      address associated with your account, you can try
                      searching your email inbox for previous emails from
                      Hashkifa. These emails might provide a clue about the
                      email address you used. Alternatively, you can attempt to
                      create a new account and see if the system allows you to
                      use a specific email address or notifies you if the
                      address is already registered.
                    </li>
                    <li>
                      Password Reset: If you know your email address but have
                      forgotten your password, you can initiate the password
                      reset process. Here's how:
                      <ul>
                        <li>Visit the login page on our website.</li>
                        <li>
                          Look for the "Forgot Password" option and click on it.
                        </li>
                        <li>
                          Enter the email address associated with your account.
                        </li>
                        <li>
                          You will receive an email containing a link to reset
                          your password.
                        </li>
                      </ul>
                    </li>
                  </ol>
                  <p>
                    Please note that if you don't see the password reset email
                    in your inbox, it's worth checking your junk or spam folder
                    as it may have been mistakenly filtered there.
                  </p>
                  <p>
                    We understand that it can be frustrating to encounter login
                    difficulties but rest assured that we are here to assist
                    you. If you continue to experience issues or need further
                    support, please reach out to our customer service team by
                    clicking on the "Need Help?" button or contacting us through
                    the provided support channels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
