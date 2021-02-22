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
import Swal from 'sweetalert2';

// styles
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        textAlign: "center",
    },
    addFormBtn: {
        margin: 10,
        backgroundColor: '#3f51b5',
        color: 'white',
        webkitBoxShadow: '3px 15px 20px 10px rgba(0,0,0,0.73)',
        mozBoxShadow: '3px 15px 20px 10px rgba(0, 0, 0, 0.73)',
        boxShadow: '3px 10px 20px 10px rgba(0, 0, 0, 0.73)',
        border: '1px solid gray'

    },
    clearBtn: {
        color: 'white',
        backgroundColor: 'black',
        webkitBoxShadow: '3px 15px 20px 10px rgba(0,0,0,0.73)',
        mozBoxShadow: '3px 15px 20px 10px rgba(0, 0, 0, 0.73)',
        boxShadow: '3px 10px 20px 10px rgba(0, 0, 0, 0.73)',
        border: '1px solid gray'
    },
    topBtns: {
        marginLeft: '70%'
    },
    addForm: {
        textAlign: "center",
    },
    cancelBtn: {
        webkitBoxShadow: '3px 15px 20px 10px rgba(0,0,0,0.73)',
        mozBoxShadow: '3px 15px 20px 10px rgba(0, 0, 0, 0.73)',
        boxShadow: '3px 10px 20px 10px rgba(0, 0, 0, 0.73)',
        border: '1px solid gray'
    },
    formColor: {
        color: 'aliceblue',
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
        Swal.fire({
            title: 'are you sure?',
            text: 'this will delete your entire list',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'blue',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, delete list!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'CLEAR_GROCERY_LIST' });
            }
        })
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
                    <div>
                        <h5 style={{color: 'gray'}}>Add and clear from list</h5>
                    </div>
                    <Tooltip title="Add an Item">
                        <IconButton onClick={handleReadyToAddItem} style={{ color: 'lightblue' }}>
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
                        <InputLabel className={classes.formColor}>Name</InputLabel>
                        <Input
                            type="text"
                            value={addItem.name}
                            name="name"
                            onChange={handleChange}
                            className={classes.formColor}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel className={classes.formColor}>quantity</InputLabel>
                        <Input
                            value={addItem.quantity}
                            name="quantity"
                            onChange={handleChange}
                            className={classes.formColor}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel className={classes.formColor}>Unit</InputLabel>
                        <Input
                            value={addItem.unit}
                            name="unit"
                            onChange={handleChange}
                            className={classes.formColor}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel className={classes.formColor}>Category</InputLabel>
                        <Select
                            value={addItem.category_id}
                            name="category_id"
                            onChange={handleChange}
                            className={classes.formColor}
                        >
                            <MenuItem value={categories[0].id}>baking</MenuItem>
                            <MenuItem value={categories[1].id}>canned</MenuItem>
                            <MenuItem value={categories[2].id}>dairy</MenuItem>
                            <MenuItem value={categories[3].id}>produce</MenuItem>
                            <MenuItem value={categories[4].id}>meat</MenuItem>
                            <MenuItem value={categories[5].id}>beverages</MenuItem>
                            <MenuItem value={categories[6].id}>frozen</MenuItem>
                            <MenuItem value={categories[7].id}>misc.</MenuItem>
                            <MenuItem value={categories[8].id}>spices</MenuItem>

                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        size="small"
                        className={classes.addFormBtn}
                        onClick={handleSubmitItem}
                    >
                        Add Item
                    </Button>
                    <Tooltip title="Cancel Item">
                        <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            className={classes.cancelBtn}
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