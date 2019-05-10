import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
export default class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },
            ProductId: '',
            ProductName: '',
            ProductPrice: '',
        };
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        //this.onClose = this.onClose.bind(this);
    }


    onCreateSubmit() {
        let data = { 'Name': this.state.ProductName, 'Price': this.state.ProductPrice };
        $.ajax({
            url: '/Product/Create',
            type: 'POST',
            data: data,
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload();
            }.bind(this)
        });

        
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showCreateModal} onClose={this.props.onClose} size='small'>
                    <Modal.Header>Create Product</Modal.Header>
                    <Modal.Content>
                        <Form className="ui form segment">
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="ProductName" placeholder="Name" onChange={this.onChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type="text" name="ProductPrice" placeholder="Price" onChange={this.onChange} />

                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary>Cancel</Button>
                        <Button onClick={this.onCreateSubmit} className="ui blue button">Create
                           <i className="check icon"></i></Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment >
         );
        
    }
}
    

    

    

  