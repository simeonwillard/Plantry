
function RecipeDetails({ingredients}) {

    return ingredients.map((ingredient, i) => {
        return (
            <ul key={i}>
                <li>{ingredient.text}</li>
            </ul>
        )
    }) 
}

export default RecipeDetails;