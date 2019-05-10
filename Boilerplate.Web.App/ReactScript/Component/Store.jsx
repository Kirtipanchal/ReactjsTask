import React from 'react';
import CreateStore from './CreateStore.jsx'
import EditStore from './EditStore.jsx'
import DeleteStore from './DeleteStore.jsx';
import { Button, Form } from 'semantic-ui-react'
export default class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeList: []
        };
        this.loadData = this.loadData.bind(this);
        this.showUpdateModel = this.showUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
        this.showCreateModal = this.showCreateModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this); 
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        //ajax call logic
        $.ajax({
            url: '/Store/GetStoreJson',
            type: "GET",
            dataType: "json",
            contentType: "/application/json",
            success: function (data) {
                this.setState({ storeList: data })
            }.bind(this)
        });

    }
    
    //update(id) {
        //ajax call logic
    showUpdateModel(id) {
        this.setState({ showUpdateModel: true });
        this.setState({ updateId: id });
        console.log("id", id)
        $.ajax({
                url: "/Store/Edit",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                var obj = data;
                this.setState({ StoreId: obj.id, StoreName: obj.name, StoreAddress: obj.address })
                console.log('data', data)
            }.bind(this)
        });    
               //console.log("StoreName", name)
                
    }
    closeUpdateModel() {

        this.setState({ showUpdateModel: false });

        window.location.reload()

    }
    onUpdateSubmit() {

        let data = { Id: this.state.StoreId, Name: this.state.StoreName, Address: this.state.StoreAddress };
        //console.log("data",Id)
        $.ajax({

            url: "/Store/Edit",

            type: "POST",

            data: data,

            success: function (data) {

                this.setState({ Success: data })

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
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log('target', { [e.target.name]: e.target.value })
    }
    showDeleteModal(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
        //Console.log("id:", id)
        $.ajax({
            url: "/Store/GetDeleteStore",
            type: "GET",
            data: { 'id': id },
            Success: function (data) {
                var obj = data;

                this.setState({ StoreId: obj.id, StoreName: obj.name, StoreAddress: obj.address })
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
        
        let storeList = this.state.storeList;
       // console.log("List", storeList)
        let tableData = null;

        if (storeList != "") {
            
            tableData = storeList.map(storeList =>
                <tr key={storeList.id}>
                    
                    <td className="ten wide">{storeList.name}</td>
                    <td className="ten wide">{storeList.address}</td>
                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, storeList.id)}>
                           Edit
                        </Button>
                    </td>
                    <td>
                        <Button className="ui red button" onClick={this.showDeleteModal.bind(this, storeList.id)} >
                            Delete</Button>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div>
                    <Button className="positive" onClick={this.showCreateModal}> Create New Store </Button>
                    <CreateStore showCreateModal={this.state.showCreateModal}
                        onChange={this.onChange}
                        onClose={this.closeCreateModal}
                        onCreateSubmit={this.onCreateSubmit}
                    />
                    <EditStore onChange={this.onChange}
                        update={this.state.updateId}
                        onClose={this.closeUpdateModel}
                        onUpdateSubmit={this.onUpdateSubmit}
                        showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.StoreId}
                        Name={this.state.StoreName}
                        Address={this.state.StoreAddress} />
                    <DeleteStore delete={this.state.deleteId}
                        onClose={this.closeDeleteModal}
                        onDeleteSubmit={this.onDeleteSubmit}
                        showDeleteModal={this.state.showDeleteModal}
                        Id={this.state.StoreId}
                        Name={this.state.StoreName}
                        Address={this.state.StoreAddress}
                    />
                    <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="two wide">Name</th>
                                <th className="ten wide">Address</th>
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