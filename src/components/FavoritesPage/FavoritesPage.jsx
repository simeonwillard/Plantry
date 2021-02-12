import { useDispatch, useSelector } from "react-redux";
import { useEffect} from 'react';
import FavoritesList from "../FavoritesList/FavoritesList";




function FavoritesPage() {

    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favoritesReducer);


    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITES' })
    }, []);





    return (
        <div>
            <h1>Favorites</h1>
            {favorites.map((favorite) => {
                return (
                    <FavoritesList favorite={favorite} />
                )
            })}
        </div>
    )
}

export default FavoritesPage;