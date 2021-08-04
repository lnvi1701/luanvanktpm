import React from "react";
import Header from "./components/header/Header";
// import Footer from "./components/footer/Footer";

function Default({ children }) {
  return (
    <div>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
}

export default Default;
