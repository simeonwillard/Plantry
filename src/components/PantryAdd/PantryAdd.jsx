// import dependencies 
import { useState } from "react";
import { useDispatch } from "react-redux";
// import material ui
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ToolTip from '@material-ui/core/Tooltip';

// styles
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    clearBtn: {
        backgroundColor: 'black',
        color: 'white',
        boxShadow: '4px 5px gray'
    },
    addBtn: {
        color: 'blue',

    },
    topBtns: {
        marginLeft: '85%',
        marginBottom: 20
    },
    addForm: {
        textAlign: 'center'
    }
}));

// component to handle add button on pantry table
function PantryAdd({ categories }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    // variable for conditional render of form
    const [readyToAdd, setReadyToAdd] = useState(false);

    // variable to add to the table
    const [addItem, setAddItem] = useState({
        item: '',
        quantity: '',
        unit: '',
        category_id: '',
        staple: '',
        date_purchased: ''
    });

    // function to store user's inputs in addItem object
    const handleChange = (event) => {
        setAddItem({ ...addItem, [event.target.name]: event.target.value });
    }

    // conditionally render add form
    const handelAddDisplay = () => {
        setReadyToAdd(true);

    }

    const handleAddItem = () => {
        // conditionally render add form
        setReadyToAdd(false);
        // dispatches user's inputs to add them to the pantry
        dispatch({ type: 'ADD_PANTRY_ITEM', payload: addItem });
        // resets addItem variable for next add
        setAddItem({
            item: '',
            quantity: '',
            unit: '',
            category_id: '',
            staple: '',
            date_purchased: ''
        });
    }

    const handleCancelAdd = () => {
        // conditionally renders add form
        setReadyToAdd(false);
        // resets addItem variable for next add
        setAddItem({
            item: '',
            quantity: '',
            unit: '',
            category_id: '',
            staple: '',
            date_purchased: ''
        });
    }

    // function to clear entire pantry except the staple items
    const handleClear = () => {
        dispatch({ type: 'DELETE_PANTRY' });
    }

    return (
        <div>
            {!readyToAdd &&
                <div className={classes.topBtns}>
                    <ToolTip title="Add Item">
                        <IconButton className={classes.addBtn} onClick={handelAddDisplay}>
                            <AddBoxIcon fontSize="large" />
                        </IconButton>
                    </ToolTip>
                    <ToolTip title="Delete non-staples">
                        <Button
                            variant="contained"
                            onClick={handleClear}
                            className={classes.clearBtn}
                        >
                            Clear
                        </Button>
                    </ToolTip>
                </div>
            }

            {readyToAdd &&
                <div className={classes.addForm}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Item</InputLabel>
                        <Input
                            type="text"
                            value={addItem.item}
                            name="item"
                            onChange={handleChange}
                            style={{ padding: 3 }}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Quantity</InputLabel>
                        <Input
                            type="text"
                            value={addItem.quantity}
                            name="quantity"
                            onChange={handleChange}
                            style={{ padding: 3 }}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Unit</InputLabel>
                        <Input
                            type="text"
                            value={addItem.unit}
                            name="unit"
                            onChange={handleChange}
                            style={{ padding: 3 }}
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
                    <FormControl className={classes.formControl}>
                        <InputLabel>Staple</InputLabel>
                        <Select
                            value={addItem.staple}
                            name="staple"
                            style={{ padding: 3 }}
                            onChange={handleChange}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormHelperText>Date Purchased</FormHelperText>
                        <Input
                            value={addItem.date_purchased}
                            type="date"
                            name="date_purchased"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <ToolTip title="Add the Item">
                        <Button
                            variant="contained"
                            onClick={handleAddItem}
                            color="primary"
                            style={{ marginLeft: 10 }}
                            size="small"
                        >
                            Add Item
                        </Button>
                    </ToolTip>
                    <ToolTip title="Cancel Add">
                        <Button
                            variant="contained"
                            onClick={handleCancelAdd}
                            style={{ marginLeft: 10, }}
                            color="secondary"
                            size="small"
                        >
                            Cancel
                        </Button>
                    </ToolTip>
                </div>
            }
        </div>
    )
}

export default PantryAdd;