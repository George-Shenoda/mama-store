import { Component, createMemo } from "solid-js";
import { object } from "../store/ids";
import CartItem from "../Components/cartItem";
import { addOverlay } from "../store/overlay";
import { useCart } from "../store/Cart-store";

const Cart: Component<{}> = () => {
    const { items, clearCart } = useCart();

    const handleClear = () => {
        clearCart();
        addOverlay("Cart Cleared Successfully");
    };
    // derive total price from cart items
    const totalPrice = createMemo(() => {
        return items.reduce((sum, item) => {
            const obj = object.objects.find((o) => o.id === item.id);
            if (!obj) return sum;
            return sum + obj.price * item.count; // multiply by count
        }, 0);
    });

    return (
        <div class="bg-white shadow-md rounded-md p-10 dark:bg-gray-800 dark:text-white mt-5">
            <h1 class="text-2xl font-bold mb-4">Your Cart</h1>

            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div>Items in Cart: {items.length}</div>
                    <div>
                        {items.map((item) => {
                            const obj = object.objects.find(
                                (o) => o.id === item.id
                            );
                            if (!obj)
                                return (
                                    <div>Item not found (ID: {item.id})</div>
                                );
                            return (
                                <CartItem
                                    id={item.id}
                                    object={obj}
                                    count={item.count}
                                />
                            );
                        })}
                    </div>
                    <button class="click" onClick={handleClear}>
                        Clear Cart
                    </button>
                </>
            )}
            <div class="font-bold text-lg mt-4">
                Total Price: {totalPrice()}
            </div>
        </div>
    );
};

export default Cart;
