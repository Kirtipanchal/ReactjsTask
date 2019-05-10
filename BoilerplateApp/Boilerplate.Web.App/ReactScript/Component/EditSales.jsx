import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class SaleEdit extends Component {

    constructor(props) {
          super(props);
            this.state = {
            CustomerId: '',
            ProductId: '',
            StoreId: '',
            //DateSold:'',
            CustomerDropdownList: [],
            ProductDropdownList: [],
            StoresDropdownList: [],
            Success: { Data: '' },
        };
        this.onClose = this.onClose.bind(this);
        this.CustomersDropdown = this.CustomersDropdown.bind(this);
        this.ProductsDropdown = this.ProductsDropdown.bind(this);
        this.StoresDropdown = this.StoresDropdown.bind(this);
    }
        componentDidMount() {
            this.CustomersDropdown();
            this.ProductsDropdown();
            this.StoresDropdown();
    }

 onClose() {
     this.setState({ showUpdateModel: false });
     window.location.reload()
 }  

    CustomersDropdown() {
        $.ajax({       
            url: "/Sales/CustomerList",           
            type: "GET",            
            success: function (data) {            
                this.setState({ CustomerDropdownList: data })
               // console.log('Customerdata', data)
            }.bind(this)
        });
    } 
    
    ProductsDropdown() {
        $.ajax({
            url: "/Sales/ProductList",
            type: "GET",
            success: function (data) {
                this.setState({ ProductDropdownList: data })
            }.bind(this)
        });           
    }
    
    StoresDropdown() {
        $.ajax({    
            url: "/Sales/StoreList",    
            type: "GET",            
            success: function (data) {        
                this.setState({ StoresDropdownList: data })
            }.bind(this)
        });
    }
 
    render() {
        //console.log('date',this.props.dateSold);
        let CustomerDataList = [].concat(this.state.CustomerDropdownList)
        //let CustomerDataList=this.state.CustomerDropdownList
       // console.log('CustomerDataList', CustomerDataList )

        let ProductDataList = [].concat(this.state.ProductDropdownList)
        //console.log(this.state.ProductDataList)
        let StoreDataList = [].concat(this.state.StoresDropdownList)

        //console.log(this.props)

        return (

            <React.Fragment>

                <Modal open={this.props.showUpdateModel} onClose={this.props.onClose} size='small'>

                    <Modal.Header> Edit Sales </Modal.Header>

                    <Modal.Content>

                        <Form>

                            <Form.Field>

                                <label>Customer Name</label>
                                
                                <select name="CustomerId" onChange={this.props.onChange} value={this.props.CustomerId}>

                                    {CustomerDataList.map((Customer) => <option key={Customer.id} value={Customer.id}>{Customer.name}</option>)}

                                </select>



                            </Form.Field>

                            <Form.Field>

                                <label>Product Name</label>

                                <select name="ProductId"   onChange={this.props.onChange} value={this.props.ProductId}>

                                    {ProductDataList.map((Product) => <option key={Product.id} value={Product.id}>{Product.productName}</option>)}
                                </select>
                             
                              </Form.Field>      



                           

                            <Form.Field>

                                <label>Store Name</label>

                                <select name="StoreId" onChange={this.props.onChange} value={this.props.StoreId}>

                                    {StoreDataList.map((Store) => <option key={Store.id} value={Store.id}>{Store.storeName}</option>)}

                                </select>



                            </Form.Field>

                            <Form.Field>

                                <label>Date Sold</label>

                                <input type="text" name="DateSold" value={this.props.DateSold} placeholder='YYYY/MM/DD' onChange={this.props.onChange} />



                            </Form.Field>

                        </Form>

                    </Modal.Content>

                    <Modal.Actions>

                        <Button onClick={this.props.onClose} secondary >Cancel

                        </Button>

                        <Button onClick={this.props.onUpdateSubmit} className="ui green button">Edit

                      

                        </Button>

                    </Modal.Actions>

                </Modal>

            </React.Fragment>

        )

    }

}
