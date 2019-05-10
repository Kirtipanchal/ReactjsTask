import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Button, Modal, Form } from 'semantic-ui-react'
export default class CreateSales extends Component {
    constructor() {
        super();
        this.state = {
            ProductId: '',
            StoreId: '',
            CustomerId: '',
            DateSold: '',
            CustomerDropdownList: [],
            ProductDropdownList: [],
            StoresDropdownList: [],
        };

        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.CustomersDropdown = this.CustomersDropdown.bind(this);
        this.ProductsDropdown = this.ProductsDropdown.bind(this);
        this.StoresDropdown = this.StoresDropdown.bind(this);

    }
    componentDidMount() {

        this.CustomersDropdown();
        this.ProductsDropdown();
        this.StoresDropdown();

    }
    onCreateSubmit() {
        let data = {
            'CustomerId': this.state.CustomerId,
            'ProductId': this.state.ProductId,
            'StoreId': this.state.StoreId,
            'DateSold': this.state.DateSold
        }
        //console.log('customerId', this.state.CustomerId)
        //console.log('productId', this.state.ProductId)
        $.ajax({
            url: 'Sales/Create',
            type: 'POST',
            data: data,
            success: function (data) {

                this.setState({ Success: data })
                window.location.reload()

            }.bind(this)
        }
        );
    }
        
    onClose() {
                this.setState({ showDeleteModal: false });
                 window.location.reload()
    }

    onChange(e) {
        console.log("onChange", { [e.target.name]: e.target.value })
       this.setState({ [e.target.name]: e.target.value });

    }
    CustomersDropdown() {
       
        $.ajax({
            url: "/Sales/CustomerList",
            type: "GET",
           dataType: "json",
               success: function (data) {
                  this.setState({ CustomerDropdownList: data })
                   //console.log("state", data)
            }.bind(this)
        });       
    }
        
    
    ProductsDropdown() {

        $.ajax({

            url: "/Sales/ProductList",

            type: "GET",

            success: function (data) {

                this.setState({ ProductDropdownList: data })
                //console.log("state", data)
            }.bind(this)

        });
        

    }
    StoresDropdown() {

        $.ajax({

            url: "/Sales/StoreList",

            type: "GET",

            success: function (data) {
               // console.log("state", data)
                this.setState({ StoresDropdownList: data })

            }.bind(this)

        });
    }
        render() {

            let CustomerDataList = [{ Id: '', CustomerName: 'Select Customer' }].concat(this.state.CustomerDropdownList)
         // console.log("Customer", CustomerDataList )

            let ProductDataList = [{ Id: '', ProductName: 'Select Product' }].concat(this.state.ProductDropdownList)
            //console.log("Product", ProductDataList)

            let StoreDataList = [{ Id: '', StoreName: 'Select Store' }].concat(this.state.StoresDropdownList)
            //console.log("Store", StoreDataList)

            return (

                <React.Fragment>

                    <Modal open={this.props.showCreateModel} onClose={this.props.onClose} size='small' >
                        
                         <Modal.Header> Create Sales </Modal.Header>

                        <Modal.Content>

                            <Form>

                                <Form.Field>

                                    <label>Customer Name</label>

                                    <select name="CustomerId" onChange={this.onChange} value={this.state.CustomerId}>

                                        {CustomerDataList.map((customer) => <option key={customer.id} value={customer.id}>{customer.name} </option>)}
                                      

                                    </select>
                                     

                                </Form.Field>

                                <Form.Field>

                                    <label>Product Name</label>

                                    <select name="ProductId" onChange={this.onChange} value={this.state.ProductId}>

                                        {ProductDataList.map((product) => <option key={product.id} value={product.id}>{product.productName}</option>)}

                                    </select>



                                </Form.Field>

                                <Form.Field>

                                    <label>Store Name</label>

                                    <select name="StoreId" onChange={this.onChange} value={this.state.StoreId}>

                                        {StoreDataList.map((store) => <option key={store.id} value={store.id}>{store.storeName}</option>)}

                                    </select>



                                </Form.Field>

                                <Form.Field>

                                    <label>Date Sold</label>

                                    <input type="text" name="DateSold" placeholder='YYYY/MM/DD' onChange={this.onChange} />



                                </Form.Field>

                            </Form>
                            
                        </Modal.Content>

                        <Modal.Actions>

                            <Button onClick={this.props.onClose} secondary >Cancel </Button>
                            <Button onClick={this.onCreateSubmit} className="ui green button">Create 
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </React.Fragment>
               )

        }

    }

    





