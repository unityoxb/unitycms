import {
    BrowserRouter as Router,
} from 'react-router-dom'

import Navigation from './Navigation';
import Content from './Content';
import Test from './Test';


export default function App() {
    return (
        <Router>
            <Navigation />
            <Content />
            {/* <Test /> */}
        </Router>
    );
}