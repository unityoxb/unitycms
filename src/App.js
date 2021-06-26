import {
    BrowserRouter as Router,
} from 'react-router-dom'

import Navigation from './Navigation';
import Content from './Content';
// import Test from './Test';
// import Demo from './Demo'
import {RecoilRoot} from 'recoil';


export default function App() {
    return (
        <RecoilRoot>
            <Router>
                <Navigation />
                <Content />
                {/* <Test /> */}
                {/* <Demo /> */}
            </Router>
        </RecoilRoot>
    );
}