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

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});






function PantryPage() {

    const classes = useStyles();

    const [editItem, setEditItem] = useState({
        item: '',
        staple: false,
        refrigerated: false,
        date_purchased: ''
    })
    const [edit, setEdit] = useState(false);
    const pantry = useSelector(state => state.pantryReducer);
    const dispatch = useDispatch();
    console.log(pantry.is_staple)
    useEffect(() => {
        dispatch({ type: 'FETCH_PANTRY' });
    }, [])


    return (
        <div>
            <div>
                {edit && 
                <form type="submit">
                    <input 
                    type="text"
                    placeholder="item"
                    value={editItem}
                    name="item"
                    onChange={handleChange}
                    />
                    
                </form>
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
                                    {cupboard.staple ? <TableCell>yes</TableCell> : <TableCell>no</TableCell>}
                                    {cupboard.refrigerated ? <TableCell>yes</TableCell> : <TableCell>no</TableCell>}
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