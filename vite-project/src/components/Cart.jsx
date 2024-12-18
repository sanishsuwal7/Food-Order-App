import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../utils/formatting";
import Buttons from "./UI/Buttons";
import CartItem from "./UI/CartItem";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const progressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((total, item) => {
        return total + item.quantity * item.price 
    }, 0)

    function handleCloseCart() {
        progressCtx.hideCart();
    }

    function handleGoToCheckout() {
        progressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open = {progressCtx.progress === 'cart'} onClose={progressCtx.progress === 'cart' ?handleCloseCart: null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <CartItem key = {item.id} name = {item.name} quantity={item.quantity} price={item.price} onDecrease={() => cartCtx.removeItem(item.id)} onIncrease={() => cartCtx.addItem(item)}/>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Buttons onClick={handleCloseCart} textOnly>Close</Buttons>
                {cartCtx.items.length > 0  && (<Buttons onClick={handleGoToCheckout}>Go to Checkout</Buttons>)}
            </p>
        </Modal>
    )
}