import { useParams } from "@solidjs/router";
import { Component, Show, createMemo } from "solid-js";
import { object } from "../store/ids";
import { addOverlay } from "../store/overlay";
import { useCart } from "../store/Cart-store";

const Card: Component = () => {
    const { addItem } = useCart()
    const params = useParams();

    const product = createMemo(() =>
        object.objects.find((o) => o.id === Number(params.id))
    );

    const handleClick = () => {
        addItem(Number(params.id))
        addOverlay("Item Added to Cart Successfully");
    };

    return (
        <div class="my-7">
            <Show
                when={product()}
                fallback={<div class="animate-bounce text-3xl">Loading...</div>}
            >
                <div class="grid grid-cols-6 gap-7">
                    <div class="col-span-2">
                        <img src={product()!.img} alt="image" />
                    </div>

                    <div class="col-span-4">
                        <h2 class="text-3xl font-bold mb-7">
                            {product()!.title}
                        </h2>
                        <p>{product()!.description}</p>
                        <p class="my-7 text-2xl">only ${product()!.price}</p>
                    </div>
                    <p class="col-span-2"></p>
                    <button class="click col-span-2" onClick={handleClick}>
                        Add to Cart
                    </button>
                </div>
            </Show>
        </div>
    );
};

export default Card;
