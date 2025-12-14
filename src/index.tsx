/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App.tsx";
import { Router } from "@solidjs/router";
import { CartContextProvider } from "./store/Cart-store";

const root = document.getElementById("root");

render(
    () => (
        <CartContextProvider>
            <Router>
                <App />
            </Router>
        </CartContextProvider>
    ),
    root!
);
