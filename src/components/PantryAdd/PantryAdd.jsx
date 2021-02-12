import { useState } from "react";

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
import { useDispatch } from "react-redux";

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
}));

function PantryAdd() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [readyToAdd, setReadyToAdd] = useState(false);

    // variable to add to the table
    const [addItem, setAddItem] = useState({
        item: '',
        staple: '',
        refrigerated: '',
        date_purchased: ''
    });


    const handleChange = (event) => {
        setAddItem({ ...addItem, [event.target.name]: event.target.value });
    }

    const handelAddDisplay = () => {
        setReadyToAdd(true);

    }

    const handleAddItem = () => {
        setReadyToAdd(false);
        dispatch({ type: 'ADD_PANTRY_ITEM', payload: addItem });

    }

    const handleCancelAdd = () => {
        setReadyToAdd(false);
        setAddItem({
            item: '',
            staple: '',
            refrigerated: '',
            date_purchased: ''
        })
    }

    const handleClear = () => {
        dispatch({ type: 'DELETE_PANTRY' });
    }

    return (
        <div>
            {!readyToAdd &&
                <div>
                    <IconButton onClick={handelAddDisplay}>
                        <AddBoxIcon fontSize="large" />
                    </IconButton>
                    <Button variant="contained" onClick={handleClear}>
                        Clear
                    </Button>
                </div>
            }

            {readyToAdd &&
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Item</InputLabel>
                        <Input
                            type="text"
                            value={addItem.item}
                            name="item"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Staple</InputLabel>
                        <Select
                            value={addItem.staple}
                            name="staple"
                            onChange={handleChange}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Refrigerated</InputLabel>
                        <Select
                            value={addItem.refrigerated}
                            name="refrigerated"
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
                    <Button variant="contained" onClick={handleAddItem}>
                        Add Item
                        </Button>
                    <Button variant="contained" onClick={handleCancelAdd}>
                        Cancel
                        </Button>
                </div>
            }
        </div>
    )
}

export default PantryAdd;