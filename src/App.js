import {Button} from 'antd'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import * as React from "react"
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends React.Component {


    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/' component={Admin}/>
                </Switch>
            </BrowserRouter>
        );
    }
}