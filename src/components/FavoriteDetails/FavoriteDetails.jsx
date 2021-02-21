import FavoritesCompare from "../FavoritesCompare/FavoritesCompare";


function FavoriteDetails({ favorite }) {

    return (
        <div>
            <h5>Ingredients</h5>

            {favorite.ingredients.map((ingredient, i) => {

                return (
                    <ul key={i}>
                        <FavoritesCompare ingredient={ingredient} />
                    </ul>
                )
            })}

        </div>
    )
}


export default FavoriteDetails;