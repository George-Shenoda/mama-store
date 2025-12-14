// App.tsx
import Card from "./pages/Card";
import Cart from "./pages/Cart";
import Navbar from "./Components/Navbar";
import { Route } from "@solidjs/router";
import { Component, For, onMount, ParentProps } from "solid-js";
import { overlays } from "./store/overlay";
import Overlay from "./Components/overlay";
import Page from "./pages/Page";
import { loadObjects } from "./store/ids";
import Upload from "./pages/Upload";

const Layout: Component<ParentProps> = ({ children }) => {
    // props.children will be the nested Route components' rendered output
    return (
        <div class="container m-auto h-screen pt-10">
            <Navbar />
            <OverlayContainer />
            {children}
        </div>
    );
};

const OverlayContainer = () => {
    return (
        <div class="fixed top-0 mt-5 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50">
            <For each={overlays}>
                {(o) => <Overlay text={o.text} success={o.success} />}
            </For>
        </div>
    );
};

function App() {
    onMount(() => {
        if (window.localStorage.getItem("Store_darkMode") === "true") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        loadObjects();
    });
    return (
        <>
            {/* Layout is the routed component — Navbar is inside route context */}
            <Route path="" component={Layout}>
                {/* nested routes render inside Layout as props.children */}
                <Route path="/" component={Page} />
                <Route path="/card/:id" component={Card} />
                <Route path="/cart" component={Cart} />
                <Route path="/upload" component={Upload} />
            </Route>
        </>
    );
}

export default App;
