// import from dependencies 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import components 
import PantryDelete from "../PantryDelete/PantryDelete";
import PantryEdit from "../PantryEdit/PantryEdit";
import PantryAdd from '../PantryAdd/PantryAdd';
// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import ToolTip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';



// styles
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 500,
        marginLeft: 50,
        marginRight: 50
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    tHead: {
        backgroundColor: 'lightblue',
    },
    title: {
        textAlign: 'center',
    },
    editForm: {
        textAlign: 'center',
        padding: 40
    }

}));



// component to display the pantry
function PantryPage() {

    // using material ui css hook
    const classes = useStyles();

    // defining the item the user wants to edit
    const [editItem, setEditItem] = useState({
        id: '',
        item: '',
        staple: '',
        refrigerated: '',
        date_purchased: ''
    });

    // variable to determine the conditional rendering for the edit feature
    const [edit, setEdit] = useState(false);
    // getting the data stored in redux
    const pantry = useSelector(state => state.pantryReducer);
    const dispatch = useDispatch();

    // displaying the data on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_PANTRY' });
    }, [])

    // putting user's inputs into editItem
    const handleChange = (event) => {
        setEditItem({ ...editItem, [event.target.name]: event.target.value });
    }

    const handleSubmitEdit = () => {
        // conditional render
        setEdit(true);
        // updating the pantry with the edited item
        dispatch({ type: 'EDIT_PANTRY', payload: editItem });
        // resetting the editItem variable for next edit
        setEditItem({
            id: '',
            item: '',
            staple: '',
            refrigerated: '',
            date_purchased: ''
        });
    }

    const handleCancelEdit = () => {
        // conditional render
        setEdit(false);
        // resetting the editItem variable for next edit
        setEditItem({
            id: '',
            item: '',
            staple: '',
            refrigerated: '',
            date_purchased: ''
        });
    }

    return (
        <div>
            <div className={classes.title}>
                <h1>Pantry</h1>
            </div>
            <div>
                <div>
                    {!edit && <PantryAdd />}
                </div>
                {edit &&
                    <div className={classes.editForm}>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Item</InputLabel>
                            <Input
                                type="text"
                                value={editItem.item}
                                name="item"
                                onChange={handleChange}
                                style={{padding: 3}}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Staple</InputLabel>
                            <Select
                                value={editItem.staple}
                                name="staple"
                                onChange={handleChange}
                                style={{padding: 3}}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Refrigerated</InputLabel>
                            <Select
                                value={editItem.refrigerated}
                                name="refrigerated"
                                onChange={handleChange}
                                style={{padding: 3}}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <FormHelperText>Date Purchased</FormHelperText>
                            <Input
                                value={editItem.date_purchased}
                                type="date"
                                name="date_purchased"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <ToolTip title="update pantry">
                            <Button 
                            variant="contained" 
                            size="small" 
                            onClick={handleSubmitEdit}
                            color="primary"
                            style={{marginLeft: 10}}
                            >
                                Update
                            </Button>
                        </ToolTip>
                        <ToolTip title="cancel edit">
                            <Button 
                            variant="contained" 
                            size="small" 
                            onClick={handleCancelEdit}
                            color="secondary"
                            style={{marginLeft: 10}}
                            >
                                cancel
                            </Button>
                        </ToolTip>
                    </div>
                }
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tHead}>
                            <TableRow >
                                <TableCell style={{ fontSize: 20 }}><b>Item</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Staple</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Refrigerated</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Date Purchased</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Edit</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Delete</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pantry.map((cupboard) => (
                                <TableRow key={cupboard.id}>
                                    <TableCell>{cupboard.item}</TableCell>
                                    {cupboard.staple ? <TableCell>Yes</TableCell> : <TableCell>No</TableCell>}
                                    {cupboard.refrigerated ? <TableCell>Yes</TableCell> : <TableCell>No</TableCell>}
                                    <TableCell>{new Date(cupboard.date_purchased).toLocaleDateString("en-us")}</TableCell>
                                    <TableCell>
                                        <PantryEdit
                                            edit={edit}
                                            setEdit={setEdit}
                                            cupboard={cupboard}
                                            editItem={editItem}
                                            setEditItem={setEditItem}
                                        />
                                    </TableCell>
                                    <TableCell><PantryDelete cupboard={cupboard} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default PantryPage;