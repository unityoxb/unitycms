import React, { useEffect, useState, createRef, createContext, useMemo  } from 'react';
import { Link } from 'react-router-dom'
import { Grid, List, Header, Input } from 'semantic-ui-react';
import axios from 'axios';
import StageForm from './story/StageForm'
import Info from './authors/Info'

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export const AuthorContext = createContext();

export default function Space() {

    const [loading, setLoading] = useState(true);
    const [author, SetAuthor] =  useState({})
    const [stages, SetStages] =  useState([])
    const [error, setError] = useState('')  

    const [content, setContent] = useState('')  

    const onChange = (content) => {
      setContent(content);
    };

    const autofocusNoSpellcheckerOptions = useMemo(() => {
      return {
        autofocus: true,
        spellChecker: false,
      }
    }, []);

    useEffect(() => {
        let token = window.localStorage.getItem("scifanchain_access_token")
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;

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
              <Input></Input>
              <SimpleMDE 
                value={content} 
                onChange={onChange} 
                options={autofocusNoSpellcheckerOptions}
              />                        
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
