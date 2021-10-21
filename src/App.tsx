import React from "react";
import "./App.css";
import { DataProvider } from "./data-lib/context/DataProvider";
import useInBound from "./hook/useInBound";
import YearPlanner from "./comp/YearPlanner/YearPlanner";

function App() {
const { prepopData } = useInBound({});
  return (
    <DataProvider prepopData={prepopData}>
      <YearPlanner/>
    </DataProvider>
  );
}

export default App;
