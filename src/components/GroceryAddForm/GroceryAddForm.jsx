
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

}));

function GroceryAddForm({ categories }) {

    const classes = useStyles();

    const dispatch = useDispatch();
    const [readyToAddItem, setReadyToAddItem] = useState(false);
    const [addItem, setAddItem] = useState({
        name: '',
        quantity: '',
        unit: '',
        category_id: '',
    })

    const handleReadyToAddItem = () => {
        setReadyToAddItem(true);
    }

    const handleSubmitItem = () => {
        dispatch({ type: 'ADD_TO_GROCERY', payload: addItem });
        setAddItem({
            name: '',
            quantity: '',
            unit: '',
            category_id: '',
        })
    }

    const handleChange = (event) => {
        setAddItem({ ...addItem, [event.target.name]: event.target.value });
    }

    const handleClear = () => {
        dispatch({ type: 'CLEAR_GROCERY_LIST' });
    }

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
                <div>
                    <IconButton onClick={handleReadyToAddItem}>
                        <AddBoxIcon fontSize="large" />
                    </IconButton>
                    <Button variant="contained" onClick={handleClear}>
                        Clear
                    </Button>
                </div>
            }
            {readyToAddItem &&
                <div>
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
                    <Button variant="contained" size="small" onClick={handleSubmitItem}>
                        Add Item
                        </Button>
                    <Button variant="contained" size="small" onClick={handleCancelAdd}>
                        cancel
                        </Button>
                </div>
            }




        </div>
    )
}

export default GroceryAddForm;