import React, { Component, useState } from 'react'
import {Container, Grid, Form, Header } from 'semantic-ui-react'
import axios from 'axios'
import qs from 'qs'
import { useRecoilState } from 'recoil';
import { usernameState} from '../StateManager'

function SignIn () {

  const [state, setState] = useState({
    username: "",
    password: ""
  })

  function handleChange(evt) {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  }


  // 渲染与用户登录相关组件
  const [username, setUsername] = useRecoilState(usernameState)
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginInfo = {
      username: state.username,
      password: state.password,
      grant_type: 'password'
    }

    // 本地存储
    const storage = window.localStorage;

    axios({
      // Oauth2要求必须以表单形式提交
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      url: 'https://api.scifanchain.com/authors/token/',
      auth: {
          username: state.username,
          password: state.password
      },
      data: qs.stringify(loginInfo)
    }).then(response => {
      setUsername(state.username)

      // console.log(response)
      const access_token = response.data.access_token;
      axios.defaults.headers.common["Authorization"] = access_token;
      
      storage.scifanchain_username = state.username
      storage.scifanchain_access_token = access_token
      
      console.log(response.data.access_token)
      console.log(response.data.token_type)

      
      // console.log(response.data.refresh_token)
    }).catch(err => {
      console.log(err)
    });
  }

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

            <Form onSubmit={handleSubmit}>
              <Form.Input
                placeholder='用户名'
                name='username'
                value={state.username}
                onChange={handleChange}
              />
              <Form.Input
                placeholder='密码'
                name='password'
                value={state.password}
                type='password'
                onChange={handleChange}
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

export default SignIn