

function FavoriteDetails({ favorite }) {


    return (
        <div>
            <h5>Ingredients</h5>

            {favorite.ingredients.map((ingredient, i) => (
                <ul key={i}>
                    <li>{ingredient}</li>
                </ul>
            ))}

        </div>
    )


}


export default FavoriteDetails;