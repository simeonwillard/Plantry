import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import Recipes from "../Recipes/Recipes";




function SearchRecipes() {

    

    const [userQuery, setUserQuery] = useState('');
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state?.getSearchResults);
    console.log(searchResults)
    
    useEffect(() => {

    }, [searchResults]);

   

    const handleSubmit = (event) => {
        dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: userQuery });
        console.log(userQuery);
        setUserQuery('');
    }

    return (
        <div>
            <div>
                <h1>Search Recipes</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="search recipes"
                        onChange={(event) => setUserQuery(event.target.value)}
                        value={userQuery}
                    />
                    <input
                        type="submit"
                        value="search"
                    />
                </form>
            </div>
            <div>
                    {searchResults && searchResults.map((recipe, i) => {
                        return (
                            <Recipes key={i} recipe={recipe} />
                        )
                    })}
            </div>
        </div>

    )
}

export default SearchRecipes;