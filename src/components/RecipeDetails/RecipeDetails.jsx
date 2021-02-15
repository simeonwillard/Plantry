
function RecipeDetails({ ingredients }) {

    return (
        <>
           
                <h5>Ingredients</h5>{ingredients.map((ingredient, i) => {
                    return (
                        <ul key={i}>
                            <li>{ingredient.text}</li>
                        </ul>
                    )
                })}
           </>
    )
}

export default RecipeDetails;