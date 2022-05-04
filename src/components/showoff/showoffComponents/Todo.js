import React, { useState } from 'react';
import { Card, CardHeader, TextField, Checkbox, FormGroup, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, description, priority, completed) {
    return { name, description, priority, completed };
};

const Todo = () => {
    const [rows, updateRows] = useState([]);
    const [priority, setPriority] = useState('');
    const [name, changeName] = useState('');
    const [description, changeDescription] = useState('');


    const priorityHandleChange = (event) => {
        setPriority(event.target.value);
    };

    const filterSelectHandleChange = () => {
        updateRows(rows.filter(row => row.completed === true));
    };

    const addData = () => {
        if (name === "" || description === "" || priority === "") {

        }
        else {
            updateRows([...rows, createData(name, description, priority)])
        }
    };

    const removeData = (event) => {
        // const tableRowNumber = document.getElementById("tableRow");
        // console.log(tableRowNumber);

        console.log(event.target.attributes.index);
    };

    return (
        <Card className='todo-card'>
            <CardHeader
                title="Todo List"
            />
            <FormGroup row>
                <TextField
                    id="todoName"
                    placeholder="Name"
                    onChange={(value) => { changeName(value.target.value) }}
                />
                <TextField
                    id="todoDes"
                    placeholder="Description"
                    onChange={(value) => { changeDescription(value.target.value) }}

                />

                <Box className="box" sx={{ minWidth: 120 }}>
                    <FormControl>
                        <InputLabel id="priority-select-label">Priority</InputLabel>
                        <Select
                            labelId="priority-select-label"
                            id="priority-select"
                            value={priority}
                            label="Priority"
                            onChange={priorityHandleChange}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                        <Button type='submit' onClick={addData}>Add</Button>
                    </FormControl>
                </Box>




                <Box className="box" sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="priority-select-label">Filter</InputLabel>
                        <Select
                            labelId="priority-select-label"
                            id="priority-select"
                            value={priority}
                            label="Priority"
                            onChange={filterSelectHandleChange}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="notCompleted">Not Completed</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

            </FormGroup>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Index</StyledTableCell>
                            <StyledTableCell align="right">Name</StyledTableCell>
                            <StyledTableCell align="right">Description</StyledTableCell>
                            <StyledTableCell align="right">Priority</StyledTableCell>
                            <StyledTableCell align="right">Completed</StyledTableCell>
                            <StyledTableCell align="right">Remove?</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow id="tableRow" key={index}>
                                <StyledTableCell id='tableRowNumber'>
                                    {index}
                                </StyledTableCell>
                                <StyledTableCell align="right" component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.description}</StyledTableCell>
                                <StyledTableCell align="right">{row.priority}</StyledTableCell>
                                <StyledTableCell align="right"><Checkbox /></StyledTableCell>
                                <StyledTableCell align="right"><Button onClick={removeData} index={index} >Remove</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Card>
    )

};

export default Todo;