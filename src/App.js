import {
    BrowserRouter as Router,
} from 'react-router-dom'

import Navigation from './Navigation';
import Content from './Content';
import Test from './Test';
import Test2 from './Test2';
// import Demo from './Demo'
import React from 'react';

import { RecoilRoot} from 'recoil';
import PoE from './PoE';

export default function App() {
    
    return (
        <RecoilRoot>
            <Router>
                {<Navigation />}
                {<Content />}
                {/* {<PoE accountPair={accountPair}/>} */}
                {/* <Test2 /> */}
                {/* <Demo /> */}
            </Router>
        </RecoilRoot>
    );
}