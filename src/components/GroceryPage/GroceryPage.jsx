import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroceryList from './GroceryList';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import GroceryItemButtons from "./GroceryItemButtons";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        textAlign: "center"
    },
    title: {
        fontSize: 24,
        
    },
    pos: {
        marginBottom: 12,
    },
    
});


// component to display the user's grocery list 
function GroceryPage() {

    const classes = useStyles();


    const [purchasedItem, setPurchasedItem] = useState(false);
    const groceries = useSelector(state => state.groceryReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_GROCERY_LIST' });
    }, []);


    const handlePurchase = () => {
        setPurchasedItem(true);
    }


    return (
        <div>
            <h1>GroceryList</h1>
            <div>
                <Grid container spacing={2}>
                    {groceries.map((item) => {
                        return (
                            <div>
                                <Grid key={item.id} item xs={3}>
                                    <Card className={classes.root} variant="outlined">
                                        <CardContent>
                                            <Typography className={classes.title} gutterBottom>
                                                <b>{item.name}</b>
                                            </Typography>
                                            <Typography variant="h6" component="h4">
                                                {item.quantity} <em>{item.unit}</em> 
                                                
                                            </Typography>
                                           <br />
                                            <Typography className={classes.pos} color="textSecondary">
                                                {item.category}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <GroceryItemButtons item={item}/>
                                        </CardActions>
                                    </Card>
                                </Grid>

                            </div>
                        )
                    })}
                </Grid>
            </div>
        </div>
    )
}

export default GroceryPage;