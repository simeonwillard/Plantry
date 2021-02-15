import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import ToolTip from '@material-ui/core/Tooltip';

// component to handle delete buttons on table
function PantryDelete({ cupboard }) {

    const dispatch = useDispatch();

    const handleDelete = () => {
        // dispatching item to delete
        dispatch({ type: 'DELETE_PANTRY_ITEM', payload: cupboard });
    }

    return (
        <ToolTip title="Delete Item">
            <IconButton color="secondary" onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
        </ToolTip>
    )
}

export default PantryDelete;