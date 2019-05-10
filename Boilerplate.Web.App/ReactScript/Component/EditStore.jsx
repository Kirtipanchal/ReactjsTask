import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';



export default class EditStore extends Component {
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
       //console.log("props", this.props.Address)
        return (

            <React.Fragment>





                <Modal open={this.props.showUpdateModel} onClose={this.props.onClose} size='small'>



                    <Modal.Header> Edit Store </Modal.Header>

                    <Modal.Content>

                        <form className="ui form segment">

                            <Form.Field>

                                <label>Name</label>

                                <input type="text" name="StoreName" placeholder={this.props.StoreName} defaultValue={this.props.Name} onChange={this.props.onChange} />

                            </Form.Field>

                            <Form.Field>

                                <label>Address</label>

                                <input type="text" name="StoreAddress" placeholder={this.props.StoreAddress} defaultValue={this.props.Address} onChange={this.props.onChange} />

                            </Form.Field>



                        </form>

                    </Modal.Content>

                    <Modal.Actions>



                        <button className="ui secondary button" onClick={this.props.onClose}>Cancel</button>

                        <button className="ui green button" onClick={this.props.onUpdateSubmit}>Edit </button>

                    </Modal.Actions>

                </Modal>

            </React.Fragment>



        )

    }

}