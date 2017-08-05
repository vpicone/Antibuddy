import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { unregister} from "./registerServiceWorker";
//require("typeface-roboto");

ReactDOM.render(<App />, document.getElementById("root"));
//registerServiceWorker();
unregister();