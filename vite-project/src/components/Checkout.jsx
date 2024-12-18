import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import Buttons from "./UI/Buttons";

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const progressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((total, item) => {
        return total + item.quantity * item.price 
    }, 0)

    function handleClose() {
        progressCtx.hideCheckout();
    }

    function handleSubmit(event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch('http://localhost:3000/orders', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items, 
                    customer: customerData
                }
            })
        })
    }   
    
    return (
        <Modal open = {progressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label = "Full Name" type="text" id="name"/>
                <Input label = "Email Address" type="email" id="email"/>
                <Input label = "Street Address" type="text" id="street"/>
                <div className="control-row">
                    <Input label = "Postal Code" type="text" id="postal-code"/>
                    <Input label = "City" type="text" id="city"/>
                </div>

                <p className="modal-actions"> 
                    <Buttons onClick={handleClose} type="button" textOnly>Close</Buttons>
                    <Buttons type="button">Submit Order</Buttons>
                </p>
            </form>
        </Modal>
    )
}