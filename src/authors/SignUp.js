import React, { useState, useEffect, createRef } from 'react'
import { Container, Dimmer, Loader, Grid, Form, Button, Message, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { usernameState} from '../StateManager'
import { mnemonicState} from '../StateManager'
import { navState} from '../StateManager'
import { useHistory } from "react-router-dom";

import { SubstrateContextProvider, useSubstrate } from '../substrate-lib';

import { mnemonicGenerate } from '@polkadot/util-crypto';


export function Main () {

  // 隐藏导航
  const [nav, setNav] = useRecoilState(navState);
  setNav(false)

  const { apiState, keyring, keyringState, apiError } = useSubstrate();

  const submitRef = createRef()

  const history = useHistory();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    password_repeat: "",
  })


  const [validate_username, setValidateUsername] = useState('')
  const [validate_email, setValidateEmail] = useState('')
  const [validate_password, setValidatePassword] = useState('')
  const [validate_password_repeat, setValidatePasswordRepeat] = useState('')
  const [allow_username, setAllowUsername] = useState(false)
  const [allow_email, setAllowEmail] = useState(false)
  const [allow_password, setAllowPassword] = useState(false)
  const [allow_password_repeat, setAllowPasswordRepeat] = useState(false)
  const [validated, setValidated] = useState(false)

  // 用户登录相关组件
  const [username, setUsername] = useRecoilState(usernameState);
  // 助记词
  const [mnemonic, setMnemonic] = useRecoilState(mnemonicState);

  // 本地存储
  const storage = window.localStorage;

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    submitCheck();
    
    if(e.target.name === 'password_repeat' && state.password === e.target.value && allow_username && allow_email && allow_password){
      setAllowPasswordRepeat(true)
      setValidated(true)
    }
  }

  // 验证用户名
  function validUsername (e) {
    if(!(/^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(state.username))) {
      setValidateUsername('用户名是由英文字母和数字组成的4-20位字符，以字母开头。')
      setAllowUsername(false)
    }
    else{
      setValidateUsername('')
      setAllowUsername(true)
    }
    submitCheck();
  }

  // 验证邮箱
  function validEmail (e) {
    if(!(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(state.email))) {
      setValidateEmail('邮箱地址格式不合规范，请检查输入是否正确。')
      setAllowEmail(false)
    }
    else{
      setValidateEmail('')
      setAllowEmail(true)
    }
    submitCheck();
  }

  // 验证密码
  function validPassword (e) {
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(state.password))) {
      setValidatePassword('密码至少8位，至少1个大写字母，1个小写字母和1个数字。')
      setAllowPassword(false)
    }
    else{
      setValidatePassword('')
      setAllowPassword(true)
    }
    submitCheck();
  }

  // 验证密码重复
  function validPasswordRepeat (e) {
    if(state.password_repeat !== state.password) {
      ('password_repeat')
      setValidatePasswordRepeat('两次输入的密码不一致，请重新输入。')
      setAllowPasswordRepeat(false)
    }
    else{
      setValidatePasswordRepeat('')
      setAllowPasswordRepeat(true)
    }
    submitCheck();
  }

  function submitCheck () {
    if(allow_username && allow_email && allow_password && allow_password_repeat){
      setValidated(true)
    }
    else{
      setValidated(false)
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    // 创建pair
    // keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
    const mnemonic = mnemonicGenerate();
    const pair = keyring.createFromUri(mnemonic, { name: 'username' });
    const chain_account = keyring.saveAccount(pair, state.password)

    setMnemonic(mnemonic)

    const authorInfo = {
      username: state.username,
      email: state.email,
      password: state.password,
      chain_address: pair.address,
    }

    const storage = window.localStorage;

    axios({
      // Oauth2要求必须以表单形式提交
      // headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      // },
      headers: {
          'Content-Type': 'application/json',
      },
      method: 'POST',
      url: 'https://api.scifanchain.com/authors/create_author/',
      // data: qs.stringify(authorInfo)
      data: authorInfo
    }).then(response => {

      setUsername(state.username)
      
      // console.log(response)
      const access_token = response.data.access_token;
      axios.defaults.headers.common["Authorization"] = access_token;

      storage.scifanchain_username = username
      storage.scifanchain_access_token = access_token

      // 创建pair
      const mnemonic = mnemonicGenerate();
      const pair = keyring.createFromUri(mnemonic, { name: 'username' });
      const chain_account = keyring.saveAccount(pair, state.password)

      console.log(response.data.access_token)
      console.log(response.data.token_type)
      console.log(response.data.exp)

      history.push('/sign-key');
        // console.log(response.data.refresh_token)
    }).catch(err => {
        console.log(err)
    });
  }

  return (
    <SubstrateContextProvider>
      <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
          </Grid.Column>
          <Grid.Column width={6}>
            <Message
              attached
              header='开启你的宇宙叙事'
              content='银河星旋的人类文明高度发达，数百万计的文明星球在璀璨银河生生不息，体现着创造主的荣耀。人类不断探寻宇宙的奥秘，一个又一个里程碑式的重大发现被揭示出来。'
            />
            <Form onSubmit={handleSubmit} className='attached fluid segment'>
              <Form.Input
                  placeholder='用户名'
                  name='username'
                  value={state.username}
                  onChange={handleChange}
                  onBlur={validUsername}
              />
              {validate_username !== '' &&
                <Message negative>
                  <p>{validate_username}</p>
                </Message>
              }
              <Form.Input
                  placeholder='邮箱'
                  name='email'
                  value={state.email}
                  onChange={handleChange}
                  onBlur={validEmail}
              />
              {validate_email !== '' &&
                <Message negative>
                  <p>{validate_email}</p>
                </Message>
              }
              <Form.Input
                  placeholder='密码'
                  name='password'
                  value={state.password}
                  type='password'
                  onChange={handleChange}
                  onBlur={validPassword}
              />
              {validate_password !== '' &&
                <Message negative>
                  <p>{validate_password}</p>
                </Message>
              }
              <Form.Input
                  placeholder='重复密码'
                  name='password_repeat'
                  value={state.password_repeat}
                  type='password'
                  onChange={handleChange}
                  onBlur={validPasswordRepeat}
                  
              />
              {validate_password_repeat !== '' &&
                <Message negative>
                  <p>{validate_password_repeat}</p>
                </Message>
              }
                <Button fluid className={validated ? 'positive' : 'disabled'} ref={submitRef}>提交注册</Button>
              
            </Form>
          </Grid.Column>
          <Grid.Column width={5}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    </SubstrateContextProvider>
  ) 
}


export default function SignUp() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  );
}
