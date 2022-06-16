import React from "react";
import dom from "react-dom/client";
import MainView from "@app/view/main";


const element = () => document.getElementById("app");
const root = (rootElement : HTMLElement) => dom.createRoot(rootElement);


root(element() as HTMLElement).render(<MainView/>);


