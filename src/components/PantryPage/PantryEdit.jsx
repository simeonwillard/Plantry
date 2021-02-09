import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';

function PantryEdit({ cupboard, edit, setEdit }) {

    const dispatch = useDispatch();

    const handleClick = (event) => {
        // dispatch({ type: 'EDIT_PANTRY', payload: cupboard });
        setEdit(!edit);
        // console.log(edit)
    }

    return (
        <IconButton color="primary" onClick={handleClick} edit={edit}>
            <EditIcon />
        </IconButton>
    )
}

export default PantryEdit;