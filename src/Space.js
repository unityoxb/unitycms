import React, { useEffect, useState, createRef, createContext } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, Header } from 'semantic-ui-react';
import axios from 'axios';
import Info from './author/Info';
import config from './config';

import StageEditor from './widget/StageEditor';

import { useRecoilState } from 'recoil';
import { usernameState } from './StateManager';

import ints from './api/token';

// 本地存储
const storage = window.localStorage;
export const AuthorContext = createContext();


export default function Space() {
    const access_token = window.localStorage.getItem('scifanchain_access_token')
    const refresh_token = window.localStorage.getItem('scifanchain_refresh_token')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;

    const [loading, setLoading] = useState(true);
    const [author, SetAuthor] =  useState({})
    const [stages, SetStages] =  useState([])
    const [error, setError] = useState('')  

    // 同步用户状态
    const [username, setUsername] = useRecoilState(usernameState)

    // useEffect(() => {

    //     axios({
    //         method: 'get',
    //         url: config.API_URL + '/authors/me/',
    //     }).then(response => {
    //         setLoading(false)
    //         console.log(response.data)
    //         SetAuthor(response.data.author)
    //         // SetStages(response.data.stages)
    //     }).catch(err => {
    //         storage.removeItem('scifanchain_access_token');
    //         axios.defaults.headers.common["Authorization"] = "Bearer " + refresh_token;
    //         axios({
    //             method: 'post',
    //             url: config.API_URL + '/authors/refresh/',
    //         }).then(res => {
    //             console.log(res.data.access_token)
    //             storage.scifanchain_access_token = res.data.access_token
    //             axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.access_token;
    //         }).catch(err => {
    //             console.log(err)
    //         })

    //         setLoading(false)
    //         // setError('很抱歉，没有获取到数据！')
    //         // console.log(err)

    //     });
    // }, [])

    useEffect(() => {
        ints('/authors/me')
    }, [])

    const stageList = stages.map((stage) => (
        <List.Item key={stage.id} as={Link} to={
            {
                pathname: '/stage/' + stage.id,
                stage_id: stage.id
            }
        }>
            {stage.title}
        </List.Item>
    ));

    const contextRef = createRef();

    return (
        <div ref={contextRef}>
        <Grid>
            <Grid.Row>
            <Grid.Column width={4}>
                <AuthorContext.Provider value={author}>
                <Info />
                </AuthorContext.Provider>
            </Grid.Column>
            <Grid.Column width={8}>
                <StageEditor stage={{}}/>
            </Grid.Column>
            <Grid.Column width={4}>
                <Header>我的作品</Header>
                {!loading && !error &&
                <List>{stageList}</List>
                }
            </Grid.Column>
            </Grid.Row>
        </Grid>

        </div>
    )
}
