import {
    BrowserRouter as Router,
} from 'react-router-dom'

import Navigation from './Navigation';
import Content from './Content';


export default function App() {
    return (
        <Router>
            <Navigation />
            <Content />
        </Router>
    );
}