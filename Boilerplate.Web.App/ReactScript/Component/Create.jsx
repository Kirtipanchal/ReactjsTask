﻿import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal, Form } from 'semantic-ui-react'
import { win32 } from 'path';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            

            CustomerName: '',
            CustomerAddress: '',

            Success: { Data: '' },
        };
        
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
       // this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onCreateSubmit() {

        //e.preventDefault();
        let data = { 'Name': this.state.CustomerName, 'Address': this.state.CustomerAddress };

        $.ajax({
            url: "/Customer/Create",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload()
            }.bind(this)
        });
    }


    //onClose() {
    //    this.setState({ showCreateModal: false });
    //    window.location.reload()
    //}
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showCreateModal} onClose={this.props.onClose} size='small'>
                    <Modal.Header>Create Customer</Modal.Header>
                    <Modal.Content>
                        <Form className="ui form segment">
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="CustomerName" placeholder="Name" onChange={this.onChange} />

                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type="text" name="CustomerAddress" placeholder="Address" onChange={this.onChange} />
                               
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary>Cancel</Button>
                        <Button onClick={this.onCreateSubmit} className="ui blue button">Create
                           <i className="check icon"></i></Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}