import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import Buttons from "./UI/Buttons";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const reqConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
}

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const progressCtx = useContext(UserProgressContext);

    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', reqConfig)

    const cartTotal = cartCtx.items.reduce((total, item) => {
        return total + item.quantity * item.price 
    }, 0)

    function handleClose() {
        progressCtx.hideCheckout();
    }

    function handleFinish() {
        progressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items, 
                customer: customerData
            }
        }));
    }   
    

    let actions = (
        <>
            <Buttons onClick={handleClose} type="button" textOnly>Close</Buttons>
            <Buttons>Submit Order</Buttons>
        </>
    )

    if(isSending){
        actions = <p>Sending order data...</p>
    }

    if(data){
        <Modal open ={progressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your oder was submitted</p>
            <p className="modal-actions">
                <Buttons onClick={handleFinish}> Okay </Buttons>
            </p>
        </Modal>
    }
    return (
        <Modal open = {progressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label = "Full Name" type="text" id="name"/>
                <Input label = "Email Address" type="email" id="email"/>
                <Input label = "Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label = "Postal Code" type="text" id="postal-code"/>
                    <Input label = "City" type="text" id="city"/>
                </div>

                {error && <Error title="Failed to send " message={error} />}

                <p className="modal-actions"> 
                    {actions}
                </p>
            </form>
        </Modal>
    )
}