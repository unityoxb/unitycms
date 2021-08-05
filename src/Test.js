import React, { useEffect, useState, createRef, createContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, Header } from 'semantic-ui-react';

import ints from './api/token'
import { get, post} from './api/request'



export default function Test() {
    const [token, setToken] = useState('hello, world!');

    useEffect(() => {
        get('/authors/me/', {}, true)
            .then(function (response) {
                // console.log(response.data.author);
                // console.log(response.config);
                setToken(response.data.author)
            });
        
        get('/authors/current/', {}, true);
        
    }, []); 

    return <h1>{token}</h1>;

}