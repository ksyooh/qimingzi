import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

// React 18 新写法，渲染主App组件到页面
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
