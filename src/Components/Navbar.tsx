import { Component, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import banner from "../assets/banner.png";
import { useCart } from "../store/Cart-store";

const Navbar: Component<{}> = () => {
    const { items } = useCart();
    const [darkMode, setDarkMode] = createSignal(
        window.localStorage.getItem("Store_darkMode") === "true" || false
    );
    const toggleDarkMode = () => {
        setDarkMode(!darkMode());
        window.localStorage.setItem("Store_darkMode", String(darkMode()));
        if (darkMode()) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };
    return (
        <>
            <div class="flex justify-between items-center mb-7">
                <header class="text-xl flex justify-center items-center gap-3 dark:text-white">
                    <span
                        class="material-symbols-outlined cursor-pointer"
                        onClick={toggleDarkMode}
                    >
                        Light_mode
                    </span>
                    <h1>Ninja Merch</h1>
                </header>
                <nav class="flex justify-center items-center gap-3">
                    <A
                        href="/"
                        end
                        activeClass="text-blue-500 dark:text-blue-400"
                        inactiveClass="text-black dark:text-white"
                        class="cursor-pointer"
                    >
                        Home
                    </A>
                    <A
                        href="/cart"
                        end
                        activeClass="text-blue-500 dark:text-blue-400"
                        inactiveClass="text-black dark:text-white"
                        class="cursor-pointer"
                    >
                        Cart ({items.length})
                    </A>
                    <A
                        href="/upload"
                        end
                        activeClass="text-blue-500 dark:text-blue-400"
                        inactiveClass="text-black dark:text-white"
                        class="cursor-pointer"
                    >
                        upload
                    </A>
                </nav>
            </div>

            <img src={banner} alt="banner" class="rounded-md" />
        </>
    );
};

export default Navbar;
