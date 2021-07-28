import React, { useEffect, useState, createRef, createContext, useMemo  } from 'react';
import { Link } from 'react-router-dom'
import { Grid, List, Header, Input, Button } from 'semantic-ui-react';
import axios from 'axios';
import Info from './author/Info'

import StageEditor from './widget/StageEditor';

import { useRecoilState } from 'recoil';
import { usernameState} from './StateManager'

export const AuthorContext = createContext();

export default function Space() {

  let token = window.localStorage.getItem("scifanchain_access_token")
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const [loading, setLoading] = useState(true);
  const [author, SetAuthor] =  useState({})
  const [stages, SetStages] =  useState([])
  const [error, setError] = useState('')  

   // 同步用户状态
   const [username, setUsername] = useRecoilState(usernameState)

  useEffect(() => {

    axios({
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
        
        window.localStorage.removeItem('scifanchain_username');
        window.localStorage.removeItem('scifanchain_access_token');
        setUsername('')

    });
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
