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
}

const rows = [
    createData('Shoping', "Go shoping on May", "Low"),
    createData('Gym', "Start a new habit", "High"),
    createData('Oil Change', "Change car oil", "medium"),
    createData('Hell', "Go to hell", "High"),
];

const Todo = () => {
    const [priority, setPriority] = React.useState('');

    const handleChange = (event) => {
        setPriority(event.target.value);
    };

    const addData = (value) => {
        console.log('hi');
    };

    return (
        <Card className='todo-card'>
            <CardHeader
                title="Todo List"
            />
            <FormGroup row>
                <TextField
                    id="outlined-error"
                    placeholder="Name"
                />
                <TextField
                    id="outlined-error-helper-text"
                    placeholder="Description"
                />

                <Box className="box" sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="priority-select-label">Priority</InputLabel>
                        <Select
                            labelId="priority-select-label"
                            id="priority-select"
                            value={priority}
                            label="Priority"
                            onChange={handleChange}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                </Box>


                <Button type='submit' onSubmit={addData}>Add</Button>

                <Box className="box" sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="priority-select-label">Filter</InputLabel>
                        <Select
                            labelId="priority-select-label"
                            id="priority-select"
                            value={priority}
                            label="Priority"
                            onChange={handleChange}
                        >
                            <MenuItem value="Low">All</MenuItem>
                            <MenuItem value="Medium">Completed</MenuItem>
                            <MenuItem value="High">Not Completed</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

            </FormGroup>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Description</StyledTableCell>
                            <StyledTableCell align="right">Priority</StyledTableCell>
                            <StyledTableCell align="right">Completed</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.description}</StyledTableCell>
                                <StyledTableCell align="right">{row.priority}</StyledTableCell>
                                <StyledTableCell align="right"><Checkbox /></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Card>
    )

};

export default Todo;