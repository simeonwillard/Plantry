
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from '@material-ui/icons/Check';

function FavoritesCompare({ ingredient }) {

    // getting food items from pantry
    const pantry = useSelector(state => state.pantryReducer);
    // array to store just the food names
    const foodInPantry = [];
    const [haveItem, setHaveItem] = useState(false);

    const dispatch = useDispatch();
    // storing the food from the pantry in the array
    for (let product of pantry) {
        foodInPantry.push(product.item);
    }

    useEffect(() => {
        compare();
        dispatch({ type: 'FETCH_FAVORITES' });
        dispatch({ type: 'FETCH_PANTRY' });
    }, []);


    const compare = () => {
        for (let food of foodInPantry) {
            const regularExpression = new RegExp(`${food}`, 'gi')

            if (regularExpression.test(ingredient.name)) {
                setHaveItem(true);
            }
        }
    }

    return (
        <div>

            {haveItem
                ? <li>{ingredient.name}<CheckIcon fontSize="small" style={{ color: "blue", marginLeft: 5 }} /></li>
                : <li>{ingredient.name}</li>}
        </div>
    )
}


export default FavoritesCompare;