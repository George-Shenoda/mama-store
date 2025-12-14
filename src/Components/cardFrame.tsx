import { A } from "@solidjs/router";
import { Component } from "solid-js";

const CardFrame: Component<{
    item: {
        id: number;
        title: string;
        description: string;
        price: number;
        img?: string;
    };
}> = ({ item }) => {
    return (
        <div class="bg-white p-4 text-center shadow-md rounded-md dark:bg-gray-800 dark:text-white">
            <img src={`${item.img}`} />
            <h2 class="my-3 font-bold">{item.title}</h2>
            <A href={`/card/${item.id}`}>
                <button class="click">View</button>
            </A>
        </div>
    );
};

export default CardFrame;
