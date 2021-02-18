import RecipeCompare from "../RecipeCompare/RecipeCompare"

function RecipeDetails({ ingredients }) {

    return (
        <>
           
                <h5>Ingredients</h5>{ingredients.map((ingredient, i) => {
                    return (
                        <ul key={i}>
                            <RecipeCompare ingredient={ingredient}/>
                        </ul>
                    )
                })}
           </>
    )
}

export default RecipeDetails;