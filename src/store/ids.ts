import { createStore } from "solid-js/store";
import { ObjectZod } from "../../constants/objectZod";
import type { objectType } from "../../constants";

export const [object, setObject] = createStore<{
    objects: objectType[];
}>({
    objects: [],
});

export function addObject(newObject: {
    title: string;
    description: string;
    price: number;
    img: string;
}) {
    setObject("objects", (prev) => [...prev, { id: Date.now(), ...newObject }]);
    saveObjects(object.objects);
}

export function editObject(
    id: number,
    newObject: {
        title?: string;
        description?: string;
        price?: number;
        img?: string;
    }
) {
    setObject(
        "objects",
        (o) => o.id === id,
        (prev) => ({
            id: prev.id,
            title: newObject.title || prev.title,
            description: newObject.description || prev.description,
            price: newObject.price || prev.price,
            img: newObject.img || prev.img,
        })
    );
    saveObjects(object.objects);
}

export async function loadObjects() {
    const res = await fetch("../../data/dt.json"); // must be in /public
    const data = await res.json();

    const parsed = ObjectZod.safeParse(data.products);
    if (parsed.success) {
        setObject("objects", parsed.data);
    }
}

async function saveObjects(objects: objectType[]) {
    await fetch("../../data/dt.json", {
        method: "POST",
        headers: { "updating the products": "application/json" },
        body: JSON.stringify(objects),
    });
}
