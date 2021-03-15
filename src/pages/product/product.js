import {Component} from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import './product.less'
import ProductHome from "./home";
import ProductAddUpdate from "./add-update";
import ProductDetail from "./detail";



export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductHome} exact/>
                <Route path='/product/addupdate' component={ProductAddUpdate}/>
                <Route path='/product/detail' component={ProductDetail}/>
                <Redirect to='/product'/>
            </Switch>
        );
    }
}