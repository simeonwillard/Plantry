import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/Tooltip';

// component to control the edit button
function PantryEdit({ cupboard, edit, setEdit, editItem, setEditItem }) {


    const handleClick = () => {
        // conditional rendering
        setEdit(!edit);
        // set the from inputs to the desired item to edit
        setEditItem({
            id: cupboard.id,
            item: cupboard.item,
            cabinet: cupboard.cabinet,
            staple: cupboard.staple,
            refrigerated: cupboard.refrigerated,
            date_purchased: cupboard.date_purchased
        });
    }

    return (
        <ToolTip title="Edit Item">
            <IconButton color="primary" onClick={handleClick}>
                <EditIcon />
            </IconButton>
        </ToolTip>
    )
}

export default PantryEdit;