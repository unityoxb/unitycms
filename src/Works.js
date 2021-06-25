import React, { useEffect, useState, createRef } from 'react';
import { Grid, } from 'semantic-ui-react';
import axios from 'axios'

const contextRef = createRef();

function Works() {

    // fetch('https://api.scifanchain.com/stages/', {
    //     method: 'GET',
    //     mode: 'cors',
    // }).then(res => {
    //     return res.json();
    // }).then(json => {
    //     console.log('获取的结果', json);
    //     return json;
    // }).catch(err => {
    //     console.log('请求错误', err);
    // })

    fetch('https://api.scifanchain.com/stages/test', {
        method: 'POST',
        // headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json'
        // },
        body: JSON.stringify({
            title: 'hi,unity'
        })
    });

    return (
        <div ref={contextRef}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <span>作品</span>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}

export default Works