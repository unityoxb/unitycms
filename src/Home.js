import React, { useEffect, useState, createRef } from 'react';
import { Advertisement, Segment, Button, Label, Header} from 'semantic-ui-react'

import { Container, Dimmer, Loader, Grid, Sticky, Message } from 'semantic-ui-react';

import MenuLeft from './widget/Menus';
import StageList from './story/StageList';

import List from './author/List'
import Step from './author/Step'


const contextRef = createRef();

function Home () {
    return(
        <Grid>
            <Grid.Row>
               
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Segment.Group>
                        <Segment>
                            <Button
                                compact
                                size='small'
                                floated='right'
                                onClick={() => dispatch({ type: 'clearLog' })}
                            >
                                Clear
                            </Button>
                            Event Log <Label circular>{200}</Label>
                        </Segment>
                        <Segment secondary>
                
                        </Segment>
                    </Segment.Group>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Advertisement unit='panorama' test='Billboard' />
                    <Step />
                    <Header as='h3'>
                        最新作品
                    </Header>
                    <StageList />
                </Grid.Column>
                <Grid.Column width={3}>
                    <List />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Home