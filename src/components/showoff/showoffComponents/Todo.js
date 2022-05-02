import React, { useState } from 'react';
import { Card, CardHeader, List, ListItem, Input, InputLabel, FormControl, Checkbox } from '@mui/material';
import { Button } from 'antd';

const Todo = () => {
    const [todoList, changetodoList] = useState([
        { name: "Shoping", priority: "Low", done: true },
        { name: "Gym", priority: "High", done: false }
    ]);

    const handleChange = (value) => { console.log(value); }

    return (
        <Card className='todo-card'>
            <CardHeader
                title="Todo List"
            />
            <FormControl>
                <InputLabel htmlFor="name-input">Name</InputLabel>
                <InputLabel htmlFor="description-input">Description</InputLabel>
                {/* <Input id="name-input" /> */}
                <Input id="description-input" />

                <Button >Submit</Button>
            </FormControl>

            <List>
                {todoList.map((item) => {
                    return <ListItem>
                        {item.name}
                        <Checkbox checked={item.done} onChange={handleChange} />
                    </ListItem>
                })}
            </List>

        </Card>
    )

};

export default Todo;