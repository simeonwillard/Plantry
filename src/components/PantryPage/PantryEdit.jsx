import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch } from 'react-redux';

function PantryEdit({ cupboard, edit, setEdit, editItem, setEditItem }) {

    const dispatch = useDispatch();

    const handleClick = (event) => {
        setEdit(!edit);
        setEditItem({
            id: cupboard.id,
            item: cupboard.item,
            staple: cupboard.staple,
            refrigerated: cupboard.refrigerated,
            date_purchased: cupboard.date_purchased
        });

        // console.log(edit)
    }

    return (
        <IconButton color="primary" onClick={handleClick} edit={edit}>
            <EditIcon />
        </IconButton>
    )
}

export default PantryEdit;