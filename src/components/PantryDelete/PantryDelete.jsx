import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';


function PantryDelete({ cupboard }) {

    const dispatch = useDispatch();

    const handleDelete = () => {
        console.log(cupboard.id);
        dispatch({type: 'DELETE_PANTRY_ITEM', payload: cupboard});
    }

    return (
        <IconButton color="secondary" onClick={handleDelete}>
            <DeleteIcon />
        </IconButton>
    )
}

export default PantryDelete;