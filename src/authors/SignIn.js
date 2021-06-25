import React, { Component } from 'react'
import {Container, Grid, Form, Header } from 'semantic-ui-react'
import axios from 'axios'
import qs from 'qs'

class FormExampleCaptureValues extends Component {
    
    state = { username: '', password: '', submittedName: '', submittedEmail: '' }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state
        this.setState({  submittedName: username, submittedEmail: password })

        const loginInfo = {
            username: username,
            password: password,
            grant_type: 'password'
        }

        const storage = window.localStorage;

        axios({
            // Oauth2要求必须以表单形式提交
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            url: 'http://118.195.181.77:7000/authors/token/',
            auth: {
                username: username,
                password: password
            },
            data: qs.stringify(loginInfo)
        }).then(response => {
            this.setState({username: username})
            // console.log(response)
            const access_token = response.data.access_token;
            axios.defaults.headers.common["Authorization"] = access_token;
            storage.scifanchain_username = username
            storage.scifanchain_access_token = access_token
            console.log(response.data.access_token)
            console.log(response.data.token_type)
            // console.log(response.data.refresh_token)
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        const { username, password } = this.state

        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={5}>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Header as='h2'>加入赛凡链，创造宇宙的故事</Header>
                            <p>
                                银河星旋的人类文明高度发达，数百万计的文明星球在璀璨银河生生不息，体现着创造主的荣耀。人类不断探寻宇宙的奥秘，一个又一个里程碑式的重大发现被揭示出来。
                            </p>

                            <Form onSubmit={this.handleSubmit}>
                                <Form.Input
                                    placeholder='用户名'
                                    name='username'
                                    value={username}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    placeholder='密码'
                                    name='password'
                                    value={password}
                                    type='password'
                                    onChange={this.handleChange}
                                />
                                <Form.Button content='提交' />
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={5}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default FormExampleCaptureValues