/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App.tsx";
import { HashRouter } from "@solidjs/router";
import { CartContextProvider } from "./store/Cart-store";

const root = document.getElementById("root");

render(
    () => (
        <CartContextProvider>
            <HashRouter>
                <App />
            </HashRouter>
        </CartContextProvider>
    ),
    root!
);
