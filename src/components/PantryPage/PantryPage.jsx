import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PantryDelete from "./PantryDelete";
import PantryEdit from "./PantryEdit";

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




function PantryPage() {

    const classes = useStyles();

    const [editItem, setEditItem] = useState({
        item: '',
        staple: '',
        refrigerated: '',
        date_purchased: ''
    });

    const [edit, setEdit] = useState(false);
    const pantry = useSelector(state => state.pantryReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_PANTRY' });
    }, [])


    const handleChange = (event) => {
        setEditItem({ ...editItem, [event.target.name]: event.target.value });
    }

    const handleEdit = () => {
        console.log(editItem);
        setEdit(!edit);
    }

    return (
        <div>
            <div>
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
                        <Button variant="contained" onClick={handleEdit}>
                            Update
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
                                    <TableCell><PantryEdit edit={edit} setEdit={setEdit} cupboard={cupboard} /></TableCell>
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