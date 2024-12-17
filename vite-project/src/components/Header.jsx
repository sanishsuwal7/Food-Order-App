import { useContext } from 'react';
import logo from '../assets/logo.jpg';
import Buttons from './UI/Buttons';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const progressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumber, item) => {
        return totalNumber + item.quantity
    }, 0)

    function handleShowCart() {
        progressCtx.showCart();
    }

    return (
        <header id ="main-header">
            <div id="title">
                <img src={logo} alt="App logo"/>
                <h1>Nepali Food App</h1>
            </div>

            <nav>
                <Buttons onClick = {handleShowCart} textOnly={true}> Cart ({totalCartItems})</Buttons>
            </nav>
        </header>
    )
}