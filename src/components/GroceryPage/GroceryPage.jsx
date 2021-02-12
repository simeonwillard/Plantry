import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroceryList from './GroceryAddForm';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import GroceryItemButtons from "./GroceryItemButtons";
import AddBoxIcon from '@material-ui/icons/AddBox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import GroceryAddForm from "./GroceryAddForm";

const useStyles = makeStyles((theme) => ({
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


// component to display the user's grocery list 
function GroceryPage() {

    const classes = useStyles();


    const [editItem, setEditItem] = useState({
        id: '',
        name: '',
        quantity: '',
        unit: '',
        category_id: ''
    });

    const [readyToEdit, setReadyToEdit] = useState(false);
    const groceries = useSelector(state => state.groceryReducer);
    const categories = useSelector(state => state.categoryReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_GROCERY_LIST' });
        dispatch({ type: 'FETCH_GROCERY_CATEGORIES' });
    }, []);


    const handleChange = (event) => {
        setEditItem({ ...editItem, [event.target.name]: event.target.value });
    }

 

    const handleSubmitEdit = () => {

        dispatch({type: 'EDIT_GROCERY_LIST', payload: editItem});
        setReadyToEdit(false);
        setEditItem({
            id: '',
            name: '',
            quantity: '',
            unit: '',
            category_id: ''
        });
    }

    const handleCancelEdit = () => {
        setReadyToEdit(false);
        setEditItem({
            id: '',
            name: '',
            quantity: '',
            unit: '',
            category_id: ''
        });
    }

   


    return (
        <div>
            <div>
                <h1>Grocery List</h1>
            </div>
            <br />
            <br />
            <div>
                {!readyToEdit &&
                    <div>
                        <GroceryAddForm categories={categories}/>
                    </div>
                }
                {readyToEdit &&
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Name</InputLabel>
                            <Input
                                type="text"
                                value={editItem.name}
                                name="name"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>quantity</InputLabel>
                            <Input
                                value={editItem.quantity}
                                name="quantity"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Unit</InputLabel>
                            <Input
                                value={editItem.unit}
                                name="unit"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={editItem.category_id}
                                name="category_id"
                                onChange={handleChange}
                            >
                                <MenuItem value={categories[0].id}>baking</MenuItem>
                                <MenuItem value={categories[1].id}>canned</MenuItem>
                                <MenuItem value={categories[2].id}>dairy</MenuItem>
                                <MenuItem value={categories[3].id}>produce</MenuItem>
                                <MenuItem value={categories[4].id}>meat</MenuItem>
                                <MenuItem value={categories[5].id}>beverages</MenuItem>
                                <MenuItem value={categories[6].id}>frozen</MenuItem>
                                <MenuItem value={categories[7].id}>misc.</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" size="small" onClick={handleSubmitEdit}>
                            Update
                        </Button>
                        <Button variant="contained" size="small" onClick={handleCancelEdit}>
                            cancel
                        </Button>
                    </div>
                }
            </div>
            <div>
                <Grid container spacing={2}>
                    {groceries.map((item) => {
                        return (
                            <div>
                                <Grid key={item.id} item xs={3}>
                                    <Card key={item.id} className={classes.root} variant="outlined">
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
                                            <GroceryItemButtons
                                                item={item}
                                                readyToEdit={readyToEdit}
                                                setReadyToEdit={setReadyToEdit}
                                                editItem={editItem}
                                                setEditItem={setEditItem}
                                            />
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