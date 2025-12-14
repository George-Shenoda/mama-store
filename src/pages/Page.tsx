import { Component, For, Show } from "solid-js";
import CardFrame from "../Components/cardFrame";
import { object } from "../store/ids";

const Page: Component = () => {
    return (
        <div>
            <Show
                when={object.objects.length > 0}
                fallback={
                    <div class="text-center text-3xl animate-bounce absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        Loading...
                    </div>
                }
            >
                <div class="grid grid-cols-4 gap-10 my-4">
                    <For each={object.objects}>
                        {(item) => <CardFrame item={item} />}
                    </For>
                </div>
            </Show>
        </div>
    );
};

export default Page;
