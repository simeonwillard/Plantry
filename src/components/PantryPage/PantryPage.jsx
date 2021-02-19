// import from dependencies 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import components 
import PantryDelete from "../PantryDelete/PantryDelete";
import PantryEdit from "../PantryEdit/PantryEdit";
import PantryAdd from '../PantryAdd/PantryAdd';
import './PantryPage.css';
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



// styles
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: '400px',
        width: '1200px',
        margin: 'auto',
        textAlign: 'center',
        borderCollapse: 'collapse',
    },
    body: {
        '&:nth-of-type(even)': {
            backgroundColor: 'aliceblue',
        }
    },
    tHead: {
        backgroundColor: 'lightblue',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    title: {
        textAlign: 'center',
    },
    editForm: {
        textAlign: 'center',
        padding: 40
    },
    cancelBtn: {
        marginLeft: 10,
        webkitBoxShadow: '3px 15px 20px 10px rgba(0,0,0,0.73)',
        mozBoxShadow: '3px 15px 20px 10px rgba(0, 0, 0, 0.73)',
        boxShadow: '3px 10px 20px 10px rgba(0, 0, 0, 0.73)',
        border: '1px solid gray'
    },
    updateBtn: {
        webkitBoxShadow: '3px 15px 20px 10px rgba(0,0,0,0.73)',
        mozBoxShadow: '3px 15px 20px 10px rgba(0, 0, 0, 0.73)',
        boxShadow: '3px 10px 20px 10px rgba(0, 0, 0, 0.73)',
        border: '1px solid gray',
        marginLeft: 10, 
        backgroundColor: '#3f51b5', 
        color: 'white' 
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
        quantity: '',
        unit: '',
        category_id: '',
        staple: '',
        date_purchased: ''
    });

    // variable to determine the conditional rendering for the edit feature
    const [edit, setEdit] = useState(false);
    // getting the data stored in redux
    const pantry = useSelector(state => state.pantryReducer);
    const categories = useSelector(state => state.categoryReducer);
    const dispatch = useDispatch();

    // displaying the data on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_PANTRY' });
        dispatch({ type: 'FETCH_GROCERY_CATEGORIES' })
    }, [])

    // putting user's inputs into editItem
    const handleChange = (event) => {
        setEditItem({ ...editItem, [event.target.name]: event.target.value });
    }

    const handleSubmitEdit = () => {
        // conditional render
        setEdit(false);
        // updating the pantry with the edited item
        dispatch({ type: 'EDIT_PANTRY', payload: editItem });
        // resetting the editItem variable for next edit
        setEditItem({
            id: '',
            item: '',
            quantity: '',
            unit: '',
            category_id: '',
            staple: '',
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
            quantity: '',
            unit: '',
            category_id: '',
            staple: '',
            date_purchased: ''
        });
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <h1 style={{color: 'lightblue'}}>Pantry</h1>
            </div>
            <div>
                <div>
                    {!edit && <PantryAdd categories={categories} />}
                </div>
                {edit &&
                    <div className={classes.editForm}>
                        <FormControl className={classes.formControl}>
                            <InputLabel style={{color: 'aliceblue'}}>Item</InputLabel>
                            <Input
                                type="text"
                                value={editItem.item}
                                name="item"
                                onChange={handleChange}
                                style={{ padding: 3, color: 'aliceblue' }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel style={{color: 'aliceblue'}}>Quantity</InputLabel>
                            <Input
                                type="text"
                                value={editItem.quantity}
                                name="quantity"
                                onChange={handleChange}
                                style={{ padding: 3, color: 'aliceblue' }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel style={{color: 'aliceblue'}}>Unit</InputLabel>
                            <Input
                                type="text"
                                value={editItem.unit}
                                name="unit"
                                onChange={handleChange}
                                style={{ padding: 3, color: 'aliceblue' }}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel style={{color: 'aliceblue'}}>Category</InputLabel>
                            <Select
                                value={editItem.category_id}
                                name="category_id"
                                onChange={handleChange}
                                style={{color: 'aliceblue', padding: 3}}
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
                        <FormControl className={classes.formControl}>
                            <InputLabel style={{color: 'aliceblue'}}>Staple</InputLabel>
                            <Select
                                value={editItem.staple}
                                name="staple"
                                onChange={handleChange}
                                style={{ padding: 3, color: 'aliceblue' }}
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <FormHelperText style={{color: 'aliceblue'}}>Date Purchased</FormHelperText>
                            <Input
                                value={editItem.date_purchased}
                                type="date"
                                name="date_purchased"
                                onChange={handleChange}
                                style={{color: 'aliceblue'}}
                            />
                        </FormControl>
                        <ToolTip title="update pantry">
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleSubmitEdit}
                                className={classes.updateBtn}
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
                                className={classes.cancelBtn}
                            >
                                cancel
                            </Button>
                        </ToolTip>
                    </div>
                }
            </div>
            <div>
                <TableContainer component={Paper} className={classes.table}>
                    <Table >
                        <TableHead className={classes.tHead}>
                            <TableRow >
                                <TableCell style={{ fontSize: 20 }}><b>Item</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Quantity</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Unit</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Category</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Staple</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Date Purchased</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Edit</b></TableCell>
                                <TableCell style={{ fontSize: 20 }}><b>Delete</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {pantry.map((cupboard) => (
                                <TableRow className={classes.body} key={cupboard.id}>
                                    <TableCell>{cupboard.item}</TableCell>
                                    <TableCell>{cupboard.quantity}</TableCell>
                                    <TableCell>{cupboard.unit}</TableCell>
                                    <TableCell>{cupboard.category}</TableCell>
                                    {cupboard.staple ? <TableCell>Yes</TableCell> : <TableCell>No</TableCell>}
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