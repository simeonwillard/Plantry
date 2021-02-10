import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PantryDelete from "./PantryDelete";
import PantryEdit from "./PantryEdit";
import PantryAdd from './PantryAdd';

import React from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';



const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
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


    const handleChange = (event) => {
        setEditItem({ ...editItem, [event.target.name]: event.target.value });
    }

    const handleSubmitEdit = () => {
        console.log(editItem);
        setEdit(true);
        dispatch({ type: 'EDIT_PANTRY', payload: editItem });
        setEditItem({
            id: '',
            item: '',
            staple: '',
            refrigerated: '',
            date_purchased: ''
        });
    }

    const handleCancelEdit = () => {
        setEdit(false);
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
            <div>
                <div>
                    {!edit && <PantryAdd />}
                </div>
                {edit &&
                    <div>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Item</InputLabel>
                            <Input
                                type="text"
                                value={editItem.item}
                                name="item"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Staple</InputLabel>
                            <Select
                                value={editItem.staple}
                                name="staple"
                                onChange={handleChange}
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
                        <Button variant="contained" size="small" onClick={handleSubmitEdit}>
                            Update
                        </Button>
                        <Button variant="contained" size="small" onClick={handleCancelEdit}>
                            cancel
                        </Button>
                    </div>
                }
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>Staple</TableCell>
                                <TableCell>Refrigerated</TableCell>
                                <TableCell>Date Purchased</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pantry.map((cupboard) => (
                                <TableRow key={cupboard.id}>
                                    <TableCell>{cupboard.item}</TableCell>
                                    {cupboard.staple ? <TableCell>Yes</TableCell> : <TableCell>No</TableCell>}
                                    {cupboard.refrigerated ? <TableCell>Yes</TableCell> : <TableCell>No</TableCell>}
                                    <TableCell>{cupboard.date_purchased}</TableCell>
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