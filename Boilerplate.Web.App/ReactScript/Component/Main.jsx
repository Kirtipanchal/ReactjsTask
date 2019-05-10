
import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Customer from "./Customer.jsx";
import Product from "./Product.jsx";
import Store from "./Store.jsx";
import Sales from "./Sales.jsx";
class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>React</h1>
                    <ul className="header">

                        <li><NavLink to="/Customer">Customer</NavLink></li>
                        <li><NavLink to="/Product">Product</NavLink></li>
                        <li><NavLink to="/Store">Store</NavLink></li>
                        <li><NavLink to="/Sales">Sales</NavLink></li>
                       
                    </ul>
                    <div className="content"> </div>

                    <Route path="/Customer" component={Customer} />
                    <Route path="/Product" component={Product} />
                    <Route path="/Store" component={Store} />
                    <Route path="/Sales" component={Sales} />
                   
                </div>
            </HashRouter>
        );
    }
}
export default Main;