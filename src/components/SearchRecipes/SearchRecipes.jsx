import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import Recipes from "../Recipes/Recipes";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

// styles
const useStyles = makeStyles((theme) => ({
    form: {
        textAlign: 'center',
        padding: 70,
    },
    grid: {
        flexBox: 'wrap'
    }
}))

// component to search recipes from edamam API
function SearchRecipes() {

    const classes = useStyles();

    // variable to store user's search input
    const [userQuery, setUserQuery] = useState('');
    const dispatch = useDispatch();

    // results from edamam API
    const searchResults = useSelector((state) => state?.getSearchResults);

    // dispatching user's input to edamam
    const handleSubmit = () => {
        dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: userQuery });
        setUserQuery('');
    }

    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center' }}>Search Recipes</h1>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Input
                        type="text"
                        placeholder="Search Recipes"
                        onChange={(event) => setUserQuery(event.target.value)}
                        value={userQuery}
                    />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </form>
                <div>
                    {/* <Grid container spacing={2} className={classes.grid}> */}
                    <Grid  container spacing={3} style={{ marginLeft: 20, marginRight: 20 }}>
                        {searchResults && searchResults.map((recipe, i) => {
                            return (
                                <Grid key={i} item xs={3}>
                                    <Recipes key={i} recipe={recipe} />
                                </Grid>
                            )
                        })}
                    </Grid>
                    {/* </Grid> */}
                </div>
            </div>

        </div>

    )
}

export default SearchRecipes;