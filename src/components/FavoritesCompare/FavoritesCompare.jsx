
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from '@material-ui/icons/Check';

function FavoritesCompare({ ingredient, favorite }) {

    const pantry = useSelector(state => state.pantryReducer);

    const foodInPantry = [];
    const dispatch = useDispatch();

    for (let product of pantry) {
        foodInPantry.push(product.item);
    }

    useEffect(() => {
        compare();
        dispatch({ type: 'FETCH_FAVORITES' });
        dispatch({ type: 'FETCH_PANTRY' });
    }, []);

    console.log(favorite.ingredients);
    // comparing ingredients of the recipe to the items in the pantry
    const compare = () => {
        for (let food of foodInPantry) {

            // const regularExpression = new RegExp(`${food}`, 'gi');

            for (let ingredient of favorite?.ingredients) {
                // if that ingredient is in the pantry, set in_pantry to true, else false
                if (ingredient?.name.includes(food)) {
                    dispatch({ type: 'SET_IN_PANTRY', payload: { id: ingredient.id, in_pantry: true } });
                }
            }
        }
    }




    return (
        <div>

            {ingredient.in_pantry
                ? <li>{ingredient.name}<CheckIcon fontSize="small" style={{ color: "blue", marginLeft: 5 }} /></li>
                : <li>{ingredient.name}</li>}
        </div>
    )
}


export default FavoritesCompare;