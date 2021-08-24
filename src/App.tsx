import React from "react";
import "./App.css";
import { AppBox } from "./App.style";
import Header from "./comp/1-header/Header";
import Footer from "./comp/3-footer/Footer";
import Body from "./comp/2-body/Body";
import { DataProvider } from "./data-lib/context/DataProvider";
import { BOOLEAN_VALUES } from "./util/constant";

function App() {
  const prepopData = {settings: {showSettings: BOOLEAN_VALUES.FALSE}};
  return (
    <DataProvider prepopData={prepopData}>
      <AppBox>
        <Header />
        <Body />
        <Footer />
      </AppBox>
    </DataProvider>
  );
}

export default App;
