import React from "react";
import "./App.css";
import { DataProvider } from "./data-lib/context/DataProvider";
import YearPlanner from "./comp/0-YearPlanner/YearPlanner";
// import {getInitData} from './appConfig';
import useInBound from './hook/useInBound';

function App() {
  // const initData = getInitData();
  const {prepopData} = useInBound();

  return (
    <DataProvider prepopData={prepopData}>
      <YearPlanner />
    </DataProvider>
  );
}

export default App;
