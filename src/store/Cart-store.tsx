import { makePersisted } from "@solid-primitives/storage";
import { createContext, useContext, ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";

interface CartItem {
    id: number;
    count: number;
}
interface CartContextType {
    items: CartItem[];
    addItem: (id: number) => void;
    removeItem: (id: number) => void;
    decrementItem: (id: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType>();

export const CartContextProvider: ParentComponent = (props) => {
    const [items, setItems] = makePersisted(createStore<CartItem[]>([]), {
        name: "cartStore",
    });

    const addItem = (id: number) => {
        const exist = items.find((p) => p.id === id);
        if (exist) {
            setItems((items) =>
                items.map((i) =>
                    i.id === id ? { ...i, count: i.count + 1 } : i
                )
            );
        }
        else{
            setItems([...items, {id: id, count: 1}])
        }
    };

    const decrementItem = (id: number) => {
        setItems((items) =>
            items
                .map((i) => (i.id === id ? { ...i, count: i.count - 1 } : i))
                .filter((i) => i.count > 0)
        );
    };

    const removeItem = (id: number) => {
        setItems((items) => items.filter((i) => i.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                items: items,
                addItem,
                removeItem,
                decrementItem,
                clearCart,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx)
        throw new Error("useCart must be used inside CartContextProvider");
    return ctx;
};
