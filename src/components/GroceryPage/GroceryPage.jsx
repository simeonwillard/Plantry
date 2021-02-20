// import from dependencies 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import from components 
import GroceryAddForm from "../GroceryAddForm/GroceryAddForm";
import GroceryItemButtons from "../GroceryItemButtons/GroceryItemButtons";
import './GroceryPage.css'
// import from material ui
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
    baking: {
        backgroundColor: "lightyellow",
        minWidth: 210,
        textAlign: "center",
        margin: 20,
    },
    canned: {
        minWidth: 210,
        textAlign: "center",
        margin: 20,
        backgroundColor: "#ffcc80",
    }, 
    dairy: {
        minWidth: 210,
        textAlign: "center",
        margin: 20,
        backgroundColor: "#80cbc4",
    },
    produce: {
        minWidth: 210,
        textAlign: "center",
        margin: 20,
        backgroundColor: "lightgreen",
    },
    meat: {
        minWidth: 210,
        textAlign: "center",
        margin: 20,
        backgroundColor: "lightpink",
    },
    frozen: {
        minWidth: 210,
        textAlign: "center",
        margin: 20,
        backgroundColor: "lightblue",
    },
    misc: {
        minWidth: 210,
        textAlign: "center",
        margin: 20,
        backgroundColor: "lightgrey",
    },
    beverages: {
        minWidth: 210,
        textAlign: "center",
        margin: 20,
        backgroundColor: "#e1bee7",
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
    updateBtn: {
        margin: theme.spacing(1),
        backgroundColor: '#3f51b5',
        color: 'white',
        webkitBoxShadow: '3px 15px 20px 10px rgba(0,0,0,0.73)',
        mozBoxShadow: '3px 15px 20px 10px rgba(0, 0, 0, 0.73)',
        boxShadow: '3px 10px 20px 10px rgba(0, 0, 0, 0.73)',
        border: '1px solid gray'
    },
    grid: {
        padding: 40
    },
    cancelBtn: {
        webkitBoxShadow: '3px 15px 20px 10px rgba(0,0,0,0.73)',
        mozBoxShadow: '3px 15px 20px 10px rgba(0, 0, 0, 0.73)',
        boxShadow: '3px 10px 20px 10px rgba(0, 0, 0, 0.73)',
        border: '1px solid gray'
    }
    
}));



// component to display the user's grocery list 
function GroceryPage() {

    // use material ui styling
    const classes = useStyles();

    function classNameGenerator(item) {

                        
        let itemClass = '';
    
        switch (item.category) {
            case 'baking':
                return itemClass = classes.baking;
            case 'canned':
                return itemClass = classes.canned;
            case 'dairy':
                return itemClass = classes.dairy;
            case 'produce':
                return itemClass = classes.produce;
            case 'meat':
                return itemClass = classes.meat;
            case 'beverages':
                return itemClass = classes.beverages;
            case 'frozen':
                return itemClass = classes.frozen;
            case 'misc.':
                return itemClass = classes.misc;
            default:
                return itemClass;
        }
    }

    // variable to store the edited item
    const [editItem, setEditItem] = useState({
        id: '',
        name: '',
        quantity: '',
        unit: '',
        category_id: ''
    });

    // variable for conditional rendering of the edit
    const [readyToEdit, setReadyToEdit] = useState(false);
    // storing the user's grocery list from the db
    const groceries = useSelector(state => state.groceryReducer);
    // storing the grocery categories for the select form
    const categories = useSelector(state => state.categoryReducer);
    const dispatch = useDispatch();

    // populating the grocery list and category reducers on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_GROCERY_LIST' });
        dispatch({ type: 'FETCH_GROCERY_CATEGORIES' });
    }, []);


    // storing the user's edit inputs in editItem
    const handleChange = (event) => {
        setEditItem({ ...editItem, [event.target.name]: event.target.value });
    }

    // dispatching the updated item to the db
    const handleSubmitEdit = () => {

        dispatch({ type: 'EDIT_GROCERY_LIST', payload: editItem });
        // conditional render
        setReadyToEdit(false);
        // resetting the editItem for next edit
        setEditItem({
            id: '',
            name: '',
            quantity: '',
            unit: '',
            category_id: ''
        });
    }

    // cancels user's edit
    const handleCancelEdit = () => {
        // conditional render
        setReadyToEdit(false);
        // resetting the editItem for next edit
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
                <h1 style={{textAlign: 'center', color: 'lightblue'}}>Grocery List</h1>
            </div>
            <br />
            <br />
            <div>
                {!readyToEdit &&
                    <div>
                        <GroceryAddForm categories={categories} />
                    </div>
                }
                {readyToEdit &&
                    <div id="editForm">
                        <FormControl className={classes.formControl}>
                            <InputLabel style={{color: 'aliceblue'}}>Name</InputLabel>
                            <Input
                                type="text"
                                value={editItem.name}
                                name="name"
                                onChange={handleChange}
                                style={{color: 'aliceblue'}}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel style={{color: 'aliceblue'}}>quantity</InputLabel>
                            <Input
                                value={editItem.quantity}
                                name="quantity"
                                onChange={handleChange}
                                style={{color: 'aliceblue'}}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel style={{color: 'aliceblue'}}>Unit</InputLabel>
                            <Input
                                value={editItem.unit}
                                name="unit"
                                onChange={handleChange}
                                style={{color: 'aliceblue'}}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel style={{color: 'aliceblue'}}>Category</InputLabel>
                            <Select
                                value={editItem.category_id}
                                name="category_id"
                                onChange={handleChange}
                                style={{color: 'aliceblue'}}
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
                        <Button
                            className={classes.updateBtn}
                            variant="contained" size="small"
                            onClick={handleSubmitEdit}
                        >
                            Update
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleCancelEdit}
                            color="secondary"
                            className={classes.cancelBtn}
                        >
                            cancel
                        </Button>
                    </div>
                }
            </div>
            <div>
                <Grid container spacing={4} className={classes.grid}>
                    {groceries.map((item) => {
                    //    let itemClass = item.category;
                    let itemClass = classNameGenerator(item);
                       console.log(itemClass)
                        return (

                            <div>
                                <Grid key={item.id} item xs={3}>
                                    <Card 
                                    key={item.id} 
                                    className={itemClass} 
                                    variant="outlined">
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