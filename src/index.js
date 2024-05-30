import { createRoot } from "react-dom/client";
import { Suspense } from 'react';
import AppLoading from './components/loading/AppLoading';
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
const container = document.getElementById("app");
const root = createRoot(container);

root.render(
    <Suspense fallback={<AppLoading />}><App /></Suspense>);

reportWebVitals();
