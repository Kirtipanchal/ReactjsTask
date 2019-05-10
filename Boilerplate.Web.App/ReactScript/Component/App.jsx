// ./src/common/main.component.jsx
import React, { Component } from 'react';
import Main from './Main.jsx';
//import Customer from './Customer';
//import Product from './Product';
//import Store from './Store';
//import Sales from './Sales';
 
class App extends Component {
    constructor() {
        super();

        
    }
    render() {
        return (


            < Main />


        );
    }
}
export default App;

//        this.state = {
//            nav: "customer"

//        };
//        this.navigation = this.navigation.bind(this);
//    }

//    navigation(val) {
//        if (val == "customer") {
//            this.setState({
//                nav: "customer"
//            })
//        }
//        if (val == "product") {
//            this.setState({
//                nav: "product"
//            })
//        }
//        if (val == "store") {
//            this.setState({
//                nav: "store"
//            })
//        }
//    }

//    render() {
//        let display
//        if (this.state.nav == "customer") {
//            display = <Customer />
//        }
//        if (this.state.nav == "product") {
//            display = <Product />
//        }
        
//        return (
//            <React.Fragment>
//                <div className="ui fixed inverted menu">
//                    <a className="item" onClick={this.navigation.bind(this, "customer")}>Customer</a>
//                    <a className="item" onClick={this.navigation.bind(this, "product")}>Products</a>
//                </div>
//                {display}
//            </React.Fragment>
           
//        );

        

        //<div className="App">
        //    <div className="container-fluid">
        //        <div className='row'>
        //            <div className='col-sm-12'>
        //                <div className="main-nav"><nav>
        //                    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
        //                        <div className="container">


        //                            <div className="collapse navbar-collapse" id="navbarResponsive">
        //                                <ul className="nav nav-pills navbar-nav mr-auto">
        //                                    <li className="nav-item">
        //                                        <a className="nav-link"><i className="fa fa-home fa-fw"></i>React<span className="sr-only">(current)</span></a>
        //                                    </li>
        //                                    <li className="nav-item">
        //                                        <a className="nav-link"><i className="fa fa-home fa-fw"></i>Customer<span className="sr-only">(current)</span></a>
        //                                    </li>
        //                                    <li className="nav-item">
        //                                        <a className="nav-link"><i className="fa fa-home fa-fw"></i>Product<span className="sr-only">(current)</span></a>
        //                                    </li>
        //                                    <li className="nav-item">
        //                                        <a className="nav-link"><i className="fa fa-home fa-fw"></i>Store<span className="sr-only">(current)</span></a>
        //                                    </li>
        //                                    <li className="nav-item">
        //                                        <a className="nav-link"><i className="fa fa-home fa-fw"></i>Sales<span className="sr-only">(current)</span></a>
        //                                    </li>

        //                                </ul>

        //                                <ul className="nav navbar-nav ml-auto">

        //                                    <span><li className="nav-link">Hi User <button >Logout</button></li> </span>

        //                                </ul>

        //                            </div>
        //                        </div>
        //                    </div>
        //                </nav>

        //                </div>
        //            </div>
        //        </div>
        //    </div>
        //    <div className='container-fluid' id="body-cover">
        //        <div className="row">
        //            <div className="col-md-1 hidden-xs">
        //            </div>
        //            <div className="col-md-3 col-xs-4">
        //                <div className="col">
        //                    <div className="card border-primary mb-4">
        //                        <img className="card-img-top" alt="Card image cap" src="https://semantic-ui.com/images/avatar/large/joe.jpg" />
        //                        <div className="card-body">
        //                            <h4 className="card-title"><a>Mirani</a></h4>
        //                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //                            <a href="#" className="btn btn-primary">Button</a>
        //                        </div>
        //                    </div>
        //                </div>
        //            </div>

        //            <div className="col-md-7 col-xs-8">
        //                <div className="jumbotron col">
        //                    <h1>This is body </h1>
        //                </div>
        //                <div className="jumbotron col">
        //                    This is body
        //                 </div>
        //                <div className="jumbotron col">
        //                    This is body
        //                 </div>
        //            </div>
        //            <div className="col-md-1 hidden-xs">

        //            </div>
        //        </div>
        //    </div>
        //    <div className="row">
        //        <div className="column"><footer id="footer" >This is Footer</footer></div>
        //    </div>
        //</div>
   

