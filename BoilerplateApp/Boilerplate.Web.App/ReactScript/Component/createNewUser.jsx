import React from 'react';
import { Label, Form } from 'semantic-ui-react'
const createNewCustomer = () => (

    <Form>
        <Form.field>
            <label> Name</label>
            <input placeholder='Name' />
        </Form.field>
        <Form.field>
            <label>Address</label>
            <Input placeholder='Address' />
        </Form.field>
        <Button type='submit'>Save</Button>
    </Form>)