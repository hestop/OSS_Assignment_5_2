import React from "react";
import ReactDOM from "react-dom/client";
import ShowList from "./components/pages/ShowList.js";
import "./index.css";

const myComponent = <ShowList />;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(myComponent);
