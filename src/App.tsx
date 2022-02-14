import React from "react";
import "./App.css";
import { DataProvider } from "./data-lib/context/DataProvider";
import YearPlanner from "./comp/0-YearPlanner/YearPlanner";
import { getInitData } from "./appConfig";

function App() {
  const initData = getInitData();

  return (
    <DataProvider prepopData={initData}>
      <YearPlanner />
    </DataProvider>
  );
}

export default App;
