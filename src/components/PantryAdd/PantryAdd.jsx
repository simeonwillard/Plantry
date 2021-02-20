// import dependencies 
import { useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginBottom: 40
    },
    selectEmpty: {
        marginTop: theme.spacing(2),

    },
    clearBtn: {
        backgroundColor: 'black',
        color: 'white',
        // boxShadow: '3px 13px black',
        webkitBoxShadow: '3px 15px 20px 10px rgba(0,0,0,0.73)',
        mozBoxShadow: '3px 15px 20px 10px rgba(0, 0, 0, 0.73)',
        boxShadow: '3px 10px 20px 10px rgba(0, 0, 0, 0.73)',
        border: '1px solid gray'
    },
    addBtn: {
        color: 'lightblue',

    },
    topBtns: {
        marginLeft: '73%',
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
        Swal.fire({
            title: 'Are you sure?',
            text: 'which items would you like to delete?',
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: 'black',
            confirmButtonText: 'delete non-staples',
            showDenyButton: true,
            denyButtonText: 'delete all items'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'DELETE_NON_STAPLES' })
            } else if (result.isDenied) {
                dispatch({ type: 'DELETE_PANTRY' });

            }
        })

    }

    return (
        <div>
            {!readyToAdd &&
                <div className={classes.topBtns}>
                    <div>
                        <h5 style={{ color: 'gray' }}>add and clear from pantry</h5>
                    </div>
                    <ToolTip title="Add Item">
                        <IconButton className={classes.addBtn} onClick={handelAddDisplay}>
                            <AddBoxIcon fontSize="large" />
                        </IconButton>
                    </ToolTip>
                    <ToolTip title="Delete Table">
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
                        <InputLabel style={{ color: 'aliceblue' }}>Item</InputLabel>
                        <Input
                            type="text"
                            value={addItem.item}
                            name="item"
                            onChange={handleChange}
                            style={{ padding: 3, color: 'aliceblue' }}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel style={{ color: 'aliceblue' }}>Quantity</InputLabel>
                        <Input
                            type="text"
                            value={addItem.quantity}
                            name="quantity"
                            onChange={handleChange}
                            style={{ padding: 3, color: 'aliceblue' }}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel style={{ color: 'aliceblue' }}>Unit</InputLabel>
                        <Input
                            type="text"
                            value={addItem.unit}
                            name="unit"
                            onChange={handleChange}
                            style={{ padding: 3, color: 'aliceblue' }}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel style={{ color: 'aliceblue' }}>Category</InputLabel>
                        <Select
                            value={addItem.category_id}
                            name="category_id"
                            onChange={handleChange}
                            style={{ padding: 3, color: 'aliceblue' }}
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
                        <InputLabel style={{ color: 'aliceblue' }}>Staple</InputLabel>
                        <Select
                            value={addItem.staple}
                            name="staple"
                            style={{ padding: 3 }}
                            onChange={handleChange}
                            style={{ padding: 3, color: 'aliceblue' }}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormHelperText style={{ color: 'aliceblue' }}>Date Purchased</FormHelperText>
                        <Input
                            value={addItem.date_purchased}
                            type="date"
                            name="date_purchased"
                            onChange={handleChange}
                            style={{ color: 'aliceblue' }}
                        />
                    </FormControl>
                    <ToolTip title="Add the Item">
                        <Button
                            variant="contained"
                            onClick={handleAddItem}
                            color="primary"
                            style={{ marginLeft: 10, backgroundColor: '#3f51b5' }}
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