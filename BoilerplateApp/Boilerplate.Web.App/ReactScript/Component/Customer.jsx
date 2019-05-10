import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import Create from './Create.jsx'
import Edit from './Edit.jsx'
import Delete from './Delete.jsx';
export default class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            
        };
        this.loadData = this.loadData.bind(this);
        this.showCreateModal = this.showCreateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.showUpdateModel = this.showUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        //ajax call logic
        $.ajax({
            url: "/Customer/GetCustomerJson",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                console.log(data)
                this.setState({ customerList: data });

            }.bind(this)

        });
    }
    //Update

    showUpdateModel(id) {

           this.setState({ showUpdateModel: true });
           this.setState({ updateId: id });
           //console.log("id", id)
           $.ajax({
               url: "/Customer/Edit",
               type: "GET",
                data: { 'id': id },
                success: function (data) {
                 var obj = data;
                //console.log("obj", obj)
                this.setState({ CustomerId: obj.id, CustomerName: obj.name, CustomerAddress: obj.address })
               // console.log("state", this.state.CustomerName)
               //this.setState({ CustomerId: data.Id, CustomerName: data.Name, CustomerAddress: data.Address })
                 }.bind(this)
          });
    }
    closeUpdateModel() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }
        

   
  onUpdateSubmit() {

let data = { Id: this.state.CustomerId, Name: this.state.CustomerName, Address: this.state.CustomerAddress };
      //console.log('data', Id)
             $.ajax({
              url: "/Customer/Edit",
              type: "POST",
              dataType: 'json',
              ContentType: 'application/json',
              data: data,
           success: function (data) {
               this.setState({ Success: data })
                //console.log('data',data)
                window.location.reload()

            }.bind(this)

        });
    }
   showCreateModal() {
        this.setState({ showCreateModal: true });
    }

    closeCreateModal() {
        this.setState({ showCreateModal: false });
        window.location.reload();
    }
    onChange(e) { this.setState({ [e.target.name]: e.target.value });
    }
   

    //showDeleteModal() {
    //    this.setState({ showDeleteModal: true });
    //    window.location.reload();
    //}
   
    showDeleteModal(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
       Console.log("id:", id)
        $.ajax({
            url: "/Customer/GetDeleteCustomer",
            type: "GET",
            data: { 'id': id },
            Success: function (data) {
                var obj = data;
               
                this.setState({ CustomerId: obj.id, CustomerName: obj.name, CustomerAddress: obj.address })
                //Console.log("state", this.state.CustomerName)
                //this.setState({ CustomerId: data.id, CustomerName: data.name, CustomerAddress: obj.address })
            }.bind(this)
            
        });
    }
    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        //window.location.reload()
    }
    
    render() {

        let customerList = this.state.customerList;
        //console.log("render", this.state.CustomerId)
        //console.log("id", CustomerId)
        let tableData = null;

        if (customerList != "") {
            tableData = customerList.map(customerList =>
                <tr key={customerList.id}>
                    <td className="two wide">{customerList.name}</td>
                    <td className="ten wide">{customerList.address}</td>
                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, customerList.id)}>
                            Edit
                        </Button>
                    </td>
                    <td className="four wide">
                        <Button className="ui red button" onClick={this.showDeleteModal.bind(this, customerList.id)} >
                            Delete</Button>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    <Button className="positive" onClick={this.showCreateModal}> Create New Customer </Button>
                    <Create showCreateModal={this.state.showCreateModal}
                        onChange={this.onChange}
                        onClose={this.closeCreateModal}
                        onCreateSubmit={this.onCreateSubmit}
                    />
                    <Edit onChange={this.onChange}
                        update={this.state.updateId}
                        onClose={this.closeUpdateModel}
                        onUpdateSubmit={this.onUpdateSubmit}
                        showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.CustomerId}
                        Name={this.state.CustomerName}
                        Address={this.state.CustomerAddress} />
                    <Delete delete={this.state.deleteId}
                        onClose={this.closeDeleteModal}
                        onDeleteSubmit={this.onDeleteSubmit}
                        showDeleteModal={this.state.showDeleteModal}
                        Id={this.state.CustomerId}
                        Name={this.state.CustomerName}
                        Address={this.state.CustomerAddress}
                    />
                           
                   
                     <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name</th>
                                <th className="four wide">Address</th>
                                <th className="four wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }   
}       
       
           
    







