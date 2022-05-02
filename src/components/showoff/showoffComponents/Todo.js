import React, { useState } from 'react';
import { Card, CardHeader, List, ListItem, TextField, FormGroup, Checkbox, MenuItem, DropDownMenu } from '@mui/material';
import { Button } from 'antd';


const Todo = () => {
    const [done, changeDone] = useState(false);


    const [todoList, changetodoList] = useState([
        { name: "Shoping", priority: "Low", done: done },
        { name: "Gym", priority: "High", done: done }
    ]);

    const handleChange = (value) => {
        console.log(value);
    }

    const changeData = (value) => {
        console.log(value);
    }

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
                <DropDownMenu
                    value={selection}
                    onChange={handleChange}
                >
                    <MenuItem value={1} primaryText="English" />
                    <MenuItem value={2} primaryText="Spanish" />
                    <MenuItem value={3} primaryText="French" />

                </DropDownMenu>

                <Button type='submit' onSubmit={changeData}>Add</Button>
            </FormGroup>

            <List>
                {todoList.map((item) => {
                    return (
                        <ListItem>
                            {item.name}
                            <Checkbox checked={item.done} onChange={handleChange} />
                        </ListItem>
                    )
                })}
            </List>

        </Card>
    )

};

export default Todo;