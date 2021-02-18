
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckIcon from '@material-ui/icons/Check';

function RecipeCompare({ ingredient }) {

    const pantry = useSelector(state => state.pantryReducer);
    const [haveItem, setHaveItem] = useState(false);

    const foodInPantry = [];

    for (let product of pantry) {
        foodInPantry.push(product.item);
    }


    useEffect(() => {
        compare();
    }, []);

    // comparing pantry items to recipe ingredients
    const compare = () => {
        for (let food of foodInPantry) {
            const regularExpression = new RegExp(`${food}`, 'gi')

            if (regularExpression.test(ingredient.text)) {
                setHaveItem(true);
            }
        }
    }


    return (
        <div>
            {haveItem
                ? <li>{ingredient.text}<CheckIcon fontSize="small" style={{ color: "blue", marginLeft: 5 }} /></li>
                : <li>{ingredient.text}</li>}
        </div>
    )
}


export default RecipeCompare;