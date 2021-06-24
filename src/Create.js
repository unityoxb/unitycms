import React, { useEffect, useState, createRef } from 'react';
import { Link } from 'react-router-dom'
import { Grid, List, Input, Select, options, Radio, Button, TextArea, Checkbox, Header } from 'semantic-ui-react';
import axios from 'axios';
import StageForm from './story/StageForm'

const contextRef = createRef();


function Create() {

    const [loading, setLoading] = useState(true);
    const [author, SetAuthor] =  useState({})
    const [stages, SetStages] =  useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        let token = window.localStorage.getItem("scifanchain_access_token")
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        axios({
            // Oauth2要求必须以表单形式提交
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'get',
            url: 'https://api.scifanchain.com/authors/me/',
        }).then(response => {
            setLoading(false)
            console.log(response.data)
            SetAuthor(response.data)
            SetStages(response.data.stages)
            // console.log(response.data.refresh_token)
        }).catch(err => {
            setLoading(false)
            setError('很抱歉，没有获取到数据！')
            console.log(err)
        });
    }, [])

    const stageList = stages.map((stage) => (
        <List.Item key={stage.id} as={Link} to={
            {
                pathname: '/stage',
                state: { stageId:stage.id}
            }
        }>
            {stage.title}
        </List.Item>
    ));

    return (
        <div ref={contextRef}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Header>用户信息</Header>
                        <p>{author.username}</p>
                        <p>{author.nickname}</p>
                        <p>{author.email}</p>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <StageForm></StageForm>
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

export default Create