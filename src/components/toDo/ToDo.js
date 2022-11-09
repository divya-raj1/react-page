import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import {v4 as uuid} from 'uuid';

export default function ToDo({ handleToDoSet, handleCloseToDo }) {

    const [toDo, setToDo] = useState({
        id: '',
        task: ''
    })

    const handleChange = (e) => {
        setToDo({...toDo, task: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(toDo.task.trim()) {
            handleToDoSet({...toDo, id: uuid()});
        }
        handleCloseToDo();
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
                <Form.Control type="text" name="task" value={toDo.task} onChange={(e) => handleChange(e)}/>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
    )
}
