// import from material ui
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
// import from dependencies
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// styles
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        textAlign: "center"
    },
    addBtn: {
        margin: 10
    },
    clearBtn: {
        color: "white",
        backgroundColor: "black",
    },
    topBtns: {
        textAlign: "right",
        marginRight: 140,
    },
    addForm: {
        textAlign: "center"
    }

}));

// component to handle the add item to grocery list form & buttons
function GroceryAddForm({ categories }) {

    const classes = useStyles();

    const dispatch = useDispatch();
    // conditional rendering for form
    const [readyToAddItem, setReadyToAddItem] = useState(false);
    // variable to store user's new item
    const [addItem, setAddItem] = useState({
        name: '',
        quantity: '',
        unit: '',
        category_id: '',
    })
    // activating conditional render
    const handleReadyToAddItem = () => {
        setReadyToAddItem(true);
    }

    // dispatching user's new item to the db and resetting the item variable
    const handleSubmitItem = () => {
        dispatch({ type: 'ADD_TO_GROCERY', payload: addItem });
        setAddItem({
            name: '',
            quantity: '',
            unit: '',
            category_id: '',
        })
    }

    // storing user's form inputs in the item variable
    const handleChange = (event) => {
        setAddItem({ ...addItem, [event.target.name]: event.target.value });
    }

    // deleting entire grocery list
    const handleClear = () => {
        dispatch({ type: 'CLEAR_GROCERY_LIST' });
    }
    // canceling the add item form and conditional rendering
    const handleCancelAdd = () => {
        setReadyToAddItem(false);
        setAddItem({
            name: '',
            quantity: '',
            unit: '',
            category_id: '',
        })
    }

    return (
        <div>
            {!readyToAddItem &&
                <div className={classes.topBtns}>
                    <Tooltip title="Add an Item">
                        <IconButton onClick={handleReadyToAddItem} color="primary">
                            <AddBoxIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Clear Entire List">
                        <Button variant="contained" onClick={handleClear} className={classes.clearBtn}>
                            Clear
                        </Button>
                    </Tooltip>
                </div>
            }
            {readyToAddItem &&
                <div className={classes.addForm}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Name</InputLabel>
                        <Input
                            type="text"
                            value={addItem.name}
                            name="name"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>quantity</InputLabel>
                        <Input
                            value={addItem.quantity}
                            name="quantity"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Unit</InputLabel>
                        <Input
                            value={addItem.unit}
                            name="unit"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={addItem.category_id}
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
                    <Button 
                    variant="contained" 
                    size="small" 
                    color="primary" 
                    className={classes.addBtn}
                    onClick={handleSubmitItem}
                    >
                        Add Item
                    </Button>
                    <Tooltip title="Cancel Item">
                        <Button 
                        variant="contained" 
                        size="small" 
                        color="secondary" 
                        onClick={handleCancelAdd}
                        >
                            cancel
                        </Button>
                    </Tooltip>
                </div>
            }




        </div>
    )
}

export default GroceryAddForm;