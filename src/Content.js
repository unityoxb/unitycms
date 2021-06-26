import React from "react";
import {
    Route,
    Switch,
} from 'react-router-dom'

import About from './About';
import Create from './Create';
import Home from './Home';
import Galaxy from "./Galaxy";
import SignIn from "./authors/SignIn";
import SignUp from "./authors/SignUp";
import Stage from "./story/Stage";
import Finance from "./Finance"
// import 404 from './404'


export default function Content() {
    return (
        <Switch>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/finance" component={Finance} />
            <Route path="/create" component={Create} />
            <Route path="/galaxy" component={Galaxy} />
            <Route path="/stage/:id" component={Stage} />
            <Route path="/" component={Home} />
        </Switch>
    )
}