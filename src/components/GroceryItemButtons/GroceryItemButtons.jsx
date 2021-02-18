// import from dependencies 
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

// import from material ui
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import UndoIcon from '@material-ui/icons/Undo';

// styles
const useStyles = makeStyles((theme) => ({
    edit: {
        color: "black",
    },
    buttons: {
        marginLeft: 25,
    },
    purchased: {
        marginLeft: 50
    }
}));

// component to handle and display the buttons on the cards of the grocery list
function GroceryItemButtons({ item, setReadyToEdit, readyToEdit, editItem, setEditItem }) {

    const classes = useStyles();
    const dispatch = useDispatch();

    // when user clicks the "check" marks item as purchased and puts the item
    // into the user's pantry
    const handlePurchase = () => {
        // dispatches item to mark as purchased
        dispatch({ type: 'ITEM_PURCHASED', payload: item });
        dispatch({ type: 'ADD_ITEM_TO_PANTRY', payload: item });
    }

    // deletes item from grocery list
    const handleDelete = () => {
        dispatch({ type: 'DELETE_GROCERY_ITEM', payload: item });
    }

    // conditionally renders and populates form with item to edit
    const handleEdit = () => {
        setReadyToEdit(true);
        setEditItem({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            category_id: item.id
        });
    }

    // conditionally renders and undoes what handelPurchase does
    const handleUndo = () => {
        //dispatch({type: 'DELETE_ITEM_FROM_PANTRY', payload: item});
        // dispatches item to mark as un-purchased 
        Swal.fire({
            title: 'are you sure?',
            text: 'this will undo the purchase',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'blue',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, Undo!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: 'ITEM_PURCHASED', payload: item });
                dispatch({ type: 'DELETE_PANTRY_PURCHASE', payload: item });
            }
        })

    }

    return (
        <div>
            {!item.purchased &&
                <div className={classes.buttons}>
                    <Tooltip title="Purchase Item">
                        <IconButton color="primary" onClick={handlePurchase}>
                            <DoneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Item">
                        <IconButton onClick={handleEdit} className={classes.edit}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Item">
                        <IconButton color="secondary" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            }
            {item.purchased &&
                <div className={classes.purchased}>
                    <p><b>Purchased!</b></p>
                    <Tooltip title="Undo Purchase">
                        <IconButton color="primary" onClick={handleUndo}>
                            <UndoIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Item">
                        <IconButton color="secondary" size="small" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                </div>
            }

        </div>
    )
}

export default GroceryItemButtons;