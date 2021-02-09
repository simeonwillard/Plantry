import { useEffect } from "react";
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


    const pantry = useSelector(state => state.pantryReducer);
    const dispatch = useDispatch();
    console.log(pantry.is_staple)
    useEffect(() => {
        dispatch({ type: 'FETCH_PANTRY' });
    }, [])


    return (
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
                            <TableCell><PantryEdit cupboard={cupboard} /></TableCell>
                            <TableCell><PantryDelete cupboard={cupboard} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

    // return (
    //     <div>
    //         <div>
    //             <h1>Pantry</h1>
    //         </div>
    //         <div>
    //             <table>
    //                 <tr>
    //                     <th>Item</th>
    //                     <th>Staple</th>
    //                     <th>Refrigerated</th>
    //                     <th>Date Purchased</th>
    //                     <th>Edit</th>
    //                     <th>Delete</th>
    //                 </tr>
    //                 {pantry.map((cupboard) => {
    //                     return (
    //                         <tr key={cupboard.id}>
    //                             <td>{cupboard.item}</td>
    //                             {cupboard.staple ? <td>yes</td> : <td>no</td>} 
    //                             {cupboard.refrigerated ? <td>yes</td> : <td>no</td>} 
    //                             <td>{cupboard.date_purchased}</td>
    //                             <td><PantryEdit cupboard={cupboard} /></td>
    //                             <td><PantryDelete cupboard={cupboard} /></td>
    //                         </tr>
    //                     )
    //                 })}
    //             </table>
    //         </div>
    //     </div>
    // )
}

export default PantryPage;