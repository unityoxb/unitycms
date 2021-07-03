import React, { useState, createRef, useEffect } from 'react';
import { Container, Dimmer, Loader, Grid, Header, Button, Message, Divider, Icon } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import { SubstrateContextProvider, useSubstrate } from '../substrate-lib';
import { DeveloperConsole } from '../substrate-lib/components';

import axios from 'axios'

import Poe from '../PoE'


function Main() {

  // React hooks for all the state variables we track.
  // Learn more at: https://reactjs.org/docs/hooks-intro.html
  const [accountAddress, setAccountAddress] = useState(null);
  const {apiState, keyring, keyringState, apiError } = useSubstrate();

  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState([])
  const [error, setError] = useState('')

  // 接收前一页面的参数
  const location = useLocation();

  // 加载数据
  useEffect(() => {
    let token = window.localStorage.getItem("scifanchain_access_token")
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.get('https://api.scifanchain.com/stages/' + location.stage_id)
      .then(function (response) {
        // 处理成功情况
        setLoading(false)
        setStage(response.data)
        setError('')
        console.log(response);
      })
      .catch(function (error) {
        // 处理错误情况
        setLoading(false)
        setStage({})
        setError('很抱歉，没有获取到数据！')
        console.log(error);
      });
  }, [])

  useEffect(() => {
    setAccountAddress('5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty')
  }, [])

  // 获取当前账户
  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);
  
  const loader = text =>
    <Dimmer active>
      <Loader size='small'>{text}</Loader>
    </Dimmer>;

  const message = err =>
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message negative compact floating
          header='Error Connecting to Substrate'
          content={`${JSON.stringify(err, null, 4)}`}
        />
      </Grid.Column>
    </Grid>;

  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('正在连接赛凡链……');

  if (keyringState !== 'READY') {
    return loader('Loading accounts (please review any extension\'s authorization)');
  }

  const contextRef = createRef();

  return (
    <div ref={contextRef}>
      {!loading && !error &&
      <Container ref={contextRef}>
        <Grid columns={2}>
          <Grid.Column width={4}>
            
          </Grid.Column>
          <Grid.Column width={12}>
            {/* 存证与撤消 */}
            <Poe accountPair={accountPair}/>
           
            <Grid.Row>
              <Button.Group basic size='small' floated='right'>
                <Button icon='file' />
                <Button icon='save' />
                <Button icon='upload' />
                <Button icon='download' />
              </Button.Group>
              <Header as="h1">{stage.title}</Header>
            </Grid.Row>

            <Divider horizontal>
              <Header as='h4'>
                <Icon name='recycle' />
                开放创作
              </Header>
            </Divider>

            <Grid.Row>
              <div id='stageContent' style={{ marginBottom: '2rem' }}>{stage.content}</div>
            </Grid.Row>

          </Grid.Column>
        </Grid>
      </Container>
      }
      <DeveloperConsole />
    </div>
  );
}

export default function Stage() {
  return (
    <SubstrateContextProvider>
        <Main />
    </SubstrateContextProvider>
  );
}