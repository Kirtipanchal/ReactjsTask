import React, { Component } from 'react';



import { Modal, Form, Button } from 'semantic-ui-react';



export default class EditProduct extends Component {

    constructor(props) {

        super(props);

        this.state = {




        };



        this.onClose = this.onClose.bind(this);

    }



    onClose() {

        this.setState({ showUpdateModel: false });

        window.location.reload()

    }



    render() {
        //console.log("props", this.props.Price)
        return (
                 <React.Fragment>
                       <Modal open={this.props.showUpdateModel} onClose={this.props.onClose} size='small'>
                    <Modal.Header> Edit Product </Modal.Header>
                             <Modal.Content>

                                   <form className="ui form segment">

                                        <Form.Field>

                                           <label>Name</label>

                                <input type="text" name="ProductName" placeholder={this.props.ProductName} defaultValue={this.props.Name} onChange={this.props.onChange} />

                            </Form.Field>

                            <Form.Field>

                                <label>Price</label>

                                <input type="text" name="ProductPrice" placeholder={this.props.ProductPrice} defaultValue={this.props.Price} onChange={this.props.onChange} />

                            </Form.Field>



                        </form>

                    </Modal.Content>

                    <Modal.Actions>



                        <button className="ui secondary button" onClick={this.props.onClose}>Cancel</button>

                        <button className="ui green button" onClick={this.props.onUpdateSubmit}>Update <i className="check icon"></i></button>

                    </Modal.Actions>

                </Modal>

            </React.Fragment>



        )

    }

}