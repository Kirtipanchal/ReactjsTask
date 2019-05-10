import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import CreateProduct from './CreateProduct.jsx'
import EditProduct from './EditProduct.jsx'
import DeleteProduct from './DeleteProduct.jsx'
export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: []
        };
        this.loadData = this.loadData.bind(this);
        this.showCreateModal = this.showCreateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showUpdateModel = this.showUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
       
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
      $.ajax({
            url: '/Product/GetProductJson',
            type: "GET",
            dataType: "json",
            contentType: "/application/json",
            success: function (data) {
                this.setState({productList: data
                })
            }.bind(this)
        });
        

    }
    showCreateModal() {
        this.setState({ showCreateModal: true });

    }
    onChange(e) {
        this.setState({ [e.target.name]: [e.target.value] });
    }
    closeCreateModal() {
        this.setState({ showCreateModal: false });
        window.location.reload();
    }
    //update
        //ajax call logic
        showUpdateModel(id) {
            this.setState({ showUpdateModel: true });
            this.setState({ updateId: id });
            $.ajax({
                url: "/Product/Edit",
                type: "GET",
                data: { 'id': id },
                success: function (data) {
                    var obj = data;
                // console.log("obj", obj)
                    this.setState({ ProductId: obj.id, ProductName: obj.name, ProductPrice: obj.price })
                }.bind(this)
            });
    }
    closeUpdateModel() {
        this.setState({ showUpdateModel: false });      
        window.location.reload()   
    }
    onUpdateSubmit() {
   
let data = { Id: this.state.ProductId, Name: this.state.ProductName, Price: this.state.ProductPrice };

            $.ajax({

                url: "/Product/Edit",

                type: "POST",

                data: data,

                success: function (data) {

                    this.setState({ Success: data })

                    window.location.reload()

                }.bind(this)

            });
        }
    

    //delete(id) {
        //ajax call logic
    showDeleteModal(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
        Console.log("id:", id)
        $.ajax({
            url: "/Product/Delete",
            type: "GET",
            data: { 'id': id },
            Success: function (data) {
                var obj = data;

                this.setState({ ProductId: obj.id, ProductName: obj.name, ProductPrice: obj.price })
                //Console.log("state", this.state.ProductName)
                
            }.bind(this)

        });
    }
    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        //window.location.reload()
    }

    
    render() {
        //console.log("product")
        let productList = this.state.productList;
        console.log("product", productList)
        let tableData = null;

        if (productList != "") {
            console.log("ProductList", productList)
            tableData = productList.map(productList =>
                <tr key={productList.id}>
                    
                    <td className="four wide">{productList.name}</td>
                    <td className="four wide">{productList.price}</td>
                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, productList.id)}>
                            <i className="edit icon"></i>Edit
                        </Button>
                    </td>
                    <td className="four wide">
                        <Button className="ui red button" onClick={this.showDeleteModal.bind(this, productList.id)} >
                            Delete</Button>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    <Button className="positive" onClick={this.showCreateModal}> Create New Product </Button>
                    <CreateProduct showCreateModal={this.state.showCreateModal}
                        onClose={this.closeCreateModal}
                        onChange={this.onChange}
                        onCreateSubmit={this.onCreateSubmit} />
                    <EditProduct onChange={this.onChange}
                        update={this.state.updateId}
                        onClose={this.closeUpdateModel}
                        onUpdateSubmit={this.onUpdateSubmit}
                        showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.ProductId}
                        Name={this.state.ProductName}
                        Price={this.state.ProductPrice} />
                    <DeleteProduct delete={this.state.deleteId}
                        onClose={this.closeDeleteModal}
                        onDeleteSubmit={this.onDeleteSubmit}
                        showDeleteModal={this.state.showDeleteModal}
                        Id={this.state.ProductId}
                        Name={this.state.ProductName}
                        Address={this.state.ProductPrice}
                    />
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name</th>
                                <th className="ten wide">Price</th>
                                <th className="four wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}
