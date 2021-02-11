
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';


function GroceryItemButtons({ item }) {

    const dispatch = useDispatch();

    const handlePurchase = () => {
        dispatch({ type: 'ITEM_PURCHASED', payload: item });
        dispatch({type: 'ADD_ITEM_TO_PANTRY', payload: item});
    }


    const handleDelete = () => {
        dispatch({type: 'DELETE_GROCERY_ITEM', payload: item});
    }

    return (
        <div>
            {!item.purchased &&
                <div>
                    <IconButton color="primary" onClick={handlePurchase}>
                        <DoneIcon />
                    </IconButton>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
            {item.purchased &&
                <div>
                    <b><h2>Purchased!</h2></b>
                    <IconButton color="secondary" size="small" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            }

        </div>
    )
}

export default GroceryItemButtons;