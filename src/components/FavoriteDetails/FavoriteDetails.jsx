
import FavoritesCompare from "../../FavoritesCompare/FavoritesCompare";


function FavoriteDetails({ favorite }) {



    // const pantry = useSelector(state => state.pantryReducer);
    // const [haveItem, setHaveItem] = useState(false);

    // const foodInPantry = [];

    // for (let product of pantry) {
    //     foodInPantry.push(product.item);
    // }
    // // console.log(foodInPantry)
    // // console.log(favorite.ingredients)

    // // const regularExpression = new RegExp(``)

    // () => {
    //     for (let food of foodInPantry) {
    //         const regularExpression = new RegExp(`${food}`, 'gi')
    //         for (let ingredient of favorite.ingredients) {
    //             if (regularExpression.test(ingredient)) {
    //                  setHaveItem(true);
    //                  break;
    //             }
    //         }
    //     }
    // }

    return (
        <div>
            <h5>Ingredients</h5>

            {favorite.ingredients.map((ingredient, i) => {

                return (
                    <ul key={i}>
                        <FavoritesCompare favorite={favorite} ingredient={ingredient}/>
                    </ul>
                )
            })}

        </div>
    )


}


export default FavoriteDetails;