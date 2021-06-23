import React from "react";
import {
    Route,
    Switch,
} from 'react-router-dom'

import About from './About';
import Home from './Home';
// import Finance from './Finance';
import Works from './Works';
// import 404 from './404'


export default function Content() {
    return (
        <Switch>
            <Route path="/about" component={About} />
            <Route path="/" component={Home} />
            {/* <Route path="/finance" component={Finance} /> */}
            <Route path="/works" component={Works} />
            {/* <Route component={404} /> */}
        </Switch>
    )
}