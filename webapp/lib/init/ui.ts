import React from "react";
import dom from "react-dom/client";

const element = () => document.getElementById("app");
const root = (rootElement : HTMLElement) => dom.createRoot(rootElement);


export default root(element() as HTMLElement);