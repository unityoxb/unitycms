import React from "react";
import {
    Route,
    Switch,
} from 'react-router-dom'

import About from './About';
import Home from './Home';
import Galaxy from './Galaxy';
// import 404 from './404'


export default function Content() {
    return (
        <Switch>
            <Route path="/about" component={About} />
            <Route path="/home" component={Home} />
            <Route path="/galaxy" component={Galaxy} />
            {/* <Route component={404} /> */}
        </Switch>
    )
}