import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

// component to control the edit button
function PantryEdit({ cupboard, edit, setEdit, editItem, setEditItem }) {


    const handleClick = () => {
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
        <IconButton color="primary" onClick={handleClick}>
            <EditIcon />
        </IconButton>
    )
}

export default PantryEdit;