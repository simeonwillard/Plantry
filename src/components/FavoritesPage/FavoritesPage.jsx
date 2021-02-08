import { useEffect } from "react";
import { useDispatch } from "react-redux";








function FavoritesPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_FAVORITES'})
    }, []);


    return (
        <div>
            <h1>Favorites</h1>
        </div>
    )
}

export default FavoritesPage;