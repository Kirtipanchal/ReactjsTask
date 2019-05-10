import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import CreateSales from './CreateSales.jsx'
import EditSales from './EditSales.jsx'
import DeleteSales from './DeleteSales.jsx';

export default class Sales extends React.Component {
    constructor() {
        super();
        this.state = {
            salelists: [{ Id: '', DateSold: '', CustomerName: '', ProductName: '', StoreName: '' }],
            Id: '',
            ProductId: '',
            StoreId: '',
            CustomerId: '',
            DateSold: '',
        };

        this.loadData = this.loadData.bind(this);
      
        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.showCreateModel = this.showCreateModel.bind(this);
        this.closeCreateModel = this.closeCreateModel.bind(this);
        this.showUpdateModel = this.showUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.DateConverter = this.DateConverter.bind(this);
        //this.TableDateForm = this.TableDateForm.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
       
        $.ajax({

            url: "/Sales/GetSalesJson",

            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',

            success: function (data)
            {
                this.setState({ salelists: data })
                //console.log("state", this.state.salelists)
            }.bind(this)
            
        });
        

    }
    DateConverter(tempdate) {
        
        var temp = new Date(tempdate);
        //console.log('temp',temp)
        var date = (temp.getFullYear() + "/" + ((temp.getMonth() + 1) + "/" + temp.getDate()));
        console.log(tempdate)
        return date;
    }

    //Used with get data to display the date in the table formatted like 12 Jan, 2010
    //TableDateForm(tempdate) {
    //    var converted = Number.parseInt((tempdate.replace("/Date(", "").replace(")/", "")));

    //    var temp = new Date(converted);
    //    const monthNames = [
    //        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    //    ];

    //    const d = new Date(converted);
    //    var date = (temp.getDate() + " " + monthNames[d.getMonth()] + ", " + temp.getFullYear());
    //    return date;

    //DateConverter(tempdate) {
    //    //console.log("date", tempdate)
    //// var converted = Number.parseInt((tempdate.replace("/Date(", "").replace(")/", "")))
    //    //console.log("date", tempdate)

    //    var temp = new Date/*(converted)*/
    //    var date = (temp.getFullYear() + "-" + ((temp.getMonth()+1)) + "-" + temp.getDate())

    //    return date
        
    //}
    handleDelete(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
    }

      closeDeleteModal() {

       this.setState({ showDeleteModal: false });
       window.location.reload()
        }

    showCreateModel() {
        this.setState({ showCreateModel: true });
    }

    closeCreateModel() {
        this.setState({ showCreateModel: false });
        window.location.reload()
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value })
        //console.log('target', { [e.target.name]: e.target.value } )
    }
    showUpdateModel(id) {

        this.setState({ showUpdateModel: true });
        this.setState({ updateId: id });
        //console.log('id',id)
         $.ajax({
             url: "/Sales/Edit",          
             type: "GET",
             dataType: 'json',            
             ContentType: 'application/json',
            data: { 'id': id },
            
             success: function (data) {
                 var obj = data;
               console.log('data', obj)
                 this.setState({
                   Id: obj.id,
                   ProductId: obj.productId,
                   CustomerId: obj.customerId,
                   StoreId: obj.storeId,
                   DateSold: this.DateConverter(obj.dateSold)
                })      
                                                  
                 //console.log('id', DateSold)
             }.bind(this)

       });

    }
    closeUpdateModel() {

        this.setState({ showUpdateModel: false });

        window.location.reload()

    }

    onUpdateSubmit() {
        //console.log("data", data)
        let data = {
            'Id': this.state.Id,
           'ProductId': this.state.ProductId,
           'CustomerId': this.state.CustomerId,
           'StoreId': this.state.StoreId,
           'DateSold': this.state.DateSold,
        };
        //console.log("data", data)
            $.ajax({
                url: "/Sales/Edit",
                type: "POST",
                dataType: 'json',
                ContentType: 'application/json',
                data: data,
                success: function (data) {
                    this.setState({ Success: data })
                   // console.log('data', data)
                    window.location.reload()
                }.bind(this)
                
        });
        console.log('data',data)
    }
                
    render() {
       
        let saleList = this.state.salelists;
        console.log("render", saleList /*this.state.customerId*/)
        let tableData = null;
        
        if (saleList != "") {
            tableData = saleList.map(salesLists =>
                <tr key={salesLists.id}>
                    <td className="four wide" >{salesLists.customerName}</td>
                    <td className="four wide"  >{salesLists.productName}</td>
                    <td className="four wide"  >{salesLists.storeName}</td>
                    <td className="six wide">{this.DateConverter(salesLists.dateSold)}</td>
                    <td className="six wide">
                        <Button className="ui yellow button" onClick={this.showUpdateModel.bind(this, salesLists.id)}>Edit</Button>
                    </td>
                    <td className="four wide">
                      <div><Button onClick={this.handleDelete.bind(this, salesLists.id)} className="ui red button">Delete</Button></div>
                    </td>
                </tr>
            )
        }  
        
        return (
            <React.Fragment>
                <div>
                    <div>
                        <Button onClick={this.showCreateModel} className="ui primary button">Create New Sales</Button>
                    </div>
                    <CreateSales onChange={this.onChange}
                        onClose={this.closeCreateModel}
                        onCreateSubmit={this.onCreateSubmit}
                        showCreateModel={this.state.showCreateModel}
                    />
                    <DeleteSales delete={this.state.deleteId}
                        onClose={this.closeDeleteModal}
                        onDeleteSubmit={this.onDeleteSubmit}
                        showDeleteModal={this.state.showDeleteModal} />



                    <EditSales
                        onChange={this.onChange}
                        update={this.state.updateId}
                        onClose={this.closeUpdateModel}
                        onUpdateSubmit={this.onUpdateSubmit}
                        showUpdateModel={this.state.showUpdateModel}
                        Id={this.state.Id}
                        ProductId={this.state.ProductId}
                        CustomerId={this.state.CustomerId}
                        StoreId={this.state.StoreId}
                        DateSold={this.state.DateSold}
                    />
                       <table className="ui striped table">
                        <thead>
                            <tr>
                                <th className="four wide">Customer</th>
                                <th className="four wide">Product</th>
                                <th className="four wide">Store</th>
                                <th className="three wide">DateSold</th>
                                <th className="six wide">Actions</th>
                                <th className="six wide">Actions</th>
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