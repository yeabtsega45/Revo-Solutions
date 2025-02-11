/* eslint-disable @next/next/no-css-tags */
import React from "react";
import Head from "next/head";

const NoNavbar = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/style.css" />
      </Head>
      {children}
    </>
  );
};

export default NoNavbar;
