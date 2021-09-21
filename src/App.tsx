import React from "react";
import "./App.css";
import { AppBox } from "./App.style";
import Header from "./comp/1-header/Header";
import Footer from "./comp/3-footer/Footer";
import Body from "./comp/2-body/Body";
import { DataProvider } from "./data-lib/context/DataProvider";
import useInBound from "./hook/useInBound";
import DayModal from "./comp/day-modal/DayModal";

function App() {
const { prepopData } = useInBound({});
  return (
    <DataProvider prepopData={prepopData}>
      <DayModal />
      <AppBox>
        <Header />
        <Body />
        <Footer />
      </AppBox>
    </DataProvider>
  );
}

export default App;
