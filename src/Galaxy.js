import React, { useEffect, useState, createRef } from 'react';
import { Grid, } from 'semantic-ui-react';
import axios from 'axios'
import qs from 'qs'


const contextRef = createRef();


function Galaxy() {


    useEffect(() => {
        let token = window.localStorage.getItem("scifanchain_access_token")
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.get('https:api.scifanchain.com/authors/me')
            .then(function (response) {
                // 处理成功情况
                setLoading(false)
                setStages(response.data)
                setError('')
                console.log(response);
            })
            .catch(function (error) {
                // 处理错误情况
                setLoading(false)
                setStages([])
                setError('很抱歉，没有获取到数据！')
                console.log(error);
            });
    }, [])

    return (
        <div ref={contextRef}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <span>galaxy</span>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}

export default Galaxy