import React from "react";
import Script from "next/script";
import Head from "next/head";
import LoadingScreen from "../components/Loading-Screen/loading-screen";
import "../styles/globals.css";
import Cursor from "../components/Cursor";
import ScrollToTop from "../components/scrollToTop";
// import { ThemeProvider } from "../contexts/ThemeContext";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <ThemeProvider> */}
      <Head>
        <title>Revo</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <Cursor />
      <LoadingScreen />
      <Component {...pageProps} />
      <ScrollToTop />

      <Script id="wow" src="/assets/js/wow.min.js"></Script>
      <Script
        id="splitting"
        strategy="beforeInteractive"
        src="/assets/js/splitting.min.js"
      ></Script>

      <Script
        id="simpleParallax"
        src="/assets/js/simpleParallax.min.js"
      ></Script>
      <Script id="isotope" src="/assets/js/isotope.pkgd.min.js"></Script>

      <Script src="/assets/js/main.js" id="init" strategy="lazyOnload"></Script>
      {/* </ThemeProvider> */}
    </>
  );
}

export default MyApp;
