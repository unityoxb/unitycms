import {
    BrowserRouter as Router,
} from 'react-router-dom'

import Nav from './Nav';
import Content from './Content';


export default function App() {
    return (
        <Router>
            <Nav />
            <Content />
        </Router>
    );
}