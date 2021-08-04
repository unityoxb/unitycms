import React, { useEffect, useState, createRef, createContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, Header } from 'semantic-ui-react';

import ints from './api/token'



export default function Test() {
    const [token, setToken] = useState('good');

    useEffect(() => {
        ints('/authors/me/')
            .then(function (response) {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
                setToken(response.data.author)
            });
        
    }, []); 

    return <h1>{token}</h1>;


    // ints('/authors/me/')

}