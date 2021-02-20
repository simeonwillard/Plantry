
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
        dispatch({type: 'FETCH_FAVORITES'})
    }, []);

    // comparing ingredients of the recipe to the items in the pantry
    const compare = () => {
        for (let food of foodInPantry) {

            const regularExpression = new RegExp(`${food}`, 'gi');

            for (let ingredient of favorite.ingredients) {
                // if that ingredient is in the pantry, set in_pantry to true, else false
                if (regularExpression.test(ingredient.name)) {
                    dispatch({ type: 'SET_IN_PANTRY', payload: {id: ingredient.id, in_pantry: true } });
                } else if (ingredient.in_pantry) {
                    dispatch({type: 'SET_IN_PANTRY', payload: {id: ingredient.id, in_pantry: false} })
                }
            }
        }
    }


    return (
        <div>
            {ingredient.in_pantry 
            ? <li>{ingredient.name}<CheckIcon fontSize="small" style={{color: "blue", marginLeft: 5}}/></li> 
            : <li>{ingredient.name}</li>}
        </div>
    )
}


export default FavoritesCompare;