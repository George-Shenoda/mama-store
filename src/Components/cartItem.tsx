import { Component } from "solid-js";
import { addOverlay } from "../store/overlay";
import { useCart } from "../store/Cart-store";

const cartItem: Component<{
    id: number;
    object: { title: string; description: string; price: number; img?: string };
    count: number;
}> = ({ id, object, count }) => {
    const { addItem, removeItem, decrementItem } = useCart();
    const handleAdd = () => {
        addItem(id);
        addOverlay("Item Increased Successfully");
    };

    const handleRemove = () => {
        removeItem(id);
        addOverlay("Item Removed Successfully");
    };

    const handleDecrement = () => {
        decrementItem(id);
        addOverlay("Item Decreased Successfully");
    };
    return (
        <div>
            <div class="shadow-md bg-[hsl(0,0%,93%)] p-4 mb-4 rounded-md dark:bg-gray-700 dark:text-white">
                <div class="grid gap-5 grid-cols-12 items-center">
                    <img
                        src={object.img}
                        alt="product"
                        class="col-span-3 h-full"
                    />
                    <div class="col-span-3">
                        <p class="text-3xl mb-4">{object.title}</p>
                        <p class="text-2xl">Price: ${object.price}</p>
                    </div>
                    <div class="flex items-center gap-3 col-span-4 justify-self-center">
                        <button
                            onClick={handleAdd}
                            class="click flex justify-center items-center"
                        >
                            <span class="material-symbols-outlined">Add</span>
                        </button>
                        <p class="text-2xl">{count}</p>
                        <button
                            onClick={handleDecrement}
                            class="click flex justify-center items-center"
                        >
                            <span class="material-symbols-outlined">
                                remove
                            </span>
                        </button>
                    </div>
                    <div>
                        <p class="text-2xl me-4">${object.price * count}</p>
                    </div>
                </div>
                <button onClick={handleRemove} class="click mt-5">
                    Remove
                </button>
            </div>
        </div>
    );
};

export default cartItem;
