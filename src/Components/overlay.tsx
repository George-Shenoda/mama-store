import { Component, createSignal, onMount } from "solid-js";

const Overlay: Component<{
    text: string;
    success: boolean;
    onRemove?: () => void;
}> = (props) => {
    const [visible, setVisible] = createSignal(false);

    onMount(() => {
        requestAnimationFrame(() => setVisible(true));

        setTimeout(() => {
            setVisible(false);
        }, 2000); // show for 2s
    });

    return (
        <div
            class={`absolute top-0 w-[300px] bg-green-500 text-white p-4 rounded-md shadow-lg transition-opacity duration-300 left-1/2 -translate-x-1/2 mt-5`}
            classList={{ "opacity-100": visible(), "opacity-0": !visible() }}
        >
            <p>{props.text}</p>
        </div>
    );
};

export default Overlay;
