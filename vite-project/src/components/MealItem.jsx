import { useContext } from "react"
import { currencyFormatter } from "../utils/formatting"
import Buttons from "./UI/Buttons"
import CartContext from "../store/CartContext";
export default function MealItem({meal}) {
    const cartCtx = useContext(CartContext);

    function handleAddMeal() {
        cartCtx.addItem(meal)
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Buttons onClick={handleAddMeal}>Add to Cart</Buttons>
                </p>
            </article>
        </li>
    )
}