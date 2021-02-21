import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import FavoritesList from "../FavoritesList/FavoritesList";
import Grid from '@material-ui/core/Grid';



// component to display the user's favorite recipes 
function FavoritesPage() {

    const dispatch = useDispatch();
    // stores all the user's favorite recipes
    const favorites = useSelector((state) => state.favoritesReducer);



    useEffect(() => {
        // displays the user's favorites on the DOM on page load
        dispatch({ type: 'FETCH_FAVORITES' });
        dispatch({ type: 'FETCH_PANTRY' });
    }, []);



    return (
        <div>
            <h1 style={{ textAlign: 'center', padding: 40, color: 'lightblue' }}>Favorites</h1>
            <div>
                <Grid container spacing={3} style={{ marginLeft: 20, marginRight: 20 }}>

                    {favorites.map((favorite) => {
                        return (
                            <Grid key={favorite.id} item xs={3}>
                                <FavoritesList favorite={favorite} />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </div>
    )
}

export default FavoritesPage;