import React from "react";
import {
    Route,
    Switch,
} from 'react-router-dom'

import About from './About';
import Site from './Site';
import Home from './Home';
import Galaxy from "./Galaxy";
import SignIn from "./authors/SignIn";
import SignUp from "./authors/SignUp";
import Profile from "./authors/Profile";
import Stage from "./story/Stage2";
import Finance from "./Finance";
import Space from "./Space";
// import 404 from './404'


export default function Content() {
    return (
        <Switch>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/profile" component={Profile} />
            <Route path="/finance" component={Finance} />
            <Route path="/site" component={Site} />
            <Route path="/galaxy" component={Galaxy} />
            <Route path="/space" component={Space} />
            <Route path="/stage/:id" component={Stage} />
            <Route path="/about" component={About} />
            <Route path="/" component={Home} />
        </Switch>
    )
}